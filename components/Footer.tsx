import Link from "next/link";
import { site } from "@/content/site";
import { Wordmark } from "@/components/Wordmark";
import { isContentReviewMode } from "@/lib/review-mode";

const groups = [
  { title: "Visit", links: [["Plan Your Visit", "/visit"], ["Directions", "/visit/directions-parking"], ["Accessibility", "/visit/accessibility"], ["Contact", "/contact"]] },
  { title: "Explore", links: [["Services", "/services"], ["Sermons", "/sermons"], ["Sunday School", "/sunday-school"], ["Reading Room", "/reading-room"], ["Events", "/events"], ["Articles", "/articles"]] },
  { title: "Resources", links: [["All Resources", "/resources"], ["Lectures", "/events/god-is-relevant-lecture-october-2026"], ["ChristianScience.com", "https://www.christianscience.com/"], ["JSH-Online", "https://jsh.christianscience.com/"], ["The Monitor", "https://www.csmonitor.com/"]] },
  { title: "Legal", links: [["Privacy", "/privacy"], ["Accessibility", "/accessibility"], ["Terms", "/terms"], ["Content Permissions", "/content-permissions"], ["Sitemap", "/sitemap"]] }
] as const;

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Wordmark light />
            <h2 className="footer-welcome">You are welcome here.</h2>
            <p>Join us in Aurora for Sunday worship, Wednesday testimony meetings, Sunday School, spiritual study, and community events.</p>
            <p><strong>{site.address.street}</strong><br />{site.address.city}, {site.address.region} {site.address.postalCode}<br /><a href="tel:+13037660620">{site.phone}</a></p>
          </div>
          {groups.map((group) => (
            <div key={group.title}>
              <h3>{group.title}</h3>
              <div className="footer-links">
                {group.links.map(([label, href]) => href.startsWith("http") ? <a key={href} href={href} target="_blank" rel="noreferrer">{label} ↗</a> : <Link key={href} href={href}>{label}</Link>)}
              </div>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <p><strong>{site.name}.</strong> {site.relationshipNotice}</p>
          {isContentReviewMode ? (
            <p><strong>Internal review:</strong> confirmation placeholders and production notes are visible. Resolve them before public launch.</p>
          ) : (
            <p>Official Christian Science resources are linked to their respective publishers and organizations. See <Link href="/content-permissions">Content Permissions</Link> for reuse information.</p>
          )}
          <p>© {new Date().getFullYear()} First Church of Christ, Scientist, Aurora, Colorado.</p>
          <p className="footer-credit">Designed by <a href="https://James218.org" target="_blank" rel="noreferrer">James218</a></p>
        </div>
      </div>
    </footer>
  );
}
