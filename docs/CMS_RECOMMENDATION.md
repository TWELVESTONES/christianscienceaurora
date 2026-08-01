# CMS Recommendation and Adapter Strategy

## Recommended configuration

Payload CMS with PostgreSQL is recommended because it supports TypeScript-native schemas, role access, drafts, revisions, scheduled publishing, hooks, admin customization, and self-hosted control. The public interface is not hard-locked to Payload: all reads and provider-specific operations pass through adapter interfaces.

## Collections

Users, Pages, Campaign Banners, Events, Sermons, Articles, Products, Orders, Sunday School Resources, External Resources, Media, Forms, Giving Funds, Menus, Redirects, Compliance Reviews, Audit Log.

## Required shared fields

- publication status
- content owner
- reviewer and review date
- last-confirmed date for facts
- rights/permissions status
- accessibility status
- SEO status
- publish and expiration dates
- revision history
- audit metadata

## Media fields

Source, owner, license, model release, youth release, permitted use, expiration, alt text, caption, crop variants, metadata-stripped status, reviewer, review date.
