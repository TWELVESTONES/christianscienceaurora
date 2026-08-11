import Image from "next/image";
import Link from "next/link";

// The new illustrated logo (church building + wordmark) is drawn in dark charcoal
// and teal on a transparent background. It reads clearly on the light header bar,
// but its dark text disappears against the dark teal footer, so the footer keeps
// the original all-white text wordmark below.
export function Wordmark({ light = false }: { light?: boolean }) {
  if (light) {
    return (
      <Link className="wordmark" href="/" aria-label="Christian Science Aurora home">
        <span className="wordmark-csa" style={{ color: "white" }}>CSA</span>
        <span className="wordmark-stack">
          <strong style={{ color: "white" }}>CHRISTIAN SCIENCE</strong>
          <span style={{ color: "white" }}>AURORA</span>
        </span>
      </Link>
    );
  }
  return (
    <Link className="wordmark wordmark-logo" href="/" aria-label="Christian Science Aurora home">
      <Image
        src="/images/brand/logo.webp"
        alt="Christian Science Aurora"
        width={800}
        height={394}
        priority
        className="wordmark-logo-img"
      />
    </Link>
  );
}
