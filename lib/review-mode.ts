export const isContentReviewMode = process.env.NEXT_PUBLIC_CONTENT_REVIEW_MODE === "true";

const internalMarkers = [
  "CMS / Church Confirmation",
  "CHURCH CONFIRMATION",
  "placeholder",
  "pending church confirmation",
  "requires confirmation",
];

export function containsInternalMarker(value: string): boolean {
  const normalized = value.toLowerCase();
  return internalMarkers.some((marker) => normalized.includes(marker.toLowerCase()));
}

export function publicSafeText(value: string | undefined, fallback = "Details will be posted after they are confirmed."): string {
  if (!value || containsInternalMarker(value)) return fallback;
  return value;
}
