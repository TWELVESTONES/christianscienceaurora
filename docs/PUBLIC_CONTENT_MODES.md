# Public and Content-Review Modes

The public site has two presentation modes controlled by `NEXT_PUBLIC_CONTENT_REVIEW_MODE`.

## Public mode

Set `NEXT_PUBLIC_CONTENT_REVIEW_MODE=false` in production.

- Internal CMS notes, launch-gate registers, rights-status tags, and production instructions are hidden.
- Unapproved sermons and products are excluded.
- Placeholder event and product routes return 404.
- Unconfirmed details use concise public-safe status language.
- Photography placeholders show a neutral branded light field without internal production notes.

## Content-review mode

Set `NEXT_PUBLIC_CONTENT_REVIEW_MODE=true` only on private staging.

- Church-confirmation registers and photography production notes are visible.
- Placeholder events, sermons, products, and page routes are available for workflow review.
- A visible review-mode banner appears above the website.

Do not expose content-review mode on the public domain.
