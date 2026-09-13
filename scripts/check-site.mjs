// Rendered-site checks against a served static build.
//   npx serve out -l 4173   (in another terminal)
//   npm run check
// For a sub-path build, serve it under that path and set
// BASE_URL=http://localhost:4173/na_site BASE_PATH=/na_site.
// Writes screenshots to docs/screenshots and exits non-zero on any failure.
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:4173";
const BASE_PATH = process.env.BASE_PATH ?? "";
const SHOTS = process.env.SHOT_DIR ?? "docs/screenshots";
const BOOKING_ROUTE = "/book/";
const BOOKING_HREF = `${BASE_PATH}${BOOKING_ROUTE}`;
const CALENDLY = "https://calendly.com/noahzaidi/30min";
const CONSENT_KEY = "noahark-consent";
const WIDTHS = [375, 768, 1440];
const PAGES = [
  ["home", "/"],
  ["book", "/book/"],
  ["about", "/about/"],
  ["privacy", "/privacy/"],
  ["legal", "/legal/"],
  ["404", "/this-page-does-not-exist/"],
];

let failures = 0;
const check = (name, ok, detail = "") => {
  if (!ok) failures += 1;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  (${detail})` : ""}`);
};

// A stored cookie choice, so the banner doesn't cover layout screenshots.
const presetConsent = (context, external) =>
  context.addInitScript(
    ([key, value]) => {
      try {
        window.localStorage.setItem(key, value);
      } catch {}
    },
    [CONSENT_KEY, JSON.stringify({ version: 1, external, date: new Date().toISOString() })],
  );

const storedConsent = (page) =>
  page.evaluate((key) => JSON.parse(window.localStorage.getItem(key) ?? "null"), CONSENT_KEY);

// Scroll through the page so lazy-loaded media below the fold is fetched before capture.
const settle = async (page) => {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 40));
    }
    window.scrollTo(0, 0);
    await Promise.all(
      [...document.images].map((image) =>
        image.complete ? null : new Promise((resolve) => (image.onload = image.onerror = resolve)),
      ),
    );
  });
  await page.waitForTimeout(300);
};

// Third-party frames (Calendly) log their own messages, e.g. its Storage Access API
// request being denied inside the embed; only this site's errors count.
const isOwnError = (message) =>
  message.type() === "error" &&
  !message.text().includes("404") &&
  !message.text().includes("requestStorageAccess") &&
  !(message.location().url || "").includes("calendly");

await mkdir(SHOTS, { recursive: true });
const browser = await chromium.launch();

// Layout at each width, reduced motion so full-page captures show settled content.
for (const width of WIDTHS) {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    reducedMotion: "reduce",
  });
  await presetConsent(context, false);
  const page = await context.newPage();
  const errors = [];
  const missing = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => isOwnError(message) && errors.push(message.text()));
  page.on("response", (response) => {
    const url = response.url();
    if (response.status() === 404 && url.startsWith(BASE) && !url.includes("this-page-does-not-exist")) {
      missing.push(url.replace(BASE, ""));
    }
  });

  for (const [name, path] of PAGES) {
    await page.goto(BASE + path, { waitUntil: "load" });
    await settle(page);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    check(`${name} @${width}: no horizontal overflow`, overflow <= 0, `${overflow}px`);
    await page.screenshot({ path: `${SHOTS}/${name}-${width}.png`, fullPage: true });
  }

  check(`@${width}: no console errors`, errors.length === 0, errors.join(" | "));
  check(`@${width}: every asset loads (no 404s)`, missing.length === 0, [...new Set(missing)].join(", "));
  await context.close();
}

