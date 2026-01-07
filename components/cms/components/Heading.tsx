import React from 'react';
import type { Locale } from '@/lib/i18n';
import { getBilingualText } from '@/lib/cms/bilingual';
import { getAlignmentClass } from '@/lib/rtl-utils';

interface HeadingProps {
  text: string | { en: string; ar?: string };
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  align?: 'left' | 'center' | 'right' | 'start' | 'end';
  color?: string;
  className?: string;
  locale: Locale;
}

export function Heading({
  text,
  level = 'h2',
  align,
  color,
  className = '',
  locale,
}: HeadingProps) {
  const Tag = level;
  const content = getBilingualText(text, locale);
  const alignClass = align ? getAlignmentClass(align, locale) : '';

  return (
    <Tag
      className={`${alignClass} ${className}`}
      style={{ color }}
    >
      {content}
    </Tag>
  );
}
