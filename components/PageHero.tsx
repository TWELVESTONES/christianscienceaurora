import type { PageDefinition } from "@/lib/types";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ButtonRow } from "@/components/Buttons";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";

export function PageHero({ page }: { page: PageDefinition }) {
  return (
    <>
      <Breadcrumbs path={page.path} title={page.title} />
      <section className={`page-hero ${page.heroImage ? "" : "no-image"}`}>
        <div className="container page-hero-grid">
          <div>
            {page.eyebrow ? <div className="eyebrow">{page.eyebrow}</div> : null}
            <h1>{page.title}</h1>
            <p className="description">{page.description}</p>
            {page.directAnswer ? <div className="direct-answer"><strong>Info:</strong> {page.directAnswer}</div> : null}
            <ButtonRow actions={page.actions} />
          </div>
          {page.heroImage ? <PhotoPlaceholder image={page.heroImage} /> : null}
        </div>
      </section>
    </>
  );
}
