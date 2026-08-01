# Setup, Development, and Testing

## Requirements

- Node.js 22+
- npm 10+
- PostgreSQL 16+ when the production CMS is connected

## Local development

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validation

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
npm run test:a11y
```

The local adapter uses TypeScript seed data. Production content must come from the CMS adapter and pass schema validation.

## Build order used

1. Design tokens and components
2. Content/data schemas and adapters
3. Public pages and templates
4. CMS/admin workflow model
5. Integrations and boundaries
6. Tests, documentation, redirects, and QA matrix
