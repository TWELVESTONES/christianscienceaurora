import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { middleware } from "../../middleware";

const ORIGIN = "https://christianscienceaurora.com";

function request(pathname: string) {
  return new NextRequest(`${ORIGIN}${pathname}`);
}

describe("combined Cluster 2 + Cluster 3 + Cluster 4 middleware routing", () => {
  const redirects = [
    ["/christian-science", "/christian-science/"],
    ["/christian-science/beliefs", "/christian-science/beliefs/"],
    ["/christian-science/god", "/christian-science/god/"],
    ["/christian-science/jesus-christ", "/christian-science/jesus-christ/"],
    ["/about/christian-science", "/christian-science/"],
    ["/about/christian-science/", "/christian-science/"],
    ["/about/", "/about"],
    ["/visit/", "/visit"],
    ["/services/", "/services"],
  ] as const;

  it.each(redirects)("redirects %s exactly once to %s", (source, destination) => {
    const response = middleware(request(source));
    const location = response.headers.get("location");

    expect(response.status).toBe(308);
    expect(location).toBe(`${ORIGIN}${destination}`);
    expect(location).not.toBe(`${ORIGIN}${source}`);
  });

  it.each([
    "/christian-science/",
    "/christian-science/beliefs/",
    "/christian-science/god/",
    "/christian-science/jesus-christ/",
  ] as const)("does not redirect approved canonical %s", (pathname) => {
    const response = middleware(request(pathname));
    expect(response.headers.get("location")).toBeNull();
  });
});
