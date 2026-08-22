import { readFileSync } from "node:fs";
import path from "node:path";
import { pageDefinitions } from "@/content/pages";
import { articles, events, externalResources, products, sermons, sundaySchoolResources } from "@/content/data";
import type {
  ArticleItem,
  EventItem,
  ExternalResource,
  PageDefinition,
  ProductItem,
  SermonItem,
  SundaySchoolResource,
} from "@/lib/types";

export interface CmsAdapter {
  getPage(path: string): Promise<PageDefinition | null>;
  /** Every public page path this adapter knows about — the CMS-driven route
   * inventory used by generateStaticParams/sitemap so every route is
   * prerendered at build time (see app/[...slug]/page.tsx and app/sitemap.ts). */
  listPages(): Promise<PageDefinition[]>;
  listEvents(): Promise<EventItem[]>;
  getEvent(slug: string): Promise<EventItem | null>;
  listSermons(): Promise<SermonItem[]>;
  getSermon(slug: string): Promise<SermonItem | null>;
  listArticles(): Promise<ArticleItem[]>;
  getArticle(slug: string): Promise<ArticleItem | null>;
  listProducts(): Promise<ProductItem[]>;
  getProduct(slug: string): Promise<ProductItem | null>;
  listSundaySchoolResources(): Promise<SundaySchoolResource[]>;
  getSundaySchoolResource(slug: string): Promise<SundaySchoolResource | null>;
  listExternalResources(): Promise<ExternalResource[]>;
}

// The original local/TypeScript-content adapter. Kept fully working — this is
// also the CMS_PROVIDER=local revert path (see createCmsAdapter below).
class LocalCmsAdapter implements CmsAdapter {
  async getPage(path: string) { return pageDefinitions.find((page) => page.path === path) ?? null; }
  async listPages() { return pageDefinitions; }
  async listEvents() { return events; }
  async getEvent(slug: string) { return events.find((item) => item.slug === slug) ?? null; }
  async listSermons() { return sermons; }
  async getSermon(slug: string) { return sermons.find((item) => item.slug === slug) ?? null; }
  async listArticles() { return articles; }
  async getArticle(slug: string) { return articles.find((item) => item.slug === slug) ?? null; }
  async listProducts() { return products; }
  async getProduct(slug: string) { return products.find((item) => item.slug === slug) ?? null; }
  async listSundaySchoolResources() { return sundaySchoolResources; }
  async getSundaySchoolResource(slug: string) { return sundaySchoolResources.find((item) => item.slug === slug) ?? null; }
  async listExternalResources() { return externalResources; }
}

// Reads the static JSON that scripts/fetch-cms-content.mjs writes to
// content/generated/*.json as the "prebuild" step (see package.json) — never
// a live `fetch` at request or build-render time. This keeps the whole site
// 100% prerendered: by the time any of these methods run (during `next
// build`'s Node.js static-generation pass — never at Cloudflare Workers
// runtime, since every route is covered by generateStaticParams), the CMS
// has already been read once, up front, and everything after that is a
// local file read.
//
// Deliberately NOT a static `import … from "@/content/generated/x.json"`:
// content/generated/ does not exist on a fresh checkout until prebuild has
// run, and a static/dynamic import of a JSON path is resolved by TypeScript
// at type-check time (resolveJsonModule) regardless of whether the method
// that uses it is ever called — that would break `tsc --noEmit` and
// `vitest run` on a checkout that has not run the CMS fetch yet, which must
// stay possible (typecheck/lint/test do not require network access). A
// plain `node:fs` read is invisible to TypeScript's module resolution and
// only touches disk when a method actually runs.
const GENERATED_DIR = path.join(process.cwd(), "content", "generated");
const fileCache = new Map<string, unknown>();

function readGenerated<T>(name: string): T {
  const cached = fileCache.get(name);
  if (cached !== undefined) return cached as T;
  const filePath = path.join(GENERATED_DIR, name);
  let raw: string;
  try {
    raw = readFileSync(filePath, "utf-8");
  } catch {
    throw new Error(
      `CMS_PROVIDER=generated but content/generated/${name} does not exist. Run "node scripts/fetch-cms-content.mjs" ` +
        `(wired as the "prebuild" npm script, so "npm run build" runs it automatically) before building, or set ` +
        `CMS_PROVIDER=local to build from the static TypeScript content instead.`,
    );
  }
  const parsed = JSON.parse(raw) as T;
  fileCache.set(name, parsed);
  return parsed;
}

class GeneratedCmsAdapter implements CmsAdapter {
  async getPage(pagePath: string) {
    const pages = readGenerated<PageDefinition[]>("pages.json");
    return pages.find((page) => page.path === pagePath) ?? null;
  }
  async listPages() { return readGenerated<PageDefinition[]>("pages.json"); }
  async listEvents() { return readGenerated<EventItem[]>("events.json"); }
  async getEvent(slug: string) { return (await this.listEvents()).find((item) => item.slug === slug) ?? null; }
  async listSermons() { return readGenerated<SermonItem[]>("sermons.json"); }
  async getSermon(slug: string) { return (await this.listSermons()).find((item) => item.slug === slug) ?? null; }
  async listArticles() { return readGenerated<ArticleItem[]>("articles.json"); }
  async getArticle(slug: string) { return (await this.listArticles()).find((item) => item.slug === slug) ?? null; }
  async listProducts() { return readGenerated<ProductItem[]>("products.json"); }
  async getProduct(slug: string) { return (await this.listProducts()).find((item) => item.slug === slug) ?? null; }
  async listSundaySchoolResources() { return readGenerated<SundaySchoolResource[]>("sunday-school-resources.json"); }
  async getSundaySchoolResource(slug: string) {
    return (await this.listSundaySchoolResources()).find((item) => item.slug === slug) ?? null;
  }
  async listExternalResources() { return readGenerated<ExternalResource[]>("external-resources.json"); }
}

function createCmsAdapter(): CmsAdapter {
  // REVERT: change this default back to "local" (one line) to build entirely
  // from the static TypeScript content again, or set the CMS_PROVIDER=local
  // environment variable in the build environment without touching code.
  const provider = process.env.CMS_PROVIDER ?? "generated";
  if (provider === "generated") return new GeneratedCmsAdapter();
  return new LocalCmsAdapter();
}

export const cmsAdapter: CmsAdapter = createCmsAdapter();
