import React from 'react';
import type { Locale } from '@/lib/i18n';

interface ColumnsProps {
  columns?: number;
  gap?: string;
  className?: string;
  locale: Locale;
  children?: React.ReactNode;
}

export function Columns({
  columns = 2,
  gap = '1rem',
  className = '',
  children,
}: ColumnsProps) {
  return (
    <div
      className={`grid ${className}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap,
      }}
    >
      {children}
    </div>
  );
}
