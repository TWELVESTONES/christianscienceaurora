import { cmsAdapter } from "@/lib/adapters/cms";
import {
  filterPublicArticles,
  filterPublicEvents,
  filterPublicProducts,
  filterPublicSermons,
  filterPublicSundaySchoolResources,
} from "@/content/public-data";
import { isPublicPagePath } from "@/lib/public-page";

// Single source of truth for "every public page path this build should
// prerender", shared by generateStaticParams (app/[...slug]/page.tsx) and
// the sitemap (app/sitemap.ts).
//
// This did NOT exist before Phase 3: generateStaticParams previously read
// only the static `pageDefinitions` array from content/pages.ts, so an
// events/sermons/articles/products/sunday-school-resources "detail" route
// was only prerendered when someone had also hand-authored a matching
// content/pages.ts entry at that exact path (which, in the pre-Phase-3
// baseline, every one of them happened to have). Once page content comes
// from the CMS's `pages` collection instead, a detail route with no
// matching `pages` row (i.e. one that relies on lib/dynamic-pages.ts's
// derivation from the events/sermons/articles/products/child_resources
// collections) needs to be enumerated explicitly here, or it would silently
// stop being prerendered (falling back to on-demand rendering — a ○/●→ƒ
// regression the task's non-negotiable constraint #3 rules out).
export async function listAllPublicPaths(): Promise<string[]> {
  const [pages, eventRecords, sermonRecords, articleRecords, productRecords, sundaySchoolRecords] = await Promise.all([
    cmsAdapter.listPages(),
    cmsAdapter.listEvents(),
    cmsAdapter.listSermons(),
    cmsAdapter.listArticles(),
    cmsAdapter.listProducts(),
    cmsAdapter.listSundaySchoolResources(),
  ]);

  const paths = new Set<string>();
  for (const page of pages) if (isPublicPagePath(page.path)) paths.add(page.path);

  for (const event of filterPublicEvents(eventRecords)) paths.add(`/events/${event.slug}`);
  for (const sermon of filterPublicSermons(sermonRecords)) paths.add(`/sermons/${sermon.slug}`);
  for (const article of filterPublicArticles(articleRecords)) {
    // Mirrors lib/dynamic-pages.ts: an article with externalHref set never
    // gets an internal detail page.
    if (!article.externalHref) paths.add(`/articles/${article.slug}`);
  }
  for (const product of filterPublicProducts(productRecords)) paths.add(`/reading-room/shop/${product.slug}`);
  for (const resource of filterPublicSundaySchoolResources(sundaySchoolRecords)) {
    paths.add(`/sunday-school/resources/${resource.slug}`);
  }

  return [...paths].filter(isPublicPagePath);
}
