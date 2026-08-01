# Requirement-to-Implementation QA Matrix

Status meanings: **Implemented** = working in local build; **Adapter ready** = interface/UI/data model included but provider credentials required; **Church confirmation** = intentionally blocked until verified; **Production integration** = requires deployed CMS/auth/provider.

| Requirement | Status | Implementation |
|---|---|---|
| Approved text-only wordmark | Implemented | `components/Wordmark.tsx`; no emblem or pictorial mark |
| Inter Display headings / Inter body | Implemented | CSS stack in `app/globals.css`; font files are not bundled |
| Approved palette and spacing | Implemented | CSS design tokens and responsive components |
| Full public sitemap | Implemented | `content/pages.ts`, catch-all routes, system pages |
| Public/review content modes | Implemented | Production-safe filtering and private confirmation/placeholder review mode |
| Homepage campaign banner | Implemented | Single administrator-style banner; no rotation |
| Persistent service strip | Implemented | Header service strip with editable seed content |
| Visit subpages | Implemented | Visit, directions, expectations, FAQ, accessibility |
| Services subpages | Implemented | Sunday, Wednesday, Attend Online placeholder, Bible Lesson info |
| Sermon library/detail | Implemented | Filters, media/transcript placeholders, rights notes, schema |
| Sunday School section | Implemented | Parent/student content, filters, detail pages, safeguards |
| Reading Room and store | Implemented / Adapter ready | Landing, shop, products, cart, checkout boundary |
| Month calendar | Implemented | Accessible grid and controls |
| Annual event list and print | Implemented | `/events/year` and print CSS |
| Recurrence, status, archive | Implemented in data model/UI | Event types and archive page |
| iCal and Google Calendar | Implemented | Dynamic event links |
| Articles and categories | Implemented | Library, category, article detail |
| About and relationship notice | Implemented | Local branch identity separated from Mother Church |
| External resources content type | Implemented | Seed records, review fields, external-link notices |
| Give | Adapter ready / Church confirmation | Calm UI; provider disabled until approved |
| Search | Implemented local | Client-side seed index; hosted adapter boundary included |
| Contact form | Implemented / Adapter ready | Zod validation, rate limiting, same-origin check, honeypot, and console/Resend/webhook delivery |
| Privacy, accessibility, terms | Draft framework | Requires final legal/vendor review |
| Sitemap, robots, llms.txt | Implemented | App routes and metadata |
| 404 | Implemented | `app/not-found.tsx` |
| CMS adapter layer | Implemented / Adapter ready | Local adapter plus Payload-compatible REST adapter with schema validation and revalidation |
| Role-based admin model | Implemented as preview/docs | Production authentication/CMS integration required |
| Workflow and audit requirements | Modeled | Docs, schemas, migration; CMS implementation required |
| 2FA and least privilege | Production integration | Required in CMS deployment |
| Revisions/scheduling/audit logs | Production integration | Collection model and docs provided |
| Media/search/payment/email/analytics boundaries | Implemented | Adapter interfaces in `lib/adapters` |
| Database migration/seed | Implemented | `database/migrations/0001_initial.sql`, `database/seed.sql` |
| Schema.org entities | Implemented | Organization, Event, Article, Product, Audio/Video, WebPage |
| XML sitemap / canonical metadata | Implemented | Next metadata routes and per-page metadata |
| Accessibility target | Implemented baseline | Keyboard, focus, type sizing, semantics, forms, calendar, reduced motion; manual audit still required |
| Automated unit tests | Implemented | Zod and route data tests |
| Automated E2E tests | Implemented | Navigation, search, contact, calendar, 404 |
| Automated accessibility tests | Implemented | Axe Playwright test |
| Redirect plan | Implemented | Next redirects plus migration plan document |
| Mockup images | Implemented | 46 desktop and 12 priority mobile public mockups, plus 5 desktop and 5 mobile review-mode detail/transaction templates |
| Photo prompt Word document | Implemented | 27 mapped assets with production briefs, AI prompts, negative prompts, alt text, permissions, and filenames |
