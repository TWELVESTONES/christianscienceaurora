import type { PageSection } from "@/lib/types";
import { ButtonRow } from "@/components/Buttons";
import { CardGrid } from "@/components/Cards";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { isContentReviewMode } from "@/lib/review-mode";
import { linkifyText } from "@/lib/linkify";

export function SectionRenderer({ section }: { section: PageSection }) {
  const style = section.style ?? "default";
  return (
    <section id={section.id} className={`section section-${style}`}>
      <div className="container">
        <div className={section.image || section.video ? "section-split" : ""}>
          <div>
            {(section.eyebrow || section.title || section.intro) ? (
              <header className="section-heading">
                {section.eyebrow ? <div className="eyebrow">{section.eyebrow}</div> : null}
                {section.title ? <h2>{section.title}</h2> : null}
                {section.intro ? <p>{section.intro}</p> : null}
              </header>
            ) : null}
            {section.body?.length ? <div className="section-body">{section.body.map((paragraph, index) => <p key={index}>{linkifyText(paragraph)}</p>)}</div> : null}
            {section.cards?.length ? <CardGrid cards={section.cards} /> : null}
            {section.faq?.length ? (
              <div className="faq-list">
                {section.faq.map((item) => (
                  <details key={item.question}>
                    <summary>{item.question}</summary>
                    <p>{linkifyText(item.answer)}</p>
                  </details>
                ))}
              </div>
            ) : null}
            <ButtonRow actions={section.actions} />
            {section.confirmationNote ? (
              isContentReviewMode ? (
                <div className="confirmation-note"><strong>Church confirmation required:</strong> {section.confirmationNote}</div>
              ) : (
                <div className="public-status-note"><strong>Details being confirmed.</strong> Current information will be posted here before launch.</div>
              )
            ) : null}
          </div>
          {section.image ? <PhotoPlaceholder image={section.image} /> : null}
          {section.video ? (
            <div className="video-embed">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${section.video.youtubeId}`}
                title={section.video.title}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allow="accelerometer; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
