import { describe, expect, it } from "vitest";
import { filterPublicEvents, filterPublicProducts, filterPublicSermons } from "@/content/public-data";
import { events, products, sermons } from "@/content/data";
import { isPublicPagePath, preparePageForPublic } from "@/lib/public-page";

const publicMode = process.env.NEXT_PUBLIC_CONTENT_REVIEW_MODE !== "true";

describe("public content safeguards", () => {
  it("never exposes the admin route as a public page", () => {
    expect(isPublicPagePath("/admin")).toBe(false);
  });

  it("hides placeholder routes in public mode", () => {
    if (publicMode) expect(isPublicPagePath("/events/public-talk-placeholder")).toBe(false);
  });

  it("filters unapproved sermons and products in public mode", () => {
    if (publicMode) {
      expect(filterPublicSermons(sermons)).toHaveLength(0);
      expect(filterPublicProducts(products)).toHaveLength(0);
    }
  });

  it("filters the unconfirmed event while retaining verified recurring services", () => {
    if (publicMode) {
      const filtered = filterPublicEvents(events);
      expect(filtered.map((event) => event.slug)).toEqual([
        "sunday-service-july-19-2026",
        "wednesday-testimony-meeting-july-22-2026",
      ]);
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
