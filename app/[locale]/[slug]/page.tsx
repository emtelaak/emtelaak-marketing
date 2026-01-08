import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPage, listPages } from '@/lib/cms/api-client';
import { getPageContent, getTitle, getMetaDescription } from '@/lib/cms/bilingual';
import { ComponentRenderer } from '@/components/cms/ComponentRenderer';
import { getDirection, type Locale, locales } from '@/lib/i18n';


/**
 * Generate static params for ISR
 * This pre-renders all published pages at build time
 * Returns empty array if API is unavailable (pages will be generated on-demand)
 */
export async function generateStaticParams() {
  try {
    const pages = await listPages();
    
    // If no pages or API error, return empty array
    // Pages will be generated on-demand with ISR
    if (!pages || pages.length === 0) {
      console.log('No pages found, using on-demand generation');
      return [];
    }
    
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
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    // Return empty array to allow build to continue
    // Pages will be generated on-demand
    return [];
  }
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
    title: getTitle(page.title, page.titleAr, locale as Locale),
    description: getMetaDescription(page.metaDescription, page.metaDescriptionAr, locale as Locale) || 'Emtelaak - Invest in fractional real estate ownership',
  };
}

/**
 * Revalidate every 5 minutes (ISR)
 */
export const revalidate = 300;

/**
 * Allow dynamic params (on-demand generation for pages not in generateStaticParams)
 */
export const dynamicParams = true;

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

  const content = getPageContent(page.contentJson, page.contentJsonAr, locale as Locale);
  const direction = getDirection(locale as Locale);

  return (
    <div dir={direction} className="min-h-screen">
      {content.map((component: any, index: number) => (
        <ComponentRenderer key={index} component={component} locale={locale as Locale} />
      ))}
    </div>
  );
}
