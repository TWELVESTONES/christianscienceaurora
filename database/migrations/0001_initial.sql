BEGIN;
CREATE TYPE publication_status AS ENUM ('draft','content_review','rights_review','accessibility_review','seo_review','approved','scheduled','published','archived');
CREATE TABLE content_items (
  id uuid PRIMARY KEY,
  type text NOT NULL,
  slug text NOT NULL,
  title text NOT NULL,
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  status publication_status NOT NULL DEFAULT 'draft',
  owner_id uuid,
  reviewer_id uuid,
  rights_status text NOT NULL DEFAULT 'unreviewed',
  accessibility_status text NOT NULL DEFAULT 'unreviewed',
  seo_status text NOT NULL DEFAULT 'unreviewed',
  publish_at timestamptz,
  expire_at timestamptz,
  last_confirmed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(type, slug)
);
CREATE TABLE media_assets (
  id uuid PRIMARY KEY,
  filename text NOT NULL,
  url text NOT NULL,
  mime_type text NOT NULL,
  alt_text text NOT NULL,
  caption text,
  source text NOT NULL,
  license text,
  model_release_status text NOT NULL DEFAULT 'not_applicable',
  youth_release_status text NOT NULL DEFAULT 'not_applicable',
  metadata_stripped boolean NOT NULL DEFAULT false,
  rights_status text NOT NULL DEFAULT 'unreviewed',
  review_date date,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE redirects (
  id bigserial PRIMARY KEY,
  source_path text UNIQUE NOT NULL,
  destination_path text NOT NULL,
  status_code integer NOT NULL DEFAULT 301,
  active boolean NOT NULL DEFAULT true
);
CREATE TABLE audit_log (
  id bigserial PRIMARY KEY,
  actor_id uuid,
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_id text NOT NULL,
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
COMMIT;
