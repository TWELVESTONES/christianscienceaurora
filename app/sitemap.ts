import type { MetadataRoute } from "next";
import { allPublicPaths, pageMap } from "@/content/pages";
import { site } from "@/content/site";
import { isPublicPagePath } from "@/lib/public-page";

export default function sitemap(): MetadataRoute.Sitemap {
  return allPublicPaths
    .filter(isPublicPagePath)
    .map((path) => ({
      url: `${site.domain}${pageMap.get(path)?.canonicalPath ?? path}`,
      lastModified: new Date("2026-07-15"),
      changeFrequency: path === "/events" ? "weekly" : "monthly",
      priority: path === "/" ? 1 : .7,
    }));
}
