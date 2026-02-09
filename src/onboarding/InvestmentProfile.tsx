import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const riskOptions = [
  { id: "withdraw", label: "Take my money out", emoji: "📉" },
  { id: "wait", label: "Wait and see", emoji: "👀" },
  { id: "invest", label: "Put in more money", emoji: "💰" },
];

const timelineOptions = [
  { id: "soon", label: "Soon, within a year", emoji: "⏰" },
  { id: "few-years", label: "A few years from now", emoji: "📅" },
  { id: "long-time", label: "Not for a long time (5+ years)", emoji: "🏖️" },
  { id: "no-idea", label: "No idea", emoji: "🤷" },
];

const amountStops = [
  { value: 0, label: "Under $50", bubble: "Under $50" },
  { value: 1, label: "$50-200", bubble: "$50 – $200" },
  { value: 2, label: "$200-1K", bubble: "$200 – $1,000" },
  { value: 3, label: "$1,000+", bubble: "$1,000+" },
];

const frequencyStops = [
  { value: 0, label: "Just once", bubble: "Just once" },
  { value: 1, label: "Monthly", bubble: "Every month" },
  { value: 2, label: "When I can", bubble: "When I can" },
];

const subStepTransition = {
  initial: { opacity: 0, y: 10, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -8, filter: "blur(3px)" },
  transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
};

interface InvestmentProfileProps {
  onContinue: () => void;
}

