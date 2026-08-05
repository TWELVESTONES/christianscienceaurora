import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageDefinitions } from "@/content/pages";
import { GenericPage } from "@/components/GenericPage";
import { site } from "@/content/site";
import { isPublicPagePath } from "@/lib/public-page";
import { resolvePublicPage } from "@/lib/resolve-page";

export function generateStaticParams() {
  return pageDefinitions
    .filter((page) => isPublicPagePath(page.path))
    .map((page) => ({ slug: page.path.split("/").filter(Boolean) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const path = `/${slug.join("/")}`;
  const page = await resolvePublicPage(path);
  if (!page) return {};
  const ogImage = page.heroImage?.src ? [{ url: `${site.domain}${page.heroImage.src}`, alt: page.heroImage.altText }] : undefined;
  return {
    title: page.seoTitle ?? page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: { canonical: page.path },
    openGraph: { title: page.seoTitle ?? page.title, description: page.description, url: `${site.domain}${page.path}`, images: ogImage },
    twitter: ogImage ? { card: "summary_large_image", title: page.seoTitle ?? page.title, description: page.description, images: ogImage.map((i) => i.url) } : undefined
  };
}

export default async function CatchAllPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const path = `/${slug.join("/")}`;
  const page = await resolvePublicPage(path);
  if (!page) notFound();
  return <GenericPage page={page} />;
}
