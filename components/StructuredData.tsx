import type { ArticleItem, EventItem, PageDefinition, ProductItem, SermonItem } from "@/lib/types";
import { site } from "@/content/site";

export function JsonLd({ data }: { data: Record<string, unknown> | Array<Record<string, unknown>> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function OrganizationSchema() {
  return <JsonLd data={{
    "@context": "https://schema.org",
    "@type": ["Church", "PlaceOfWorship", "Organization"],
    name: site.name,
    alternateName: site.shortName,
    url: site.domain,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: "CO",
      postalCode: site.address.postalCode,
      addressCountry: site.address.country
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "10:00", closes: "11:00", description: "Sunday Service and Sunday School" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "19:30", closes: "20:30", description: "Wednesday Testimony Meeting" }
    ]
  }} />;
}

export function PageSchema({ page }: { page: PageDefinition }) {
  const extra = page.structuredData ? (Array.isArray(page.structuredData) ? page.structuredData : [page.structuredData]) : [];
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: page.title, description: page.description, url: `${site.domain}${page.path}` }} />
      {extra.map((data, index) => <JsonLd key={index} data={data} />)}
    </>
  );
}

export function EventSchema({ event }: { event: EventItem }) {
  return <JsonLd data={{
    "@context": "https://schema.org", "@type": "Event", name: event.title, description: event.summary,
    startDate: event.start, endDate: event.end, eventStatus: `https://schema.org/Event${event.status[0].toUpperCase()}${event.status.slice(1)}`,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: { "@type": "Place", name: site.shortName, address: event.location },
    organizer: { "@type": "Organization", name: site.name, url: site.domain }
  }} />;
}

export function ArticleSchema({ article }: { article: ArticleItem }) {
  return <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.summary, author: { "@type": "Organization", name: article.author }, datePublished: article.publishedAt, dateModified: article.updatedAt, publisher: { "@type": "Organization", name: site.name } }} />;
}

export function ProductSchema({ product }: { product: ProductItem }) {
  return <JsonLd data={{ "@context": "https://schema.org", "@type": "Product", name: product.title, brand: { "@type": "Brand", name: product.author }, offers: { "@type": "Offer", priceCurrency: "USD", price: product.price, availability: product.availability === "In stock" ? "https://schema.org/InStock" : "https://schema.org/PreOrder" } }} />;
}

export function MediaSchema({ sermon }: { sermon: SermonItem }) {
  const items: Array<Record<string, unknown>> = [];
  if (sermon.formats.includes("audio")) items.push({ "@context": "https://schema.org", "@type": "AudioObject", name: sermon.title, description: sermon.summary, duration: sermon.duration, uploadDate: sermon.serviceDate });
  if (sermon.formats.includes("video")) items.push({ "@context": "https://schema.org", "@type": "VideoObject", name: sermon.title, description: sermon.summary, uploadDate: sermon.serviceDate, thumbnailUrl: `${site.domain}/media-placeholder.jpg` });
  return <JsonLd data={items} />;
}
