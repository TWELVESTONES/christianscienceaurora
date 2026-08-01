import type { PageDefinition } from "@/lib/types";
import { PageHero } from "@/components/PageHero";
import { SectionRenderer } from "@/components/SectionRenderer";
import { SpecialContent } from "@/components/SpecialContent";
import { PageSchema } from "@/components/StructuredData";
import { isContentReviewMode } from "@/lib/review-mode";

export function GenericPage({ page }: { page: PageDefinition }) {
  const special = page.pageType && !["standard", "legal", "giving", "product-detail", "article-detail", "children-detail", "checkout"].includes(page.pageType);
  return (
    <>
      <PageHero page={page} />
      {special ? <section className="section section-default"><div className="container"><SpecialContent page={page} /></div></section> : null}
      {page.sections.map((section) => <SectionRenderer key={section.id} section={section} />)}
      {isContentReviewMode && page.churchConfirmation?.length ? (
        <section className="section section-periwinkle-mist">
          <div className="container">
            <header className="section-heading"><div className="eyebrow">INTERNAL LAUNCH GATE</div><h2>Church-confirmation register</h2><p>These items are intentionally not invented or silently omitted.</p></header>
            <div className="card-grid">{page.churchConfirmation.map((item) => <article className="card" key={item}><h3>{item}</h3><p>Assign an owner, source, approver, last-confirmed date, and publication status in the CMS.</p></article>)}</div>
          </div>
        </section>
      ) : null}
      <PageSchema page={page} />
    </>
  );
}
