import { motion } from "framer-motion";

interface KPICardProps {
  label: string;
  value: string;
  change?: string;
}

export function KPICard({ label, value, change }: KPICardProps) {
  return (
    <motion.div
      className="flex-1 p-3.5 md:p-5 rounded-xl bg-white min-w-0"
      style={{
        boxShadow: "4px 2px 23px 5px rgba(242, 242, 242, 0.25)",
      }}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <p className="text-xs md:text-sm font-medium text-[var(--text-secondary)] mb-1.5 md:mb-2">
        {label}
      </p>
      <p className="text-lg md:text-2xl font-bold text-[var(--text-primary)]">{value}</p>
      {change && (
        <p
          className="text-xs md:text-sm font-medium mt-1.5 md:mt-2"
          style={{ color: "var(--accent-success)" }}
        >
          {change}
        </p>
      )}
    </motion.div>
  );
}
