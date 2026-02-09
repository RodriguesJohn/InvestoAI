import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Lock } from "lucide-react";
import confetti from "canvas-confetti";
import ChaseImg from "../assets/Chase.png";
import BOAImg from "../assets/BOA.png";
import WFImg from "../assets/WF.png";
import CitiImg from "../assets/Citi.png";
import IconImg from "../assets/Icon.png";
import { ShinyText } from "../components/ShinyText";

const subStepTransition = {
  initial: { opacity: 0, y: 30, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: 30, filter: "blur(3px)" },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
};

/* ── Growth chart SVG ── */
function GrowthChart() {
  const w = 400;
  const h = 140;
  const padding = { top: 10, right: 10, bottom: 30, left: 10 };
  const chartW = w - padding.left - padding.right;
  const chartH = h - padding.top - padding.bottom;

  const data: [number, number][] = [
    [0, 1200],
    [3, 5200],
    [7, 11000],
    [10, 17409],
  ];
  const maxVal = 18000;

  const points = data.map(([yr, val]) => ({
    x: padding.left + (yr / 10) * chartW,
    y: padding.top + chartH - (val / maxVal) * chartH,
  }));

  const pathD = points.reduce((acc, pt, i) => {
    if (i === 0) return `M${pt.x},${pt.y}`;
    const prev = points[i - 1];
    const cpx1 = prev.x + (pt.x - prev.x) * 0.4;
    const cpx2 = prev.x + (pt.x - prev.x) * 0.6;
    return `${acc} C${cpx1},${prev.y} ${cpx2},${pt.y} ${pt.x},${pt.y}`;
  }, "");

  const areaD = `${pathD} L${points[points.length - 1].x},${padding.top + chartH} L${points[0].x},${padding.top + chartH} Z`;
  const labels = ["Today", "3 yrs", "7 yrs", "10 yrs"];

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent-success)" stopOpacity={0.35} />
          <stop offset="100%" stopColor="var(--accent-success)" stopOpacity={0.03} />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#areaGrad)" />
      <path d={pathD} fill="none" stroke="var(--accent-success)" strokeWidth={2.5} strokeLinecap="round" />
      {points.map((pt, i) => (
        <g key={i}>
          <circle cx={pt.x} cy={pt.y} r={4} fill="white" stroke="var(--accent-success)" strokeWidth={2} />
        </g>
      ))}
      {points.map((pt, i) => (
        <text key={i} x={pt.x} y={h - 4} textAnchor="middle" fontSize={11} fill="var(--text-secondary)" fontFamily="inherit">
          {labels[i]}
        </text>
      ))}
    </svg>
  );
}

