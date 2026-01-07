import React from 'react';
import type { Locale } from '@/lib/i18n';

interface DividerProps {
  color?: string;
  thickness?: string;
  margin?: string;
  className?: string;
  locale: Locale;
}

export function Divider({
  color = '#e5e7eb',
  thickness = '1px',
  margin = '1rem 0',
  className = '',
}: DividerProps) {
  return (
    <hr
      className={className}
      style={{
        borderColor: color,
        borderWidth: thickness,
        margin,
      }}
    />
  );
}
