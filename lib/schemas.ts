import { z } from "zod";

export const imagePlaceholderSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  productionNote: z.string().min(10),
  altText: z.string().min(5),
  aspectRatio: z.enum(["16:9", "4:3", "3:2", "1:1", "2:3"]).optional(),
  youthReleaseRequired: z.boolean().optional()
});

export const eventSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(3),
  summary: z.string().min(10),
  category: z.enum(["Service", "Talk", "Reading Room", "Family", "Community"]),
  start: z.iso.datetime({ offset: true }),
  end: z.iso.datetime({ offset: true }),
  timezone: z.string().min(3),
  location: z.string().min(3),
  recurring: z.string().optional(),
  status: z.enum(["scheduled", "postponed", "canceled", "completed"]),
  featured: z.boolean().optional(),
  cost: z.string().optional(),
  accessibility: z.string().optional(),
  parking: z.string().optional(),
  familySuitable: z.boolean().optional()
});

export const sermonSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(3),
  serviceDate: z.iso.date(),
  topic: z.string().min(2),
  summary: z.string().min(10),
  formats: z.array(z.enum(["audio", "video", "text"])).min(1),
  duration: z.string().optional(),
  rightsStatus: z.enum(["placeholder", "approved", "restricted"])
});

export const articleSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(3),
  category: z.string().min(2),
  summary: z.string().min(10),
  author: z.string().min(2),
  publishedAt: z.iso.date(),
  updatedAt: z.iso.date(),
  readingTime: z.string().min(2)
});

export const productSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(3),
  author: z.string().min(2),
  category: z.string().min(2),
  price: z.number().nonnegative(),
  format: z.string().min(2),
  availability: z.enum(["In stock", "Out of stock", "Special order"]),
  permissionStatus: z.enum(["placeholder", "approved"])
});

export const contactFormSchema = z.object({
  name: z.string().min(2, "Enter your name."),
  email: z.email("Enter a valid email address."),
  phone: z.string().max(30).optional(),
  topic: z.enum([
    "Planning a Visit",
    "Sunday Service",
    "Wednesday Meeting",
    "Sunday School",
    "Reading Room",
    "Events",
    "Giving",
    "Accessibility",
    "Other"
  ]),
  message: z.string().min(10, "Please include a little more detail.").max(4000),
  website: z.string().max(0).optional()
});

export const checkoutSchema = z.object({
  email: z.email(),
  fulfillment: z.enum(["pickup", "shipping"]),
  consent: z.literal(true),
  items: z.array(z.object({ slug: z.string(), quantity: z.number().int().positive() })).min(1)
});

export const linkItemSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  external: z.boolean().optional(),
  variant: z.enum(["primary", "secondary", "text"]).optional(),
});

export const contentCardSchema = z.object({
  eyebrow: z.string().optional(),
  title: z.string().min(1),
  text: z.string().min(1),
  href: z.string().optional(),
  action: z.string().optional(),
  image: imagePlaceholderSchema.optional(),
  meta: z.string().optional(),
});

export const pageSectionSchema = z.object({
  id: z.string().min(1),
  eyebrow: z.string().optional(),
  title: z.string().optional(),
  intro: z.string().optional(),
  body: z.array(z.string()).optional(),
  cards: z.array(contentCardSchema).optional(),
  actions: z.array(linkItemSchema).optional(),
  style: z.enum(["default", "stone", "teal-mist", "periwinkle-mist", "dark", "gold-accent"]).optional(),
  image: imagePlaceholderSchema.optional(),
  confirmationNote: z.string().optional(),
  faq: z.array(z.object({ question: z.string().min(1), answer: z.string().min(1) })).optional(),
});

export const pageDefinitionSchema = z.object({
  path: z.string().startsWith("/"),
  title: z.string().min(1),
  eyebrow: z.string().optional(),
  description: z.string().min(1),
  directAnswer: z.union([z.string(), z.array(z.string())]).optional(),
  heroImage: imagePlaceholderSchema.optional(),
  actions: z.array(linkItemSchema).optional(),
  sections: z.array(pageSectionSchema),
  pageType: z.enum([
    "standard", "calendar", "sermon-library", "sermon-detail", "article-library", "article-detail",
    "resource-library", "product-library", "product-detail", "children-library", "children-detail",
    "contact", "giving", "search", "admin", "legal", "checkout"
  ]).optional(),
  status: z.enum(["draft", "content-review", "rights-review", "accessibility-review", "seo-review", "approved", "scheduled", "published", "archived"]).optional(),
  churchConfirmation: z.array(z.string()).optional(),
  seoTitle: z.string().optional(),
});

export const externalResourceSchema = z.object({
  name: z.string().min(1),
  url: z.url(),
  description: z.string().min(1),
  category: z.string().min(1),
  featured: z.boolean(),
  order: z.number(),
  image: imagePlaceholderSchema.optional(),
  reviewDate: z.iso.date(),
  owner: z.string().min(1),
  publicationStatus: z.enum(["draft", "content-review", "rights-review", "accessibility-review", "seo-review", "approved", "scheduled", "published", "archived"]),
});

export const sundaySchoolResourceSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  type: z.string().min(1),
  ageGroup: z.string().min(1),
  topic: z.string().min(1),
  estimatedTime: z.string().min(1),
  delivery: z.enum(["Printable", "Online"]),
  adultAssistance: z.enum(["None", "A little", "Recommended"]),
  summary: z.string().min(1),
});
