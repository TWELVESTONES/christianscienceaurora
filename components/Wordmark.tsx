import Image from "next/image";
import Link from "next/link";

// The header icon (logo-mark.webp) is dark charcoal line art, for the light header bar.
// The footer sits on dark teal, so it uses a separate reversed asset (logo-mark-light.webp,
// white fill / black outline) supplied for that purpose. Both pair the icon with real
// (not baked-into-the-image) text so it stays crisp at any size.
export function Wordmark({ light = false }: { light?: boolean }) {
  if (light) {
    return (
      <Link className="wordmark wordmark-logo" href="/" aria-label="Christian Science Aurora home">
        <Image
          src="/images/brand/logo-mark-light.webp"
          alt=""
          width={1456}
          height={526}
          className="wordmark-logo-img"
        />
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
        src="/images/brand/logo-mark.webp"
        alt=""
        width={1399}
        height={503}
        priority
        className="wordmark-logo-img"
      />
      <span className="wordmark-stack">
        <strong>CHRISTIAN SCIENCE</strong>
        <span>AURORA</span>
      </span>
    </Link>
  );
}
