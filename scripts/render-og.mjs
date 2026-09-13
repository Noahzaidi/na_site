// Renders the social preview (public/og.jpg) and the Apple touch icon
// (public/apple-touch-icon.png) from the approved vector assets.
// Run with `npm run og` after changing the headline or brand assets.
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = new URL("../", import.meta.url);
const file = (path) => fileURLToPath(new URL(path, root));
const svgDataUri = async (path) =>
  `data:image/svg+xml;base64,${(await readFile(file(path))).toString("base64")}`;

const lockup = await svgDataUri("public/assets/noahark-lockup-horizontal.svg");
const favicon = await svgDataUri("public/favicon.svg");

const ogHtml = `<!doctype html>
<html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600&display=block" rel="stylesheet">
<style>
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; overflow: hidden; background: #0b0f1a; color: #f8fafc;
    font-family: Inter, system-ui, sans-serif; position: relative; }
  .grid { position: absolute; inset: 0;
    background-image: linear-gradient(to right, rgb(248 250 252 / .06) 1px, transparent 1px),
      linear-gradient(to bottom, rgb(248 250 252 / .06) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse 60% 70% at 78% 30%, #000 10%, transparent 70%); }
  .haze { position: absolute; inset: auto 0 0 0; height: 70%;
    background: radial-gradient(60% 60% at 50% 100%, rgb(37 99 235 / .22), transparent 70%); }
  .horizon { position: absolute; left: 50%; bottom: 0; width: 1900px; aspect-ratio: 3.2 / 1;
    border-radius: 50%; transform: translate(-50%, 84%);
    background: radial-gradient(ellipse 55% 30% at 50% 0%, rgb(59 130 246 / .3), transparent 70%), #0b0f1a;
    box-shadow: 0 -1px 0 0 rgb(147 197 253 / .7), 0 -10px 40px -6px rgb(59 130 246 / .6),
      0 -50px 150px -30px rgb(34 211 238 / .3), inset 0 16px 36px -20px rgb(147 197 253 / .5); }
  .content { position: absolute; left: 80px; top: 72px; right: 80px; }
  .lockup { height: 64px; display: block; }
  h1 { margin-top: 64px; max-width: 900px; font-size: 62px; line-height: 1.05; font-weight: 600;
    letter-spacing: -0.035em; }
  .foot { position: absolute; left: 80px; right: 80px; bottom: 58px; display: flex;
    justify-content: space-between; font-size: 20px; font-weight: 500; letter-spacing: .18em;
    text-transform: uppercase; color: rgb(248 250 252 / .7); }
  .foot b { color: #22d3ee; font-weight: 500; }
</style></head>
<body>
  <div class="grid"></div><div class="haze"></div><div class="horizon"></div>
  <div class="content">
    <img class="lockup" src="${lockup}" alt="">
    <h1>We build specialised AI agents and put them to work in your business.</h1>
  </div>
  <div class="foot"><span>Invoices · Purchase orders · Shared inboxes</span><b>noahark.org</b></div>
</body></html>`;

const iconHtml = `<!doctype html><html><head><style>
  * { margin: 0; } body { width: 180px; height: 180px; background: #0b0f1a; display: grid; place-items: center; }
  img { width: 180px; height: 180px; }
</style></head><body><img src="${favicon}" alt=""></body></html>`;

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.setContent(ogHtml, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: file("public/og.jpg"), type: "jpeg", quality: 90 });

  await page.setViewportSize({ width: 180, height: 180 });
  await page.setContent(iconHtml, { waitUntil: "load" });
  await page.screenshot({ path: file("public/apple-touch-icon.png") });
} finally {
  await browser.close();
}

console.log("Wrote public/og.jpg and public/apple-touch-icon.png");
