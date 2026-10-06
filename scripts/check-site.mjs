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
const CALENDLY = "https://calendly.com/noahzaidi/noahark-discovery-call";
const CONSENT_KEY = "noahark-consent";
const SITE_URL = "https://noahark.org";
const WIDTHS = [320, 375, 768, 1440];
const LOCALES = ["en", "es", "fr"];
const LOCALE_NAMES = { en: "English", es: "Español", fr: "Français" };
const PAGES = [
  ["home", "/"],
  ["book", "/book/"],
  ["about", "/about/"],
  ["privacy", "/privacy/"],
  ["legal", "/legal/"],
];
// Missing URLs all get the one 404.html; a /es/ or /fr/ address localizes it in the browser.
const NOT_FOUND = [
  ["404", "/this-page-does-not-exist/", "en"],
  ["404", "/es/this-page-does-not-exist/", "es"],
  ["404", "/fr/this-page-does-not-exist/", "fr"],
  ["404-unknown-locale", "/de/", "en"],
];

/** "/about/" in a language: "/es/about/". */
const localePath = (locale, path) => (locale === "en" ? path : `/${locale}${path}`);

// Text that is meant to read the same in every language (names, identifiers,
// tool names, official titles) or that is correct French/Spanish spelled like
// the English. Anything else repeated verbatim from the English page fails.
const SAME_IN_EVERY_LANGUAGE = new Set([
  "NoahArk",
  "Noah Zaidi",
  "LinkedIn",
  "FinoktAI",
  "Python",
  "SQL",
  "Docker",
  "RAG",
  "Oracle Cloud / EBS",
  "Station F, Paris",
  "Project Management Professional (PMP)®",
  "Oracle Financials Cloud: General Ledger 2022 Certified Implementation Professional",
  "noahark.org",
  "github.com",
  "GitHub, Inc.",
  "88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, United States",
  "CNIL",
  "noahark-consent",
]);
const SAME_IN = {
  es: new Set([]),
  fr: new Set([
    "Menu",
    "Pause",
    "FAQ",
    "Extraction",
    "Validation",
    "Certifications",
    "Prototype",
    "Contact",
    "Station F, 5 Parvis Alan Turing, 75013 Paris, France",
  ]),
};

let failures = 0;
const check = (name, ok, detail = "") => {
  if (!ok) failures += 1;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  (${detail})` : ""}`);
};

const consentValue = (external) =>
  JSON.stringify({ version: 1, external, date: new Date().toISOString() });

// A stored cookie choice, so the banner doesn't cover layout screenshots.
const presetConsent = (context, external) =>
  context.addInitScript(
    ([key, value]) => {
      try {
        if (!window.localStorage.getItem(key)) window.localStorage.setItem(key, value);
      } catch {}
    },
    [CONSENT_KEY, consentValue(external)],
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

// Header controls (logo, inline nav, language menu, Menu button) must not
// overlap each other or run past the viewport.
const headerProblems = (page) =>
  page.evaluate(() => {
    const controls = [
      ["logo", ".site-header .wrap > a"],
      ["nav", ".site-header .wrap nav"],
      ["language", ".site-header .lang-trigger"],
      ["menu", ".site-header .menu > summary"],
    ]
      .map(([name, selector]) => [name, document.querySelector(selector)?.getBoundingClientRect()])
      .filter(([, box]) => box && box.width > 0);
    const problems = [];
    for (const [name, box] of controls) {
      if (box.left < 0 || box.right > window.innerWidth) problems.push(`${name} off screen`);
    }
    for (let i = 0; i < controls.length; i += 1) {
      for (let j = i + 1; j < controls.length; j += 1) {
        const [a, boxA] = controls[i];
        const [b, boxB] = controls[j];
        const overlap = boxA.left < boxB.right && boxB.left < boxA.right;
        if (overlap) problems.push(`${a} overlaps ${b}`);
      }
    }
    return problems;
  });

// Visible copy and accessible labels, outside the language menu (whose
// language names are deliberately the same everywhere).
const pageCopy = (page) =>
  page.evaluate(() => {
    const strings = new Set();
    const skip = (node) => node.closest?.(".lang, script, style, noscript");
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const text = node.textContent.trim();
      if (text && /\p{L}/u.test(text) && !skip(node.parentElement)) strings.add(text);
    }
    for (const element of document.body.querySelectorAll("[aria-label], [alt], [title]")) {
      if (skip(element)) continue;
      for (const attribute of ["aria-label", "alt", "title"]) {
        const text = element.getAttribute(attribute)?.trim();
        if (text && /\p{L}/u.test(text)) strings.add(text);
      }
    }
    return [...strings];
  });