// Links, CTAs and controls on desktop.
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await presetConsent(context, false);
  const page = await context.newPage();
  await page.goto(`${BASE}/`, { waitUntil: "load" });

  const homePaths = new Set(["", "/", `${BASE_PATH}/`]);
  const samePageTargets = await page.$$eval(
    "a[href]",
    (links, paths) => [
      ...new Set(
        links
          .map((link) => link.getAttribute("href"))
          .filter((href) => href.includes("#") && paths.includes(href.split("#")[0]))
          .map((href) => href.split("#")[1])
          .filter(Boolean),
      ),
    ],
    [...homePaths],
  );
  for (const id of samePageTargets) {
    check(`anchor #${id} has a target`, (await page.locator(`[id="${id}"]`).count()) === 1);
  }

  const ctas = await page.$$eval("a", (links) =>
    links
      .filter((link) => link.textContent.includes("Show me what you want to automate"))
      .map((link) => ({ href: link.getAttribute("href"), target: link.target })),
  );
  check("two primary CTAs on the page", ctas.length === 2, `${ctas.length} found`);
  check(
    "every primary CTA leads to the booking page",
    ctas.every((cta) => cta.href === BOOKING_HREF && !cta.target),
    JSON.stringify(ctas),
  );
  check(
    "home page never sends visitors straight to calendly.com",
    (await page.locator('a[href*="calendly.com"], iframe[src*="calendly"]').count()) === 0,
  );
  check(
    "footer references the EU AI Act",
    (await page.locator('footer a[href*="eur-lex.europa.eu/eli/reg/2024/1689"]').count()) === 1,
  );

  const faq = page.locator("details.faq-item").first();
  await faq.locator("summary").focus();
  await page.keyboard.press("Enter");
  check("FAQ opens with the keyboard", await faq.evaluate((node) => node.open));
  await page.keyboard.press("Enter");
  check("FAQ closes with the keyboard", !(await faq.evaluate((node) => node.open)));

  await page.locator(".wf .wf-toggle").click();
  check(
    "hero pause control stops the workflow animation",
    (await page.locator("#hero-workflow").getAttribute("data-paused")) === "true",
  );
  const heroState = await page.locator(".wf-stage").first().evaluate(
    (node) => getComputedStyle(node, "::after").animationPlayState,
  );
  check("paused hero animations report paused", heroState === "paused", heroState);
  await page.locator(".wf .wf-toggle").click();

  // Workflow scenes loop while visible, rest while off screen, and can be paused.
  const scene = page.locator(".scene").first();
  check(
    "workflow scene rests while off screen",
    (await scene.getAttribute("data-offscreen")) === "true",
  );
  await scene.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  check("workflow scene runs when on screen", (await scene.getAttribute("data-offscreen")) === "false");
  const running = await scene.locator(".s-pop").first().evaluate(
    (node) => getComputedStyle(node).animationPlayState,
  );
  check("workflow scene animation is running", running === "running", running);
  await scene.locator(".scene-toggle").click();
  const pausedState = await scene.locator(".s-pop").first().evaluate(
    (node) => getComputedStyle(node).animationPlayState,
  );
  check("workflow scene pause control stops it", pausedState === "paused", pausedState);

  // Keyboard: the first Tab reaches the skip link, and focus is always visible.
  await page.goto(`${BASE}/`, { waitUntil: "load" });
  await page.keyboard.press("Tab");
  check(
    "first Tab focuses the skip link",
    await page.evaluate(() => document.activeElement?.classList.contains("skip-link")),
  );
  let invisibleFocus = 0;
  for (let i = 0; i < 14; i += 1) {
    await page.keyboard.press("Tab");
    const outline = await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle);
    if (outline === "none") invisibleFocus += 1;
  }
  check("focus outline visible on tabbed elements", invisibleFocus === 0, `${invisibleFocus} without outline`);

  await page.goto(`${BASE}/`, { waitUntil: "load" });
  await page.waitForTimeout(3600);
  await page.screenshot({ path: `${SHOTS}/hero-motion-1440.png` });

  // About page: background only, with a way to book.
  await page.goto(`${BASE}/about/`, { waitUntil: "load" });
  check("about page has no embedded calendar", (await page.locator("iframe").count()) === 0);
  check(
    "about page links to the booking page",
    (await page.locator(`a[href="${BOOKING_HREF}"]`).count()) > 0,
  );
  await context.close();
}

// Booking page with consent already given: the calendar loads straight away.
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await presetConsent(context, true);
  const page = await context.newPage();
  await page.goto(`${BASE}${BOOKING_ROUTE}`, { waitUntil: "load" });
  const frame = page.locator("iframe");
  await frame.waitFor({ timeout: 5000 }).catch(() => {});
  const frameSrc = await frame.first().getAttribute("src").catch(() => null);
  check("with consent, Calendly loads on the booking page", frameSrc?.startsWith(CALENDLY), frameSrc);
  await page.waitForTimeout(5000);
  await page.screenshot({ path: `${SHOTS}/book-live-1440.png` });
  await context.close();
}

