import Image from "next/image";
import Link from "next/link";

// Building mark (logo-mark-building.webp): periwinkle/white fill with black outline on a
// transparent background. It reads on both the light header and the dark teal footer, so one
// asset serves both. New filename (not an overwrite) so cached optimized images can't show the
// old mark. Both pair the icon with real (not baked-into-the-image) text so it stays crisp.
export function Wordmark({ light = false }: { light?: boolean }) {
  if (light) {
    return (
      <Link className="wordmark wordmark-logo" href="/" aria-label="Christian Science Aurora home">
        <Image
          src="/images/brand/logo-mark-building.webp"
          alt=""
          width={1316}
          height={501}
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
        src="/images/brand/logo-mark-building.webp"
        alt=""
        width={1316}
        height={501}
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
