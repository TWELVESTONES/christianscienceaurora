import { describe, expect, it } from "vitest";
import { filterPublicEvents, filterPublicProducts, filterPublicSermons } from "@/content/public-data";
import { events, products, sermons } from "@/content/data";
import { isPublicPagePath, preparePageForPublic } from "@/lib/public-page";
import type { EventItem } from "@/lib/types";

const publicMode = process.env.NEXT_PUBLIC_CONTENT_REVIEW_MODE !== "true";

describe("public content safeguards", () => {
  it("never exposes the admin route as a public page", () => {
    expect(isPublicPagePath("/admin")).toBe(false);
  });

  it("hides placeholder routes in public mode", () => {
    if (publicMode) expect(isPublicPagePath("/events/public-talk-placeholder")).toBe(false);
  });

  it("filters unapproved sermons and products in public mode, while publishing approved ones", () => {
    if (publicMode) {
      const publicSermonSlugs = filterPublicSermons(sermons).map((sermon) => sermon.slug);
      expect(publicSermonSlugs).toEqual(["a-grateful-heart", "god-will-supply"]);
      expect(publicSermonSlugs).not.toContain("peace-through-prayer-placeholder");
      expect(publicSermonSlugs).not.toContain("discovering-hope-placeholder");
      expect(publicSermonSlugs).not.toContain("god-love-placeholder");
      expect(filterPublicProducts(products)).toHaveLength(0);
    }
  });

  it("publishes all confirmed events currently in content/data.ts", () => {
    if (publicMode) {
      const filtered = filterPublicEvents(events);
      expect(filtered.map((event) => event.slug)).toEqual([
        "sunday-service-july-19-2026",
        "wednesday-testimony-meeting-july-22-2026",
        "god-is-relevant-lecture-october-2026",
      ]);
    }
  });

  it("filters an unconfirmed event carrying an internal marker while retaining verified events", () => {
    if (publicMode) {
      const unconfirmedEvent: EventItem = {
        slug: "unconfirmed-placeholder-event",
        title: "Public Talk — Church Confirmation Required",
        summary: "Campaign-ready event placeholder. Replace with an approved title, speaker, date, and permissions record.",
        category: "Talk",
        start: "2026-09-20T14:00:00-06:00",
        end: "2026-09-20T15:00:00-06:00",
        timezone: "America/Denver",
        location: "Location pending church confirmation",
        status: "scheduled",
      };
      const filtered = filterPublicEvents([...events, unconfirmedEvent]);
      expect(filtered.map((event) => event.slug)).not.toContain("unconfirmed-placeholder-event");
      expect(filtered).toHaveLength(events.length);
    }
  });

  it("removes internal confirmation registers from public page output", () => {
    const prepared = preparePageForPublic({
      path: "/test",
      title: "Test",
      description: "Test page description",
      sections: [],
      churchConfirmation: ["Internal item"],
    });
    if (publicMode) expect(prepared?.churchConfirmation).toBeUndefined();
  });
});
