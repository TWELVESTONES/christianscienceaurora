import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const baseUrl = process.env.MOCKUP_BASE_URL || "http://127.0.0.1:3004";
const routes = [
  "/sermons/peace-through-prayer-placeholder",
  "/events/public-talk-placeholder",
  "/reading-room/shop/science-and-health-placeholder",
  "/reading-room/cart",
  "/reading-room/checkout",
];

function filenameFor(route) {
  return route.replace(/^\//, "").replaceAll("/", "--");
}

async function fetchText(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Unable to fetch ${url}: ${response.status}`);
  return response.text();
}

async function standaloneHtml(route) {
  let html = await fetchText(`${baseUrl}${route}`);
  const cssPaths = [...html.matchAll(/<link rel="stylesheet" href="([^"]+)"[^>]*>/g)].map((match) => match[1]);
  const css = (await Promise.all(cssPaths.map((cssPath) => fetchText(`${baseUrl}${cssPath}`)))).join("\n");
  return html
    .replace(/<link rel="stylesheet"[^>]*>/g, "")
    .replace(/<link rel="preload"[^>]*>/g, "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "")
    .replace("</head>", `<style>${css}</style></head>`);
}

await fs.mkdir("mockups/template-review/desktop", { recursive: true });
await fs.mkdir("mockups/template-review/mobile", { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: "/usr/bin/chromium",
  args: ["--no-sandbox"],
});
const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
await desktopPage.emulateMedia({ media: "screen", reducedMotion: "reduce" });
await mobilePage.emulateMedia({ media: "screen", reducedMotion: "reduce" });

const index = [];
for (const route of routes) {
  const html = await standaloneHtml(route);
  const filename = filenameFor(route);
  await desktopPage.setContent(html, { waitUntil: "load" });
  await desktopPage.screenshot({ path: path.resolve("mockups/template-review/desktop", `${filename}.png`), fullPage: true });
  await mobilePage.setContent(html, { waitUntil: "load" });
  await mobilePage.screenshot({ path: path.resolve("mockups/template-review/mobile", `${filename}.png`), fullPage: true });
  index.push({
    route,
    title: await desktopPage.title(),
    desktop: `template-review/desktop/${filename}.png`,
    mobile: `template-review/mobile/${filename}.png`,
    status: "Design template only - hidden from public mode until approved or activated",
  });
  console.log(`Rendered review template ${route}`);
}

await fs.writeFile("mockups/template-review/index.json", JSON.stringify(index, null, 2));
await fs.writeFile("mockups/template-review/README.md", [
  "# Phase 1 Review-Mode Page Templates",
  "",
  "These mockups document required public-facing templates that are intentionally hidden or disabled in production-safe public mode until content, permissions, or providers are approved.",
  "",
  ...index.map((item) => `- \`${item.route}\` - ${item.title} - \`${item.desktop}\` - \`${item.mobile}\``),
  "",
].join("\n"));

await browser.close();
console.log(`Generated ${index.length} desktop and ${index.length} mobile review-template mockups.`);
