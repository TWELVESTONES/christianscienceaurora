import {
  articles,
  events,
  externalResources,
  products,
  sermons,
  sundaySchoolResources,
} from "@/content/data";
import type {
  ArticleItem,
  EventItem,
  ExternalResource,
  ProductItem,
  SermonItem,
  SundaySchoolResource,
} from "@/lib/types";
import { isContentReviewMode, containsInternalMarker } from "@/lib/review-mode";

export function filterPublicEvents(items: EventItem[]): EventItem[] {
  return isContentReviewMode
    ? items
    : items.filter((event) =>
        !containsInternalMarker(event.title) &&
        !containsInternalMarker(event.summary) &&
        !containsInternalMarker(event.location)
      );
}

export function filterPublicSermons(items: SermonItem[]): SermonItem[] {
  return isContentReviewMode ? items : items.filter((sermon) => sermon.rightsStatus === "approved");
}

export function filterPublicArticles(items: ArticleItem[]): ArticleItem[] {
  return isContentReviewMode
    ? items
    : items.filter((article) => !containsInternalMarker(article.title) && !containsInternalMarker(article.summary));
}

export function filterPublicProducts(items: ProductItem[]): ProductItem[] {
  return isContentReviewMode
    ? items
    : items.filter((product) => product.permissionStatus === "approved" && product.price > 0);
}

export function filterPublicExternalResources(items: ExternalResource[]): ExternalResource[] {
  return items.filter((resource) => resource.publicationStatus === "published");
}

export function filterPublicSundaySchoolResources(items: SundaySchoolResource[]): SundaySchoolResource[] {
  return items;
}

export const publicEvents = filterPublicEvents(events);
export const publicSermons = filterPublicSermons(sermons);
export const publicArticles = filterPublicArticles(articles);
export const publicProducts = filterPublicProducts(products);
export const publicSundaySchoolResources = filterPublicSundaySchoolResources(sundaySchoolResources);
export const publicExternalResources = filterPublicExternalResources(externalResources);
