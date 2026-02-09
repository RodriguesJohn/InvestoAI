/**
 * Investo AI Design System — Border Radius Tokens
 *
 * Corner-radius scale used throughout the app. The design language
 * favours generous rounding — most interactive elements use xl (12px)
 * or 2xl (16px), and pill buttons use full rounding.
 *
 * Usage examples (Tailwind):
 *   rounded-lg (8px), rounded-xl (12px), rounded-2xl (16px), rounded-full (9999px)
 *
 * Usage in code:
 *   import { radii } from '@/design-system';
 *   style={{ borderRadius: radii.xl }}
 */

export const radii = {
  /** 0px — sharp corners (rarely used) */
  none: 0,
  /** 4px — small internal elements */
  sm: 4,
  /** 8px — badges, progress bars, inner containers */
  md: 8,
  /** 12px — cards, nav items, input fields, sidebar */
  lg: 12,
  /** 16px — large cards, panels, modals */
  xl: 16,
  /** 20px — extra-large containers */
  "2xl": 20,
  /** 30px — pill buttons (Add Funds) */
  pill: 30,
  /** 9999px — fully rounded circles, toggle pills, progress bar tracks */
  full: 9999,
} as const;

export type Radius = keyof typeof radii;
