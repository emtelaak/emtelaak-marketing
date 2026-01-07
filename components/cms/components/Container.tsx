import React from 'react';
import type { Locale } from '@/lib/i18n';

interface ContainerProps {
  maxWidth?: string;
  padding?: string;
  margin?: string;
  backgroundColor?: string;
  className?: string;
  locale: Locale;
  children?: React.ReactNode;
}

export function Container({
  maxWidth,
  padding,
  margin,
  backgroundColor,
  className = '',
  children,
}: ContainerProps) {
  return (
    <div
      className={className}
      style={{
        maxWidth,
        padding,
        margin,
        backgroundColor,
      }}
    >
      {children}
    </div>
  );
}
