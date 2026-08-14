import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { middleware } from "../../middleware";

const ORIGIN = "https://christianscienceaurora.com";

function request(pathname: string) {
  return new NextRequest(`${ORIGIN}${pathname}`);
}

describe("Cluster 3 canonical routing", () => {
  it("redirects the slashless God URL exactly once to its trailing-slash canonical", () => {
    const response = middleware(request("/christian-science/god"));
    expect(response.status).toBe(308);
    expect(response.headers.get("location")).toBe(`${ORIGIN}/christian-science/god/`);
    expect(response.headers.get("location")).not.toBe(`${ORIGIN}/christian-science/god`);
  });

  it("keeps the approved God canonical as a direct route", () => {
    const response = middleware(request("/christian-science/god/"));
    expect(response.headers.get("location")).toBeNull();
  });

  it.each([
    ["/christian-science", "/christian-science/"],
    ["/christian-science/beliefs", "/christian-science/beliefs/"],
    ["/about/", "/about"],
    ["/visit/", "/visit"],
    ["/services/", "/services"],
  ] as const)("preserves existing routing for %s", (source, destination) => {
    const response = middleware(request(source));
    expect(response.status).toBe(308);
    expect(response.headers.get("location")).toBe(`${ORIGIN}${destination}`);
    expect(response.headers.get("location")).not.toBe(`${ORIGIN}${source}`);
  });
});
