import Image from "next/image";
import type { ImagePlaceholder } from "@/lib/types";
import { isContentReviewMode } from "@/lib/review-mode";

function ratioClass(ratio: ImagePlaceholder["aspectRatio"]) {
  return `ratio-${(ratio ?? "16:9").replace(":", "-")}`;
}

export function PhotoPlaceholder({ image, className = "" }: { image: ImagePlaceholder; className?: string }) {
  const hasRealPhoto = Boolean(image.src) && !isContentReviewMode;
  return (
    <figure
      className={`photo-placeholder ${ratioClass(image.aspectRatio)} ${isContentReviewMode ? "is-review" : "is-public"} ${className}`.trim()}
      role="img"
      aria-label={image.altText}
    >
      {hasRealPhoto ? (
        <Image
          src={image.src as string}
          alt={image.altText}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
        />
      ) : (
        <div className="photo-light-field" aria-hidden="true">
          <span className="photo-light-orb photo-light-orb-one" />
          <span className="photo-light-orb photo-light-orb-two" />
          <span className="photo-architectural-line" />
        </div>
      )}
      <figcaption className="photo-caption">
        {isContentReviewMode ? (
          <>
            <span className="photo-note-badge">Photo production placeholder{image.youthReleaseRequired ? " · youth release required" : ""}</span>
            <strong>{image.label}</strong>
            <span>{image.productionNote}</span>
          </>
        ) : (
          <>
            <span className="photo-note-badge">{hasRealPhoto ? "Photographed on site" : "Local photography"}</span>
            <strong>{image.label}</strong>
          </>
        )}
      </figcaption>
    </figure>
  );
}
