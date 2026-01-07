import { Metadata } from 'next';
import { getPage } from '@/lib/cms/api-client';
import { getPageContent, getTitle, getMetaDescription } from '@/lib/cms/bilingual';
import { ComponentRenderer } from '@/components/cms/ComponentRenderer';
import { getDirection, type Locale } from '@/lib/i18n';

interface HomeProps {
  params: {
    locale: string;
  };
}

/**
 * Generate metadata for homepage
 */
export async function generateMetadata({ params }: HomeProps): Promise<Metadata> {
  const locale = params.locale as Locale;
  const page = await getPage('home');

  if (!page) {
    return {
      title: 'Emtelaak - Invest in Real Estate',
      description: 'Invest in fractional real estate ownership with Emtelaak',
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
 * Homepage component with ISR
 */
export default async function Home({ params }: HomeProps) {
  const locale = params.locale as Locale;
  const page = await getPage('home');

  if (!page) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Emtelaak</h1>
          <p className="text-lg text-gray-600">
            {locale === 'ar' ? 'مرحبا بكم في امتلاك' : 'Invest in fractional real estate ownership'}
          </p>
        </div>
      </div>
    );
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
