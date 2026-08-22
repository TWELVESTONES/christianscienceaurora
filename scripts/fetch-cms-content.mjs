#!/usr/bin/env node
// Phase 3 CMS migration — prebuild content fetch.
//
// Runs BEFORE `next build` (wired as the "prebuild" npm script). Fetches every
// public collection from the live CMS, reconstructs the frontend's content
// shapes (PageDefinition / EventItem / SermonItem / ArticleItem / ProductItem /
// SundaySchoolResource / ExternalResource), and writes them as plain JSON under
// content/generated/ (git-ignored — fetched fresh on every build/CI run).
//
// Hero images (pages.hero_media_id) get real metadata from
// GET /api/public/media/{id} (title/alt_text/production_note/aspect_ratio/
// width/height — a public, field-limited, read-only endpoint added to the
// backend after this script's first version; see the Phase 3 report for the
// history of why that was needed) and are downloaded as real files into
// public/media-cms/ (also git-ignored) so the built site never points an
// <img>/next/image src at a different origin at request time (CSP is
// 'self'-only and next.config.ts images.remotePatterns is empty; downloading
// at build time keeps both unchanged instead of widening them to trust a
// second host).
//
// Fail-safe contract (all three MUST exit non-zero and MUST NOT let next build
// run on bad data):
//   1. CMS unreachable / non-2xx response from a required endpoint.
//   2. A collection response's top-level JSON is unparseable.
//   3. A suspicious collapse in the `pages` collection count (< MIN_PAGE_COUNT).
// A single malformed *_json column on a single row is NOT fatal: it is caught,
// warned about, and that one field (or, for a page's sections_json specifically
// — see reconstructPage — that one row) is skipped.

import { writeFile, mkdir, rm } from "node:fs/promises";
import path from "node:path";

const CMS_BASE = (process.env.CMS_API_URL || "https://cms.christianscienceaurora.com").replace(/\/$/, "");
const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "content", "generated");
const MEDIA_DIR = path.join(ROOT, "public", "media-cms");

// Last known-good full page count is 64. Guard against a partial/broken CMS
// response (e.g. an empty or truncated table) silently shipping a half-built
// site. This is intentionally a bit below 64 so ordinary content churn
// (a handful of pages unpublished/archived) doesn't false-positive.
const MIN_PAGE_COUNT = 55;

const CHURCH_ADDRESS = "15700 E. Quincy Avenue, Aurora, Colorado 80015";

