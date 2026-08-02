import Link from "next/link";
import type { ContentCard } from "@/lib/types";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { linkifyText } from "@/lib/linkify";

export function Card({ card }: { card: ContentCard }) {
  const content = (
    <article className="card">
      {card.image ? <div style={{ margin: "-1.45rem -1.45rem 1.1rem" }}><PhotoPlaceholder image={card.image} /></div> : null}
      {card.eyebrow ? <span className="eyebrow">{card.eyebrow}</span> : null}
      <h3>{card.title}</h3>
      <p>{card.href ? card.text : linkifyText(card.text)}</p>
      {card.meta ? <span className="card-meta">{card.meta}</span> : null}
      {card.action ? <span className="card-action">{card.action} <span aria-hidden="true">→</span></span> : null}
    </article>
  );
  if (!card.href) return content;
  if (card.href.startsWith("http")) return <a href={card.href} target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "inherit" }}>{content}</a>;
  if (card.href.startsWith("tel:") || card.href.startsWith("mailto:") || card.href.startsWith("#")) return <a href={card.href} style={{ textDecoration: "none", color: "inherit" }}>{content}</a>;
  return <Link href={card.href} style={{ textDecoration: "none", color: "inherit" }}>{content}</Link>;
}

export function CardGrid({ cards }: { cards: ContentCard[] }) {
  const countClass = cards.length === 2 ? "two" : cards.length >= 4 ? "four" : "";
  return <div className={`card-grid ${countClass}`.trim()}>{cards.map((card, index) => <Card key={`${card.title}-${index}`} card={card} />)}</div>;
}
