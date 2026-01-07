import React from 'react';
import NextImage from 'next/image';
import type { Locale } from '@/lib/i18n';

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  className?: string;
  locale: Locale;
}

export function Image({
  src,
  alt,
  width,
  height,
  objectFit = 'cover',
  className = '',
}: ImageProps) {
  if (width && height) {
    return (
      <NextImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={{ objectFit }}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{ objectFit, width: '100%', height: 'auto' }}
    />
  );
}
