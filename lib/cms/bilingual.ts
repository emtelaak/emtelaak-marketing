/**
 * Bilingual Content Helpers
 * 
 * Utilities for handling English/Arabic content
 */

import type { Locale } from '../i18n';

export interface BilingualText {
  en: string;
  ar?: string;
}

/**
 * Get text in the current language
 */
export function getBilingualText(
  text: BilingualText | string | undefined,
  locale: Locale
): string {
  if (!text) return '';
  if (typeof text === 'string') return text;
  return locale === 'ar' && text.ar ? text.ar : text.en;
}

/**
 * Get page content in the current language
 */
export function getPageContent(
  contentJson: any,
  contentJsonAr: any | undefined | null,
  locale: Locale
): any {
  if (locale === 'ar' && contentJsonAr) {
    return contentJsonAr;
  }
  return contentJson;
}

/**
 * Get title in the current language
 */
export function getTitle(
  title: string,
  titleAr: string | undefined | null,
  locale: Locale
): string {
  if (locale === 'ar' && titleAr) {
    return titleAr;
  }
  return title;
}

/**
 * Get meta description in the current language
 */
export function getMetaDescription(
  metaDescription: string | undefined | null,
  metaDescriptionAr: string | undefined | null,
  locale: Locale
): string | undefined {
  if (locale === 'ar' && metaDescriptionAr) {
    return metaDescriptionAr;
  }
  return metaDescription || undefined;
}
