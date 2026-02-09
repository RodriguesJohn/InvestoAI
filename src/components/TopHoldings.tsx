import { motion } from "framer-motion";
import AppleLogo from "../assets/Apple.png";
import TeslaLogo from "../assets/Tesla.png";

const holdings = [
  { name: "Apple Inc.", ticker: "AAPL", value: "$5,240", change: "+2.4%", logo: AppleLogo },
  { name: "Tesla Inc.", ticker: "TSLA", value: "$3,450", change: "-0.8%", logo: TeslaLogo },
  { name: "S&P 500 ETF", ticker: "VOO", value: "$8,120", change: "+1.1%", logo: null },
];

export function TopHoldings() {
  return (
    <motion.div
      className="p-5 rounded-2xl bg-white"
      style={{ boxShadow: "4px 2px 23px 5px rgba(242, 242, 242, 0.25)" }}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <h3 className="text-base font-semibold text-[var(--text-primary)] mb-4">
        Your Top Holdings
      </h3>
      <div className="flex flex-col gap-2">
        {holdings.map((holding) => (
          <div
            key={holding.name}
            className="flex items-center justify-between py-3 px-3 rounded-xl cursor-pointer hover:bg-[var(--bg-muted)] transition-colors duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[var(--bg-muted)] flex items-center justify-center overflow-hidden">
                {holding.logo ? (
                  <img
                    src={holding.logo}
                    alt={holding.name}
                    className="w-5 h-5 object-contain"
                  />
                ) : (
                  <span className="text-xs font-semibold text-[var(--text-secondary)]">
                    VO
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-[var(--text-primary)]">
                  {holding.name}
                </span>
                <span className="text-xs text-[var(--text-secondary)]">
                  {holding.ticker}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-[var(--text-primary)]">
                {holding.value}
              </p>
              <p
                className={`text-xs font-medium ${
                  holding.change.startsWith("+")
                    ? "text-[var(--accent-success)]"
                    : "text-red-500"
                }`}
              >
                {holding.change}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
