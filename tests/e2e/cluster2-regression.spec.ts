import { expect, test } from "@playwright/test";

const representativePaths = [
  "/",
  "/visit",
  "/visit/directions-parking",
  "/visit/what-to-expect",
  "/services",
  "/services/sunday",
  "/services/wednesday",
  "/services/weekly-bible-lesson",
  "/reading-room",
  "/resources",
  "/about",
  "/events",
  "/contact",
  "/give",
  "/search",
  "/christian-science/",
  "/christian-science/beliefs/",
];

test("Cluster 2 canonicals are direct 200 and slashless variants redirect once", async ({ request }) => {
  for (const path of ["/christian-science/", "/christian-science/beliefs/"]) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status(), path).toBe(200);
    expect(response.headers()["location"], `${path} must be direct`).toBeUndefined();
  }

  for (const [source, destination] of [
    ["/christian-science", "/christian-science/"],
    ["/christian-science/beliefs", "/christian-science/beliefs/"],
    ["/about/christian-science", "/christian-science/"],
    ["/about/christian-science/", "/christian-science/"],
  ] as const) {
    const response = await request.get(source, { maxRedirects: 0 });
    expect(response.status(), source).toBe(308);
    const location = response.headers()["location"];
    expect(location, `${source} must emit a Location header`).toBeTruthy();
    expect(new URL(location, "http://127.0.0.1:3000").pathname).toBe(destination);
    expect(new URL(location, "http://127.0.0.1:3000").pathname).not.toBe(source);
    const finalResponse = await request.get(destination, { maxRedirects: 0 });
    expect(finalResponse.status(), `${destination} final target`).toBe(200);
    expect(finalResponse.headers()["location"], `${destination} must not redirect again`).toBeUndefined();
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
    expect(location, `${source} must emit a Location header`).toBeTruthy();
    expect(new URL(location, "http://127.0.0.1:3000").pathname).toBe(destination);
    expect(new URL(location, "http://127.0.0.1:3000").pathname).not.toBe(source);
    const finalResponse = await request.get(destination, { maxRedirects: 0 });
    expect(finalResponse.status(), `${destination} final target`).toBe(200);
    expect(finalResponse.headers()["location"], `${destination} must not redirect again`).toBeUndefined();
  }
});

test("representative production routes remain direct pages", async ({ request }) => {
  for (const path of representativePaths) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status(), path).toBe(200);
  }
});

test("giving page links remain usable and do not use script URLs", async ({ page, request }) => {
  await page.goto("/give");
  const hrefs = await page.locator("main a[href]").evaluateAll((links) =>
    links.map((link) => (link as HTMLAnchorElement).getAttribute("href") || "")
  );
  expect(hrefs.length).toBeGreaterThan(0);
  for (const href of hrefs) {
    expect(href.toLowerCase()).not.toMatch(/^javascript:/);
    if (href.startsWith("/")) {
      const response = await request.get(href, { maxRedirects: 1 });
      expect(response.status(), href).toBeLessThan(400);
    }
  }
});

test("Cluster 2 uses the shared production header and footer", async ({ page, isMobile }) => {
  await page.goto("/christian-science/");
  await expect(page.getByRole("link", { name: "Christian Science Aurora home" }).first()).toBeVisible();
  if (isMobile) {
    // The primary nav is collapsed behind the mobile menu trigger below this breakpoint;
    // opening it is covered separately by the keyboard-navigation test.
    await expect(page.getByRole("button", { name: "Open navigation menu" }).or(page.locator("summary.mobile-menu-trigger"))).toBeVisible();
  } else {
    await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
  }
  await expect(page.getByText("Wednesday Testimony Meeting · 7:30 p.m.").first()).toBeVisible();
  await expect(page.locator("footer.site-footer")).toBeVisible();
});

test("mobile navigation opens by keyboard and tabs to its first link", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto("/christian-science/");

  const details = page.locator("details.mobile-menu");
  const summary = details.locator("summary.mobile-menu-trigger");
  const firstLink = details.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link").first();

  expect(await details.evaluate((el) => (el as HTMLDetailsElement).open)).toBe(false);
  await summary.focus();
  await summary.press("Enter");
  expect(await details.evaluate((el) => (el as HTMLDetailsElement).open)).toBe(true);
  await page.keyboard.press("Tab");
  expect(await firstLink.evaluate((el) => document.activeElement === el)).toBe(true);

  const focus = await firstLink.evaluate((el) => {
    const style = getComputedStyle(el);
    return { outlineStyle: style.outlineStyle, outlineWidth: style.outlineWidth, boxShadow: style.boxShadow };
  });
  expect(focus.outlineStyle).not.toBe("none");
  expect(focus.outlineWidth).not.toBe("0px");
  expect(focus.boxShadow).not.toBe("none");
});

test("Cluster 2 pages do not introduce analytics or tracker markup", async ({ page }) => {
  for (const path of ["/christian-science/", "/christian-science/beliefs/"]) {
    await page.goto(path);
    const html = (await page.content()).toLowerCase();
    for (const marker of ["google-analytics", "googletagmanager", "gtag(", "plausible.io", "segment.com", "sentry.io"]) {
      expect(html, `${path} unexpectedly contains ${marker}`).not.toContain(marker);
    }
  }
});
