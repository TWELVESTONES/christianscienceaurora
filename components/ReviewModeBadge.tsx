import { isContentReviewMode } from "@/lib/review-mode";

export function ReviewModeBadge() {
  if (!isContentReviewMode) return null;
  return (
    <div className="review-mode-badge" role="status">
      Content review mode: internal confirmation and production notes are visible.
    </div>
  );
}
