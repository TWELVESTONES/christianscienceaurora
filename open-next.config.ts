import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Every page on this site is prerendered at build time and there is no on-demand
// revalidation, so prerendered HTML is served straight from Workers static assets
// instead of being re-rendered by React on every request. Cache interception lets a
// cached page short-circuit the routing layer before the Next.js server runs at all.
// Without this the adapter defaults to a "dummy" (no-op) incremental cache, which made
// every single page view a full server render inside the Worker (Cloudflare Error 1102).
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true
});
