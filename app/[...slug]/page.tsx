import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GenericPage } from "@/components/GenericPage";
import { site } from "@/content/site";
import { listAllPublicPaths } from "@/lib/all-paths";
import { resolvePublicPage } from "@/lib/resolve-page";

export async function generateStaticParams() {
  const paths = await listAllPublicPaths();
  return paths.map((path) => ({ slug: path.split("/").filter(Boolean) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const path = `/${slug.join("/")}`;
  const page = await resolvePublicPage(path);
  if (!page) return {};
  const ogImage = page.heroImage?.src ? [{ url: `${site.domain}${page.heroImage.src}`, alt: page.heroImage.altText }] : undefined;
  const canonicalPath = page.canonicalPath ?? page.path;
  return {
    title: page.seoTitle ?? page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: { canonical: canonicalPath },
    openGraph: { title: page.seoTitle ?? page.title, description: page.description, url: `${site.domain}${canonicalPath}`, images: ogImage },
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
