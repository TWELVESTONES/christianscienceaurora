import { publicArticles, publicEvents, publicProducts, publicSermons, publicSundaySchoolResources } from "@/content/public-data";
import type { ArticleItem, EventItem, ProductItem, SermonItem, SundaySchoolResource } from "@/lib/types";
import { publicSafeText } from "@/lib/review-mode";
import type { PageDefinition } from "@/lib/types";

export type DynamicContentSources = {
  events: EventItem[];
  sermons: SermonItem[];
  articles: ArticleItem[];
  products: ProductItem[];
  sundaySchoolResources: SundaySchoolResource[];
};

const defaultSources: DynamicContentSources = {
  events: publicEvents,
  sermons: publicSermons,
  articles: publicArticles,
  products: publicProducts,
  sundaySchoolResources: publicSundaySchoolResources,
};

export function deriveDynamicPage(path: string, sources: DynamicContentSources = defaultSources): PageDefinition | undefined {
  const { events, sermons, articles, products, sundaySchoolResources } = sources;
  if (path.startsWith("/events/")) {
    const slug = path.split("/").at(-1) ?? "";
    const event = events.find((item) => item.slug === slug);
    if (!event) return undefined;
    return {
      path,
      eyebrow: `${event.category.toUpperCase()} · ${event.status.toUpperCase()}`,
      title: event.title,
      description: event.summary,
      pageType: "standard",
      actions: [
        { label: "Add to Calendar", href: `data:text/calendar;charset=utf-8,BEGIN:VCALENDAR%0ABEGIN:VEVENT%0ASUMMARY:${encodeURIComponent(event.title)}%0ADTSTART:${event.start.replace(/[-:]/g, "").replace(".000", "")}%0ADTEND:${event.end.replace(/[-:]/g, "").replace(".000", "")}%0AEND:VEVENT%0AEND:VCALENDAR`, variant: "primary", external: true },
        { label: "Google Calendar", href: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&location=${encodeURIComponent(event.location)}`, variant: "secondary", external: true }
      ],
      sections: [
        {
          id: "event-details",
          title: "Event details",
          cards: [
            { title: "When", text: new Date(event.start).toLocaleString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit", timeZone: "America/Denver" }), meta: event.timezone },
            { title: "Where", text: event.location },
            { title: "Cost", text: event.cost ?? "Not specified" },
            { title: "Family suitability", text: event.familySuitable ? "Family suitable" : "Audience details pending" },
            { title: "Accessibility", text: publicSafeText(event.accessibility) },
            { title: "Parking", text: publicSafeText(event.parking) }
          ]
        },
        { id: "expect", title: "What to expect", body: [event.summary, event.recurring ? `Recurrence: ${event.recurring}` : "This is a one-time event."], style: "teal-mist" }
      ]
    };
  }

  if (path.startsWith("/sermons/")) {
    const slug = path.split("/").at(-1) ?? "";
    const sermon = sermons.find((item) => item.slug === slug);
    if (!sermon) return undefined;
    return {
      path,
      eyebrow: `${sermon.serviceDate} · ${sermon.topic}`,
      title: sermon.title,
      description: sermon.summary,
      pageType: "sermon-detail",
      sections: [
        { id: "overview", title: "Overview", body: [sermon.summary, "This seed record demonstrates a permission-aware media page. Replace only after review."] },
        { id: "transcript", title: "Transcript placeholder", body: ["[AUTHORIZED TRANSCRIPT CONTENT WILL APPEAR HERE AFTER RIGHTS/PERMISSIONS REVIEW.]"], confirmationNote: `Rights status: ${sermon.rightsStatus}.` }
      ]
    };
  }

  if (path.startsWith("/articles/")) {
    const slug = path.split("/").at(-1) ?? "";
    const article = articles.find((item) => item.slug === slug);
    if (!article) return undefined;
    return {
      path,
      eyebrow: article.category.toUpperCase(),
      title: article.title,
      description: article.summary,
      pageType: "article-detail",
      sections: [
        { id: "metadata", eyebrow: `By ${article.author} · ${article.publishedAt} · ${article.readingTime}`, title: "A concise local article template", body: [article.summary] },
        { id: "question", title: "What is the practical idea?", body: ["Use short paragraphs, question-led headings, accurate citations, clear source labels, published and updated dates, and related official resources.", "External material should be summarized and linked rather than republished unless permission is documented."], style: "teal-mist" }
      ]
    };
  }

  if (path.startsWith("/reading-room/shop/")) {
    const slug = path.split("/").at(-1) ?? "";
    const product = products.find((item) => item.slug === slug);
    if (!product) return undefined;
    return {
      path,
      eyebrow: `${product.category.toUpperCase()} · PRODUCT PLACEHOLDER`,
      title: product.title,
      description: `${product.author}. ${product.format}.`,
      pageType: "product-detail",
      actions: [{ label: "Add to Cart", href: "/reading-room/cart", variant: "primary" }, { label: "Ask About This Item", href: "/contact", variant: "secondary" }],
      sections: [
        { id: "product", title: "Product details", cards: [
          { title: "Author / Publisher", text: product.author },
          { title: "Format", text: product.format },
          { title: "Availability", text: product.availability },
          { title: "Price", text: product.price > 0 ? `$${product.price.toFixed(2)}` : "Requires inventory confirmation" }
        ] },
        { id: "permission", title: "Permission-aware product imagery", body: ["Use complete cover images and approved descriptions only within permitted product-promotional contexts."], style: "teal-mist" }
      ]
    };
  }

  if (path.startsWith("/sunday-school/resources/")) {
    const slug = path.split("/").at(-1) ?? "";
    const resource = sundaySchoolResources.find((item) => item.slug === slug);
    if (!resource) return undefined;
    return {
      path,
      eyebrow: `${resource.type.toUpperCase()} · ${resource.ageGroup.toUpperCase()} · ${resource.estimatedTime.toUpperCase()}`,
      title: resource.title,
      description: resource.summary,
      pageType: "children-detail",
      actions: [{ label: "Start Activity", href: "#instructions", variant: "primary" }, { label: "Back to Activities", href: "/sunday-school/activities", variant: "secondary" }],
      sections: [
        { id: "details", title: "Activity details", cards: [
          { title: "Topic", text: resource.topic }, { title: "Delivery", text: resource.delivery }, { title: "Grown-up help", text: resource.adultAssistance }
        ] },
        { id: "instructions", title: "Let’s begin", body: ["Use short numbered instructions, simple materials, an open-ended reflection question, and one idea to try during the week."], style: "gold-accent" },
        { id: "download", title: "Download note", body: ["Ask a grown-up before downloading or printing. Accessible PDF and original-artwork requirements apply."] }
      ]
    };
  }

  return undefined;
}
