/**
 * CMS Component Schema Export for External Applications
 * 
 * This file provides a comprehensive export of all CMS component schemas
 * for use by external applications (like marketing sites) that consume
 * the Headless CMS API.
 * 
 * Usage:
 * ```typescript
 * import { componentSchemas, validateComponent } from './cms-external';
 * 
 * // Validate a component from the API
 * const result = validateComponent('Heading', componentData);
 * if (result.success) {
 *   console.log(result.data);
 * }
 * ```
 */

import { z } from "zod";

// ============================================
// BASE SCHEMAS
// ============================================

/**
 * Base props that all components inherit
 */
export const baseComponentPropsSchema = z.object({
  className: z.string().optional().describe("Additional CSS classes"),
  style: z.record(z.string(), z.any()).optional().describe("Inline styles object"),
});

/**
 * Bilingual text field for English/Arabic content
 */
export const bilingualTextSchema = z.object({
  en: z.string().describe("English text"),
  ar: z.string().optional().describe("Arabic text (optional)"),
});

export type BilingualText = z.infer<typeof bilingualTextSchema>;

// ============================================
// COMPONENT-SPECIFIC SCHEMAS
// ============================================

/**
 * Container Component
 * A layout wrapper with configurable spacing and background
 */
export const containerPropsSchema = baseComponentPropsSchema.extend({
  maxWidth: z.string().optional().describe("Max width (e.g., '1200px', '100%')"),
  padding: z.string().optional().describe("Padding (e.g., '2rem', '20px 40px')"),
  margin: z.string().optional().describe("Margin (e.g., '0 auto', '1rem')"),
  backgroundColor: z.string().optional().describe("Background color (hex, rgb, or CSS color name)"),
});

/**
 * Heading Component
 * Text heading with configurable level and styling
 */
export const headingPropsSchema = baseComponentPropsSchema.extend({
  text: z.union([z.string(), bilingualTextSchema]).describe("Heading text (string or bilingual object)"),
  level: z.enum(["h1", "h2", "h3", "h4", "h5", "h6"]).default("h2").describe("HTML heading level"),
  align: z.enum(["left", "center", "right", "start", "end"]).optional().describe("Text alignment"),
  color: z.string().optional().describe("Text color (hex, rgb, or CSS color name)"),
});

/**
 * Paragraph Component
 * Body text with configurable styling
 */
export const paragraphPropsSchema = baseComponentPropsSchema.extend({
  text: z.union([z.string(), bilingualTextSchema]).describe("Paragraph text (string or bilingual object)"),
  align: z.enum(["left", "center", "right", "justify", "start", "end"]).optional().describe("Text alignment"),
  fontSize: z.string().optional().describe("Font size (e.g., '16px', '1rem')"),
  color: z.string().optional().describe("Text color"),
});

/**
 * Button Component
 * Interactive button with link and styling options
 */
export const buttonPropsSchema = baseComponentPropsSchema.extend({
  text: z.union([z.string(), bilingualTextSchema]).describe("Button text (string or bilingual object)"),
  href: z.string().optional().describe("Link URL"),
  variant: z.enum(["default", "outline", "ghost", "destructive"]).default("default").describe("Button style variant"),
  size: z.enum(["sm", "default", "lg"]).default("default").describe("Button size"),
  onClick: z.string().optional().describe("Action identifier for custom handlers"),
});

/**
 * Image Component
 * Image with S3 URL and accessibility options
 */
export const imagePropsSchema = baseComponentPropsSchema.extend({
  src: z.string().url().describe("Absolute image URL (S3 path)"),
  alt: z.string().describe("Alt text for accessibility"),
  width: z.number().optional().describe("Image width in pixels"),
  height: z.number().optional().describe("Image height in pixels"),
  objectFit: z.enum(["contain", "cover", "fill", "none", "scale-down"]).optional().describe("CSS object-fit property"),
});

/**
 * HeroSection Component
 * Full-width hero banner with background image and CTA
 */
