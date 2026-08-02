import Link from "next/link";
import {
  filterPublicArticles,
  filterPublicEvents,
  filterPublicExternalResources,
  filterPublicSermons,
} from "@/content/public-data";
import { cmsAdapter } from "@/lib/adapters/cms";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { ButtonRow } from "@/components/Buttons";
import { CardGrid } from "@/components/Cards";
import { EventSchema } from "@/components/StructuredData";
import { isContentReviewMode } from "@/lib/review-mode";

export default async function HomePage() {
  const [eventRecords, sermonRecords, articleRecords, externalResourceRecords] = await Promise.all([
    cmsAdapter.listEvents(),
    cmsAdapter.listSermons(),
    cmsAdapter.listArticles(),
    cmsAdapter.listExternalResources(),
  ]);
  const publicEvents = filterPublicEvents(eventRecords);
  const publicSermons = filterPublicSermons(sermonRecords);
  const publicArticles = filterPublicArticles(articleRecords);
  const publicExternalResources = filterPublicExternalResources(externalResourceRecords);
  const campaignImage = {
    id: "campaign-public-talk",
    label: "Campaign or featured-event image",
    productionNote: "Administrator-controlled desktop/mobile crop. Use approved event photography or a local architectural image. No auto-rotating carousel.",
    altText: "Featured Christian Science Aurora event campaign image.",
    aspectRatio: "16:9" as const,
    src: "/images/photography/campaign-public-talk.webp"
  };
  const heroImage = {
    id: "home-welcome",
    label: "Local church welcome",
    productionNote: "Wide, authentic photograph of the entrance or sanctuary in warm natural light. Show a genuine sense of welcome without staged corporate smiles.",
    altText: "Welcoming view of First Church of Christ, Scientist, Aurora.",
    aspectRatio: "16:9" as const,
    src: "/images/photography/home-welcome.webp"
  };
  const campaignEvent = publicEvents.find((event) => event.category === "Talk" && event.featured);
  const latestSermon = publicSermons[0];
  const latestArticle = publicArticles[0];

  return (
    <>
      {campaignEvent ? (
        <section className="campaign-banner" aria-labelledby="campaign-title">
          <div className="container campaign-grid">
            <div className="campaign-copy">
              <div className="eyebrow">FEATURED EVENT</div>
              <h2 id="campaign-title">{campaignEvent.title}</h2>
              <p>{campaignEvent.summary}</p>
              <p className="campaign-date">{new Date(campaignEvent.start).toLocaleString("en-US", { weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: "America/Denver" })}</p>
              <ButtonRow actions={[{ label: "View Event", href: `/events/${campaignEvent.slug}`, variant: "primary" }, { label: "Get Directions", href: "/visit/directions-parking", variant: "secondary" }]} />
            </div>
            <PhotoPlaceholder image={campaignImage} className="campaign-visual" />
          </div>
        </section>
      ) : null}

      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">CHRISTIAN SCIENCE AURORA</div>
            <h1>You are welcome here.</h1>
            <p className="lead">Discover a peaceful place to worship, pray, ask questions, and learn more about Christian healing. Everyone is welcome—whether this is your first visit or you have attended for years.</p>
            <ButtonRow actions={[{ label: "Plan Your Visit", href: "/visit", variant: "primary" }, { label: "Get Directions", href: "/visit/directions-parking", variant: "secondary" }]} />
          </div>
          <PhotoPlaceholder image={heroImage} />
        </div>
      </section>

      <section className="container home-service-grid" aria-label="Weekly gatherings">
        <article className="home-service-card"><div className="eyebrow">SUNDAY · 10:00 A.M.</div><h2>Sunday Service</h2><p>Prayer, hymns, and a weekly Bible Lesson sermon.</p><Link href="/services/sunday">About Sunday Service →</Link></article>
        <article className="home-service-card"><div className="eyebrow">SUNDAY · 10:00 A.M.</div><h2>Sunday School</h2><p>A caring place for children to explore the Bible and ask thoughtful questions.</p><Link href="/sunday-school">Explore Sunday School →</Link></article>
        <article className="home-service-card"><div className="eyebrow">WEDNESDAY · 7:30 P.M.</div><h2>Testimony Meeting</h2><p>Readings, prayer, gratitude, and voluntary sharing.</p><Link href="/services/wednesday">About Wednesday Meetings →</Link></article>
      </section>

      <section className="section section-stone">
        <div className="container section-split">
          <PhotoPlaceholder image={{ id: "new-here", label: "Natural arrival and program handoff", productionNote: "Candid adult welcome near the entrance. Real participants with releases, natural body language, realistic contrast.", altText: "A visitor being welcomed at the church entrance.", aspectRatio: "16:9", src: "/images/photography/new-here.webp" }} />
          <div>
            <div className="eyebrow">NEW HERE?</div>
            <h2>Your first visit can be simple.</h2>
            <p>You do not need to be a member, know the service format, or introduce yourself. Come in, choose any open seat, and participate as much or as little as you wish.</p>
            <ButtonRow actions={[{ label: "Know What to Expect", href: "/visit/what-to-expect", variant: "primary" }, { label: "Ask a Question", href: "/contact", variant: "secondary" }]} />
          </div>
        </div>
      </section>

      <section className="section section-gold-accent">
        <div className="container">
          <div className="eyebrow special-event-title">SPECIAL EVENT</div>
          <div className="special-event-banner">
            <PhotoPlaceholder image={{ id: "special-events-banner", label: "Special events promotional banner", productionNote: "Administrator-controlled banner image for a current special event, guest lecture, or seasonal program. Swap out as needed; remove text overlays from the image itself so alt text stays accurate.", altText: "Banner promoting a current special event at Christian Science Aurora.", aspectRatio: "1200:340" }} />
            <Link href="/events" className="btn btn-primary special-event-banner-cta">More Info</Link>
          </div>
        </div>
      </section>

      <section className="section section-default">
        <div className="container">
          <header className="section-heading"><div className="eyebrow">UPCOMING EVENTS</div><h2>Come explore with us.</h2><p>Find church services, public talks, Reading Room activities, family programs, and other gatherings in Aurora.</p></header>
          {publicEvents.length ? (
            <div className="card-grid">
              {publicEvents.slice(0, 3).map((event) => {
                const date = new Date(event.start);
                return <article className="card" key={event.slug}><div className="eyebrow">{event.category} · {date.toLocaleString("en-US", { month: "short", day: "numeric" })}</div><h3><Link href={`/events/${event.slug}`}>{event.title}</Link></h3><p>{event.summary}</p><p className="card-meta">{date.toLocaleString("en-US", { weekday: "long", hour: "numeric", minute: "2-digit", timeZone: "America/Denver" })}</p><p className="card-action"><Link href={`/events/${event.slug}`}>View event →</Link></p><EventSchema event={event} /></article>;
              })}
            </div>
          ) : (
            <div className="empty-state"><div className="eyebrow">WEEKLY GATHERINGS CONTINUE</div><h2>No special events are posted right now.</h2><p>Sunday service and Sunday School meet at 10:00 a.m. Wednesday testimony meetings begin at 7:30 p.m.</p></div>
          )}
          <ButtonRow actions={[{ label: "View Full Calendar", href: "/events", variant: "secondary" }]} />
        </div>
      </section>

      <section className="section section-teal-mist">
        <div className="container section-split">
          <div>
            <div className="eyebrow">{latestSermon ? "LATEST SERMON" : "SERMON LIBRARY"}</div>
            <h2>{latestSermon ? latestSermon.title : "Approved sermons will be shared here."}</h2>
            <p>{latestSermon ? latestSermon.summary : "The site is ready for text, audio, or captioned video after each item completes content, permissions, and accessibility review."}</p>
            <ButtonRow actions={latestSermon ? [{ label: "Listen to Sermon", href: `/sermons/${latestSermon.slug}`, variant: "primary" }, { label: "Read Sermon", href: `/sermons/${latestSermon.slug}#transcript`, variant: "secondary" }] : [{ label: "Visit Sermon Library", href: "/sermons", variant: "primary" }]} />
          </div>
          <PhotoPlaceholder image={{ id: "latest-sermon", label: "Sanctuary and sermon media", productionNote: "Permission-aware image of the sanctuary or Readers’ platform. No protected Bible Lesson content visible.", altText: "Sanctuary prepared for a Christian Science service.", aspectRatio: "16:9", src: "/images/photography/latest-sermon.webp" }} />
        </div>
      </section>

      <section className="section section-default">
        <div className="container">
          <CardGrid cards={[
            { eyebrow: "READING ROOM", title: "A place to read, ask questions, and explore.", text: "Browse books and periodicals, study quietly, or talk with someone about Christian Science.", href: "/reading-room", action: "Visit the Reading Room", image: { id: "home-reading-room", label: "Reading Room shelves and quiet table", productionNote: "Wide interior in natural light. Covers only where authorized.", altText: "Reading Room shelves and a quiet reading table.", aspectRatio: "4:3", src: "/images/photography/home-reading-room.webp" } },
            { eyebrow: "SUNDAY SCHOOL", title: "Big questions are welcome.", text: "A caring place for children to learn about God, the Bible, prayer, and everyday life.", href: "/sunday-school", action: "Explore Sunday School", image: { id: "home-sunday-school", label: "Sunday School students", productionNote: "Guardian releases confirmed on file for this image.", altText: "Sunday School students at Christian Science Aurora.", aspectRatio: "4:3", youthReleaseRequired: true, src: "/images/photography/home-sunday-school.webp" } },
            { eyebrow: "IDEAS FOR EVERYDAY LIFE", title: latestArticle?.title ?? "Articles for spiritual discovery", text: latestArticle?.summary ?? "Newcomer guides, local stories, and introductions to trusted Christian Science resources.", href: latestArticle ? `/articles/${latestArticle.slug}` : "/articles", action: latestArticle ? "Read the Article" : "View Articles", image: { id: "home-article", label: "Quiet Aurora reflection moment", productionNote: "Local, calm image of a person reading near a window or an Aurora landscape detail. Avoid wellness clichés.", altText: "A quiet reading and reflection moment in natural light.", aspectRatio: "4:3", src: "/images/photography/home-article.webp" } }
          ]} />
        </div>
      </section>

      <section className="section section-periwinkle-mist">
        <div className="container section-split">
          <div>
            <div className="eyebrow">LOCAL COMMUNITY</div>
            <h2>Serving Aurora for more than 70 years.</h2>
            <p>For generations, this church has welcomed people from Aurora and surrounding communities to worship, learn, and explore the practical meaning of God’s love.</p>
            <ButtonRow actions={[{ label: "About Our Church", href: "/about", variant: "primary" }]} />
          </div>
          <PhotoPlaceholder image={{ id: "local-community", label: "Wide local church and Aurora context", productionNote: "Wide exterior with local landscape and natural community activity. Avoid dramatic skies and staged group posing.", altText: "The Aurora church in its local community setting.", aspectRatio: "16:9", src: "/images/photography/local-community.webp" }} />
        </div>
      </section>

      <section className="section section-default">
        <div className="container">
          <header className="section-heading"><div className="eyebrow">EXPLORE FURTHER</div><h2>Trusted resources for deeper exploration.</h2><p>Find Christian Science publications, audio, Bible study tools, news, historical resources, and materials for children and families.</p></header>
          <div className="card-grid four">{publicExternalResources.filter((resource) => resource.featured).slice(0, 4).map((resource) => <a className="card external-resource-card" key={resource.name} href={resource.url} target="_blank" rel="noreferrer"><div className="eyebrow">External resource</div><h3>{resource.name} ↗</h3><p>{resource.description}</p></a>)}</div>
          <ButtonRow actions={[{ label: "View All Resources", href: "/resources", variant: "secondary" }]} />
        </div>
      </section>

      <section className="home-band section-dark">
        <div className="container section-split">
          <div><div className="eyebrow">VOLUNTARY GIVING</div><h2>Support our local church.</h2><p>Contributions can support worship, Sunday School, the Reading Room, public events, and the care of our church home.</p></div>
          <ButtonRow actions={[{ label: "Ways to Give", href: "/give", variant: "secondary" }]} />
        </div>
      </section>

      <section className="section section-stone">
        <div className="container section-split">
          <div><div className="eyebrow">VISIT US IN AURORA</div><h2>First Church of Christ, Scientist, Aurora</h2><p>15700 E. Quincy Avenue<br />Aurora, Colorado 80015<br />(303) 766-0620</p><ButtonRow actions={[{ label: "Get Directions", href: "/visit/directions-parking", variant: "primary" }, { label: "Contact Us", href: "/contact", variant: "secondary" }]} /></div>
          <div className="map-embed">
            <iframe
              src="https://www.google.com/maps?q=15700+E.+Quincy+Avenue,+Aurora,+CO+80015&output=embed"
              title="Map showing First Church of Christ, Scientist, Aurora at 15700 E. Quincy Avenue, Aurora, Colorado 80015"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {isContentReviewMode ? <div className="review-page-note">Homepage review mode includes campaign and content placeholders that are hidden from the public build.</div> : null}
    </>
  );
}
