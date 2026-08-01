"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const index = [
  ["Plan Your Visit", "/visit", "Service times, directions, what to expect, FAQ, accessibility"],
  ["Sunday Service", "/services/sunday", "Sunday worship at 10:00 a.m."],
  ["Wednesday Testimony Meeting", "/services/wednesday", "Wednesday at 7:30 p.m."],
  ["Sermons", "/sermons", "Audio, video, transcript, topics"],
  ["Sunday School", "/sunday-school", "Children, parents, activities, stories"],
  ["Reading Room", "/reading-room", "Books, study, questions, shop, events"],
  ["Events", "/events", "Month calendar, annual list, public talks"],
  ["Articles", "/articles", "Newcomer guides, local stories, spiritual resources"],
  ["What is Christian Science?", "/about/christian-science", "Bible, prayer, healing, official resources"],
  ["Resources", "/resources", "Official Christian Science links"],
  ["Give", "/give", "Voluntary giving information"],
  ["Contact", "/contact", "Address, phone, questions"]
] as const;

export function SearchView() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => index.filter((item) => `${item[0]} ${item[2]}`.toLowerCase().includes(query.toLowerCase())), [query]);
  return (
    <div>
      <label htmlFor="site-search" className="eyebrow">Search Christian Science Aurora</label>
      <div style={{ display: "flex", gap: ".65rem", margin: ".6rem 0 2rem", flexWrap: "wrap" }}><input id="site-search" className="search-input" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Christian Science Aurora" /><button className="btn btn-primary" type="button">Search</button></div>
      <p aria-live="polite">{results.length} result{results.length === 1 ? "" : "s"}{query ? ` for “${query}”` : ""}</p>
      <div className="card-grid two">{results.map(([title, href, text]) => <article className="card" key={href}><h3><Link href={href}>{title}</Link></h3><p>{text}</p><p className="card-action"><Link href={href}>Open page →</Link></p></article>)}</div>
      {!results.length ? <div className="confirmation-note">We could not find a match. Try a broader word, browse upcoming events, or contact us for help.</div> : null}
    </div>
  );
}
