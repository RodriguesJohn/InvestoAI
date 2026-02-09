import { useState } from "react";
import { motion } from "framer-motion";

const goals = [
  { id: "grow", label: "Grow Wealth", emoji: "📈" },
  { id: "save", label: "Save", emoji: "🏠" },
  { id: "retirement", label: "Retirement", emoji: "🎯" },
  { id: "education", label: "Education", emoji: "🎓" },
  { id: "emergency", label: "Emergency fund", emoji: "🛡️" },
  { id: "travel", label: "Travel", emoji: "✈️" },
];

interface ShareGoalsProps {
  onContinue: () => void;
}

export function ShareGoals({ onContinue }: ShareGoalsProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id],
    );
  };

  return (
    <div className="flex flex-col gap-6 w-full self-stretch">
      {/* Header */}
      <h1 className="text-2xl font-bold text-[var(--text-primary)]">
        What do you want to do with your money?
      </h1>

      {/* Goal Cards — 3 columns */}
      <div className="grid grid-cols-3 gap-3">
        {goals.map((goal) => {
          const isSelected = selected.includes(goal.id);
          return (
            <motion.button
              key={goal.id}
              onClick={() => toggle(goal.id)}
              className="flex flex-col items-center justify-center gap-2 p-5 rounded-xl border-2"
              style={{
                borderColor: isSelected
                  ? "var(--accent-blue)"
                  : "var(--border-color)",
                backgroundColor: "transparent",
              }}
              whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <motion.span
                className="text-3xl"
                animate={isSelected ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {goal.emoji}
              </motion.span>
              <span className="text-sm font-medium text-[var(--text-primary)]">
                {goal.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Continue */}
      <button
        onClick={onContinue}
        className="w-full py-3.5 rounded-full text-white font-semibold text-base hover:opacity-90 transition-opacity"
        style={{ backgroundColor: "var(--accent-blue)" }}
      >
        Continue
      </button>

      {/* Tip */}
      <div
        className="flex gap-3 p-4 rounded-xl"
        style={{ backgroundColor: "var(--bg-page)" }}
      >
        <span className="text-lg shrink-0">💡</span>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          This is called your risk tolerance, how comfortable you are with your
          money going up and down. There's no wrong answer, it just helps us
          match you with the right mix.
        </p>
      </div>
    </div>
  );
}
