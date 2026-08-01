import { pageMap } from "@/content/pages";
import {
  filterPublicArticles,
  filterPublicEvents,
  filterPublicProducts,
  filterPublicSermons,
  filterPublicSundaySchoolResources,
} from "@/content/public-data";
import { cmsAdapter } from "@/lib/adapters/cms";
import { deriveDynamicPage } from "@/lib/dynamic-pages";
import { preparePageForPublic } from "@/lib/public-page";
import type { PageDefinition } from "@/lib/types";

export async function resolvePublicPage(path: string): Promise<PageDefinition | undefined> {
  const cmsPage = await cmsAdapter.getPage(path);
  const staticPage = cmsPage ?? pageMap.get(path);
  if (staticPage) return preparePageForPublic(staticPage);

  const [eventRecords, sermonRecords, articleRecords, productRecords, sundaySchoolRecords] = await Promise.all([
    cmsAdapter.listEvents(),
    cmsAdapter.listSermons(),
    cmsAdapter.listArticles(),
    cmsAdapter.listProducts(),
    cmsAdapter.listSundaySchoolResources(),
  ]);

  const dynamicPage = deriveDynamicPage(path, {
    events: filterPublicEvents(eventRecords),
    sermons: filterPublicSermons(sermonRecords),
    articles: filterPublicArticles(articleRecords),
    products: filterPublicProducts(productRecords),
    sundaySchoolResources: filterPublicSundaySchoolResources(sundaySchoolRecords),
  });
  return preparePageForPublic(dynamicPage);
}
