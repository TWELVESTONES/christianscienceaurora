import type { PageDefinition } from "@/lib/types";
import { EventCalendar } from "@/components/EventCalendar";
import { SermonDetail, SermonLibrary } from "@/components/SermonViews";
import { ArticleLibrary, ChildrenLibrary, ProductLibrary, ResourceLibrary } from "@/components/LibraryViews";
import { ContactForm } from "@/components/ContactForm";
import { SearchView } from "@/components/SearchView";
import { AdminPreview } from "@/components/AdminPreview";
import { cmsAdapter } from "@/lib/adapters/cms";
import {
  filterPublicArticles,
  filterPublicEvents,
  filterPublicExternalResources,
  filterPublicProducts,
  filterPublicSermons,
  filterPublicSundaySchoolResources,
} from "@/content/public-data";

export async function SpecialContent({ page }: { page: PageDefinition }) {
  switch (page.pageType) {
    case "calendar": {
      const events = filterPublicEvents(await cmsAdapter.listEvents());
      return <EventCalendar annual={page.path === "/events/year"} events={events} />;
    }
    case "sermon-library": {
      const sermons = filterPublicSermons(await cmsAdapter.listSermons());
      return <SermonLibrary sermons={sermons} />;
    }
    case "sermon-detail": {
      const slug = page.path.split("/").at(-1) ?? "";
      const sermon = await cmsAdapter.getSermon(slug);
      return <SermonDetail sermon={sermon && filterPublicSermons([sermon])[0]} />;
    }
    case "article-library": {
      const articles = filterPublicArticles(await cmsAdapter.listArticles());
      return <ArticleLibrary familyOnly={page.path.includes("family-articles")} articles={articles} />;
    }
    case "product-library": {
      const products = filterPublicProducts(await cmsAdapter.listProducts());
      return <ProductLibrary products={products} />;
    }
    case "children-library": {
      const resources = filterPublicSundaySchoolResources(await cmsAdapter.listSundaySchoolResources());
      const scoped = page.path === "/sunday-school/coloring-pages"
        ? resources.filter((resource) => resource.type === "Coloring page")
        : page.path === "/sunday-school/stories"
        ? resources.filter((resource) => resource.type.includes("Story"))
        : resources;
      return <ChildrenLibrary resources={scoped} />;
    }
    case "resource-library": {
      const resources = filterPublicExternalResources(await cmsAdapter.listExternalResources());
      return <ResourceLibrary resources={resources} />;
    }
    case "contact": return <ContactForm />;
    case "search": return <SearchView />;
    case "admin": return <AdminPreview />;
    default: return null;
  }
}
