# Deployment

## Recommended topology

- Public application: Vercel, Cloudflare, or equivalent Node-compatible platform
- CMS: managed Payload CMS deployment with PostgreSQL
- Media: S3-compatible object storage plus CDN
- Email: transactional provider through `EmailAdapter`
- Search: local index initially; hosted provider only if scale requires it
- Payments: Stripe or approved provider through `PaymentsAdapter`

## Environments

Maintain separate local, staging, and production environments. Staging must use separate credentials, payment test mode, non-indexable robots settings, and restricted access.

## Release process

1. Run the full QA command.
2. Verify the church-confirmation register.
3. Review permission, youth, accessibility, SEO, and legal gates.
4. Take database and media backups.
5. Deploy to staging and execute critical-path tests.
6. Obtain named launch approval.
7. Deploy production and verify DNS, redirects, forms, search, payments, analytics, structured data, sitemaps, and monitoring.

## Security

Require 2FA for privileged users, rotate secrets, use least-privilege service accounts, apply security headers, monitor dependencies, log administrative actions, and test recovery procedures.
