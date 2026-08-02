import type { ReactNode } from "react";

const PHONE_PATTERN = /\(\d{3}\)\s?\d{3}-\d{4}/g;
const EMAIL_PATTERN = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

function toTelHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return `tel:+1${digits}`;
}

/**
 * Renders plain text as React nodes, automatically converting phone numbers
 * and email addresses into real tel:/mailto: links. Use for any body copy,
 * card text, or FAQ answer that may contain contact details.
 */
export function linkifyText(text: string): ReactNode {
  const combined = new RegExp(`${PHONE_PATTERN.source}|${EMAIL_PATTERN.source}`, "g");
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = combined.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    const value = match[0];
    if (value.includes("@")) {
      parts.push(<a key={key++} href={`mailto:${value}`}>{value}</a>);
    } else {
      parts.push(<a key={key++} href={toTelHref(value)}>{value}</a>);
    }
    lastIndex = match.index + value.length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts.length ? parts : text;
}