await mkdir(SHOTS, { recursive: true });
const browser = await chromium.launch();

// Layout at each width in every language, reduced motion so full-page captures show settled content.
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
    if (response.status() === 404 && url.startsWith(BASE) && !NOT_FOUND.some(([, path]) => url.endsWith(path))) {
      missing.push(url.replace(BASE, ""));
    }
  });

  const routes = [
    ...LOCALES.flatMap((locale) =>
      PAGES.map(([name, path]) => [`${name}-${locale}`, localePath(locale, path), locale]),
    ),
    ...NOT_FOUND.map(([name, path, locale]) => [`${name}-${locale}`, path, locale]),
  ];
  const headerIssues = [];
  for (const [name, path, locale] of routes) {
    await page.goto(BASE + path, { waitUntil: "load" });
    await settle(page);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    check(`${name} @${width}: no horizontal overflow`, overflow <= 0, `${overflow}px`);
    const lang = await page.evaluate(() => document.documentElement.lang);
    if (lang !== locale) check(`${name} @${width}: html lang is ${locale}`, false, lang);
    for (const problem of await headerProblems(page)) headerIssues.push(`${name}: ${problem}`);
    await page.screenshot({ path: `${SHOTS}/${name}-${width}.png`, fullPage: true });
  }
  check(`@${width}: header controls fit without overlapping`, headerIssues.length === 0, headerIssues.join(", "));

  // The open language menu stays on screen.
  for (const locale of LOCALES) {
    await page.goto(BASE + localePath(locale, "/"), { waitUntil: "load" });
    await page.locator(".lang-trigger").click();
    const panel = await page.locator(".lang-panel").boundingBox();
    check(
      `${locale} @${width}: open language menu fits the screen`,
      panel && panel.x >= 0 && panel.x + panel.width <= width,
      JSON.stringify(panel),
    );
    if (locale === "fr") await page.screenshot({ path: `${SHOTS}/language-menu-${width}.png` });
  }

  check(`@${width}: no console errors`, errors.length === 0, errors.join(" | "));
  check(`@${width}: every asset loads (no 404s)`, missing.length === 0, [...new Set(missing)].join(", "));
  await context.close();
}

