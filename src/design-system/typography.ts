/**
 * Investo AI Design System — Typography Tokens
 *
 * Font family, size scale, weight scale, and line-height presets
 * extracted from the codebase. Maps to Tailwind utility classes.
 *
 * Usage examples (Tailwind):
 *   Font size   — text-xs, text-sm, text-base, text-lg, text-2xl
 *   Font weight — font-normal, font-medium, font-semibold, font-bold
 *   Leading     — leading-tight, leading-normal, leading-relaxed
 *
 * Usage examples (code):
 *   import { fontFamily, fontSize, fontWeight } from '@/design-system';
 */

/** Primary (and only) typeface. Loaded via Google Fonts in index.css. */
export const fontFamily = {
  sans: "'Inter', sans-serif",
} as const;

/**
 * Font-size scale (px).
 * Keys mirror the Tailwind `text-*` class suffix where possible.
 */
export const fontSize = {
  /** 10px — fine print, badges inner text */
  "2xs": 10,
  /** 12px — captions, helper text, small badges */
  xs: 12,
  /** 13px — compact UI labels */
  "xs+": 13,
  /** 14px — body / default paragraph text */
  sm: 14,
  /** 15px — button labels */
  "sm+": 15,
  /** 16px — section sub-headings, card titles */
  base: 16,
  /** 18px — sidebar brand name, card heading emphasis */
  lg: 18,
  /** 20px — modal titles, page sub-headings */
  xl: 20,
  /** 24px — page headings */
  "2xl": 24,
  /** 28px — onboarding headings */
  "3xl": 28,
  /** 32px — large metric values */
  "4xl": 32,
  /** 36px — hero / splash text */
  "5xl": 36,
  /** 48px — amount display (e.g. Add Funds modal) */
  "6xl": 48,
} as const;

/**
 * Font-weight scale.
 * Maps to Tailwind weight utilities: font-normal … font-bold.
 */
export const fontWeight = {
  /** 400 — body text, descriptions */
  normal: "400",
  /** 500 — nav items, secondary labels */
  medium: "500",
  /** 600 — card titles, active nav, buttons */
  semibold: "600",
  /** 700 — headings, KPI values, page titles */
  bold: "700",
} as const;

/**
 * Line-height presets (unitless multipliers).
 * Applied via Tailwind `leading-*` or inline styles.
 */
export const lineHeight = {
  /** 1.0 — display / metric numbers */
  none: 1,
  /** 1.25 — tight headings */
  tight: 1.25,
  /** 1.375 — default / normal body */
  normal: 1.375,
  /** 1.625 — relaxed body, descriptions, tips */
  relaxed: 1.625,
} as const;

/**
 * Pre-composed text style presets for common patterns found
 * throughout the app. Each preset bundles size + weight + lineHeight.
 *
 * Usage:
 *   <p style={textStyles.body}>…</p>
 *   // or spread into a className mapping of your choice
 */
export const textStyles = {
  /** Page title — "Good morning, Alex!" */
  h1: { fontSize: fontSize["2xl"], fontWeight: fontWeight.bold, lineHeight: lineHeight.tight },
  /** Section heading — "Your Goals", "AI Allocation" */
  h2: { fontSize: fontSize.base, fontWeight: fontWeight.semibold, lineHeight: lineHeight.tight },
  /** Modal / card title — "Add Funds" */
  h3: { fontSize: fontSize.xl, fontWeight: fontWeight.bold, lineHeight: lineHeight.tight },
  /** KPI value — "$24,856.00" */
  metric: { fontSize: fontSize["2xl"], fontWeight: fontWeight.bold, lineHeight: lineHeight.none },
  /** Large metric — success screen amount */
  metricLg: { fontSize: fontSize["5xl"], fontWeight: fontWeight.bold, lineHeight: lineHeight.none },
  /** Default body text */
  body: { fontSize: fontSize.sm, fontWeight: fontWeight.normal, lineHeight: lineHeight.normal },
  /** Small body / descriptions */
  bodySm: { fontSize: fontSize.xs, fontWeight: fontWeight.normal, lineHeight: lineHeight.relaxed },
  /** Button label */
  button: { fontSize: fontSize["sm+"], fontWeight: fontWeight.semibold, lineHeight: lineHeight.normal },
  /** KPI label, nav item */
  label: { fontSize: fontSize.sm, fontWeight: fontWeight.medium, lineHeight: lineHeight.normal },
  /** Caption / helper text */
  caption: { fontSize: fontSize.xs, fontWeight: fontWeight.normal, lineHeight: lineHeight.normal },
  /** Badge text */
  badge: { fontSize: fontSize["2xs"], fontWeight: fontWeight.semibold, lineHeight: lineHeight.normal },
} as const;

export type FontSize = keyof typeof fontSize;
export type FontWeight = keyof typeof fontWeight;
export type LineHeight = keyof typeof lineHeight;
export type TextStyle = keyof typeof textStyles;
