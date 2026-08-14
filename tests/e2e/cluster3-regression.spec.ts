import { expect, test } from "@playwright/test";

const canonicalPath = "/christian-science/god/";

test("Cluster 3 canonical is a direct 200 and slashless form redirects once", async ({ request }) => {
  const canonical = await request.get(canonicalPath, { maxRedirects: 0 });
  expect(canonical.status()).toBe(200);
  expect(canonical.headers()["location"]).toBeUndefined();

  const slashless = await request.get("/christian-science/god", { maxRedirects: 0 });
  expect(slashless.status()).toBe(308);
  const location = slashless.headers()["location"];
  expect(location).toBeTruthy();
  expect(new URL(location, "http://127.0.0.1:3000").pathname).toBe(canonicalPath);

  const final = await request.get(canonicalPath, { maxRedirects: 0 });
  expect(final.status()).toBe(200);
  expect(final.headers()["location"]).toBeUndefined();
});

test("Cluster 3 metadata and structured data use the direct canonical", async ({ page }) => {
  await page.goto(canonicalPath);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://christianscienceaurora.com/christian-science/god/",
  );
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    "content",
    "https://christianscienceaurora.com/christian-science/god/",
  );

  const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
  const schemas = jsonLd.flatMap((text) => {
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? parsed : [parsed];
  });
  expect(schemas.some((item) => item["@type"] === "WebPage" && item.url === "https://christianscienceaurora.com/christian-science/god/")).toBe(true);
  expect(schemas.some((item) => item["@type"] === "BreadcrumbList")).toBe(true);
  expect(schemas.some((item) => item["@type"] === "FAQPage")).toBe(true);
  expect(schemas.some((item) => item["@type"] === "Article")).toBe(false);
});

test("Cluster 3 page has one H1, unique IDs, working internal links, and no tracker markup", async ({ page, request }) => {
  await page.goto(canonicalPath);
  await expect(page.locator("h1")).toHaveCount(1);

  const ids = await page.locator("[id]").evaluateAll((els) => els.map((el) => el.id).filter(Boolean));
  expect(new Set(ids).size).toBe(ids.length);

  const hrefs = await page.locator("main a[href]").evaluateAll((els) =>
    els.map((el) => (el as HTMLAnchorElement).getAttribute("href") || ""),
  );
  for (const href of hrefs) {
    expect(href.toLowerCase()).not.toMatch(/^javascript:/);
    if (href.startsWith("/")) {
      const response = await request.get(href, { maxRedirects: 1 });
      expect(response.status(), href).toBeLessThan(400);
    }
  }

  const html = (await page.content()).toLowerCase();
  for (const marker of ["google-analytics", "googletagmanager", "gtag(", "plausible.io", "segment.com", "sentry.io"]) {
    expect(html).not.toContain(marker);
  }
});

test("Cluster 2 links into the new God pillar", async ({ page }) => {
  await page.goto("/christian-science/");
  await expect(page.getByRole("link", { name: "Explore God in Christian Science" })).toHaveAttribute("href", canonicalPath);
});
