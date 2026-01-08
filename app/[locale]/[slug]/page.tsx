import { Metadata } from 'next';
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
  
  const params: { locale: Locale; slug: string }[] = [];
  
  for (const page of pages) {
    for (const locale of locales) {
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
export async function generateMetadata(props: PageProps<'/[locale]/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const page = await getPage(slug);

  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }

  const title = getTitle(page.title, page.titleAr, locale);
  const description = getMetaDescription(page.metaDescription, page.metaDescriptionAr, locale);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: locale === 'ar' ? 'ar_EG' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

/**
 * Dynamic page component with ISR
 */
export default async function Page(props: PageProps<'/[locale]/[slug]'>) {
  const { locale, slug } = await props.params;
  const page = await getPage(slug);

  if (!page) {
    notFound();
  }

  const content = getPageContent(page.contentJson, page.contentJsonAr, locale);
  const direction = getDirection(locale);

  if (!content || !content.root) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>No content available</p>
      </div>
    );
  }

  return (
    <div dir={direction} className="min-h-screen">
      <ComponentRenderer component={content.root} locale={locale} />
    </div>
  );
}

/**
 * ISR Configuration
 * Revalidate every 5 minutes
 */
export const revalidate = 300;
