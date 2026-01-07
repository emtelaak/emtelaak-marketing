import React from 'react';
import type { Locale } from '@/lib/i18n';
import { getBilingualText } from '@/lib/cms/bilingual';
import { getAlignmentClass } from '@/lib/rtl-utils';
import { Button } from './Button';

interface HeroSectionProps {
  title: string | { en: string; ar?: string };
  subtitle?: string | { en: string; ar?: string };
  backgroundImage?: string;
  backgroundColor?: string;
  ctaText?: string | { en: string; ar?: string };
  ctaLink?: string;
  ctaVariant?: 'default' | 'outline' | 'ghost' | 'destructive';
  height?: string;
  textAlign?: 'left' | 'center' | 'right' | 'start' | 'end';
  textColor?: string;
  overlayOpacity?: number;
  className?: string;
  locale: Locale;
}

export function HeroSection({
  title,
  subtitle,
  backgroundImage,
  backgroundColor,
  ctaText,
  ctaLink,
  ctaVariant = 'default',
  height = '600px',
  textAlign = 'center',
  textColor = '#ffffff',
  overlayOpacity = 0.5,
  className = '',
  locale,
}: HeroSectionProps) {
  const titleText = getBilingualText(title, locale);
  const subtitleText = subtitle ? getBilingualText(subtitle, locale) : undefined;
  const alignClass = getAlignmentClass(textAlign, locale);

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{
        height,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundColor,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}
      <div className={`relative z-10 max-w-4xl px-4 ${alignClass}`} style={{ color: textColor }}>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{titleText}</h1>
        {subtitleText && (
          <p className="text-xl md:text-2xl mb-8">{subtitleText}</p>
        )}
        {ctaText && ctaLink && (
          <Button
            text={ctaText}
            href={ctaLink}
            variant={ctaVariant}
            size="lg"
            locale={locale}
          />
        )}
      </div>
    </div>
  );
}
