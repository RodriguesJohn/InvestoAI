import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const tips = [
  {
    title: "Rebalance your portfolio",
    description:
      "Your tech allocation has grown to 70%. Consider rebalancing to maintain your target risk level.",
  },
  {
    title: "Max out your IRA",
    description:
      "You have contributed $4,200 this year. Add $2,800 more before April to maximize tax benefits.",
  },
  {
    title: "Build your emergency fund",
    description:
      "You have 2 months of expenses saved. Aim for 3-6 months before increasing investments.",
  },
];

export function TipOfTheDay() {
  return (
    <motion.div
      className="p-5 rounded-2xl bg-white"
      style={{
        boxShadow: "4px 2px 23px 5px rgba(242, 242, 242, 0.25)",
      }}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-base">✨</span>
        <span className="text-sm font-medium text-[var(--text-secondary)]">
          Tip of the day
        </span>
      </div>
      <div className="flex gap-4">
        {tips.map((tip, i) => (
          <motion.div
            key={i}
            className="flex-1 p-4 rounded-xl relative cursor-pointer"
            style={{ backgroundColor: "var(--bg-muted)" }}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.15 }}
          >
            <div className="flex items-start gap-2 mb-2">
              <Sparkles size={16} className="text-yellow-400 shrink-0 mt-0.5" />
              <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                {tip.title}
              </h4>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {tip.description}
            </p>
            {i === tips.length - 1 && (
              <Sparkles
                size={20}
                className="text-yellow-400 absolute top-3 right-3 opacity-60"
              />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
