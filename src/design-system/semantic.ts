/**
 * Investo AI Design System — Semantic Tokens
 *
 * Higher-level aliases that map design intent to raw color values.
 * These correspond 1-to-1 with the CSS custom properties in index.css
 * and should be used when you need semantic meaning rather than a
 * specific shade (e.g. "the page background" vs "neutral-50").
 *
 * Usage:
 *   import { semantic } from '@/design-system';
 *   style={{ backgroundColor: semantic.bgCard, color: semantic.textPrimary }}
 *
 * Or reference the CSS variable directly in Tailwind / inline styles:
 *   className="bg-[var(--bg-card)] text-[var(--text-primary)]"
 */

import { colors } from "./colors";

export const semantic = {
  /* ─── Backgrounds ──────────────────────────────────────────────── */

  /** Main page background — neutral-50 (#F8FAFC) */
  bgPage: colors.neutral[50],
  /** Card / panel surface — pure white */
  bgCard: "#FFFFFF",
  /** Muted / subtle background — same as page bg */
  bgMuted: colors.neutral[50],
  /** Goal card background */
  bgGoal: "#FAFAFA",

  /* ─── Text ─────────────────────────────────────────────────────── */

  /** Primary text color — near-black */
  textPrimary: "#1A1A1A",
  /** Secondary / supporting text — medium gray */
  textSecondary: "#808080",
  /** Muted / disabled text — neutral-500 */
  textMuted: colors.neutral[500],

  /* ─── Accent / Brand ───────────────────────────────────────────── */

  /** Primary action blue (buttons, links) — primary-400 */
  accentBlue: colors.primary[400],
  /** Success / positive — success-500 */
  accentSuccess: colors.success[500],
  /** Warning / caution — warning-500 */
  accentWarning: colors.warning[500],
  /** Error / destructive — error-500 */
  accentError: colors.error[500],
  /** Supplementary purple accent */
  accentPurple: "#8B5CF6",
  /** Supplementary pink accent */
  accentPink: "#EC4899",
  /** Teal accent — accent-500 */
  accentTeal: colors.accent[500],

  /* ─── Borders & Dividers ───────────────────────────────────────── */

  /** Default border color — neutral-100 */
  borderColor: colors.neutral[100],

  /* ─── Shadows ──────────────────────────────────────────────────── */

  /** Base shadow tint (used in box-shadow definitions) */
  shadowColor: "rgba(242, 242, 242, 0.25)",
} as const;

/**
 * CSS custom-property map.
 * Useful for programmatically generating a :root {} block or for
 * referencing the variable names in inline styles.
 *
 *   style={{ color: `var(${cssVars.textPrimary})` }}
 */
export const cssVars = {
  bgPage: "--bg-page",
  bgCard: "--bg-card",
  bgMuted: "--bg-muted",
  bgGoal: "--bg-goal",
  textPrimary: "--text-primary",
  textSecondary: "--text-secondary",
  textMuted: "--text-muted",
  accentBlue: "--accent-blue",
  accentSuccess: "--accent-success",
  accentWarning: "--accent-warning",
  accentError: "--accent-error",
  accentPurple: "--accent-purple",
  accentPink: "--accent-pink",
  accentTeal: "--accent-teal",
  borderColor: "--border-color",
  shadowColor: "--shadow-color",
} as const;

export type SemanticToken = keyof typeof semantic;
export type CssVar = keyof typeof cssVars;