export const heroSectionPropsSchema = baseComponentPropsSchema.extend({
  title: z.union([z.string(), bilingualTextSchema]).describe("Hero title"),
  subtitle: z.union([z.string(), bilingualTextSchema]).optional().describe("Hero subtitle"),
  backgroundImage: z.string().url().optional().describe("Background image URL (S3 path)"),
  backgroundColor: z.string().optional().describe("Background color (fallback or overlay)"),
  ctaText: z.union([z.string(), bilingualTextSchema]).optional().describe("Call-to-action button text"),
  ctaLink: z.string().optional().describe("Call-to-action link URL"),
  ctaVariant: z.enum(["default", "outline", "ghost", "destructive"]).default("default").describe("CTA button variant"),
  height: z.string().optional().describe("Hero height (e.g., '500px', '60vh')"),
  textAlign: z.enum(["left", "center", "right", "start", "end"]).optional().describe("Text alignment"),
  textColor: z.string().optional().describe("Text color"),
  overlayOpacity: z.number().min(0).max(1).optional().describe("Background overlay opacity (0-1)"),
});

/**
 * PropertyCarousel Component
 * Dynamic carousel that fetches live property data
 */
export const propertyCarouselPropsSchema = baseComponentPropsSchema.extend({
  title: z.union([z.string(), bilingualTextSchema]).optional().describe("Carousel title"),
  subtitle: z.union([z.string(), bilingualTextSchema]).optional().describe("Carousel subtitle"),
  status: z.enum(["Active", "Upcoming", "Funded", "Closed"]).default("Active").describe("Property status filter"),
  limit: z.number().min(1).max(20).default(6).describe("Number of properties to display"),
  showViewAll: z.boolean().default(true).describe("Show 'View All' button"),
  viewAllLink: z.string().default("/properties").describe("'View All' button link"),
});

/**
 * Columns Component
 * Multi-column layout container
 */
export const columnsPropsSchema = baseComponentPropsSchema.extend({
  columns: z.number().min(1).max(12).default(2).describe("Number of columns"),
  gap: z.string().optional().describe("Gap between columns (e.g., '1rem', '20px')"),
});

/**
 * Spacer Component
 * Vertical spacing element
 */
export const spacerPropsSchema = baseComponentPropsSchema.extend({
  height: z.string().default("2rem").describe("Spacer height (e.g., '2rem', '40px')"),
});

/**
 * Divider Component
 * Horizontal line separator
 */
export const dividerPropsSchema = baseComponentPropsSchema.extend({
  color: z.string().optional().describe("Divider color"),
  thickness: z.string().optional().describe("Divider thickness (e.g., '1px', '2px')"),
  margin: z.string().optional().describe("Vertical margin around divider"),
});

/**
 * Accordion Component
 * Collapsible content sections
 */
export const accordionPropsSchema = baseComponentPropsSchema.extend({
  items: z.array(
    z.object({
      title: z.union([z.string(), bilingualTextSchema]).describe("Accordion item title"),
      content: z.union([z.string(), bilingualTextSchema]).describe("Accordion item content"),
    })
  ).describe("Array of accordion items"),
  allowMultiple: z.boolean().default(false).describe("Allow multiple items to be open simultaneously"),
});

/**
 * Tabs Component
 * Tabbed content sections
 */
export const tabsPropsSchema = baseComponentPropsSchema.extend({
  tabs: z.array(
    z.object({
      label: z.union([z.string(), bilingualTextSchema]).describe("Tab label"),
      content: z.union([z.string(), bilingualTextSchema]).describe("Tab content"),
    })
  ).describe("Array of tabs"),
  defaultTab: z.number().default(0).describe("Index of default active tab"),
});

/**
 * Video Component
 * Embedded video (YouTube, Vimeo, etc.)
 */
export const videoPropsSchema = baseComponentPropsSchema.extend({
  url: z.string().url().describe("Video embed URL"),
  aspectRatio: z.string().default("16/9").describe("Video aspect ratio (e.g., '16/9', '4/3')"),
  autoplay: z.boolean().default(false).describe("Autoplay video on load"),
});

/**
 * Card Component
 * Content card with optional image
 */
