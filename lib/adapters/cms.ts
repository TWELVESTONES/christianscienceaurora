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
import {
  articleSchema,
  eventSchema,
  externalResourceSchema,
  pageDefinitionSchema,
  productSchema,
  sermonSchema,
  sundaySchoolResourceSchema,
} from "@/lib/schemas";
import type { z } from "zod";

export interface CmsAdapter {
  getPage(path: string): Promise<PageDefinition | null>;
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

class LocalCmsAdapter implements CmsAdapter {
  async getPage(path: string) { return pageDefinitions.find((page) => page.path === path) ?? null; }
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

type SchemaLike<T> = z.ZodType<T>;

type CollectionPayload = { docs?: unknown[]; data?: unknown[] } | unknown[];

class PayloadRestCmsAdapter implements CmsAdapter {
  private readonly baseUrl: string;
  private readonly token?: string;

  constructor(baseUrl: string, token?: string) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.token = token;
  }

  private async request(path: string, tag: string): Promise<unknown> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      headers: this.token ? { Authorization: `Bearer ${this.token}` } : undefined,
      next: { revalidate: 300, tags: [`cms:${tag}`] },
    });
    if (!response.ok) throw new Error(`CMS request failed (${response.status}) for ${tag}.`);
    return response.json();
  }

  private unpack(payload: CollectionPayload): unknown[] {
    if (Array.isArray(payload)) return payload;
    if (payload && typeof payload === "object") {
      const record = payload as { docs?: unknown[]; data?: unknown[] };
      if (Array.isArray(record.docs)) return record.docs;
      if (Array.isArray(record.data)) return record.data;
    }
    return [];
  }

  private async list<T>(collection: string, schema: SchemaLike<T>): Promise<T[]> {
    const payload = await this.request(`/api/${collection}?limit=100&depth=2`, collection) as CollectionPayload;
    return this.unpack(payload).map((item) => schema.parse(item));
  }

  private async one<T>(collection: string, field: string, value: string, schema: SchemaLike<T>): Promise<T | null> {
    const query = encodeURIComponent(value);
    const payload = await this.request(`/api/${collection}?where[${field}][equals]=${query}&limit=1&depth=2`, `${collection}:${value}`) as CollectionPayload;
    const first = this.unpack(payload)[0];
    return first ? schema.parse(first) : null;
  }

  async getPage(path: string) { return this.one("pages", "path", path, pageDefinitionSchema); }
  async listEvents() { return this.list("events", eventSchema); }
  async getEvent(slug: string) { return this.one("events", "slug", slug, eventSchema); }
  async listSermons() { return this.list("sermons", sermonSchema); }
  async getSermon(slug: string) { return this.one("sermons", "slug", slug, sermonSchema); }
  async listArticles() { return this.list("articles", articleSchema); }
  async getArticle(slug: string) { return this.one("articles", "slug", slug, articleSchema); }
  async listProducts() { return this.list("products", productSchema); }
  async getProduct(slug: string) { return this.one("products", "slug", slug, productSchema); }
  async listSundaySchoolResources() { return this.list("sunday-school-resources", sundaySchoolResourceSchema); }
  async getSundaySchoolResource(slug: string) { return this.one("sunday-school-resources", "slug", slug, sundaySchoolResourceSchema); }
  async listExternalResources() { return this.list("external-resources", externalResourceSchema); }
}

function createCmsAdapter(): CmsAdapter {
  const provider = process.env.CMS_PROVIDER ?? "local";
  if (provider === "payload") {
    const url = process.env.CMS_API_URL;
    if (!url) throw new Error("CMS_API_URL is required when CMS_PROVIDER=payload.");
    return new PayloadRestCmsAdapter(url, process.env.CMS_API_TOKEN);
  }
  return new LocalCmsAdapter();
}

export const cmsAdapter: CmsAdapter = createCmsAdapter();
