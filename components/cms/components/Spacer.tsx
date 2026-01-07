import React from 'react';
import type { Locale } from '@/lib/i18n';

interface SpacerProps {
  height?: string;
  className?: string;
  locale: Locale;
}

export function Spacer({ height = '2rem', className = '' }: SpacerProps) {
  return <div className={className} style={{ height }} />;
}
