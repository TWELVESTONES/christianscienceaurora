import Link from "next/link";
import { ArticleSchema, ProductSchema } from "@/components/StructuredData";
import { isContentReviewMode } from "@/lib/review-mode";
import type { ArticleItem, ExternalResource, ProductItem, SundaySchoolResource } from "@/lib/types";

const externalLinkNote = <span className="visually-hidden"> (opens in a new tab)</span>;

export function ArticleLibrary({ pagePath, articles = [] }: { pagePath: string; articles?: ArticleItem[] }) {
  const list = articles.filter((article) => (article.showOnPaths ?? ["/articles"]).includes(pagePath));
  return (
    <>
      <div className="filter-bar"><label htmlFor="article-search">Search</label><input id="article-search" placeholder="Search articles and questions" /><label htmlFor="article-category">Category</label><select id="article-category"><option>All categories</option><option>New Here</option><option>Prayer and Healing</option><option>Bible Study</option><option>Families</option><option>Reading Room</option><option>Community</option></select></div>
      {list.length ? (
        <div className="card-grid">
          {list.map((article) => {
            const primaryHref = article.externalHref ?? `/articles/${article.slug}`;
            return (
              <article className="card" key={article.slug}>
                <div className="eyebrow">{article.category}</div>
                <h3>
                  {article.externalHref ? (
                    <a href={primaryHref} target="_blank" rel="noopener noreferrer">{article.title}{externalLinkNote}</a>
                  ) : (
                    <Link href={primaryHref}>{article.title}</Link>
                  )}
                </h3>
                <p>{article.summary}</p>
                <p className="card-meta">By {article.author} · {article.publishedAt} · {article.readingTime}</p>
                <p className="card-action">
                  {article.externalHref ? (
                    <a href={primaryHref} target="_blank" rel="noopener noreferrer">Read the article ↗{externalLinkNote}</a>
                  ) : (
                    <Link href={primaryHref}>Read the article →</Link>
                  )}
                </p>
                {article.translations?.map((translation) => (
                  <p className="card-action" key={translation.href}>
                    <a href={translation.href} target="_blank" rel="noopener noreferrer">Also available in: {translation.label} ↗{externalLinkNote}</a>
                  </p>
                ))}
                <ArticleSchema article={article} />
              </article>
            );
          })}
        </div>
      ) : (
        <div className="empty-state"><div className="eyebrow">EDITORIAL COLLECTION</div><h2>Family articles are being prepared.</h2><p>Approved articles and trusted external resources will appear here as they complete editorial review.</p></div>
      )}
    </>
  );
}

export function ProductLibrary({ products = [] }: { products?: ProductItem[] }) {
  const publicProducts = products;
  return (
    <>
      <div className="filter-bar"><label htmlFor="product-search">Search</label><input id="product-search" placeholder="Search books and resources" /><label htmlFor="product-category">Category</label><select id="product-category"><option>All categories</option><option>Mary Baker Eddy</option><option>Bible Study</option><option>Periodicals</option><option>Families</option><option>Music</option><option>Gifts</option></select></div>
      {publicProducts.length ? (
        <div className="card-grid four">
          {publicProducts.map((product) => <article className="card product-card" key={product.slug}><div className="photo-placeholder ratio-2-3 is-public" role="img" aria-label={`Product image for ${product.title}`}><div className="photo-light-field" aria-hidden="true"><span className="photo-light-orb photo-light-orb-one" /><span className="photo-architectural-line" /></div><div className="photo-caption"><span className="photo-note-badge">Book and resource</span><strong>{product.category}</strong></div></div><div className="eyebrow product-author">{product.author}</div><h3><Link href={`/reading-room/shop/${product.slug}`}>{product.title}</Link></h3><p>{product.format}</p><p className="card-meta">{product.availability} · ${product.price.toFixed(2)}</p><p className="card-action"><Link href={`/reading-room/shop/${product.slug}`}>View product →</Link></p><ProductSchema product={product} /></article>)}
        </div>
      ) : (
        <div className="empty-state">
          <div className="eyebrow">READING ROOM SHOP</div>
          <h2>The online catalog is being prepared.</h2>
          <p>Books and resources will appear after inventory, pricing, fulfillment, tax, and image permissions are confirmed. The Reading Room can still help locate an item.</p>
          <div className="button-row"><Link className="btn btn-primary" href="/contact">Ask About a Book or Resource</Link></div>
        </div>
      )}
    </>
  );
}

export function ChildrenLibrary({ resources = [] }: { resources?: SundaySchoolResource[] }) {
  const publicSundaySchoolResources = resources;
  return (
    <>
      <div className="filter-bar"><label htmlFor="child-search">Search</label><input id="child-search" placeholder="Search activities and stories" /><label htmlFor="age">Age</label><select id="age"><option>All ages</option><option>5–7</option><option>8–10</option><option>11–13</option></select><label htmlFor="type">Type</label><select id="type"><option>All types</option><option>Coloring</option><option>Puzzle</option><option>Story</option><option>Craft</option><option>Gratitude</option></select><label htmlFor="help">Grown-up help</label><select id="help"><option>Any</option><option>None</option><option>A little</option><option>Recommended</option></select></div>
      <div className="card-grid sunday-school-resource-grid">
        {publicSundaySchoolResources.map((resource) => <article className="card sunday-school-card" key={resource.slug}><div className="eyebrow">{resource.type} · {resource.ageGroup}</div><h3><Link href={`/sunday-school/resources/${resource.slug}`}>{resource.title}</Link></h3><p>{resource.summary}</p><div className="tag-list"><span className="tag">{resource.topic}</span><span className="tag">{resource.estimatedTime}</span><span className="tag">{resource.delivery}</span><span className="tag">Help: {resource.adultAssistance}</span></div><p className="card-action"><Link href={`/sunday-school/resources/${resource.slug}`}>Start activity →</Link></p></article>)}
      </div>
    </>
  );
}

export function ResourceLibrary({ resources = [] }: { resources?: ExternalResource[] }) {
  const publicExternalResources = resources;
  const categories = [...new Set(publicExternalResources.map((resource) => resource.category))];
  return (
    <div>
      {categories.map((category) => <section key={category} className="resource-category"><h2>{category}</h2><div className="card-grid">{publicExternalResources.filter((resource) => resource.category === category).map((resource) => <a className="card external-resource-card" key={resource.name} href={resource.url} target="_blank" rel="noreferrer"><div className="eyebrow">External resource</div><h3>{resource.name} ↗</h3><p>{resource.description}</p>{isContentReviewMode ? <p className="card-meta">Owner: {resource.owner} · Reviewed {resource.reviewDate}</p> : null}</a>)}</div></section>)}
      <div className="permission-note"><strong>External-site notice</strong><br />These sites are maintained by other organizations. Christian Science Aurora does not control their content, privacy practices, or availability. Third-party logos are not used without permission.</div>
    </div>
  );
}
