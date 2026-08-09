import Link from "next/link";
import { EventSchema } from "@/components/StructuredData";
import type { EventItem } from "@/lib/types";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// The month grid below is currently pinned to a single displayed month (see calendarMonthLabel).
const displayedYear = 2026;
const displayedMonthIndex = 6; // July (0-indexed)
const calendarMonthLabel = "July 2026";
const daysInDisplayedMonth = new Date(displayedYear, displayedMonthIndex + 1, 0).getDate();
const firstWeekdayOfDisplayedMonth = new Date(displayedYear, displayedMonthIndex, 1).getDay();
const trailingBlanks = (7 - ((firstWeekdayOfDisplayedMonth + daysInDisplayedMonth) % 7)) % 7;
// Leading/trailing nulls keep each date under its correct weekday column instead of always starting at "1" under Sunday.
const cells: Array<number | null> = [
  ...Array.from({ length: firstWeekdayOfDisplayedMonth }, () => null),
  ...Array.from({ length: daysInDisplayedMonth }, (_, i) => i + 1),
  ...Array.from({ length: trailingBlanks }, () => null)
];

// event.start is an ISO string with a fixed -06:00 offset; formatting it without an explicit
// America/Denver timeZone lets the server's own timezone (typically UTC) roll evening events
// to the next calendar day (e.g. a 7:00 p.m. event would otherwise show one day late).
function formatDateBox(iso: string) {
  const date = new Date(iso);
  return {
    month: date.toLocaleString("en-US", { month: "short", timeZone: "America/Denver" }).toUpperCase(),
    day: date.toLocaleString("en-US", { day: "numeric", timeZone: "America/Denver" })
  };
}

function EventEmptyState() {
  return (
    <div className="empty-state">
      <div className="eyebrow">WEEKLY SERVICES CONTINUE</div>
      <h2>No special events are posted for this period.</h2>
      <p>Sunday service and Sunday School meet at 10:00 a.m. Wednesday testimony meetings begin at 7:30 p.m.</p>
      <div className="button-row"><Link className="btn btn-primary" href="/services">View Weekly Services</Link></div>
    </div>
  );
}

export function EventCalendar({ annual = false, events = [] }: { annual?: boolean; events?: EventItem[] }) {
  const publicEvents = events;
  if (annual) {
    return (
      <div>
        <div className="filter-bar" aria-label="Event filters">
          <label htmlFor="event-search">Search</label><input id="event-search" placeholder="Search events" />
          <label htmlFor="event-category">Category</label><select id="event-category" defaultValue="All"><option>All</option><option>Services</option><option>Talks</option><option>Reading Room</option><option>Families</option><option>Community</option></select>
          <label><input type="checkbox" defaultChecked /> Show recurring services</label>
        </div>
        {publicEvents.length ? (
          <div className="card-grid two">
            {publicEvents.map((event) => {
              const date = new Date(event.start);
              const dateBox = formatDateBox(event.start);
              return (
                <article key={event.slug} className="event-row">
                  <div className="date-box"><span>{dateBox.month}<br />{dateBox.day}</span></div>
                  <div>
                    <div className="eyebrow">{event.category} · {event.status}</div>
                    <h3><Link href={`/events/${event.slug}`}>{event.title}</Link></h3>
                    <p>{event.summary}</p>
                    <p className="card-meta">{date.toLocaleString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit", timeZone: "America/Denver" })} · {event.location}</p>
                  </div>
                  <EventSchema event={event} />
                </article>
              );
            })}
          </div>
        ) : <EventEmptyState />}
      </div>
    );
  }

  const sundayEvent = publicEvents.find((event) => event.category === "Service" && event.title.includes("Sunday"));
  const wednesdayEvent = publicEvents.find((event) => event.category === "Service" && event.title.includes("Wednesday"));

  return (
    <div>
      <div className="filter-bar" aria-label="Event filters">
        <label htmlFor="calendar-search">Search</label><input id="calendar-search" placeholder="Search events" />
        <label htmlFor="calendar-category">Category</label><select id="calendar-category" defaultValue="All"><option>All</option><option>Services</option><option>Talks</option><option>Reading Room</option><option>Families</option><option>Community</option></select>
        <label htmlFor="calendar-month">Month</label><select id="calendar-month" defaultValue="July 2026"><option>July 2026</option><option>August 2026</option><option>September 2026</option></select>
        <label><input type="checkbox" defaultChecked /> Show recurring services</label>
      </div>
      <div className="calendar-shell" aria-label={`${calendarMonthLabel} events calendar`}>
        <div className="calendar-toolbar">
          <div className="calendar-actions"><button aria-label="Previous month">←</button><button>Today</button><button aria-label="Next month">→</button></div>
          <h2>{calendarMonthLabel}</h2>
          <Link className="btn btn-secondary" href="/events/year">Year list</Link>
        </div>
        <div className="calendar-grid" role="grid" aria-label={calendarMonthLabel}>
          {days.map((day) => <div role="columnheader" className="calendar-cell calendar-head" key={day}>{day}</div>)}
          {cells.map((day, index) => (
            <div role="gridcell" className="calendar-cell" key={index} aria-label={day ? `July ${day}, 2026` : undefined} aria-hidden={day ? undefined : true}>
              {day ? (
                <>
                  <span className="calendar-day">{day}</span>
                  {day === 19 && sundayEvent ? <Link className="calendar-event" href={`/events/${sundayEvent.slug}`}>10:00 Sunday Service</Link> : null}
                  {day === 22 && wednesdayEvent ? <Link className="calendar-event" href={`/events/${wednesdayEvent.slug}`}>7:30 Testimony Meeting</Link> : null}
                </>
              ) : null}
            </div>
          ))}
        </div>
      </div>
      <div className="events-next-section">
        <h2>Next events</h2>
        {publicEvents.length ? (
          <div className="card-grid two">
            {publicEvents.map((event) => {
              const dateBox = formatDateBox(event.start);
              return <article className="event-row" key={event.slug}><div className="date-box"><span>{dateBox.month}<br />{dateBox.day}</span></div><div><div className="eyebrow">{event.category}</div><h3><Link href={`/events/${event.slug}`}>{event.title}</Link></h3><p>{event.summary}</p><p className="card-meta">{event.location}</p></div><EventSchema event={event} /></article>;
            })}
          </div>
        ) : <EventEmptyState />}
      </div>
    </div>
  );
}
