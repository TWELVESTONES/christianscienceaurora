import Link from "next/link";

export function MobileActionBar() {
  return (
    <nav className="mobile-action-bar" aria-label="Quick actions">
      <Link href="/services">Service Times</Link>
      <Link href="/visit/directions-parking">Directions</Link>
      <a href="tel:+13037660620">Call</a>
    </nav>
  );
}
