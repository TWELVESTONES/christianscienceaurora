import Link from "next/link";
import { nav, site } from "@/content/site";
import { Wordmark } from "@/components/Wordmark";

export function Header() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <div className="topline">
        <div className="container topline-inner">
          <span>You are welcome here.</span>
          <div className="topline-links">
            <a href="tel:+13037660620">{site.phone}</a>
            <Link href="/contact">Contact</Link>
            <Link href="/search">Search</Link>
          </div>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-main">
          <Wordmark />
          <nav className="desktop-nav" aria-label="Primary navigation">
            {nav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </nav>
          <div className="header-actions">
            <Link className="header-search-link" href="/search">Search</Link>
            <Link className="btn btn-primary header-directions" href="/visit/directions-parking">Get Directions</Link>
            <details className="mobile-menu">
              <summary className="mobile-menu-trigger" aria-label="Open navigation menu">Menu</summary>
              <div className="mobile-menu-panel">
                <nav aria-label="Mobile navigation">
                  {nav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
                  <Link href="/contact">Contact</Link>
                  <Link href="/search">Search</Link>
                </nav>
                <div className="mobile-menu-actions">
                  <a className="btn btn-secondary" href="tel:+13037660620">Call {site.phone}</a>
                  <Link className="btn btn-primary" href="/visit/directions-parking">Get Directions</Link>
                </div>
              </div>
            </details>
          </div>
        </div>
      </header>
      <div className="service-strip" aria-label="Service times">
        <div className="container service-strip-inner">
          <Link href="/services/sunday">Sunday Service &amp; Sunday School · 10:00 a.m.</Link>
          <Link href="/services/wednesday">Wednesday Testimony Meeting · 7:30 p.m.</Link>
          <Link href="/visit/directions-parking">15700 E. Quincy Avenue · Aurora</Link>
        </div>
      </div>
    </>
  );
}
