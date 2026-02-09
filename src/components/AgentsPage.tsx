import { motion } from "framer-motion";

/* ─── Data ──────────────────────────────────────────────────────── */

const summaryStats = [
  { label: "Active Agents", value: "2" },
  { label: "Actions This Month", value: "156" },
  { label: "Optimized Savings", value: "$2,450" },
];

interface Agent {
  name: string;
  description: string;
  color: string;
  active: boolean;
  actions: string;
}

const agents: Agent[] = [
  {
    name: "Portfolio Optimizer",
    description:
      "Continuously rebalances your portfolio based on market conditions and your risk tolerance.",
    color: "#5B8DEF",
    active: true,
    actions: "47 actions",
  },
  {
    name: "Goal Tracker",
    description:
      "Monitors your financial goals and automatically adjusts contributions to keep you on track.",
    color: "#34D399",
    active: true,
    actions: "109 actions",
  },
  {
    name: "Tax Optimizer",
    description:
      "Identifies tax-loss harvesting opportunities and optimizes for tax-efficient investing.",
    color: "#67E8F9",
    active: false,
    actions: "—",
  },
  {
    name: "Dividend Hunter",
    description:
      "Finds and recommends high-quality dividend stocks that match your investment criteria.",
    color: "#A78BFA",
    active: false,
    actions: "—",
  },
  {
    name: "Risk Monitor",
    description:
      "Watches for portfolio concentration risks and alerts you to potential vulnerabilities.",
    color: "#FB923C",
    active: false,
    actions: "—",
  },
  {
    name: "Market Scout",
    description:
      "Scans markets for opportunities aligned with your strategy and sends timely alerts.",
    color: "#F472B6",
    active: false,
    actions: "—",
  },
];

/* ─── Animations ────────────────────────────────────────────────── */

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
};

/* ─── Agent Card ────────────────────────────────────────────────── */

function AnimatedOrb({ color }: { color: string }) {
  return (
    <div className="w-12 h-12 rounded-full relative overflow-hidden shrink-0">
      <motion.div
        className="absolute inset-[-50%] rounded-full"
        style={{
          background: `conic-gradient(from 0deg, ${color}, ${color}44, ${color}BB, ${color}22, ${color})`,
          filter: "blur(4px)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
      <div
        className="absolute inset-[3px] rounded-full"
        style={{
          background: `radial-gradient(circle at 35% 35%, ${color}DD, ${color}88 50%, ${color}44)`,
        }}
      />
    </div>
  );
}

function AgentCard({ agent }: { agent: Agent }) {
  return (
    <motion.div
      variants={fadeUp}
      className="bg-[var(--bg-card)] rounded-2xl p-5 flex flex-col"
      style={{
        boxShadow: "0 1px 4px var(--shadow-color)",
        border: agent.active
          ? `2px dashed ${agent.color}`
          : "1px solid var(--border-color)",
      }}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Icon + Badge */}
      <div className="flex items-start justify-between mb-4">
        <AnimatedOrb color={agent.color} />
        <span
          className="text-sm font-medium px-3 py-1 rounded-full"
          style={
            agent.active
              ? { backgroundColor: `${agent.color}18`, color: agent.color }
              : {
                  backgroundColor: "var(--bg-muted)",
                  color: "var(--text-secondary)",
                }
          }
        >
          {agent.active ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Name */}
      <h3 className="text-base font-bold text-[var(--text-primary)] mb-1.5">
        {agent.name}
      </h3>

      {/* Description */}
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 flex-1">
        {agent.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-[var(--text-secondary)]">
          {agent.actions}
        </span>
        {agent.active ? (
          <button className="text-sm font-semibold px-5 py-2.5 rounded-lg border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--bg-muted)] transition-colors">
            Manage
          </button>
        ) : (
          <motion.button
            className="text-sm font-semibold px-5 py-2.5 rounded-lg text-white"
            style={{ backgroundColor: "var(--accent-blue)" }}
            whileHover={{ opacity: 0.9 }}
            whileTap={{ scale: 0.97 }}
          >
            Activate
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Agents Page ───────────────────────────────────────────────── */

export function AgentsPage() {
  return (
    <motion.div
      className="flex-1 p-6 overflow-auto min-h-0"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          Investo Agents
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Deploy AI agents to automate and optimize your financial strategy
        </p>
      </motion.div>

      {/* Summary Stats Bar */}
      <motion.div
        variants={fadeUp}
        className="flex items-center mb-8 px-8 py-5 rounded-2xl border border-[var(--border-color)]"
      >
        {summaryStats.map((stat, i) => (
          <div key={stat.label} className="flex items-center flex-1">
            {i > 0 && (
              <div className="w-px h-8 bg-[var(--border-color)] mr-8" />
            )}
            <div className="flex items-baseline gap-2.5">
              <span className="text-2xl font-bold text-[var(--text-primary)]">
                {stat.value}
              </span>
              <span className="text-sm text-[var(--text-secondary)]">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Section Title */}
      <motion.h2
        variants={fadeUp}
        className="text-base font-bold text-[var(--text-primary)] mb-4"
      >
        Available Agents
      </motion.h2>

      {/* Agent Cards — 3×2 grid */}
      <div className="grid grid-cols-3 gap-5">
        {agents.map((agent) => (
          <AgentCard key={agent.name} agent={agent} />
        ))}
      </div>
    </motion.div>
  );
}
