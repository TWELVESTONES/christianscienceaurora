/**
 * Recommended CMS configuration outline: Payload CMS with PostgreSQL and S3-compatible media.
 * This file is intentionally excluded from the build so the public UI remains vendor-neutral.
 * Translate schemas in lib/schemas.ts into Payload collections, preserve adapters, and enforce
 * the role/workflow matrix documented in docs/ADMIN_ROLES_WORKFLOW.md.
 */
export const recommendedPayloadConfiguration = {
  database: "PostgreSQL",
  authentication: { twoFactor: true, sessionTimeoutMinutes: 60 },
  collections: [
    "users", "pages", "campaignBanners", "events", "sermons", "articles", "products", "orders",
    "sundaySchoolResources", "externalResources", "media", "forms", "givingFunds", "menus", "redirects", "auditLog"
  ],
  workflow: ["draft", "content-review", "rights-review", "accessibility-review", "seo-review", "approved", "scheduled", "published", "archived"]
};
