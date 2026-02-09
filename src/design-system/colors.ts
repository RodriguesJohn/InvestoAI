/**
 * Investo AI Design System — Color Tokens
 *
 * These tokens are the single source of truth for every color used in the app.
 * They map 1-to-1 with the Tailwind theme extension so you can reference them
 * both in Tailwind classes (e.g. `bg-primary-500`) and in code via this module.
 *
 * Usage examples (Tailwind):
 *   Backgrounds  — bg-primary-500, bg-accent-500, bg-neutral-100
 *   Text         — text-primary-600, text-success-500, text-error-500
 *   Borders      — border border-primary-300
 *   Hover states — bg-primary-500 hover:bg-primary-600
 */

export const colors = {
  primary: {
    50: "#E6ECFF",
    100: "#CCD9FF",
    200: "#99B3FF",
    300: "#668FFF",
    400: "#336BFF",
    500: "#0046FF",
    600: "#0039CC",
    700: "#003399",
    800: "#002266",
    900: "#001433",
  },

  accent: {
    50: "#E6FAF5",
    100: "#C2F2E8",
    200: "#8FE6D3",
    300: "#5DD4BA",
    400: "#2EBFA0",
    500: "#18A085",
    600: "#158A70",
    700: "#12755E",
    800: "#0F5F4C",
    900: "#0D4A3A",
  },

  success: {
    100: "#DCFCE7",
    400: "#4ADE80",
    500: "#22C55E",
    600: "#166534",
    700: "#14532D",
  },

  warning: {
    100: "#FEF9C3",
    400: "#FACC15",
    500: "#EAB308",
    600: "#CA8A04",
    700: "#A16207",
  },

  error: {
    100: "#FEE2E2",
    400: "#F87171",
    500: "#EF4444",
    600: "#DC2626",
    700: "#B91C1C",
  },

  neutral: {
    50: "#F8FAFC",
    100: "#F1F5F9",
    200: "#E2E8F0",
    300: "#CBD5E1",
    400: "#94A3B8",
    500: "#64748B",
    600: "#475569",
    700: "#334155",
    800: "#1E293B",
    900: "#0F172A",
  },
} as const;

export type ColorScale = keyof typeof colors;
export type ColorShade<S extends ColorScale> = keyof (typeof colors)[S];
