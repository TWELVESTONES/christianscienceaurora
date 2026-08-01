import Link from "next/link";
import { MediaSchema } from "@/components/StructuredData";
import { isContentReviewMode } from "@/lib/review-mode";
import type { SermonItem } from "@/lib/types";

export function SermonLibrary({ sermons = [] }: { sermons?: SermonItem[] }) {
  const publicSermons = sermons;
  return (
    <>
      <div className="filter-bar">
        <label htmlFor="sermon-search">Search</label><input id="sermon-search" placeholder="Search sermons and topics" />
        <label htmlFor="sermon-year">Year</label><select id="sermon-year"><option>2026</option></select>
        <label htmlFor="sermon-topic">Topic</label><select id="sermon-topic"><option>All topics</option><option>Peace</option><option>Hope</option><option>God’s Love</option></select>
        <label htmlFor="sermon-format">Format</label><select id="sermon-format"><option>All formats</option><option>Audio</option><option>Video</option><option>Text</option></select>
      </div>
      {publicSermons.length ? (
        <div className="card-grid">
          {publicSermons.map((sermon) => (
            <article className="card" key={sermon.slug}>
              <div className="eyebrow">{sermon.serviceDate} · {sermon.topic}</div>
              <h3><Link href={`/sermons/${sermon.slug}`}>{sermon.title}</Link></h3>
              <p>{sermon.summary}</p>
              <div className="tag-list">{sermon.formats.map((format) => <span className="tag" key={format}>{format}</span>)}{isContentReviewMode ? <span className="tag">Rights: {sermon.rightsStatus}</span> : null}</div>
              <p className="card-action"><Link href={`/sermons/${sermon.slug}`}>Listen, watch, or read →</Link></p>
              <MediaSchema sermon={sermon} />
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="eyebrow">APPROVED MEDIA ONLY</div>
          <h2>Sermons will appear here after review.</h2>
          <p>Text, audio, and video can be published after rights, permissions, transcript, captioning, accessibility, and editorial checks are complete.</p>
          <div className="button-row"><Link className="btn btn-primary" href="/services/sunday">About Sunday Service</Link></div>
        </div>
      )}
    </>
  );
}

export function SermonDetail({ sermon }: { sermon?: SermonItem | null }) {
  if (!sermon) return <div className="empty-state"><div className="eyebrow">MEDIA NOT YET PUBLISHED</div><h2>This sermon is not available.</h2><p>Only approved recordings, transcripts, and citations are published.</p></div>;
  return (
    <div className="section-split sermon-detail-grid">
      <div id="audio" className="media-panel">
        <div className="eyebrow">Accessible audio player</div>
        <h2 className="media-title">{sermon.title}</h2>
        <audio controls aria-label={`${sermon.title} audio`}>
          <track kind="captions" />
        </audio>
        <p className="card-meta">An approved recording and transcript are required for publication.</p>
        <div className="mock-video" aria-label="Captioned video area"><div><strong>Captioned video</strong><br />A poster, captions, transcript, and permissions record accompany published video.</div></div>
      </div>
      <aside className="card">
        <div className="eyebrow">SERMON RECORD</div>
        <h3>{sermon.topic}</h3>
        <p>Service date: {sermon.serviceDate}<br />Duration: {sermon.duration ?? "Not listed"}</p>
        <div className="tag-list"><span className="tag">{sermon.topic}</span></div>
        <div className="permission-note sermon-permission"><strong>Permissions safeguard</strong><br />Protected Bible Lesson text, recordings, citations, and imagery are published only after review.</div>
      </aside>
      <MediaSchema sermon={sermon} />
    </div>
  );
}
