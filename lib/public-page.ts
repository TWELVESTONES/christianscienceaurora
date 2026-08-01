import type { ContentCard, LinkItem, PageDefinition, PageSection } from "@/lib/types";
import { containsInternalMarker, isContentReviewMode, publicSafeText } from "@/lib/review-mode";

const paymentsEnabled = (process.env.PAYMENTS_PROVIDER ?? "disabled") !== "disabled";

function allowedHref(href: string): boolean {
  if (href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("#")) return true;
  if (href.includes("placeholder")) return false;
  if (!paymentsEnabled && ["/reading-room/cart", "/reading-room/checkout"].includes(href)) return false;
  return true;
}

function sanitizeActions(actions: LinkItem[] | undefined, pagePath?: string): LinkItem[] | undefined {
  const filtered = actions?.filter((action) => {
    if (!allowedHref(action.href)) return false;
    if (!paymentsEnabled && pagePath === "/give" && action.label.toLowerCase().includes("give online")) return false;
    return true;
  });
  return filtered?.length ? filtered : undefined;
}

function sanitizeCard(card: ContentCard): ContentCard {
  const keepLink = card.href ? allowedHref(card.href) : false;
  return {
    ...card,
    eyebrow: card.eyebrow && containsInternalMarker(card.eyebrow) ? undefined : card.eyebrow,
    title: containsInternalMarker(card.title) ? "Details coming soon" : card.title,
    text: publicSafeText(card.text),
    href: keepLink ? card.href : undefined,
    action: keepLink ? card.action : undefined,
    meta: card.meta && containsInternalMarker(card.meta) ? undefined : card.meta,
  };
}

function sanitizeSection(section: PageSection): PageSection {
  return {
    ...section,
    eyebrow: section.eyebrow && containsInternalMarker(section.eyebrow) ? undefined : section.eyebrow,
    intro: section.intro ? publicSafeText(section.intro) : section.intro,
    body: section.body?.map((paragraph) => publicSafeText(paragraph)),
    cards: section.cards?.map(sanitizeCard),
    actions: sanitizeActions(section.actions),
  };
}

export function isPublicPagePath(path: string): boolean {
  if (path === "/admin") return false;
  if (isContentReviewMode) return true;
  if (path.includes("placeholder")) return false;
  if (!paymentsEnabled && ["/reading-room/cart", "/reading-room/checkout"].includes(path)) return false;
  return true;
}

export function preparePageForPublic(page: PageDefinition | undefined): PageDefinition | undefined {
  if (!page) return undefined;
  if (!isPublicPagePath(page.path)) return undefined;
  if (isContentReviewMode) return page;
  return {
    ...page,
    eyebrow: page.eyebrow && containsInternalMarker(page.eyebrow) ? undefined : page.eyebrow,
    description: publicSafeText(page.description),
    actions: sanitizeActions(page.actions, page.path),
    sections: page.sections.map(sanitizeSection),
    churchConfirmation: undefined,
  };
}
