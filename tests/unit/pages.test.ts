import { describe, expect, it } from "vitest";
import { allPublicPaths, pageDefinitions, pageMap } from "@/content/pages";

describe("page inventory", () => {
  it("has unique routes", () => expect(new Set(allPublicPaths).size).toBe(allPublicPaths.length));
  it("maps every page definition", () => {
    for (const page of pageDefinitions) expect(pageMap.get(page.path)?.title).toBe(page.title);
  });
  it("includes critical required routes", () => {
    for (const path of ["/visit", "/services/sunday", "/sermons", "/sunday-school", "/reading-room/shop", "/events", "/articles", "/about/christian-science", "/resources", "/give", "/privacy", "/content-permissions"]) expect(pageMap.has(path)).toBe(true);
  });
});