let warningCount = 0;
function warn(message) {
  warningCount += 1;
  console.warn(`[fetch-cms-content] WARNING: ${message}`);
}
function fail(message) {
  console.error(`[fetch-cms-content] FATAL: ${message}`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// HTTP helpers
// ---------------------------------------------------------------------------

async function fetchJson(pathname, { required = true } = {}) {
  const url = `${CMS_BASE}${pathname}`;
  let response;
  try {
    response = await fetch(url);
  } catch (e) {
    if (required) fail(`Could not reach CMS at ${url}: ${e instanceof Error ? e.message : e}`);
    warn(`Could not reach ${url}: ${e instanceof Error ? e.message : e}`);
    return null;
  }
  if (!response.ok) {
    if (required) fail(`CMS request failed (${response.status}) for ${url}`);
    warn(`Request failed (${response.status}) for ${url}`);
    return null;
  }
  const raw = await response.text();
  try {
    return JSON.parse(raw);
  } catch (e) {
    if (required) fail(`CMS response for ${url} was not valid JSON: ${e instanceof Error ? e.message : e}`);
    warn(`Response for ${url} was not valid JSON: ${e instanceof Error ? e.message : e}`);
    return null;
  }
}

// Public collection endpoints are capped server-side at limit=100 (see
// public-api.ts publicCollection: `Math.min(Math.max(Number(limit||24),1),100)`).
// There is no offset/cursor parameter, so a collection that ever exceeds 100
// published rows cannot be fully paginated by this script as written — see the
// Phase 3 report. All collections are well under that today (64 pages max).
async function fetchCollection(key, { required = true } = {}) {
  const data = await fetchJson(`/api/public/${key}?limit=100`, { required });
  if (!data) return [];
  if (!Array.isArray(data.items)) {
    if (required) fail(`CMS collection "${key}" did not return an items array.`);
    warn(`Collection "${key}" did not return an items array.`);
    return [];
  }
  return data.items;
}

// ---------------------------------------------------------------------------
// Small parsing / mapping helpers
// ---------------------------------------------------------------------------

function tryParseJson(raw, context) {
  if (raw === null || raw === undefined || raw === "") return undefined;
  if (typeof raw !== "string") return raw; // already parsed (defensive)
  try {
    return JSON.parse(raw);
  } catch (e) {
    warn(`Malformed JSON column skipped (${context}): ${e instanceof Error ? e.message : e}`);
    return undefined;
  }
}

// pages.workflow_status / events.workflow_status / etc. (CMS) -> PublicationStatus (frontend)
const WORKFLOW_STATUS_MAP = {
  draft: "draft",
  content_review: "content-review",
  rights_review: "rights-review",
  accessibility_review: "accessibility-review",
  seo_review: "seo-review",
  approved: "approved",
  scheduled: "scheduled",
  published: "published",
  archived: "archived",
};
function mapWorkflowStatus(value) {
  return WORKFLOW_STATUS_MAP[value] ?? "draft";
}

const PAGE_TYPE_ALLOWED = new Set([
  "standard", "calendar", "sermon-library", "sermon-detail", "article-library", "article-detail",
  "resource-library", "product-library", "product-detail", "children-library", "children-detail",
  "contact", "giving", "search", "admin", "legal", "checkout",
]);
function mapPageType(value) {
  if (value === "static") return "standard";
  if (PAGE_TYPE_ALLOWED.has(value)) return value;
  if (value) warn(`Unknown page_type "${value}" — falling back to "standard".`);
  return "standard";
}

const EVENT_CATEGORY_MAP = {
  services: "Service",
  talks: "Talk",
  reading_room: "Reading Room",
  families: "Family",
  community: "Community",
  // The frontend's EventItem.category enum has no equivalent for a one-off
  // "special_event" — closest existing bucket is Community. Flagged in the
  // Phase 3 report as a lossy mapping rather than silently invented.
  special_event: "Community",
};
function mapEventCategory(value) {
  return EVENT_CATEGORY_MAP[value] ?? "Community";
}

const EVENT_STATUS_ALLOWED = new Set(["scheduled", "postponed", "canceled", "completed"]);
function mapEventStatus(value) {
  return EVENT_STATUS_ALLOWED.has(value) ? value : "scheduled";
}

// events.rights_status / sermons.rights_status / products.rights_status (CMS:
// pending|approved|not_required|rejected) -> frontend's narrower per-type enum.
function mapSermonRights(value) {
  if (value === "approved" || value === "not_required") return "approved";
  if (value === "rejected") return "restricted";
  return "placeholder";
}
function mapProductPermission(value) {
  return value === "approved" || value === "not_required" ? "approved" : "placeholder";
}

function humanizeEnum(value) {
  if (!value) return undefined;
  const spaced = String(value).replace(/_/g, " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function isoDateOnly(value) {
  if (!value) return undefined;
  return String(value).slice(0, 10);
}


function formatDuration(seconds) {
  const n = Number(seconds);
  if (!Number.isFinite(n) || n <= 0) return undefined;
  const total = Math.round(n);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const mm = h > 0 ? String(m).padStart(2, "0") : String(m);
  const ss = String(s).padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

// ---------------------------------------------------------------------------
// Event location reconstruction (task 4: "branching on location_type")
// ---------------------------------------------------------------------------

function joinAddressParts(parts) {
  return parts.filter((p) => p && String(p).trim().length).join(", ");
}

function reconstructEventLocation(event) {
  const venue = event.venue_name?.trim();
  const type = event.location_type;
  const externalAddress = joinAddressParts([
    venue,
    event.address_line1,
    event.address_line2,
    joinAddressParts([event.city, [event.state, event.postal_code].filter(Boolean).join(" ")]),
  ]);

  if (type === "external") {
    return externalAddress || venue || "Location to be announced";
  }
  if (type === "online") {
    return event.virtual_url ? `Online — ${event.virtual_url}` : "Online";
  }
  if (type === "hybrid") {
    const physical = externalAddress || CHURCH_ADDRESS;
    return event.virtual_url ? `${physical} (also available online — ${event.virtual_url})` : `${physical} (also available online)`;
  }
  if (type === "reading_room") {
    return venue ? `${venue}, ${CHURCH_ADDRESS}` : `Christian Science Reading Room, ${CHURCH_ADDRESS}`;
  }
  // "church" and any unrecognized/blank location_type default to the church's
  // own address — the safest default for a parish-run calendar.
  return venue ? `${venue}, ${CHURCH_ADDRESS}` : CHURCH_ADDRESS;
}

function reconstructRecurring(event) {
  const type = event.recurrence_type;
  if (!type || type === "none") return undefined;
  const interval = Number(event.recurrence_interval || 1);
  if (type === "custom") {
    // recurrence_rule is a raw RFC 5545 RRULE string (machine-readable), not
    // display text. It is the only thing available for "custom" recurrence,
    // so it is passed through as a last-resort fallback rather than inventing
    // wording, but it will read as a raw rule string in the UI — flagged in
    // the Phase 3 report as a brief mismatch (the brief said
    // "recurrence_rule -> recurring" as if that were always human text).
    return event.recurrence_rule || undefined;
  }
  const dow = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  if (type === "weekly") {
    let days = [];
    const parsed = tryParseJson(event.recurrence_days_json, `events.recurrence_days_json (${event.slug})`);
    if (Array.isArray(parsed)) days = parsed.map(Number).filter((n) => n >= 0 && n <= 6);
    const dayLabel = days.length ? days.map((d) => dow[d]).join(" & ") : "the same day";
    return interval > 1 ? `Every ${interval} weeks on ${dayLabel}` : `Weekly on ${dayLabel}`;
  }
  if (type === "monthly") return interval > 1 ? `Every ${interval} months` : "Monthly";
  if (type === "yearly") return interval > 1 ? `Every ${interval} years` : "Yearly";
  return event.recurrence_rule || undefined;
}

// ---------------------------------------------------------------------------
// Media (hero image) download
// ---------------------------------------------------------------------------

const MIME_EXT = {
  "image/webp": "webp",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/avif": "avif",
  "image/gif": "gif",
};

// id -> resolved media object | null (null = fetched and confirmed
// unavailable — an id that returns null from metadata is never separately
// tried for bytes, and vice versa is not needed: both endpoints are gated by
// the same predicate, per the backend team, so they agree by construction).
const mediaCache = new Map();

// Real, public, field-limited media metadata: GET /api/public/media/{id} ->
// {item:{id,asset_key,title,alt_text,caption,credit,production_note,
// aspect_ratio,width,height,mime_type}}. Added after this script's first
// version shipped with a page-title altText fallback (media_assets was not
// previously a public collection at all) — see the Phase 3 report for the
// full history. Gated identically to /media/<id> bytes, so a withheld asset
// 404s here the same way it does for the file itself.
async function fetchMediaMetadata(id) {
  const url = `${CMS_BASE}/api/public/media/${encodeURIComponent(id)}`;
  let response;
  try {
    response = await fetch(url);
  } catch (e) {
    warn(`Media metadata fetch failed for ${id}: ${e instanceof Error ? e.message : e}`);
    return null;
  }
  if (!response.ok) {
    warn(`Media ${id} metadata not retrievable (${response.status}) — page will render a placeholder instead.`);
    return null;
  }
  try {
    const data = JSON.parse(await response.text());
    return data.item ?? null;
  } catch (e) {
    warn(`Media ${id} metadata response was not valid JSON: ${e instanceof Error ? e.message : e}`);
    return null;
  }
}

async function downloadMediaBytes(id, mimeType) {
  const url = `${CMS_BASE}/media/${encodeURIComponent(id)}`;
  let response;
  try {
    response = await fetch(url);
  } catch (e) {
    warn(`Media bytes fetch failed for ${id}: ${e instanceof Error ? e.message : e}`);
    return null;
  }
  if (!response.ok) {
    warn(`Media ${id} bytes not retrievable (${response.status}) despite metadata succeeding — page will render a placeholder instead.`);
    return null;
  }
  const contentType = response.headers.get("content-type") || mimeType || "application/octet-stream";
  const ext = MIME_EXT[contentType];
  if (!ext) {
    warn(`Media ${id} has unsupported content-type "${contentType}" — skipped.`);
    return null;
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  const filename = `${id}.${ext}`;
  await writeFile(path.join(MEDIA_DIR, filename), buffer);
  return `/media-cms/${filename}`;
}

const ASPECT_RATIO_ALLOWED = new Set(["16:9", "4:3", "3:2", "1:1", "2:3", "3:4", "1200:340"]);

// Fetches real metadata + downloads the real file for one media_assets id,
// building a complete, honest ImagePlaceholder. Returns null only when the
// asset is genuinely unavailable (not found / not public / rights not
// approved) — callers fall back to PhotoPlaceholder's existing no-media
// gradient contract in that case, exactly as it already handles today.
async function fetchMediaAsset(id) {
  if (mediaCache.has(id)) return mediaCache.get(id);
  const meta = await fetchMediaMetadata(id);
  if (!meta) {
    mediaCache.set(id, null);
    return null;
  }
  const src = await downloadMediaBytes(id, meta.mime_type);
  if (!src) {
    mediaCache.set(id, null);
    return null;
  }
  const result = {
    id: meta.asset_key || id,
    label: meta.title || "Untitled image",
    productionNote: meta.production_note || "No production note on file.",
    altText: meta.alt_text || meta.title || "Untitled image",
    aspectRatio: ASPECT_RATIO_ALLOWED.has(meta.aspect_ratio) ? meta.aspect_ratio : undefined,
    width: typeof meta.width === "number" ? meta.width : undefined,
    height: typeof meta.height === "number" ? meta.height : undefined,
    src,
  };
  mediaCache.set(id, result);
  return result;
}

async function resolveHeroImage(page) {
  if (!page.hero_media_id) return undefined;
  const media = await fetchMediaAsset(page.hero_media_id);
  if (!media) {
    // Matches the existing "no media row" contract PhotoPlaceholder already
    // implements: render as a placeholder with a brief, no crash, no <img>.
    return {
      id: page.hero_media_id,
      label: "Hero image (unavailable)",
      productionNote:
        "This page's hero_media_id could not be resolved to a public, rights-approved media file via the CMS's public API. Rendered as a placeholder.",
      altText: `${page.title} — hero photograph pending`,
    };
  }
  // media.width/height are real now (from /api/public/media) but are not
  // part of lib/types.ts's ImagePlaceholder and nothing in the frontend
  // currently consumes them (every image render uses next/image `fill`
  // mode, verified by grep) — deliberately not threaded through here, per
  // the Phase 3 report.
  return {
    id: media.id,
    label: media.label,
    productionNote: media.productionNote,
    altText: media.altText,
    aspectRatio: media.aspectRatio,
    src: media.src,
  };
}

// Inline images (image.mediaKey inside sections_json / card.image) already
// carry the FULL brief (id/label/productionNote/altText/aspectRatio/src) as
// authored by the CMS editor — the brief and the working local /images/...
// src both travel inline, so no extra lookup or download is needed or
// possible to improve on. mediaKey is kept only as a correlation id to the
// media_assets row; per the task's instruction that "the inline brief fields
// win where both exist", and since the media row's fields are unreachable
// anyway, the inline object is used exactly as authored, with mediaKey
// stripped (it isn't part of the frontend's ImagePlaceholder type).
function reconstructInlineImage(raw, context) {
  if (!raw || typeof raw !== "object") return undefined;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- destructured only to exclude it from `rest`
  const { mediaKey, ...rest } = raw;
  if (!rest.id || !rest.label || !rest.altText) {
    warn(`Inline image in ${context} is missing required fields — skipped.`);
    return undefined;
  }
  return rest;
}

function reconstructCard(raw, context) {
  if (!raw || typeof raw !== "object") return raw;
  const card = { ...raw };
  if (card.image) card.image = reconstructInlineImage(card.image, `${context} card image`);
  return card;
}

function reconstructSection(raw, context) {
  const section = { ...raw };
  if (section.image) section.image = reconstructInlineImage(section.image, `${context} section ${section.id ?? ""}`);
  if (Array.isArray(section.cards)) section.cards = section.cards.map((c) => reconstructCard(c, context));
  return section;
}

// ---------------------------------------------------------------------------
// Row -> frontend shape transforms
// ---------------------------------------------------------------------------

async function reconstructPage(row) {
  const sections = tryParseJson(row.sections_json, `pages.sections_json (${row.path})`);
  if (!Array.isArray(sections)) {
    // sections_json is the row's actual content — an unparseable/missing
    // sections_json makes the whole page unusable, so (per the fail-safe
    // contract) the ROW is skipped rather than shipping a contentless page.
    warn(`Page "${row.path}" has no usable sections_json — page skipped.`);
    return null;
  }

  const page = {
    path: row.path,
    title: row.title,
    eyebrow: row.eyebrow || undefined,
    description: row.excerpt || row.title,
    directAnswer: tryParseJson(row.direct_answer_json, `pages.direct_answer_json (${row.path})`),
    heroImage: await resolveHeroImage(row),
    actions: tryParseJson(row.actions_json, `pages.actions_json (${row.path})`),
    sections: sections.map((s) => reconstructSection(s, row.path)),
    pageType: mapPageType(row.page_type),
    status: mapWorkflowStatus(row.workflow_status),
    seoTitle: row.seo_title || undefined,
    keywords: tryParseJson(row.keywords_json, `pages.keywords_json (${row.path})`),
    structuredData: tryParseJson(row.structured_data_json, `pages.structured_data_json (${row.path})`),
    canonicalPath: row.canonical_url || undefined,
  };
  return page;
}

function reconstructEvent(row) {
  return {
    slug: row.slug,
    title: row.title,
    summary: row.summary || row.description || row.title,
    category: mapEventCategory(row.category),
    start: row.start_at,
    end: row.end_at || row.start_at,
    timezone: row.timezone || "America/Denver",
    location: reconstructEventLocation(row),
    recurring: reconstructRecurring(row),
    status: mapEventStatus(row.event_status),
    featured: !!row.featured,
    cost: row.cost_label || undefined,
    accessibility: row.accessibility || undefined,
    parking: row.parking || undefined,
    familySuitable: !!row.family_friendly,
    broadcastNotice: row.broadcast_notice || undefined,
  };
}

function reconstructSermon(row) {
  const formats = [];
  if (row.audio_media_id) formats.push("audio");
  if (row.video_media_id || row.video_embed_url) formats.push("video");
  if (row.authorized_text_markdown || row.transcript_markdown || formats.length === 0) formats.push("text");
  return {
    slug: row.slug,
    title: row.title,
    serviceDate: row.service_date,
    topic: row.subject || "General",
    summary: row.summary || row.title,
    formats,
    duration: formatDuration(row.audio_duration_seconds),
    rightsStatus: mapSermonRights(row.rights_status),
  };
}

function reconstructArticle(row) {
  return {
    slug: row.slug,
    title: row.title,
    category: row.category || "General",
    summary: row.excerpt || row.deck || row.title,
    author: row.author_name || "Christian Science Aurora editorial team",
    publishedAt: isoDateOnly(row.publish_at || row.created_at),
    updatedAt: isoDateOnly(row.updated_at || row.publish_at || row.created_at),
    // articles.reading_time now holds a real, hand-authored value at the
    // source (the CMS previously had no body content to derive a word count
    // from at all, which was producing a misleading "1 min read" on every
    // article — see the Phase 3 report). Read it directly; no derivation.
    readingTime: row.reading_time || "1 min read",
    externalHref: row.external_href || undefined,
    translations: tryParseJson(row.translations_json, `articles.translations_json (${row.slug})`),
    showOnPaths: tryParseJson(row.show_on_paths_json, `articles.show_on_paths_json (${row.slug})`),
    authorType: row.author_type === "Person" ? "Person" : "Organization",
  };
}

const STOCK_STATUS_MAP = {
  in_stock: "In stock",
  out_of_stock: "Out of stock",
  special_order: "Special order",
  unknown: "Special order",
};
function reconstructProduct(row) {
  const cents = row.sale_price_cents ?? row.price_cents ?? 0;
  return {
    slug: row.slug,
    title: row.title,
    author: row.author || row.publisher || "Publisher confirmation required",
    category: row.category || "General",
    price: Number(cents) / 100,
    format: row.product_type || row.short_description || "Format details pending",
    availability: STOCK_STATUS_MAP[row.stock_status] || "Special order",
    permissionStatus: mapProductPermission(row.rights_status),
  };
}

const ADULT_ASSISTANCE_ALLOWED = new Set(["None", "A little", "Recommended"]);
function reconstructSundaySchoolResource(row) {
  const adultAssistance = ADULT_ASSISTANCE_ALLOWED.has(row.adult_assistance) ? row.adult_assistance : "None";
  return {
    slug: row.slug,
    title: row.title,
    type: humanizeEnum(row.resource_type) || "Activity",
    ageGroup: row.age_group || "All ages",
    topic: row.topic || "General",
    estimatedTime: row.estimated_minutes ? `${row.estimated_minutes} minutes` : "Varies",
    delivery: row.online_activity && !row.printable ? "Online" : "Printable",
    adultAssistance,
    summary: row.description || row.title,
  };
}

async function reconstructExternalResource(row) {
  let image;
  if (row.image_media_id) {
    const media = await fetchMediaAsset(row.image_media_id);
    if (media) {
      image = {
        id: media.id,
        label: media.label,
        productionNote: media.productionNote,
        altText: media.altText,
        aspectRatio: media.aspectRatio,
        src: media.src,
      };
    }
  }
  return {
    name: row.name,
    url: row.url,
    description: row.short_description || "",
    category: row.category || "General",
    featured: !!row.featured,
    order: row.sort_order ?? 0,
    image,
    reviewDate: isoDateOnly(row.last_reviewed_at || row.created_at),
    owner: row.owner_email || "Website Coordinator",
    publicationStatus: mapWorkflowStatus(row.workflow_status),
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log(`[fetch-cms-content] Fetching from ${CMS_BASE} ...`);

  await rm(OUT_DIR, { recursive: true, force: true });
  await mkdir(OUT_DIR, { recursive: true });
  await rm(MEDIA_DIR, { recursive: true, force: true });
  await mkdir(MEDIA_DIR, { recursive: true });

  const bootstrap = await fetchJson("/api/public/bootstrap", { required: true });

  const [pagesRaw, eventsRaw, sermonsRaw, articlesRaw, productsRaw, childResourcesRaw, externalResourcesRaw] =
    await Promise.all([
      fetchCollection("pages", { required: true }),
      fetchCollection("events", { required: true }),
      fetchCollection("sermons", { required: true }),
      fetchCollection("articles", { required: true }),
      fetchCollection("products", { required: true }),
      fetchCollection("child_resources", { required: true }),
      fetchCollection("external_resources", { required: true }),
    ]);

  if (pagesRaw.length < MIN_PAGE_COUNT) {
    fail(
      `CMS "pages" collection returned only ${pagesRaw.length} rows (expected at least ${MIN_PAGE_COUNT}, last known-good was 64). ` +
        `Refusing to build from what looks like a truncated/broken CMS response.`,
    );
  }

  // Pages first (sequential — not parallel — because each may download a
  // hero image and the CMS has no batch media endpoint; 64 rows is small).
  const pages = [];
  for (const row of pagesRaw) {
    const page = await reconstructPage(row);
    if (page) pages.push(page);
  }

  const events = eventsRaw.map(reconstructEvent);
  const sermons = sermonsRaw.map(reconstructSermon);
  const articles = articlesRaw.map(reconstructArticle);
  const products = productsRaw.map(reconstructProduct);
  const sundaySchoolResources = childResourcesRaw.map(reconstructSundaySchoolResource);
  const externalResources = [];
  for (const row of externalResourcesRaw) externalResources.push(await reconstructExternalResource(row));

  await writeFile(path.join(OUT_DIR, "pages.json"), JSON.stringify(pages, null, 2));
  await writeFile(path.join(OUT_DIR, "events.json"), JSON.stringify(events, null, 2));
  await writeFile(path.join(OUT_DIR, "sermons.json"), JSON.stringify(sermons, null, 2));
  await writeFile(path.join(OUT_DIR, "articles.json"), JSON.stringify(articles, null, 2));
  await writeFile(path.join(OUT_DIR, "products.json"), JSON.stringify(products, null, 2));
  await writeFile(path.join(OUT_DIR, "sunday-school-resources.json"), JSON.stringify(sundaySchoolResources, null, 2));
  await writeFile(path.join(OUT_DIR, "external-resources.json"), JSON.stringify(externalResources, null, 2));
  await writeFile(path.join(OUT_DIR, "bootstrap.json"), JSON.stringify(bootstrap, null, 2));

  console.log(
    `[fetch-cms-content] Done. pages=${pages.length} (of ${pagesRaw.length} fetched) events=${events.length} sermons=${sermons.length} ` +
      `articles=${articles.length} products=${products.length} sundaySchoolResources=${sundaySchoolResources.length} ` +
      `externalResources=${externalResources.length} warnings=${warningCount}`,
  );
}

main().catch((e) => {
  fail(e instanceof Error ? (e.stack ?? e.message) : String(e));
});
