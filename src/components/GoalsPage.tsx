import { motion } from "framer-motion";
import { Plus, ArrowRight } from "lucide-react";

/* ─── Data ──────────────────────────────────────────────────────── */

const summaryStats = [
  { label: "Total Saved", value: "$65,700" },
  { label: "Total Target", value: "$110,000" },
  { label: "Overall Progress", value: "60%" },
  { label: "Active Goals", value: "4" },
];

const goals = [
  {
    icon: "🧯",
    name: "Emergency Fund",
    status: "On Track" as const,
    current: 12500,
    target: 15000,
    monthly: "$500/mo",
    timeLeft: "5 months left",
  },
  {
    icon: "🏦",
    name: "Retirement Savings",
    status: "On Track" as const,
    current: 32000,
    target: 50000,
    monthly: "$1000/mo",
    timeLeft: "18 months left",
  },
  {
    icon: "🏠",
    name: "Home Down Payment",
    status: "Behind" as const,
    current: 18000,
    target: 40000,
    monthly: "$800/mo",
    timeLeft: "28 months left",
  },
  {
    icon: "✈️",
    name: "Vacation Fund",
    status: "On Track" as const,
    current: 3200,
    target: 5000,
    monthly: "$200/mo",
    timeLeft: "9 months left",
  },
];

const recommendations = [
  {
    title: "Boost Home Down Payment",
    description:
      "Increase monthly contribution by $200 to get back on track. You'll reach your goal 6 months earlier.",
  },
  {
    title: "Optimize Emergency Fund",
    description:
      "You're ahead of schedule! Consider redirecting $100/mo to your Home Down Payment goal.",
  },
  {
    title: "New Goal Suggestion",
    description:
      "Based on your income, consider starting a tax-advantaged retirement account (IRA).",
  },
];

/* ─── Animations ────────────────────────────────────────────────── */

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

/* ─── Goal Card ─────────────────────────────────────────────────── */

function GoalCard({
  goal,
}: {
  goal: (typeof goals)[number];
}) {
  const progress = Math.round((goal.current / goal.target) * 100);
  const isBehind = goal.status === "Behind";

  return (
    <motion.div
      variants={fadeUp}
      className="bg-[var(--bg-card)] rounded-2xl p-6 flex flex-col"
      style={{ boxShadow: "0 1px 4px var(--shadow-color)" }}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Top row: icon + name + badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <span className="text-lg">{goal.icon}</span>
          <span className="text-sm font-semibold text-[var(--text-primary)]">
            {goal.name}
          </span>
        </div>
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full ${
            isBehind
              ? "bg-[var(--bg-muted)] text-[var(--text-secondary)]"
              : "bg-[var(--bg-muted)] text-[var(--text-primary)]"
          }`}
        >
          {goal.status}
        </span>
      </div>

      {/* Amount */}
      <div className="flex items-baseline gap-1.5 mb-3">
        <span className="text-xl font-bold text-[var(--text-primary)]">
          ${goal.current.toLocaleString()}
        </span>
        <span className="text-sm text-[var(--text-secondary)]">
          / ${goal.target.toLocaleString()}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-[var(--border-color)] rounded-full overflow-hidden mb-3">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: "var(--accent-blue)" }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-[var(--text-secondary)]">
          {goal.monthly} · {goal.timeLeft}
        </span>
        <button className="text-xs font-medium text-[var(--text-primary)] flex items-center gap-1 hover:text-[var(--accent-blue)] transition-colors">
          Adjust <ArrowRight size={12} />
        </button>
      </div>
    </motion.div>
  );
}

/* ─── Recommendation Card ───────────────────────────────────────── */

function RecommendationCard({
  rec,
}: {
  rec: (typeof recommendations)[number];
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="flex-1 min-w-0 bg-[var(--bg-card)] rounded-2xl p-5"
      style={{ boxShadow: "0 1px 4px var(--shadow-color)" }}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div className="flex items-start gap-2 mb-2">
        <div className="w-2 h-2 rounded-full bg-[var(--accent-blue)] mt-1.5 shrink-0" />
        <h4 className="text-sm font-semibold text-[var(--text-primary)]">
          {rec.title}
        </h4>
      </div>
      <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4 pl-4">
        {rec.description}
      </p>
      <button
        className="text-xs font-semibold px-4 py-2 rounded-lg border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--bg-muted)] transition-colors"
      >
        Apply Change
      </button>
    </motion.div>
  );
}

/* ─── Goals Page ────────────────────────────────────────────────── */

export function GoalsPage() {
  return (
    <motion.div
      className="flex-1 p-6 overflow-auto min-h-0"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Goals</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Track progress and adjust your financial targets
          </p>
        </div>
        <motion.button
          className="flex items-center gap-2 px-5 py-3 rounded-full text-white text-sm font-semibold"
          style={{ backgroundColor: "var(--accent-blue)" }}
          whileHover={{ opacity: 0.9 }}
          whileTap={{ scale: 0.97 }}
        >
          <Plus size={16} strokeWidth={2.5} />
          Create Goal
        </motion.button>
      </motion.div>

      {/* Summary Stats */}
      <motion.div variants={fadeUp} className="flex gap-20 mb-10">
        {summaryStats.map((stat) => (
          <div key={stat.label}>
            <span className="text-xl font-bold text-[var(--text-primary)]">
              {stat.value}
            </span>
            <p className="text-sm text-[var(--text-secondary)] mt-1.5">
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Goal Cards — 2×2 grid */}
      <div className="grid grid-cols-2 gap-5 mb-6">
        {goals.map((goal) => (
          <GoalCard key={goal.name} goal={goal} />
        ))}
      </div>

      {/* AI Recommendations */}
      <motion.div variants={fadeUp}>
        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3">
          AI Recommendations
        </h2>
        <div className="flex gap-5">
          {recommendations.map((rec) => (
            <RecommendationCard key={rec.title} rec={rec} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