// First visit: cookie banner, reject, gated calendar, settings dialog.
for (const width of [1440, 375]) {
  const context = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await context.newPage();
  await page.goto(`${BASE}/`, { waitUntil: "load" });
  const banner = page.locator("section.consent");
  await banner.waitFor({ timeout: 5000 }).catch(() => {});
  check(`@${width}: cookie banner appears on first visit`, await banner.isVisible());
  await page.screenshot({ path: `${SHOTS}/consent-banner-${width}.png` });
  if (width !== 1440) {
    await context.close();
    continue;
  }

  const accept = await banner.getByRole("button", { name: "Accept all" }).boundingBox();
  const reject = await banner.getByRole("button", { name: "Reject non-essential" }).boundingBox();
  check(
    "reject is as prominent as accept",
    accept && reject && Math.abs(accept.height - reject.height) < 1,
    `${accept?.height} vs ${reject?.height}`,
  );

  await page.goto(`${BASE}${BOOKING_ROUTE}`, { waitUntil: "load" });
  await page.waitForTimeout(500);
  check("calendar does not load before consent", (await page.locator("iframe").count()) === 0);
  check(
    "booking page offers to load the calendar",
    await page.getByRole("button", { name: "Load the calendar" }).isVisible(),
  );
  await page.screenshot({ path: `${SHOTS}/book-gate-1440.png` });

  await page.locator("section.consent").getByRole("button", { name: "Reject non-essential" }).click();
  check("banner closes after rejecting", (await page.locator("section.consent").count()) === 0);
  check("rejection is stored", (await storedConsent(page))?.external === false);
  await page.reload({ waitUntil: "load" });
  await page.waitForTimeout(500);
  check("banner stays closed after reload", (await page.locator("section.consent").count()) === 0);
  check("calendar stays blocked after rejecting", (await page.locator("iframe").count()) === 0);

  await page.getByRole("button", { name: "Load the calendar" }).click();
  const loadedSrc = await page.locator("iframe").first().getAttribute("src");
  check("calendar loads after consenting on the booking page", loadedSrc?.startsWith(CALENDLY), loadedSrc);

  const dialog = page.locator("dialog.consent-dialog");
  await page.locator("footer").getByRole("button", { name: "Cookie settings" }).click();
  check("footer opens cookie settings", await dialog.evaluate((node) => node.open));
  await page.screenshot({ path: `${SHOTS}/consent-settings-1440.png` });
  const toggle = dialog.getByRole("switch");
  check("settings reflect the current choice", await toggle.isChecked());
  await toggle.setChecked(false);
  await dialog.getByRole("button", { name: "Save choices" }).click();
  check("saving closes the dialog", !(await dialog.evaluate((node) => node.open)));
  check("saved choice withdraws consent", (await storedConsent(page))?.external === false);
  check("calendar unloads after withdrawing consent", (await page.locator("iframe").count()) === 0);

  await page.locator("footer").getByRole("button", { name: "Cookie settings" }).click();
  await page.keyboard.press("Escape");
  check("Escape closes cookie settings", !(await dialog.evaluate((node) => node.open)));
  await context.close();
}

// Mobile menu.
{
  const context = await browser.newContext({ viewport: { width: 375, height: 812 } });
  await presetConsent(context, false);
  const page = await context.newPage();
  await page.goto(`${BASE}/`, { waitUntil: "load" });
  const menu = page.locator("details.menu");
  await menu.locator("summary").click();
  check("mobile menu opens", await menu.evaluate((node) => node.open));
  await page.screenshot({ path: `${SHOTS}/menu-375.png` });
  await page.keyboard.press("Escape");
  check("mobile menu closes with Escape", !(await menu.evaluate((node) => node.open)));
  await menu.locator("summary").click();
  await menu.locator(`a[href="${BASE_PATH}/#approach"]`).click();
  check("mobile menu closes after choosing a link", !(await menu.evaluate((node) => node.open)));
  await context.close();
}

await browser.close();
console.log(failures === 0 ? "\nAll checks passed." : `\n${failures} check(s) failed.`);
process.exit(failures === 0 ? 0 : 1);
