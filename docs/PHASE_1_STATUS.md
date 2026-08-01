# Phase 1 Status - Public Website

**Checkpoint:** 1 - public website foundation and complete route system  
**Status:** In progress  
**Last updated:** July 15, 2026

## Completed in this checkpoint

- Next.js App Router and strict TypeScript project foundation
- Approved Christian Science Aurora design tokens and typography stack
- Text-only CSA / Christian Science / Aurora wordmark component
- Responsive global header, service strip, footer, and mobile action bar
- Complete public route inventory and reusable page templates
- Homepage sequence required by the approved architecture
- Visit, services, sermons, Sunday School, Reading Room, events, articles, About, resources, giving, contact, search, legal, sitemap, and 404 pages
- Local seed content based on the approved website copy deck
- Clearly marked church-confirmation and rights/permissions placeholders
- Event month grid, annual list, event detail, archive, and add-to-calendar links
- Sermon library and detail presentation with media, transcript, citation, and permissions patterns
- Sunday School resource library and youth-content safeguards
- Reading Room product, cart, and checkout interface boundaries with payments disabled
- Local search and validated contact-form demonstration
- Canonical metadata, XML sitemap, robots.txt, structured data, and llms.txt
- CMS, media, payments, email, search, and analytics adapter interfaces
- Unit tests, linting, type checking, and production build

## Validation completed

- ESLint: passed
- TypeScript: passed
- Unit tests: passed
- Next.js production build: passed
- 58 static/dynamic build routes generated successfully

Automated browser tests are present. They could not execute in the current secured build environment because its Chromium policy blocks local loopback URLs. This is an environment restriction, not a website test failure. They must be run in a normal local, CI, or staging environment before launch.

## Next work in Phase 1

1. Review the first visual build against stakeholder expectations.
2. Refine desktop, tablet, and mobile page compositions.
3. Connect the public site to the selected production CMS through the existing adapter.
4. Configure domain email delivery for the contact form.
5. Replace or hide unresolved public placeholders according to church decisions.
6. Produce page-family mockups and then the full webpage mockup set.
7. Create the photography brief and AI image prompt Word document.
8. Add approved photography and final image crops.
9. Complete manual WCAG review and run browser-based accessibility tests in staging.
10. Deploy a private staging build for church review.

## Information still required from the church

- Preferred domain email and inquiry recipients
- Parking and preferred visitor entrance
- Confirmed accessibility accommodations
- Typical service duration and Children's Room details
- Remote attendance availability and public access policy
- Reading Room location, hours, phone, parking, and accessibility
- Current public events or lecture information
- Giving provider and approved giving methods
- Approved photos, releases, archival images, and publication permissions
- Legal approval of privacy, terms, commerce, and giving language

## Phase 1 launch rule

The public website may launch with advanced commerce, giving, and remote-attendance functions disabled. It must not launch with inaccurate service information, unresolved instructions presented as facts, unauthorized protected content, or unreviewed youth imagery.
