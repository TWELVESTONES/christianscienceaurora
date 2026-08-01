import Link from "next/link";

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <Link className="wordmark" href="/" aria-label="Christian Science Aurora home" style={light ? { color: "white" } : undefined}>
      <span className="wordmark-csa" style={light ? { color: "white" } : undefined}>CSA</span>
      <span className="wordmark-stack">
        <strong style={light ? { color: "white" } : undefined}>CHRISTIAN SCIENCE</strong>
        <span style={light ? { color: "white" } : undefined}>AURORA</span>
      </span>
    </Link>
  );
}