// Every page in every language: document language, metadata, language menu and links.
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await presetConsent(context, false);
  const page = await context.newPage();

  for (const locale of LOCALES) {
    const prefix = localePath(locale, "");
    for (const [name, path] of PAGES) {
      const label = `${name} (${locale})`;
      await page.goto(BASE + localePath(locale, path), { waitUntil: "load" });
      const head = await page.evaluate(() => ({
        lang: document.documentElement.lang,
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
        alternates: Object.fromEntries(
          [...document.querySelectorAll('link[rel="alternate"][hreflang]')].map((link) => [
            link.getAttribute("hreflang"),
            link.getAttribute("href"),
          ]),
        ),
      }));
      check(`${label}: html lang`, head.lang === locale, head.lang);
      check(`${label}: self-referencing canonical`, head.canonical === `${SITE_URL}${localePath(locale, path)}`, head.canonical);
      const expected = {
        ...Object.fromEntries(LOCALES.map((other) => [other, `${SITE_URL}${localePath(other, path)}`])),
        "x-default": `${SITE_URL}${path}`,
      };
      check(
        `${label}: language alternatives`,
        JSON.stringify(head.alternates) === JSON.stringify(expected),
        JSON.stringify(head.alternates),
      );

      const options = await page.$$eval(".lang-option", (links) =>
        links.map((link) => ({
          lang: link.getAttribute("hreflang"),
          href: link.getAttribute("href"),
          text: link.querySelector(".lang-option-name")?.textContent.trim(),
          current: link.getAttribute("aria-current"),
        })),
      );
      check(
        `${label}: language menu lists English, Español, Français`,
        options.map((option) => option.text).join("|") === "English|Español|Français",
        options.map((option) => option.text).join("|"),
      );
      check(
        `${label}: language links point to the same page`,
        options.every((option) => option.href === `${BASE_PATH}${localePath(option.lang, path)}`),
        JSON.stringify(options.map((option) => option.href)),
      );
      check(
        `${label}: current language is marked`,
        options.filter((option) => option.current === "true").map((option) => option.lang).join() === locale,
      );

      // Every internal link except the language menu stays in this language.
      const strays = await page.$$eval(
        "a[href]",
        (links, [basePath, prefix, locale]) =>
          links
            .filter((link) => !link.classList.contains("lang-option"))
            .map((link) => link.getAttribute("href"))
            .filter((href) => href.startsWith(`${basePath}/`))
            .filter((href) =>
              locale === "en"
                ? /^\/(es|fr)\//.test(href.slice(basePath.length))
                : !href.startsWith(`${basePath}${prefix}/`),
            ),
        [BASE_PATH, prefix, locale],
      );
      check(`${label}: internal links stay in the language`, strays.length === 0, strays.join(", "));
    }

    await page.goto(BASE + localePath(locale, "/"), { waitUntil: "load" });
    check(
      `home (${locale}): logo leads to this language's homepage`,
      (await page.locator(".site-header .wrap > a").getAttribute("href")) === `${BASE_PATH}${prefix}/`,
    );
    const ctas = await page.$$eval("main a.btn-primary, main a.btn-cloud", (links) =>
      links.map((link) => ({ href: link.getAttribute("href"), target: link.target })),
    );
    check(
      `home (${locale}): both primary CTAs lead to this language's booking page`,
      ctas.length === 2 && ctas.every((cta) => cta.href === `${BASE_PATH}${prefix}${BOOKING_ROUTE}` && !cta.target),
      JSON.stringify(ctas),
    );
  }

  // The 404 page: English HTML, localized in the browser for /es/ and /fr/.
  for (const [, path, locale] of NOT_FOUND) {
    await page.goto(BASE + path, { waitUntil: "load" });
    await page.waitForFunction((lang) => document.documentElement.lang === lang, locale, { timeout: 5000 }).catch(() => {});
    const state = await page.evaluate(() => ({
      lang: document.documentElement.lang,
      heading: document.querySelector("h1")?.textContent,
      home: document.querySelector("main a.btn-primary")?.getAttribute("href"),
      logo: document.querySelector(".site-header .wrap > a")?.getAttribute("href"),
      title: document.title,
      robots: document.querySelector('meta[name="robots"]')?.getAttribute("content"),
    }));
    const home = `${BASE_PATH}${localePath(locale, "/")}`;
    check(`404 ${path}: shown in ${locale}`, state.lang === locale, state.lang);
    check(`404 ${path}: recovery links keep the language`, state.home === home && state.logo === home, `${state.home} ${state.logo}`);
    check(`404 ${path}: not indexable`, state.robots?.includes("noindex"), state.robots);
    if (locale === "en") {
      check("404: English heading", state.heading === "This page is not part of the workflow.", state.heading);
    } else {
      check(`404 ${path}: heading translated`, state.heading && state.heading !== "This page is not part of the workflow.", state.heading);
    }
  }

  const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const expectedLocs = LOCALES.flatMap((locale) => PAGES.map(([, path]) => `${SITE_URL}${localePath(locale, path)}`));
  check(
    "sitemap lists every page in every language",
    locs.length === 15 && expectedLocs.every((loc) => locs.includes(loc)),
    `${locs.length} entries`,
  );
  await context.close();
}

