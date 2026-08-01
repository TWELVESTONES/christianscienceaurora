import { expect, test } from "@playwright/test";

test("home exposes welcome and service times", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "You are welcome here." })).toBeVisible();
  await expect(page.getByText("Wednesday Testimony Meeting · 7:30 p.m.").first()).toBeVisible();
});

test("event calendar and annual list work", async ({ page }) => {
  await page.goto("/events");
  await expect(page.getByRole("grid", { name: "July 2026" })).toBeVisible();
  await page.getByRole("link", { name: "Year list" }).click();
  await expect(page.getByRole("heading", { name: "Events throughout the year." })).toBeVisible();
});

test("search filters results", async ({ page }) => {
  await page.goto("/search");
  await page.getByRole("searchbox").fill("Sunday School");
  await expect(page.getByRole("link", { name: "Sunday School" }).first()).toBeVisible();
});

test("contact form validates and submits in local mode", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel("Name *").fill("Test Visitor");
  await page.getByLabel("Email *").fill("visitor@example.com");
  await page.getByLabel("Message *").fill("I would like to confirm the Sunday service time.");
  await page.getByRole("button", { name: "Send Message" }).click();
  await expect(page.getByRole("status")).toContainText("Thank you");
});

test("unknown page renders 404", async ({ page }) => {
  await page.goto("/not-a-real-page");
  await expect(page.getByRole("heading", { name: "This page could not be found." })).toBeVisible();
});
