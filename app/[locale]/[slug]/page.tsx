import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPage, listPages } from '@/lib/cms/api-client';
import { getPageContent, getTitle, getMetaDescription } from '@/lib/cms/bilingual';
import { ComponentRenderer } from '@/components/cms/ComponentRenderer';
import { getDirection, type Locale, locales } from '@/lib/i18n';


/**
 * Generate static params for ISR
 * This pre-renders all published pages at build time
 */
export async function generateStaticParams() {
  const pages = await listPages();
  
  // Generate params for all locale/slug combinations
  const params = [];
  for (const locale of locales) {
    for (const page of pages) {
      params.push({
        locale,
        slug: page.slug,
      });
    }
  }
  
  return params;
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = await getPage(slug);

  if (!page) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found',
    };
  }

  return {
    title: getTitle(page, locale as Locale),
    description: getMetaDescription(page, locale as Locale) || 'Emtelaak - Invest in fractional real estate ownership',
  };
}

/**
 * Revalidate every 5 minutes (ISR)
 */
export const revalidate = 300;

/**
 * Dynamic page component with ISR
 */
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const page = await getPage(slug);

  if (!page) {
    notFound();
  }

  const content = getPageContent(page, locale as Locale);
  const direction = getDirection(locale as Locale);

  return (
    <div dir={direction} className="min-h-screen">
      <ComponentRenderer components={content} />
    </div>
  );
}
