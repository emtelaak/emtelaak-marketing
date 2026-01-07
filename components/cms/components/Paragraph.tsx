import React from 'react';
import type { Locale } from '@/lib/i18n';
import { getBilingualText } from '@/lib/cms/bilingual';
import { getAlignmentClass } from '@/lib/rtl-utils';

interface ParagraphProps {
  text: string | { en: string; ar?: string };
  align?: 'left' | 'center' | 'right' | 'justify' | 'start' | 'end';
  fontSize?: string;
  color?: string;
  className?: string;
  locale: Locale;
}

export function Paragraph({
  text,
  align,
  fontSize,
  color,
  className = '',
  locale,
}: ParagraphProps) {
  const content = getBilingualText(text, locale);
  const alignClass = align ? getAlignmentClass(align, locale) : '';

  return (
    <p
      className={`${alignClass} ${className}`}
      style={{ fontSize, color }}
    >
      {content}
    </p>
  );
}