/* ── Slider component ── */
function StepSlider({
  stops,
  value,
  onChange,
}: {
  stops: { value: number; label: string; bubble: string }[];
  value: number;
  onChange: (v: number) => void;
}) {
  const max = stops.length - 1;
  const pct = max > 0 ? (value / max) * 100 : 0;
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const resolveStop = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const nearest = Math.round(ratio * max);
      onChange(nearest);
    },
    [max, onChange],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      setDragging(true);
      resolveStop(e.clientX);
    },
    [resolveStop],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging) return;
      resolveStop(e.clientX);
    },
    [dragging, resolveStop],
  );

  const handlePointerUp = useCallback(() => {
    setDragging(false);
  }, []);

  return (
    <div className="w-full select-none">
      {/* Bubble */}
      <div
        className="inline-block mb-3 px-4 py-2 rounded-xl border-2 text-sm font-bold text-[var(--text-primary)]"
        style={{ borderColor: "var(--accent-blue)" }}
      >
        {stops[value].bubble}
      </div>

      {/* Track — the entire area is interactive via pointer events */}
      <div
        ref={trackRef}
        className="relative w-full h-10 flex items-center cursor-pointer touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Background track */}
        <div className="absolute inset-x-0 h-1.5 rounded-full bg-[var(--border-color)] pointer-events-none" />
        {/* Filled track */}
        <motion.div
          className="absolute left-0 h-1.5 rounded-full pointer-events-none"
          style={{ backgroundColor: "var(--accent-blue)", width: `${pct}%` }}
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
        {/* Stop dots */}
        {stops.map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full pointer-events-none -translate-x-1/2"
            style={{
              left: `${(i / max) * 100}%`,
              backgroundColor:
                i <= value ? "var(--accent-blue)" : "var(--border-color)",
            }}
          />
        ))}
        {/* Thumb */}
        <motion.div
          className="absolute w-6 h-6 rounded-full bg-white -translate-x-1/2 pointer-events-none"
          style={{
            borderColor: "var(--accent-blue)",
            borderWidth: 3,
            left: `${pct}%`,
            boxShadow: dragging
              ? "0 0 0 6px rgba(59,130,246,0.15)"
              : "0 1px 4px rgba(0,0,0,0.12)",
          }}
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>

      {/* Labels */}
      <div className="flex justify-between mt-1">
        {stops.map((stop, i) => (
          <span
            key={stop.label}
            className="text-xs font-medium"
            style={{
              color: i === value ? "var(--accent-blue)" : "var(--text-secondary)",
            }}
          >
            {stop.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function InvestmentProfile({ onContinue }: InvestmentProfileProps) {
  const [subStep, setSubStep] = useState(0);
  const [riskChoice, setRiskChoice] = useState<string | null>(null);
  const [timelineChoice, setTimelineChoice] = useState<string | null>(null);
  const [amountIdx, setAmountIdx] = useState(1);
  const [frequencyIdx, setFrequencyIdx] = useState(1);

  return (
    <AnimatePresence mode="wait">
      {/* ── Sub-step 0: Risk tolerance ── */}
      {subStep === 0 && (
        <motion.div
          key="risk"
          className="flex flex-col gap-6 w-full self-stretch"
          {...subStepTransition}
        >
          <h1 className="text-2xl font-bold text-[var(--text-primary)] leading-snug">
            Imagine you put in $100 and it dropped to $90. What would you do?
          </h1>

          <div className="flex flex-col gap-4">
            {riskOptions.map((option) => {
              const isSelected = riskChoice === option.id;
              return (
                <motion.button
                  key={option.id}
                  onClick={() => setRiskChoice(option.id)}
                  className="flex items-center gap-3 w-full px-5 py-4 rounded-xl border-2 text-left"
                  style={{
                    borderColor: isSelected
                      ? "var(--accent-blue)"
                      : "var(--border-color)",
                    backgroundColor: isSelected ? "var(--bg-page)" : "transparent",
                  }}
                  whileHover={{ y: -1, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <motion.span
                    className="text-2xl"
                    animate={isSelected ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {option.emoji}
                  </motion.span>
                  <span className="text-sm font-semibold text-[var(--text-primary)]">
                    {option.label}
                  </span>
                </motion.button>
              );
            })}
          </div>

          <button
            onClick={() => setSubStep(1)}
            className="w-full py-3.5 rounded-full text-white font-semibold text-base hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "var(--accent-blue)" }}
          >
            Continue
          </button>

          <div
            className="flex gap-3 p-4 rounded-xl"
            style={{ backgroundColor: "var(--bg-page)" }}
          >
            <span className="text-lg shrink-0">💡</span>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              This is called your risk tolerance — how comfortable you are with
              your money going up and down. There's no wrong answer; it just
              helps us match you with the right mix.
            </p>
          </div>
        </motion.div>
      )}

      {/* ── Sub-step 1: Timeline ── */}
      {subStep === 1 && (
        <motion.div
          key="timeline"
          className="flex flex-col gap-6 w-full self-stretch"
          {...subStepTransition}
        >
          <h1 className="text-2xl font-bold text-[var(--text-primary)] leading-snug">
            When might you need this money back?
          </h1>

          <div className="flex flex-col gap-4">
            {timelineOptions.map((option) => {
              const isSelected = timelineChoice === option.id;
              return (
                <motion.button
                  key={option.id}
                  onClick={() => setTimelineChoice(option.id)}
                  className="flex items-center w-full px-5 py-4 rounded-xl border-2 text-left"
                  style={{
                    borderColor: isSelected
                      ? "var(--accent-blue)"
                      : "var(--border-color)",
                    backgroundColor: isSelected ? "var(--bg-page)" : "transparent",
                  }}
                  whileHover={{ y: -1, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <motion.span
                    className="text-2xl"
                    animate={isSelected ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {option.emoji}
                  </motion.span>
                  <span className="flex-1 text-sm font-semibold text-[var(--text-primary)] ml-3">
                    {option.label}
                  </span>
                  <div
                    className="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0"
                    style={{
                      borderColor: isSelected
                        ? "var(--accent-blue)"
                        : "var(--border-color)",
                      backgroundColor: isSelected
                        ? "var(--accent-blue)"
                        : "transparent",
                    }}
                  >
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 rounded-full bg-white"
                      />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          <button
            onClick={() => setSubStep(2)}
            className="w-full py-3.5 rounded-full text-white font-semibold text-base hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "var(--accent-blue)" }}
          >
            Continue
          </button>

          <div
            className="flex gap-3 p-4 rounded-xl"
            style={{ backgroundColor: "var(--bg-page)" }}
          >
            <span className="text-lg shrink-0">💡</span>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              This is your investment timeline. The longer you can leave your money
              invested, the more time it has to grow and recover from any dips.
            </p>
          </div>
        </motion.div>
      )}

      {/* ── Sub-step 2: Amount & Frequency ── */}
      {subStep === 2 && (
        <motion.div
          key="amount"
          className="flex flex-col gap-8 w-full self-stretch"
          {...subStepTransition}
        >
          {/* Amount */}
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)] leading-snug mb-5">
              How much do you want to start with?
            </h1>
            <StepSlider
              stops={amountStops}
              value={amountIdx}
              onChange={setAmountIdx}
            />
          </div>

          {/* Frequency */}
          <div>
            <h2 className="text-xl font-bold text-[var(--text-primary)] leading-snug mb-5">
              And how often do you want to add money?
            </h2>
            <StepSlider
              stops={frequencyStops}
              value={frequencyIdx}
              onChange={setFrequencyIdx}
            />
          </div>

          <button
            onClick={onContinue}
            className="w-full py-3.5 rounded-full text-white font-semibold text-base hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "var(--accent-blue)" }}
          >
            Continue
          </button>

          <div
            className="flex gap-3 p-4 rounded-xl"
            style={{ backgroundColor: "var(--bg-page)" }}
          >
            <span className="text-lg shrink-0">💡</span>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              There's no minimum to start. Many investors begin small and add
              money regularly — that's called dollar-cost averaging. It's one of
              the simplest ways to build wealth over time.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