// Spanish and French pages carry no English copy left over from the English page.
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const routes = [...PAGES, ["404", "/this-page-does-not-exist/"]];
  for (const [name, path] of routes) {
    // No stored choice, so the cookie banner is part of the copy checked.
    await page.goto(BASE + path, { waitUntil: "load" });
    await page.locator("section.consent").waitFor({ timeout: 5000 }).catch(() => {});
    const english = new Set(await pageCopy(page));
    for (const locale of ["es", "fr"]) {
      await page.goto(BASE + localePath(locale, path), { waitUntil: "load" });
      await page.waitForFunction((lang) => document.documentElement.lang === lang, locale, { timeout: 5000 }).catch(() => {});
      await page.locator("section.consent").waitFor({ timeout: 5000 }).catch(() => {});
      const leftovers = (await pageCopy(page)).filter(
        (text) => english.has(text) && !SAME_IN_EVERY_LANGUAGE.has(text) && !SAME_IN[locale].has(text),
      );
      check(`${name} (${locale}): no untranslated English copy`, leftovers.length === 0, leftovers.join(" | "));
    }
  }
  await context.close();
}

// Language menu: switching keeps the page, query and section; keyboard and pointer behaviour.
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await presetConsent(context, false);
  const page = await context.newPage();
  const trigger = page.locator(".lang-trigger");
  const menu = page.locator("details.lang");
  const isOpen = () => menu.evaluate((node) => node.open);

  // Every pair of languages, on every page.
  for (const [name, path] of PAGES) {
    for (const from of LOCALES) {
      for (const to of LOCALES.filter((locale) => locale !== from)) {
        await page.goto(BASE + localePath(from, path), { waitUntil: "load" });
        await trigger.click();
        await Promise.all([page.waitForURL(`${BASE}${localePath(to, path)}`), page.locator(`.lang-option[hreflang="${to}"]`).click()]);
        const lang = await page.evaluate(() => document.documentElement.lang);
        if (lang !== to) check(`${name}: ${from} → ${to} switches the page language`, false, lang);
      }
    }
  }
  check("switching between every pair of languages reaches the same page", true);

  await page.goto(`${BASE}/es/privacy/?ref=footer#cookies`, { waitUntil: "load" });
  await trigger.click();
  await page.locator('.lang-option[hreflang="fr"]').click();
  await page.waitForURL(/\/fr\/privacy\//);
  check(
    "switching keeps the query string and section",
    page.url() === `${BASE}/fr/privacy/?ref=footer#cookies`,
    page.url(),
  );

  await page.goto(`${BASE}/fr/about/?ref=ad#missing-section`, { waitUntil: "load" });
  await trigger.click();
  await page.locator('.lang-option[hreflang="en"]').click();
  await page.waitForURL(/\/about\//);
  check("switching drops an anchor that is not on the page", page.url() === `${BASE}/about/?ref=ad`, page.url());

  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.goto(`${BASE}/es/about/#%E0%A4%A`, { waitUntil: "load" });
  await trigger.click();
  await page.locator('.lang-option[hreflang="fr"]').click();
  await page.waitForURL(/\/fr\/about\//);
  check(
    "switching with a malformed anchor still works, without errors",
    page.url() === `${BASE}/fr/about/` && pageErrors.length === 0,
    `${page.url()} ${pageErrors.join(" | ")}`,
  );

  await page.goto(`${BASE}/es/about/?ref=ad`, { waitUntil: "load" });
  await trigger.click();
  await page.locator('.lang-option[hreflang="es"]').click();
  await page.waitForTimeout(300);
  check("choosing the current language leaves the page as it is", page.url() === `${BASE}/es/about/?ref=ad`, page.url());
  check("choosing the current language closes the menu", !(await isOpen()));

  // The compact EN/ES/FR button still carries the full language name for screen readers.
  for (const width of [375, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const locale of LOCALES) {
      await page.goto(BASE + localePath(locale, "/"), { waitUntil: "load" });
      const name = await trigger.evaluate((node) => node.innerText.replace(/\s+/g, " ").trim());
      check(
        `${locale} @${width}: language menu names the current language in full`,
        name.includes(LOCALE_NAMES[locale]),
        name,
      );
    }
  }
  await page.setViewportSize({ width: 1440, height: 900 });

  await page.goto(`${BASE}/fr/about/`, { waitUntil: "load" });
  await trigger.focus();
  await page.keyboard.press("Enter");
  check("language menu opens with the keyboard", await isOpen());
  await page.keyboard.press("Tab");
  check(
    "Tab moves into the language options",
    await page.evaluate(() => document.activeElement?.classList.contains("lang-option")),
  );
  await page.keyboard.press("Escape");
  check("Escape closes the language menu", !(await isOpen()));
  check(
    "Escape returns focus to the language menu button",
    await page.evaluate(() => document.activeElement?.classList.contains("lang-trigger")),
  );
  await trigger.click();
  await page.mouse.click(700, 600);
  check("clicking outside closes the language menu", !(await isOpen()));
  await context.close();
}

// Without JavaScript the language links still work; the 404 page falls back to English.
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`${BASE}/es/about/`, { waitUntil: "load" });
  await page.locator(".lang-trigger").click();
  await page.locator('.lang-option[hreflang="fr"]').click();
  await page.waitForURL(/\/fr\/about\//, { timeout: 5000 }).catch(() => {});
  check("without JavaScript, the language menu reaches the same page", page.url() === `${BASE}/fr/about/`, page.url());
  check("without JavaScript, the page is built in its language", (await page.evaluate(() => document.documentElement.lang)) === "fr");
  await page.goto(`${BASE}/fr/this-page-does-not-exist/`, { waitUntil: "load" });
  check(
    "without JavaScript, the 404 page shows the English fallback",
    (await page.evaluate(() => document.documentElement.lang)) === "en",
  );
  await context.close();
}

// Cookie choices survive a language switch.
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(`${BASE}/es/`, { waitUntil: "load" });
  const banner = page.locator("section.consent");
  await banner.waitFor({ timeout: 5000 }).catch(() => {});
  check("es: cookie banner appears on first visit", await banner.isVisible());
  await banner.locator(".consent-actions button").nth(1).click();
  const rejected = await storedConsent(page);
  check("es: rejecting is stored", rejected?.external === false);
  await page.locator(".lang-trigger").click();
  await page.locator('.lang-option[hreflang="fr"]').click();
  await page.waitForURL(/\/fr\//);
  await page.waitForTimeout(500);
  check("the stored choice is unchanged after switching language", JSON.stringify(await storedConsent(page)) === JSON.stringify(rejected));
  check("the banner stays closed after switching language", (await banner.count()) === 0);
  await page.goto(`${BASE}/fr${BOOKING_ROUTE}`, { waitUntil: "load" });
  await page.waitForTimeout(500);
  check("fr: calendar stays blocked after rejecting", (await page.locator("iframe").count()) === 0);
  await page.locator(".booking-gate button").click();
  const loadedSrc = await page.locator("iframe").first().getAttribute("src");
  check("fr: calendar loads after consenting on the booking page", loadedSrc?.startsWith(CALENDLY), loadedSrc);
  await page.goto(`${BASE}/es${BOOKING_ROUTE}`, { waitUntil: "load" });
  const frame = page.locator("iframe");
  await frame.waitFor({ timeout: 5000 }).catch(() => {});
  check("es: with consent, Calendly loads straight away", (await frame.first().getAttribute("src").catch(() => null))?.startsWith(CALENDLY));
  await page.waitForTimeout(5000);
  await page.screenshot({ path: `${SHOTS}/book-live-es-1440.png` });
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

  for (const locale of LOCALES) {
    await page.goto(BASE + localePath(locale, "/"), { waitUntil: "load" });
    await page.waitForTimeout(3600);
    await page.screenshot({ path: `${SHOTS}/hero-motion-${locale}-1440.png` });
  }

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
