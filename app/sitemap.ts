import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { cmsAdapter } from "@/lib/adapters/cms";
import { listAllPublicPaths } from "@/lib/all-paths";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paths = ["/", ...await listAllPublicPaths()];
  const pages = await cmsAdapter.listPages();
  const canonicalByPath = new Map(pages.map((page) => [page.path, page.canonicalPath]));
  return paths.map((path) => ({
    url: `${site.domain}${canonicalByPath.get(path) ?? path}`,
    lastModified: new Date("2026-07-15"),
    changeFrequency: path === "/events" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : .7,
  }));
}
