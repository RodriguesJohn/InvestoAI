import { motion } from "framer-motion";

const checklistItems = [
  "Stocks for growth (60%)",
  "Bonds for stability (40%)",
  "We rebalance quarterly for you",
  "Earnings reinvested automatically",
];

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.1 + i * 0.1, duration: 0.35, ease: "easeOut" },
  }),
};

export function Checklist() {
  return (
    <motion.div
      className="p-5 rounded-2xl bg-white"
      style={{ boxShadow: "4px 2px 23px 5px rgba(242, 242, 242, 0.25)" }}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <h3 className="text-base font-semibold text-[var(--text-primary)] mb-4">
        How we'll manage your money
      </h3>
      <div className="flex flex-col gap-4">
        {checklistItems.map((item, i) => (
          <motion.div
            key={item}
            className="flex items-center gap-3"
            custom={i}
            variants={itemVariants}
            initial="hidden"
            animate="show"
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold"
              style={{
                backgroundColor: i === 0 ? "var(--accent-success)" : "var(--text-secondary)",
              }}
            >
              {i === 0 ? "✓" : i + 1}
            </div>
            <span className="text-sm text-[var(--text-primary)]">{item}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
