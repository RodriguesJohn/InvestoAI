/**
 * Investo AI Design System
 *
 * Central export for all design tokens and component documentation.
 *
 * Usage:
 *   import { colors, typography, spacing, shadows, radii, semantic } from '@/design-system';
 *   import { ComponentRegistry } from '@/design-system';
 */

/* ─── Color Tokens ───────────────────────────────────────────────── */
export { colors } from "./colors";
export type { ColorScale, ColorShade } from "./colors";

/* ─── Typography ─────────────────────────────────────────────────── */
export {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  textStyles,
} from "./typography";
export type { FontSize, FontWeight, LineHeight, TextStyle } from "./typography";

/* ─── Spacing ────────────────────────────────────────────────────── */
export { spacing, spacingTokens } from "./spacing";
export type { SpacingKey } from "./spacing";

/* ─── Shadows ────────────────────────────────────────────────────── */
export { shadows } from "./shadows";
export type { Shadow } from "./shadows";

/* ─── Border Radii ───────────────────────────────────────────────── */
export { radii } from "./radii";
export type { Radius } from "./radii";

/* ─── Semantic Tokens (CSS variable aliases) ─────────────────────── */
export { semantic, cssVars } from "./semantic";
export type { SemanticToken, CssVar } from "./semantic";

/* ─── Component Registry ─────────────────────────────────────────── */
export {
  ComponentRegistry,
  LayoutComponents,
  DataDisplayComponents,
  ActionComponents,
  FeedbackComponents,
  ChatComponents,
  PageComponents,
  OnboardingComponents,
} from "./components";
export type { ComponentCategory } from "./components";
