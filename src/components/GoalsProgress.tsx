import { motion } from "framer-motion";
import { TrendingUp, Shield } from "lucide-react";

const goals = [
  {
    name: "Grow Wealth",
    timeLeft: "7 years left",
    progress: 32,
    target: "$50,000",
    current: "$16,000",
    icon: TrendingUp,
    iconColor: "#3366FF",
  },
  {
    name: "Emergency Fund",
    timeLeft: "3 months left",
    progress: 80,
    target: "$15,000",
    current: "$12,000",
    icon: Shield,
    iconColor: "#22C55E",
  },
];

export function GoalsProgress() {
  return (
    <motion.div
      className="p-5 rounded-2xl bg-white"
      style={{ boxShadow: "4px 2px 23px 5px rgba(242, 242, 242, 0.25)" }}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <h3 className="text-base font-semibold text-[var(--text-primary)] mb-4">
        Your Goals
      </h3>
      <div className="flex flex-col gap-5">
        {goals.map((goal) => {
          const Icon = goal.icon;
          return (
            <div key={goal.name}>
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${goal.iconColor}15` }}
                >
                  <Icon size={18} style={{ color: goal.iconColor }} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-[var(--text-primary)]">
                    {goal.name}
                  </span>
                  <span className="text-xs text-[var(--text-secondary)]">
                    {goal.timeLeft}
                  </span>
                </div>
                <div className="ml-auto text-right">
                  <span className="text-sm font-semibold text-[var(--text-primary)]">
                    {goal.current}
                  </span>
                  <span className="text-sm text-[var(--text-secondary)]">
                    {" "}/ {goal.target}
                  </span>
                </div>
              </div>
              <div className="h-2 bg-[var(--border-color)] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: goal.iconColor }}
                  initial={{ width: 0 }}
                  animate={{ width: `${goal.progress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                />
              </div>
              <div className="text-right mt-1">
                <span className="text-xs text-[var(--text-secondary)]">
                  {goal.progress}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
