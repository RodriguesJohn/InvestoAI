/**
 * Investo AI Design System — Component Registry
 *
 * A comprehensive list of all reusable components and page-level components
 * used across the app, organized by category. Each entry documents the
 * component's location, props, and purpose.
 *
 * Categories:
 *   - Layout        — Structural/navigation components
 *   - Data Display  — Cards, charts, lists that show information
 *   - Feedback      — Effects, animations, visual indicators
 *   - Chat          — AI assistant interfaces
 *   - Pages         — Full page-level components
 *   - Onboarding    — Onboarding flow components
 */

/* ─── Layout ─────────────────────────────────────────────────────── */

export const LayoutComponents = {
  Sidebar: {
    path: "src/components/Sidebar.tsx",
    description: "Main navigation sidebar with page links and view mode toggle (view/chat).",
    props: {
      activePage: "string",
      onNavigate: "(page: string) => void",
      viewMode: '"view" | "chat"',
      onViewModeChange: '(mode: "view" | "chat") => void',
    },
  },
  OnboardingLayout: {
    path: "src/onboarding/OnboardingLayout.tsx",
    description: "Two-column layout for the onboarding flow with step sidebar and content area.",
    props: {
      currentStep: "number",
      children: "React.ReactNode",
    },
  },
} as const;

/* ─── Data Display ───────────────────────────────────────────────── */

export const DataDisplayComponents = {
  KPICard: {
    path: "src/components/KPICard.tsx",
    description: "Displays a single KPI metric with label, value, and optional change percentage.",
    props: {
      label: "string",
      value: "string",
      change: "string (optional)",
    },
  },
  AIAllocation: {
    path: "src/components/AIAllocation.tsx",
    description: "Interactive donut chart showing AI portfolio allocation with hover/tap interactions.",
    props: {},
  },
  TopHoldings: {
    path: "src/components/TopHoldings.tsx",
    description: "List of top portfolio holdings with logos, ticker symbols, values, and change indicators.",
    props: {},
  },
  GoalsProgress: {
    path: "src/components/GoalsProgress.tsx",
    description: "Progress bars for financial goals with icons and completion percentages.",
    props: {},
  },
  Checklist: {
    path: "src/components/Checklist.tsx",
    description: "Animated checklist of money management features and tasks.",
    props: {},
  },
  TipOfTheDay: {
    path: "src/components/TipOfTheDay.tsx",
    description: "Displays investment tips in a card layout with sparkle icons.",
    props: {},
  },
} as const;

/* ─── Actions ────────────────────────────────────────────────────── */

export const ActionComponents = {
  AddFundsButton: {
    path: "src/components/AddFundsButton.tsx",
    description: "Button that opens a modal for adding funds with amount selection and confirmation.",
    props: {},
  },
} as const;

/* ─── Feedback / Effects ─────────────────────────────────────────── */

export const FeedbackComponents = {
  ShinyText: {
    path: "src/components/ShinyText.tsx",
    description: "Animated text with a sliding shine/gradient effect. Used for emphasis and visual polish.",
    props: {
      text: "string",
      speed: "number (optional, default 2)",
      delay: "number (optional, default 0)",
      color: "string (optional, default '#b5b5b5')",
      shineColor: "string (optional, default '#ffffff')",
      spread: "number (optional, default 120)",
      direction: '"left" | "right" (optional, default "left")',
      yoyo: "boolean (optional, default false)",
      pauseOnHover: "boolean (optional, default false)",
      disabled: "boolean (optional, default false)",
      className: "string (optional)",
    },
  },
} as const;

/* ─── Chat / AI ──────────────────────────────────────────────────── */

export const ChatComponents = {
  ChatBubble: {
    path: "src/components/ChatBubble.tsx",
    description: "Floating chat bubble that opens a popup chat panel with AI assistant. Context-aware per page.",
    props: {
      activePage: "string (optional)",
    },
  },
  ChatMode: {
    path: "src/components/ChatMode.tsx",
    description: "Full-page chat interface with AI assistant. Adapts messages and suggestions per active page.",
    props: {
      activePage: "string (optional)",
    },
  },
} as const;

/* ─── Pages ──────────────────────────────────────────────────────── */

export const PageComponents = {
  Academy: {
    path: "src/components/Academy.tsx",
    description: "Educational page with featured course video, course contents list, and deep-dive resources.",
    props: {},
  },
  GoalsPage: {
    path: "src/components/GoalsPage.tsx",
    description: "Goals management page with summary stats, goal cards (2x2 grid), and AI recommendations.",
    props: {},
  },
  AgentsPage: {
    path: "src/components/AgentsPage.tsx",
    description: "AI agents page showing available agents with status, actions, and activation controls.",
    props: {},
  },
  SettingsPage: {
    path: "src/components/SettingsPage.tsx",
    description: "Settings page with profile, security, notifications, and connected accounts management.",
    props: {},
  },
} as const;

/* ─── Onboarding ─────────────────────────────────────────────────── */

export const OnboardingComponents = {
  Onboarding: {
    path: "src/onboarding/Onboarding.tsx",
    description: "Root onboarding orchestrator. Manages the 4-step onboarding flow.",
    props: {
      onComplete: "() => void",
    },
  },
  CreateAccount: {
    path: "src/onboarding/CreateAccount.tsx",
    description: "Step 1: Email and password account creation form.",
    props: {
      onContinue: "() => void",
    },
  },
  ShareGoals: {
    path: "src/onboarding/ShareGoals.tsx",
    description: "Step 2: Financial goals selection with multi-choice options.",
    props: {
      onContinue: "() => void",
    },
  },
  InvestmentProfile: {
    path: "src/onboarding/InvestmentProfile.tsx",
    description: "Step 3: Multi-substep investment profile setup (risk tolerance, timeline, amount/frequency sliders).",
    props: {
      onContinue: "() => void",
    },
  },
  StartJourney: {
    path: "src/onboarding/StartJourney.tsx",
    description: "Step 4: AI recommendation with confetti, growth chart, portfolio breakdown, then bank connection.",
    props: {
      onComplete: "() => void",
    },
  },
} as const;

/* ─── Full Registry ──────────────────────────────────────────────── */

export const ComponentRegistry = {
  layout: LayoutComponents,
  dataDisplay: DataDisplayComponents,
  actions: ActionComponents,
  feedback: FeedbackComponents,
  chat: ChatComponents,
  pages: PageComponents,
  onboarding: OnboardingComponents,
} as const;

export type ComponentCategory = keyof typeof ComponentRegistry;
