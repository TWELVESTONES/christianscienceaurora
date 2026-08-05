export type PublicationStatus =
  | "draft"
  | "content-review"
  | "rights-review"
  | "accessibility-review"
  | "seo-review"
  | "approved"
  | "scheduled"
  | "published"
  | "archived";

export type ImagePlaceholder = {
  id: string;
  label: string;
  productionNote: string;
  altText: string;
  aspectRatio?: "16:9" | "4:3" | "3:2" | "1:1" | "2:3" | "3:4" | "1200:340";
  youthReleaseRequired?: boolean;
  /** Public path to an approved, on-site photograph (e.g. "/images/photography/sanctuary-wide.webp"). When set, PhotoPlaceholder renders this real photo instead of the gradient placeholder. */
  src?: string;
};

export type LinkItem = {
  label: string;
  href: string;
  external?: boolean;
  variant?: "primary" | "secondary" | "text";
};

export type ContentCard = {
  eyebrow?: string;
  title: string;
  text: string;
  href?: string;
  action?: string;
  image?: ImagePlaceholder;
  meta?: string;
};

export type PageSection = {
  id: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  body?: string[];
  cards?: ContentCard[];
  actions?: LinkItem[];
  style?: "default" | "stone" | "teal-mist" | "periwinkle-mist" | "dark" | "gold-accent";
  image?: ImagePlaceholder;
  confirmationNote?: string;
  faq?: Array<{ question: string; answer: string }>;
  /** Embedded video player (currently YouTube only, via the privacy-enhanced youtube-nocookie.com domain). Rendered as a responsive 16:9 iframe. */
  video?: { youtubeId: string; title: string };
};

export type PageDefinition = {
  path: string;
  title: string;
  eyebrow?: string;
  description: string;
  directAnswer?: string;
  heroImage?: ImagePlaceholder;
  actions?: LinkItem[];
  sections: PageSection[];
  pageType?:
    | "standard"
    | "calendar"
    | "sermon-library"
    | "sermon-detail"
    | "article-library"
    | "article-detail"
    | "resource-library"
    | "product-library"
    | "product-detail"
    | "children-library"
    | "children-detail"
    | "contact"
    | "giving"
    | "search"
    | "admin"
    | "legal"
    | "checkout";
  status?: PublicationStatus;
  churchConfirmation?: string[];
  seoTitle?: string;
  /** Explicit meta keywords for pages targeting specific named entities/topics (e.g. a guest speaker's name). Most pages should leave this unset and rely on title/description. */
  keywords?: string[];
  /** Additional schema.org JSON-LD object(s) rendered alongside the default WebPage schema — e.g. an Event schema with a performer, for a page that is fundamentally about one event. */
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
};

export type EventItem = {
  slug: string;
  title: string;
  summary: string;
  category: "Service" | "Talk" | "Reading Room" | "Family" | "Community";
  start: string;
  end: string;
  timezone: string;
  location: string;
  recurring?: string;
  status: "scheduled" | "postponed" | "canceled" | "completed";
  featured?: boolean;
  cost?: string;
  accessibility?: string;
  parking?: string;
  familySuitable?: boolean;
  /** Attendance-format notice (e.g. "not broadcast or recorded" per Board of Lectureship directive). Rendered as a highlighted callout on the event detail page when set. */
  broadcastNotice?: string;
};

export type SermonItem = {
  slug: string;
  title: string;
  serviceDate: string;
  topic: string;
  summary: string;
  formats: Array<"audio" | "video" | "text">;
  duration?: string;
  rightsStatus: "placeholder" | "approved" | "restricted";
};

export type ArticleItem = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
};

export type ProductItem = {
  slug: string;
  title: string;
  author: string;
  category: string;
  price: number;
  format: string;
  availability: "In stock" | "Out of stock" | "Special order";
  permissionStatus: "placeholder" | "approved";
};

export type ExternalResource = {
  name: string;
  url: string;
  description: string;
  category: string;
  featured: boolean;
  order: number;
  image?: ImagePlaceholder;
  reviewDate: string;
  owner: string;
  publicationStatus: PublicationStatus;
};

export type SundaySchoolResource = {
  slug: string;
  title: string;
  type: string;
  ageGroup: string;
  topic: string;
  estimatedTime: string;
  delivery: "Printable" | "Online";
  adultAssistance: "None" | "A little" | "Recommended";
  summary: string;
};
