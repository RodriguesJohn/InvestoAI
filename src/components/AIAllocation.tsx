import { useState } from "react";
import { motion } from "framer-motion";

const allocationData = [
  { label: "Grow Wealth", value: 40, color: "#1A3FBF", badge: "Growth", badgeColor: "#22C55E", amount: "$40/mo" },
  { label: "Emergency Fund", value: 30, color: "#3366FF", badge: "Safe", badgeColor: "#3B82F6", amount: "$30/mo" },
  { label: "Education", value: 15, color: "#7DA1FF", badge: "Moderate", badgeColor: "#F59E0B", amount: "$15/mo" },
  { label: "Retirement", value: 15, color: "#BDD0FF", badge: "Growth", badgeColor: "#22C55E", amount: "$15/mo" },
];

function DonutChart({
  activeIndex,
  onHover,
  onTap,
}: {
  activeIndex: number | null;
  onHover: (i: number | null) => void;
  onTap: (i: number) => void;
}) {
  const size = 160;
  const cx = size / 2;
  const cy = size / 2;
  const outerR = 72;
  const innerR = 48;
  const gap = 1.5;

  let cumulative = 0;
  const segments = allocationData.map((item) => {
    const degrees = (item.value / 100) * 360;
    const start = cumulative + gap / 2;
    const end = cumulative + degrees - gap / 2;
    cumulative += degrees;
    return { ...item, start, end };
  });

  function polarToCartesian(angle: number, r: number) {
    const rad = ((angle - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  // Center text: show hovered segment info or default
  const active = activeIndex !== null ? allocationData[activeIndex] : null;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="cursor-pointer shrink-0"
    >
      {segments.map((seg, i) => {
        const isActive = activeIndex === i;
        const outerStart = polarToCartesian(seg.start, outerR);
        const outerEnd = polarToCartesian(seg.end, outerR);
        const innerStart = polarToCartesian(seg.end, innerR);
        const innerEnd = polarToCartesian(seg.start, innerR);
        const largeArc = seg.end - seg.start > 180 ? 1 : 0;

        // Expand active segment outward slightly
        const midAngle = (seg.start + seg.end) / 2;
        const expandR = isActive ? 4 : 0;
        const offset = polarToCartesian(midAngle, expandR);
        const tx = offset.x - cx;
        const ty = offset.y - cy;

        const d = [
          `M ${outerStart.x} ${outerStart.y}`,
          `A ${outerR} ${outerR} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
          `L ${innerStart.x} ${innerStart.y}`,
          `A ${innerR} ${innerR} 0 ${largeArc} 0 ${innerEnd.x} ${innerEnd.y}`,
          "Z",
        ].join(" ");

        return (
          <g key={i}>
            <path
              d={d}
              fill={seg.color}
              opacity={activeIndex !== null && !isActive ? 0.5 : 1}
              transform={`translate(${tx}, ${ty})`}
              style={{
                transition: "opacity 0.2s ease, transform 0.2s ease",
                filter: isActive ? "drop-shadow(0 2px 6px rgba(0,0,0,0.2))" : "none",
              }}
              onMouseEnter={() => onHover(i)}
              onMouseLeave={() => onHover(null)}
              onClick={() => onTap(i)}
            />
          </g>
        );
      })}

      {/* Center text */}
      {active ? (
        <>
          <text
            x={cx}
            y={cy - 8}
            textAnchor="middle"
            dominantBaseline="central"
            className="font-bold"
            fill={active.color}
            fontSize={16}
          >
            {active.value}%
          </text>
          <text
            x={cx}
            y={cy + 12}
            textAnchor="middle"
            dominantBaseline="central"
            fill="var(--text-secondary)"
            fontSize={10}
          >
            {active.label}
          </text>
        </>
      ) : (
        <>
          <text
            x={cx}
            y={cy - 6}
            textAnchor="middle"
            dominantBaseline="central"
            className="font-bold"
            fill="var(--text-primary)"
            fontSize={18}
          >
            $100
          </text>
          <text
            x={cx}
            y={cy + 14}
            textAnchor="middle"
            dominantBaseline="central"
            fill="var(--text-secondary)"
            fontSize={12}
          >
            monthly
          </text>
        </>
      )}
    </svg>
  );
}

export function AIAllocation() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <motion.div
      className="p-5 rounded-2xl bg-white flex flex-col"
      style={{ boxShadow: "4px 2px 23px 5px rgba(242, 242, 242, 0.25)" }}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-[var(--text-primary)]">
          AI Allocation
        </h3>
      </div>
      <div className="flex items-center gap-6">
        <DonutChart
          activeIndex={activeIndex}
          onHover={setActiveIndex}
          onTap={(i) => setActiveIndex((prev) => (prev === i ? null : i))}
        />
        <div className="flex flex-col gap-3">
          {allocationData.map((item, i) => {
            const isActive = activeIndex === i;
            return (
              <motion.div
                key={item.label}
                className="flex items-center gap-2 cursor-pointer rounded-lg px-2 py-1 -mx-2 transition-colors"
                style={{
                  backgroundColor: isActive ? `${item.color}10` : "transparent",
                }}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
                onClick={() => setActiveIndex((prev) => (prev === i ? null : i))}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0 transition-transform"
                  style={{
                    backgroundColor: item.color,
                    transform: isActive ? "scale(1.3)" : "scale(1)",
                  }}
                />
                <span
                  className="text-sm transition-colors"
                  style={{
                    color: isActive ? item.color : "var(--text-primary)",
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {item.label}
                </span>
                <span className="text-sm font-semibold text-[var(--text-primary)]">
                  {item.value}%
                </span>
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-md text-white"
                  style={{ backgroundColor: item.badgeColor }}
                >
                  {item.badge}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

    </motion.div>
  );
}
