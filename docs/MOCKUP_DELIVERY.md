# Phase 1 Webpage Mockup Delivery

The `mockups` directory contains static full-page PNG reviews generated from the working Next.js public build.

## Included

- `mockups/desktop/` - 46 desktop mockups at a 1440-pixel viewport
- `mockups/mobile/` - 12 priority mobile mockups at a 390-pixel viewport
- `mockups/index.json` - route, filename, viewport, and generation manifest
- `mockups/README.md` - generation and review notes
- `mockups/template-review/` - 5 desktop and 5 mobile designs for required detail/transaction templates that remain hidden or disabled in public mode

The desktop set covers all launchable public routes in production-safe mode plus the 404 page. Placeholder-only, administrative-preview, cart, and checkout routes are intentionally excluded because they are not public launch pages.

The public mobile set covers the highest-priority page families: Home, Plan Your Visit, Services, Sermons, Events, Sunday School, Reading Room, Articles, About, Resources, Give, and Contact. The review-template set adds mobile treatments for sermon detail, event detail, product detail, cart, and checkout.

## Review method

Review the mockups for hierarchy, visual tone, content sequence, legibility, call-to-action clarity, image placement, and missing church information. Functional behavior, keyboard access, screen-reader behavior, and responsive transitions must be reviewed in the private staging website rather than inferred from PNGs.

## Regeneration

Run the production build and server, then execute:

```bash
npm run mockups

# With a review-mode build running on port 3004
npm run mockups:review
```

The generator uses the route manifest and saves updated PNG files and metadata in the same directory.
