/**
 * Investo AI Design System — Shadow Tokens
 *
 * Box-shadow presets extracted from the codebase. The app uses a very
 * light, diffused shadow style for cards and slightly heavier ones for
 * elevated overlays (modals, dropdowns).
 *
 * Usage:
 *   import { shadows } from '@/design-system';
 *   style={{ boxShadow: shadows.card }}
 */

export const shadows = {
  /** No shadow */
  none: "none",

  /**
   * Standard card / panel shadow.
   * Used on: KPICard, GoalsProgress, Checklist, TipOfTheDay,
   *          AIAllocation, TopHoldings, Sidebar.
   */
  card: "4px 2px 23px 5px rgba(242, 242, 242, 0.25)",

  /**
   * Elevated overlay shadow for modals and floating panels.
   * Used on: AddFundsButton modal, Success screen.
   */
  modal: "0 20px 60px rgba(242, 242, 242, 0.25), 0 4px 16px rgba(242, 242, 242, 0.25)",

  /**
   * Subtle shadow for toggle pills and small elevated elements.
   * Used on: view/chat toggle active pill inside Sidebar.
   */
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
} as const;

export type Shadow = keyof typeof shadows;
