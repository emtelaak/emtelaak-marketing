/**
 * CMS Component Renderer
 * 
 * Recursively renders CMS component trees
 */

'use client';

import React from 'react';
import type { ComponentNode } from '@/lib/cms/cms-external';
import type { Locale } from '@/lib/i18n';
import { getBilingualText } from '@/lib/cms/bilingual';

// Import individual components
import { Container } from './components/Container';
import { Heading } from './components/Heading';
import { Paragraph } from './components/Paragraph';
import { Button } from './components/Button';
import { Image } from './components/Image';
import { HeroSection } from './components/HeroSection';
import { Columns } from './components/Columns';
import { Spacer } from './components/Spacer';
import { Divider } from './components/Divider';

interface ComponentRendererProps {
  component: ComponentNode;
  locale: Locale;
}

/**
 * Map component types to React components
 */
const componentMap: Record<string, React.ComponentType<any>> = {
  Container,
  Heading,
  Paragraph,
  Button,
  Image,
  HeroSection,
  Columns,
  Spacer,
  Divider,
};

export function ComponentRenderer({ component, locale }: ComponentRendererProps) {
  const { type, props, children } = component;

  // Get the component from the map
  const Component = componentMap[type];

  if (!Component) {
    console.warn(`Component type "${type}" not found`);
    return null;
  }

  // Render the component with its props and children
  return (
    <Component {...props} locale={locale}>
      {children && children.map((child) => (
        <ComponentRenderer key={child.id} component={child} locale={locale} />
      ))}
    </Component>
  );
}
