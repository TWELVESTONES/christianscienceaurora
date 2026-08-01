import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const baseUrl = process.env.MOCKUP_BASE_URL || "http://127.0.0.1:3003";
const source = await fs.readFile(new URL("../content/pages.ts", import.meta.url), "utf8");
const routeMatches = [...source.matchAll(/path:\s*"([^"]+)"/g)].map((match) => match[1]);
const routes = ["/", ...routeMatches]
  .filter((route) => route !== "/admin" && !route.includes("placeholder") && !["/reading-room/cart", "/reading-room/checkout"].includes(route));
const uniqueRoutes = [...new Set(routes)];
const mobileRoutes = new Set([
  "/", "/visit", "/services", "/sermons", "/sunday-school", "/reading-room",
  "/events", "/articles", "/about", "/resources", "/give", "/contact",
]);

function filenameFor(route) {
  return route === "/" ? "home" : route.replace(/^\//, "").replaceAll("/", "--");
}

async function fetchText(url, allowNotFound = false) {
  const response = await fetch(url);
  if (!response.ok && !(allowNotFound && response.status === 404)) throw new Error(`Unable to fetch ${url}: ${response.status}`);
  return response.text();
}

async function standaloneHtml(route, allowNotFound = false) {
  let html = await fetchText(`${baseUrl}${route}`, allowNotFound);
  const cssPaths = [...html.matchAll(/<link rel="stylesheet" href="([^"]+)"[^>]*>/g)].map((match) => match[1]);
  const css = (await Promise.all(cssPaths.map((cssPath) => fetchText(`${baseUrl}${cssPath}`)))).join("\n");
  html = html
    .replace(/<link rel="stylesheet"[^>]*>/g, "")
    .replace(/<link rel="preload"[^>]*>/g, "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "")
    .replace("</head>", `<style>${css}</style></head>`);
  return html;
}

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
for (const route of uniqueRoutes) {
  const html = await standaloneHtml(route);
  const filename = filenameFor(route);
  await desktopPage.setContent(html, { waitUntil: "load" });
  await desktopPage.screenshot({ path: path.resolve("mockups/desktop", `${filename}.png`), fullPage: true });
  const title = await desktopPage.title();
  index.push({ route, title, desktop: `desktop/${filename}.png`, mobile: mobileRoutes.has(route) ? `mobile/${filename}.png` : null });
  if (mobileRoutes.has(route)) {
    await mobilePage.setContent(html, { waitUntil: "load" });
    await mobilePage.screenshot({ path: path.resolve("mockups/mobile", `${filename}.png`), fullPage: true });
  }
  console.log(`Rendered ${route}`);
}

const notFoundHtml = await standaloneHtml("/page-that-does-not-exist", true);
await desktopPage.setContent(notFoundHtml, { waitUntil: "load" });
await desktopPage.screenshot({ path: path.resolve("mockups/desktop/404.png"), fullPage: true });
index.push({ route: "404", title: await desktopPage.title(), desktop: "desktop/404.png", mobile: null });

await fs.writeFile("mockups/index.json", JSON.stringify(index, null, 2));
await fs.writeFile("mockups/README.md", [
  "# Phase 1 Public Website Mockups",
  "",
  "Generated from the working Next.js public site in production mode.",
  "",
  ...index.map((item) => `- \`${item.route}\` — ${item.title} — \`${item.desktop}\`${item.mobile ? ` — \`${item.mobile}\`` : ""}`),
  "",
].join("\n"));

await browser.close();
console.log(`Generated ${index.length} desktop mockups and ${[...mobileRoutes].filter((route) => uniqueRoutes.includes(route)).length} mobile mockups.`);
