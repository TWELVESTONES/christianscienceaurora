import { expect, test } from "@playwright/test";

const canonicalPaths = [
  "/christian-science/",
  "/christian-science/beliefs/",
  "/christian-science/god/",
  "/christian-science/jesus-christ/",
] as const;

const representativePaths = [
  "/",
  "/visit",
  "/visit/directions-parking",
  "/services",
  "/services/sunday",
  "/services/wednesday",
  "/reading-room",
  "/resources",
  "/about",
  "/events",
  "/give",
  "/contact",
  ...canonicalPaths,
] as const;

test("Cluster 2, 3, and 4 canonicals are direct 200", async ({ request }) => {
  for (const path of canonicalPaths) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status(), path).toBe(200);
    expect(response.headers()["location"], `${path} must be direct`).toBeUndefined();
  }
});

test("all authority slashless forms redirect once to their approved slashful canonical", async ({ request }) => {
  for (const [source, destination] of [
    ["/christian-science", "/christian-science/"],
    ["/christian-science/beliefs", "/christian-science/beliefs/"],
    ["/christian-science/god", "/christian-science/god/"],
    ["/christian-science/jesus-christ", "/christian-science/jesus-christ/"],
  ] as const) {
    const response = await request.get(source, { maxRedirects: 0 });
    expect(response.status(), source).toBe(308);
    const location = response.headers()["location"];
    expect(location).toBeTruthy();
    expect(new URL(location, "http://127.0.0.1:3000").pathname).toBe(destination);
    expect(new URL(location, "http://127.0.0.1:3000").pathname).not.toBe(source);
    const finalResponse = await request.get(destination, { maxRedirects: 0 });
    expect(finalResponse.status(), `${destination} final target`).toBe(200);
    expect(finalResponse.headers()["location"], `${destination} must not redirect again`).toBeUndefined();
  }
});

test("removed Christian Science competitor redirects in one hop", async ({ request }) => {
  for (const source of ["/about/christian-science", "/about/christian-science/"] as const) {
    const response = await request.get(source, { maxRedirects: 0 });
    expect(response.status(), source).toBe(308);
    const location = response.headers()["location"];
    expect(location).toBeTruthy();
    expect(new URL(location, "http://127.0.0.1:3000").pathname).toBe("/christian-science/");
    const finalResponse = await request.get("/christian-science/", { maxRedirects: 0 });
    expect(finalResponse.status()).toBe(200);
    expect(finalResponse.headers()["location"]).toBeUndefined();
  }
});

test("unrelated production trailing-slash behavior remains unchanged", async ({ request }) => {
  for (const [source, destination] of [
    ["/about/", "/about"],
    ["/visit/", "/visit"],
    ["/services/", "/services"],
  ] as const) {
    const response = await request.get(source, { maxRedirects: 0 });
    expect(response.status(), source).toBe(308);
    const location = response.headers()["location"];
    expect(location).toBeTruthy();
    expect(new URL(location, "http://127.0.0.1:3000").pathname).toBe(destination);
    const finalResponse = await request.get(destination, { maxRedirects: 0 });
    expect(finalResponse.status(), `${destination} final target`).toBe(200);
    expect(finalResponse.headers()["location"], `${destination} must be direct`).toBeUndefined();
  }
});

test("Cluster 4 metadata and schema use the approved canonical", async ({ page }) => {
  await page.goto("/christian-science/jesus-christ/");
  const absolute = "https://christianscienceaurora.com/christian-science/jesus-christ/";
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", absolute);
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", absolute);
  const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
  const combined = jsonLd.join("\n");
  expect(combined).toContain('"@type":"WebPage"');
  expect(combined).toContain(absolute);
  expect(combined).toContain('"@type":"BreadcrumbList"');
  expect(combined).toContain('"@type":"FAQPage"');
  expect(combined).not.toContain('"@type":"Article"');
});

test("Cluster 3 remains functional and registered", async ({ page }) => {
  await page.goto("/christian-science/god/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("God");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://christianscienceaurora.com/christian-science/god/",
  );
});

test("representative production routes remain operational", async ({ request }) => {
  for (const path of representativePaths) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status(), path).toBe(200);
  }
});

test("Cluster 4 does not introduce analytics or tracker markup", async ({ page }) => {
  await page.goto("/christian-science/jesus-christ/");
  const html = (await page.content()).toLowerCase();
  for (const marker of ["google-analytics", "googletagmanager", "gtag(", "plausible.io", "segment.com", "sentry.io"]) {
    expect(html, `unexpected tracker marker ${marker}`).not.toContain(marker);
  }
});
