/**
 * RTL (Right-to-Left) Utilities for Arabic Content
 * 
 * Provides utilities for handling RTL layout and text direction
 * using logical CSS properties that work correctly in both LTR and RTL contexts.
 * 
 * Key Concepts:
 * - Use logical properties (start/end) instead of physical (left/right)
 * - Tailwind v3+ supports logical properties via `ms-`, `me-`, `ps-`, `pe-` classes
 * - Always set `dir` attribute on the root element
 */

export type Language = "en" | "ar";
export type Direction = "ltr" | "rtl";

/**
 * Get text direction for a language
 */
export function getDirection(language: Language): Direction {
  return language === "ar" ? "rtl" : "ltr";
}

/**
 * Check if a language is RTL
 */
export function isRTL(language: Language): boolean {
  return language === "ar";
}

/**
 * RTL-aware CSS class mappings
 * 
 * These mappings ensure that spacing and alignment work correctly
 * in both LTR and RTL contexts by using logical properties.
 */
export const rtlClasses = {
  /**
   * Text alignment classes
   * Use these instead of text-left/text-right for content that should
   * align to the start or end of the text direction
   */
  textAlign: {
    start: "text-start",     // Left in LTR, Right in RTL
    end: "text-end",         // Right in LTR, Left in RTL
    left: "text-left",       // Always left (use for specific cases)
    right: "text-right",     // Always right (use for specific cases)
    center: "text-center",   // Always center
    justify: "text-justify", // Justified
  },

  /**
   * Margin classes (logical)
   * Use ms-/me- instead of ml-/mr- for RTL-aware margins
   */
  margin: {
    start: "ms-",  // margin-inline-start (left in LTR, right in RTL)
    end: "me-",    // margin-inline-end (right in LTR, left in RTL)
    left: "ml-",   // Always left margin
    right: "mr-",  // Always right margin
  },

  /**
   * Padding classes (logical)
   * Use ps-/pe- instead of pl-/pr- for RTL-aware padding
   */
  padding: {
    start: "ps-",  // padding-inline-start (left in LTR, right in RTL)
    end: "pe-",    // padding-inline-end (right in LTR, left in RTL)
    left: "pl-",   // Always left padding
    right: "pr-",  // Always right padding
  },

  /**
   * Flex and grid alignment
   */
  justify: {
    start: "justify-start",  // Flex start
    end: "justify-end",      // Flex end
    center: "justify-center",
    between: "justify-between",
  },

  /**
   * Float classes (logical)
   */
  float: {
    start: "float-start",  // Float to start (left in LTR, right in RTL)
    end: "float-end",      // Float to end (right in LTR, left in RTL)
    left: "float-left",    // Always left
    right: "float-right",  // Always right
  },
};

/**
 * Get RTL-aware alignment class
 * 
 * @param align - Alignment value from component props
 * @param language - Current language
 * @returns Tailwind CSS class
 * 
 * @example
 * getAlignmentClass('start', 'ar') // Returns 'text-start'
 * getAlignmentClass('left', 'ar')  // Returns 'text-left'
 */
export function getAlignmentClass(
  align: "left" | "center" | "right" | "start" | "end" | "justify" | undefined,
  language: Language
): string {
  if (!align) return "";

  // For explicit left/right/center, use as-is
  if (align === "left" || align === "right" || align === "center" || align === "justify") {
    return rtlClasses.textAlign[align];
  }

  // For start/end, use logical properties
  return rtlClasses.textAlign[align];
}

/**
 * Get RTL-aware margin class
 * 
 * @param side - Margin side ('start', 'end', 'left', 'right')
 * @param size - Tailwind size (e.g., '4', '8', 'auto')
 * @returns Tailwind CSS class
 * 
 * @example
 * getMarginClass('start', '4') // Returns 'ms-4'
 * getMarginClass('left', '4')  // Returns 'ml-4'
 */
export function getMarginClass(
  side: "start" | "end" | "left" | "right",
  size: string
): string {
  return `${rtlClasses.margin[side]}${size}`;
}

/**
 * Get RTL-aware padding class
 * 
 * @param side - Padding side ('start', 'end', 'left', 'right')
 * @param size - Tailwind size (e.g., '4', '8')
 * @returns Tailwind CSS class
 * 
 * @example
 * getPaddingClass('start', '4') // Returns 'ps-4'
 */
export function getPaddingClass(
  side: "start" | "end" | "left" | "right",
  size: string
): string {
  return `${rtlClasses.padding[side]}${size}`;
}

/**
 * Convert physical alignment to logical alignment
 * Useful for migrating existing components
 * 
 * @param align - Physical alignment ('left' or 'right')
 * @param language - Current language
 * @returns Logical alignment ('start' or 'end')
 */
export function physicalToLogical(
  align: "left" | "right",
  language: Language
): "start" | "end" {
  const isRtl = isRTL(language);

  if (align === "left") {
    return isRtl ? "end" : "start";
  } else {
    return isRtl ? "start" : "end";
  }
}

/**
 * Get inline CSS styles for RTL-aware properties
 * Use when Tailwind classes are not sufficient
 * 
 * @param language - Current language
 * @returns CSS properties object
 */
export function getRTLStyles(language: Language): React.CSSProperties {
  return {
    direction: getDirection(language),
  };
}

/**
 * CSS Custom Properties for RTL
 * These can be used in CSS files for more complex layouts
 */
export const rtlCSSVariables = {
  "--text-align-start": "var(--text-align-start, left)",
  "--text-align-end": "var(--text-align-end, right)",
  "--margin-start": "var(--margin-start, 0)",
  "--margin-end": "var(--margin-end, 0)",
  "--padding-start": "var(--padding-start, 0)",
  "--padding-end": "var(--padding-end, 0)",
};

/**
 * Best Practices for RTL Development
 * 
 * 1. ALWAYS use logical properties (start/end) for content alignment
 * 2. Use physical properties (left/right) only for decorative elements
 * 3. Set `dir` attribute on the root element (<html> or container)
 * 4. Test all layouts in both LTR and RTL modes
 * 5. Use Tailwind's logical classes: ms-, me-, ps-, pe-
 * 6. Avoid hardcoded left/right values in inline styles
 * 7. Use CSS logical properties in custom CSS:
 *    - margin-inline-start instead of margin-left
 *    - padding-inline-end instead of padding-right
 *    - inset-inline-start instead of left
 * 8. Icons and images may need to be flipped in RTL (use transform: scaleX(-1))
 * 9. Animations and transitions should respect direction
 * 10. Always test with real Arabic content, not just English
 */

/**
 * Example Component with RTL Support
 * 
 * ```tsx
 * import { getDirection, getAlignmentClass } from './rtl-utils';
 * 
 * function MyComponent({ language, align }) {
 *   return (
 *     <div dir={getDirection(language)}>
 *       <h1 className={getAlignmentClass(align, language)}>
 *         {language === 'ar' ? 'مرحبا' : 'Hello'}
 *       </h1>
 *       <p className="ms-4 text-start">
 *         This text will align to the start of the text direction
 *       </p>
 *     </div>
 *   );
 * }
 * ```
 */

/**
 * Tailwind Configuration for RTL
 * 
 * Add this to your tailwind.config.js:
 * 
 * ```js
 * module.exports = {
 *   // ... other config
 *   plugins: [
 *     // Tailwind v3+ includes logical properties by default
 *     // No additional plugins needed
 *   ],
 * }
 * ```
 */

export default {
  getDirection,
  isRTL,
  rtlClasses,
  getAlignmentClass,
  getMarginClass,
  getPaddingClass,
  physicalToLogical,
  getRTLStyles,
};