/* ── AI Recommendation ── */
function AIRecommendation({ onContinue }: { onContinue: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "10";
    canvas.style.borderRadius = "inherit";
    el.appendChild(canvas);

    const myConfetti = confetti.create(canvas, { resize: true });

    const colors = ["#0046FF", "#22C55E", "#FACC15", "#8B5CF6", "#EC4899", "#F97316"];

    // Wave 1 — massive center burst
    myConfetti({
      particleCount: 200,
      spread: 120,
      startVelocity: 35,
      gravity: 0.4,
      ticks: 250,
      origin: { x: 0.5, y: 0 },
      colors,
      scalar: 1,
    });
    // Wave 2 — left shower
    setTimeout(() => {
      myConfetti({
        particleCount: 100,
        spread: 80,
        startVelocity: 30,
        gravity: 0.4,
        ticks: 220,
        origin: { x: 0.15, y: 0 },
        colors,
        scalar: 0.9,
      });
    }, 200);
    // Wave 3 — right shower
    setTimeout(() => {
      myConfetti({
        particleCount: 100,
        spread: 80,
        startVelocity: 30,
        gravity: 0.4,
        ticks: 220,
        origin: { x: 0.85, y: 0 },
        colors,
        scalar: 0.9,
      });
    }, 350);
    // Wave 4 — second center burst
    setTimeout(() => {
      myConfetti({
        particleCount: 120,
        spread: 100,
        startVelocity: 25,
        gravity: 0.35,
        ticks: 200,
        origin: { x: 0.5, y: 0 },
        colors,
        scalar: 0.85,
      });
    }, 550);
    // Wave 5 — final sprinkle across
    setTimeout(() => {
      myConfetti({
        particleCount: 80,
        spread: 140,
        startVelocity: 18,
        gravity: 0.3,
        ticks: 180,
        origin: { x: 0.5, y: 0 },
        colors,
        scalar: 0.75,
      });
    }, 800);

    return () => {
      myConfetti.reset();
      canvas.remove();
    };
  }, []);

  const breakdown = [
    { pct: "60%", label: "Stocks (US & International)" },
    { pct: "30%", label: "Bonds (Government & Corporate)" },
    { pct: "10%", label: "Cash & Equivalents" },
  ];

  const contributed = 12000;
  const total = 17409;
  const growth = total - contributed;
  const contributedPct = (contributed / total) * 100;

  return (
    <motion.div
      key="recommendation"
      ref={containerRef}
      className="relative flex flex-col gap-5 w-full self-stretch overflow-hidden"
      {...subStepTransition}
    >
      <h1 className="text-2xl font-bold text-[var(--text-primary)] text-center leading-snug">
        AI recommended plan
      </h1>

      {/* Recommendation card */}
      <motion.div
        className="rounded-xl p-4 flex flex-col gap-3"
        style={{
          background: "linear-gradient(135deg, rgba(0,70,255,0.04) 0%, rgba(139,92,246,0.04) 100%)",
          border: "1.5px solid rgba(0,70,255,0.15)",
          boxShadow:
            "0 2px 12px rgba(0,70,255,0.08), 0 1px 3px rgba(0,0,0,0.04)",
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, duration: 0.4, ease: "easeOut" }}
      >
        <div className="flex items-center gap-2">
          <img
            src={IconImg}
            alt="Investo AI"
            className="w-7 h-7 object-contain"
          />
          <ShinyText
            text="Recommendation"
            speed={2}
            delay={0}
            color="var(--accent-blue)"
            shineColor="#99B3FF"
            spread={120}
            direction="left"
            className="text-sm font-bold"
          />
        </div>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          Based on your moderate risk tolerance and 10-year timeline, we recommend a
          balanced growth portfolio.
        </p>
      </motion.div>

      {/* Projection */}
      <div className="flex flex-col gap-2">
        <p className="text-sm text-[var(--text-secondary)]">
          Investing $100/month at 7% avg. return, in 10 years
        </p>
        <motion.p
          className="text-4xl font-bold"
          style={{ color: "var(--accent-blue)" }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
        >
          $17,409
        </motion.p>

        <div className="w-full h-1.5 rounded-full bg-[var(--border-color)] overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: "var(--accent-blue)" }}
            initial={{ width: 0 }}
            animate={{ width: `${contributedPct}%` }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between text-xs text-[var(--text-secondary)]">
          <span>${contributed.toLocaleString()} contributed</span>
          <span className="text-[var(--accent-success)]">+${growth.toLocaleString()} growth</span>
        </div>
      </div>

      {/* Growth chart */}
      <div
        className="rounded-xl border overflow-hidden p-3"
        style={{ borderColor: "var(--border-color)" }}
      >
        <GrowthChart />
      </div>

      {/* Portfolio breakdown */}
      <div
        className="rounded-xl border p-4 flex flex-col gap-3"
        style={{ borderColor: "var(--border-color)" }}
      >
        <h3 className="text-sm font-bold text-[var(--text-primary)]">
          Your portfolio breakdown
        </h3>
        <div className="flex flex-col gap-2.5">
          {breakdown.map((item, i) => (
            <motion.div
              key={item.label}
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.35 }}
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                style={{
                  backgroundColor: "var(--bg-page)",
                  color: "var(--text-secondary)",
                  border: "1.5px solid var(--border-color)",
                }}
              >
                {i + 1}
              </div>
              <span className="text-sm text-[var(--text-primary)]">
                <span className="font-semibold">{item.pct}</span> {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.button
        onClick={onContinue}
        className="w-full py-3.5 rounded-full text-white font-semibold text-base transition-opacity"
        style={{ backgroundColor: "var(--accent-blue)" }}
        whileHover={{ scale: 1.01, boxShadow: "0 4px 16px rgba(0,70,255,0.3)" }}
        whileTap={{ scale: 0.98 }}
      >
        Start Investing
      </motion.button>
    </motion.div>
  );
}

/* ── Connect Your Bank ── */
function ConnectBank({ onComplete }: { onComplete: () => void }) {
  const banks = [
    { name: "Bank of America", logo: BOAImg },
    { name: "Chase", logo: ChaseImg },
    { name: "Wells Fargo", logo: WFImg },
    { name: "Citi", logo: CitiImg },
  ];

  return (
    <motion.div
      key="connect-bank"
      className="flex flex-col gap-5 w-full self-stretch"
      {...subStepTransition}
    >
      <h1 className="text-2xl font-bold text-[var(--text-primary)] text-center leading-snug">
        Connect Your Bank
      </h1>

      <div className="flex flex-col gap-3">
        {banks.map((bank, i) => (
          <motion.button
            key={bank.name}
            className="flex items-center gap-4 w-full px-4 py-3.5 rounded-xl border text-left"
            style={{
              borderColor: "var(--border-color)",
              backgroundColor: "var(--bg-page)",
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.35 }}
            whileHover={{ y: -1, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
            whileTap={{ scale: 0.99 }}
          >
            <img src={bank.logo} alt={bank.name} className="w-10 h-10 rounded-lg object-contain shrink-0" />
            <span className="flex-1 text-sm font-semibold text-[var(--text-primary)]">
              {bank.name}
            </span>
            <ArrowRight size={16} className="text-[var(--text-secondary)]" />
          </motion.button>
        ))}
      </div>

      <button className="text-sm font-semibold text-[var(--accent-blue)] hover:underline">
        + Search all banks
      </button>

      <motion.button
        onClick={onComplete}
        className="w-full py-3.5 rounded-full text-white font-semibold text-base transition-opacity"
        style={{ backgroundColor: "var(--accent-blue)" }}
        whileHover={{ scale: 1.01, boxShadow: "0 4px 16px rgba(0,70,255,0.3)" }}
        whileTap={{ scale: 0.98 }}
      >
        Start Investing
      </motion.button>

      <div className="flex items-center justify-center gap-1.5 text-xs text-[var(--text-secondary)]">
        <Lock size={12} />
        <span>Secure with encryption</span>
      </div>
    </motion.div>
  );
}

/* ── Main StartJourney component ── */
interface StartJourneyProps {
  onComplete: () => void;
}

export function StartJourney({ onComplete }: StartJourneyProps) {
  const [subStep, setSubStep] = useState(0);

  return (
    <AnimatePresence mode="wait">
      {subStep === 0 && (
        <AIRecommendation onContinue={() => setSubStep(1)} />
      )}
      {subStep === 1 && (
        <ConnectBank onComplete={onComplete} />
      )}
    </AnimatePresence>
  );
}
