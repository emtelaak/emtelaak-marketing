import type { Metadata } from 'next';
import { getPage } from '@/lib/cms/api-client';
import { getPageContent, getTitle, getMetaDescription } from '@/lib/cms/bilingual';
import { ComponentRenderer } from '@/components/cms/ComponentRenderer';
import { getDirection, type Locale } from '@/lib/i18n';

/**
 * Generate metadata for homepage
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const page = await getPage('home');

  if (!page) {
    return {
      title: 'Emtelaak',
      description: 'Invest in fractional real estate ownership',
    };
  }

  return {
    title: getTitle(page.title, page.titleAr, locale as Locale),
    description: getMetaDescription(page.metaDescription, page.metaDescriptionAr, locale as Locale) || 'Invest in fractional real estate ownership with Emtelaak',
  };
}

/**
 * Revalidate every 5 minutes (ISR)
 */
export const revalidate = 300;

/**
 * Homepage component with ISR
 */
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const page = await getPage('home');

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Emtelaak</h1>
          <p className="text-gray-600">Homepage content not found</p>
        </div>
      </div>
    );
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
