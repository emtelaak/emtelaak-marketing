/**
 * i18n Configuration for Emtelaak Marketing Site
 * 
 * Handles bilingual routing and language detection for English and Arabic
 */

export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function getDirection(locale: Locale): 'ltr' | 'rtl' {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

export function getOppositeLocale(locale: Locale): Locale {
  return locale === 'en' ? 'ar' : 'en';
}

/**
 * Language labels for display
 */
export const languageLabels: Record<Locale, { native: string; english: string }> = {
  en: { native: 'English', english: 'English' },
  ar: { native: 'العربية', english: 'Arabic' },
};
