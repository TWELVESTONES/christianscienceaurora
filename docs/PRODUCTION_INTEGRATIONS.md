# Phase 1 Production Integrations

## CMS

The public website supports:

- `CMS_PROVIDER=local` for the bundled review and seed content.
- `CMS_PROVIDER=payload` for a Payload-compatible REST API.

For Payload mode, configure `CMS_API_URL` and optionally `CMS_API_TOKEN`. The adapter validates pages, events, sermons, articles, products, Sunday School resources, and external resources before rendering. CMS requests use five-minute revalidation and provider-specific cache tags.

The recommended Payload collection slugs are:

- `pages`
- `events`
- `sermons`
- `articles`
- `products`
- `sunday-school-resources`
- `external-resources`

The public UI remains behind the `CmsAdapter` boundary so the CMS can be changed later.

## Contact email

Supported email modes:

- `console`: local development only.
- `resend`: configure `RESEND_API_KEY`, `EMAIL_FROM`, and `EMAIL_TO`.
- `webhook`: configure `EMAIL_WEBHOOK_URL` and optional `EMAIL_WEBHOOK_SECRET`.

The contact endpoint validates fields, uses a honeypot, checks same-origin requests, limits repeated submissions, avoids logging message text, and returns accessible success and error messages.

## Launch requirement

Production must not use the console email adapter. Test successful delivery, provider failure, invalid fields, rate limiting, and replies to the submitter before launch.
