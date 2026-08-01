import Link from "next/link";

export default function NotFound() {
  return <section className="page-hero no-image"><div className="container page-hero-grid"><div><div className="eyebrow">404</div><h1>This page could not be found.</h1><p className="description">The address may have changed, or the page may no longer be available. Use search, return home, or find the information you need below.</p><div className="button-row"><Link className="btn btn-primary" href="/">Return Home</Link><Link className="btn btn-secondary" href="/search">Search the Site</Link><Link className="btn btn-secondary" href="/events">View Events</Link><Link className="btn btn-secondary" href="/visit">Plan Your Visit</Link></div></div></div></section>;
}
