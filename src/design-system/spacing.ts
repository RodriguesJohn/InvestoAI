/**
 * Investo AI Design System — Spacing Tokens
 *
 * A consistent spacing scale used for padding, margin, and gap values
 * across every component. Values are in pixels and map to Tailwind's
 * default spacing scale (1 unit = 4px).
 *
 * Usage examples (Tailwind):
 *   Padding — p-1 (4px), p-2 (8px), p-3 (12px), p-4 (16px), p-5 (20px), p-6 (24px), p-8 (32px)
 *   Gap     — gap-1 (4px), gap-2 (8px), gap-3 (12px), gap-4 (16px), gap-6 (24px)
 *   Margin  — mb-2 (8px), mt-1 (4px), mb-6 (24px)
 *
 * Usage in code:
 *   import { spacing } from '@/design-system';
 *   style={{ padding: spacing[5] }}  // → 20px
 */

export const spacing = {
  /** 0px — no space */
  0: 0,
  /** 2px — micro nudges */
  0.5: 2,
  /** 4px — tight inner spacing, icon gaps */
  1: 4,
  /** 8px — small gaps, compact padding */
  2: 8,
  /** 12px — form field inner padding, nav item padding */
  3: 12,
  /** 16px — default gap between cards, standard padding */
  4: 16,
  /** 20px — card inner padding (p-5), main content spacing */
  5: 20,
  /** 24px — section gaps, sidebar padding (px-6, pt-6) */
  6: 24,
  /** 32px — page-level padding (p-8), large section gaps */
  8: 32,
  /** 40px — extra-large section spacing */
  10: 40,
  /** 48px — page-level vertical spacing */
  12: 48,
} as const;

/**
 * Semantic spacing aliases for common layout contexts.
 * Use these when the intent matters more than the raw value.
 */
export const spacingTokens = {
  /** Inner padding of cards and panels — 20px */
  cardPadding: spacing[5],
  /** Sidebar horizontal padding — 24px */
  sidebarPaddingX: spacing[6],
  /** Page content outer padding — 24px */
  pagePadding: spacing[6],
  /** Gap between KPI cards in a row — 16px */
  cardGap: spacing[4],
  /** Gap between major page sections — 24px */
  sectionGap: spacing[6],
  /** Gap between items inside a card (e.g. goals list) — 20px */
  listGap: spacing[5],
  /** Gap between nav items in sidebar — 4px */
  navGap: spacing[1],
  /** Compact inner gap (badge, chip, checklist icon → text) — 8px */
  inlineGap: spacing[2],
  /** Button inner horizontal padding — 24px */
  buttonPaddingX: spacing[6],
  /** Button inner vertical padding — 14px (py-3.5) */
  buttonPaddingY: 14,
  /** Modal inner padding — 32px */
  modalPadding: spacing[8],
} as const;

export type SpacingKey = keyof typeof spacing;
