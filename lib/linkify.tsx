import type { ReactNode } from "react";

const PHONE_PATTERN = /\(\d{3}\)\s?\d{3}-\d{4}/g;
const EMAIL_PATTERN = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

function toTelHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return `tel:+1${digits}`;
}

function linkifyPlainSegment(text: string, keyPrefix: string): ReactNode[] {
  const combined = new RegExp(`${PHONE_PATTERN.source}|${EMAIL_PATTERN.source}`, "g");
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = combined.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    const value = match[0];
    if (value.includes("@")) {
      parts.push(<a key={`${keyPrefix}-${key++}`} href={`mailto:${value}`}>{value}</a>);
    } else {
      parts.push(<a key={`${keyPrefix}-${key++}`} href={toTelHref(value)}>{value}</a>);
    }
    lastIndex = match.index + value.length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

/**
 * Renders plain text as React nodes, with a minimal opt-in inline-markup
 * convention on top of automatic phone/email linking:
 *  - `***text***` renders bold italic (e.g. scripture/S&H citation lines)
 *  - `**text**` renders bold (e.g. reading labels like a Bible book name)
 *  - phone numbers and email addresses become real tel:/mailto: links
 * Content with no `*` characters renders exactly as before — this is
 * additive and never changes existing plain-text paragraphs.
 * Use for any body copy, card text, or FAQ answer that may contain
 * contact details or this markup.
 */
export function linkifyText(text: string): ReactNode {
  const markup = /\*\*\*(.+?)\*\*\*|\*\*(.+?)\*\*/g;
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = markup.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(...linkifyPlainSegment(text.slice(lastIndex, match.index), `plain-${key}`));
    if (match[1] !== undefined) {
      parts.push(<strong key={`markup-${key}`}><em>{match[1]}</em></strong>);
    } else {
      parts.push(<strong key={`markup-${key}`}>{match[2]}</strong>);
    }
    key++;
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(...linkifyPlainSegment(text.slice(lastIndex), `plain-${key}`));
  return parts.length ? parts : text;
}