export const cardPropsSchema = baseComponentPropsSchema.extend({
  title: z.union([z.string(), bilingualTextSchema]).optional().describe("Card title"),
  description: z.union([z.string(), bilingualTextSchema]).optional().describe("Card description"),
  imageUrl: z.string().url().optional().describe("Card image URL (S3 path)"),
  padding: z.string().optional().describe("Card padding"),
  shadow: z.boolean().default(true).describe("Show card shadow"),
});

// ============================================
// COMPONENT NODE SCHEMA (RECURSIVE)
// ============================================

/**
 * Component Node
 * Represents a single component in the tree structure
 */
export const componentNodeSchema: z.ZodType<{
  id: string;
  type: string;
  props: Record<string, any>;
  children?: Array<{
    id: string;
    type: string;
    props: Record<string, any>;
    children?: any[];
  }>;
}> = z.lazy(() =>
  z.object({
    id: z.string().describe("Unique identifier for this component instance"),
    type: z.string().describe("Component type identifier"),
    props: z.record(z.string(), z.any()).describe("Component-specific properties"),
    children: z.array(componentNodeSchema).optional().describe("Child components (for containers)"),
  })
);

/**
 * Page Content
 * Root structure for a complete page
 */
export const pageContentSchema = z.object({
  version: z.string().default("1.0").describe("Schema version for future migrations"),
  root: componentNodeSchema.describe("Root component of the page"),
});

// ============================================
// EXPORTS
// ============================================

/**
 * Map of all component schemas by type
 */
export const componentSchemas = {
  Container: containerPropsSchema,
  Heading: headingPropsSchema,
  Paragraph: paragraphPropsSchema,
  Button: buttonPropsSchema,
  Image: imagePropsSchema,
  HeroSection: heroSectionPropsSchema,
  PropertyCarousel: propertyCarouselPropsSchema,
  Columns: columnsPropsSchema,
  Spacer: spacerPropsSchema,
  Divider: dividerPropsSchema,
  Accordion: accordionPropsSchema,
  Tabs: tabsPropsSchema,
  Video: videoPropsSchema,
  Card: cardPropsSchema,
} as const;

export type ComponentType = keyof typeof componentSchemas;
export type ComponentNode = z.infer<typeof componentNodeSchema>;
export type PageContent = z.infer<typeof pageContentSchema>;

/**
 * Validate a component against its schema
 * 
 * @param type - Component type
 * @param data - Component data to validate
 * @returns Validation result
 */
export function validateComponent(type: ComponentType, data: any) {
  const schema = componentSchemas[type];
  if (!schema) {
    return {
      success: false,
      error: `Unknown component type: ${type}`,
    };
  }
  return schema.safeParse(data);
}

/**
 * Validate an entire page structure
 * 
 * @param data - Page data to validate
 * @returns Validation result
 */
export function validatePage(data: any) {
  return pageContentSchema.safeParse(data);
}

/**
 * Helper function to get text in current language
 * 
 * @param text - Bilingual text object or plain string
 * @param language - Target language ('en' or 'ar')
 * @returns Text in the specified language
 */
export function getBilingualText(
  text: BilingualText | string | undefined,
  language: "en" | "ar"
): string {
  if (!text) return "";
  if (typeof text === "string") return text;
  return language === "ar" && text.ar ? text.ar : text.en;
}

/**
 * RTL-aware CSS class helper
 * Returns appropriate Tailwind classes for RTL support
 * 
 * @param language - Current language
 * @returns Object with RTL-aware utility classes
 */
export function getRTLClasses(language: "en" | "ar") {
  const isRTL = language === "ar";
  return {
    dir: isRTL ? "rtl" : "ltr",
    textAlign: {
      start: isRTL ? "text-right" : "text-left",
      end: isRTL ? "text-left" : "text-right",
      left: "text-left",
      right: "text-right",
      center: "text-center",
    },
    margin: {
      start: isRTL ? "mr-" : "ml-",
      end: isRTL ? "ml-" : "mr-",
    },
    padding: {
      start: isRTL ? "pr-" : "pl-",
      end: isRTL ? "pl-" : "pr-",
    },
  };
}
