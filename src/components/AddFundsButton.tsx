import { useState, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import ChaseLogo from "../assets/Chase.png";

const presetAmounts = [100, 250, 500, 1000];

function BlurCounter({ value }: { value: number }) {
  const chars = useMemo(() => value.toLocaleString().split(""), [value]);

  return (
    <span className="inline-flex">
      <AnimatePresence mode="popLayout">
        {chars.map((char, i) => (
          <motion.span
            key={`${value}-${i}`}
            initial={{ opacity: 0, filter: "blur(3px)", y: -6 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(3px)", y: 4 }}
            transition={{
              duration: 0.6,
              delay: i * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block"
          >
            {char}
          </motion.span>
        ))}
      </AnimatePresence>
    </span>
  );
}

/* ─── Confetti ──────────────────────────────────────────────────── */

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  size: number;
  delay: number;
  drift: number;
  rotation: number;
  shape: "square" | "circle" | "strip";
}

function getTokenColors(): string[] {
  const root = document.documentElement;
  const style = getComputedStyle(root);
  return [
    style.getPropertyValue("--accent-blue").trim(),
    style.getPropertyValue("--accent-success").trim(),
    style.getPropertyValue("--accent-warning").trim(),
    style.getPropertyValue("--accent-error").trim(),
    style.getPropertyValue("--accent-purple").trim(),
    style.getPropertyValue("--accent-pink").trim(),
    style.getPropertyValue("--accent-teal").trim(),
  ].filter(Boolean);
}

function Confetti() {
  const pieces = useMemo(() => {
    const colors = getTokenColors();
    const result: ConfettiPiece[] = [];
    for (let i = 0; i < 60; i++) {
      result.push({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 4 + Math.random() * 6,
        delay: Math.random() * 0.6,
        drift: (Math.random() - 0.5) * 120,
        rotation: Math.random() * 720 - 360,
        shape: (["square", "circle", "strip"] as const)[Math.floor(Math.random() * 3)],
      });
    }
    return result;
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: -10,
            width: p.shape === "strip" ? p.size * 0.4 : p.size,
            height: p.shape === "strip" ? p.size * 2 : p.size,
            backgroundColor: p.color,
            borderRadius: p.shape === "circle" ? "50%" : p.shape === "strip" ? 2 : 1,
          }}
          initial={{ y: 0, x: 0, rotate: 0, opacity: 1 }}
          animate={{
            y: 500,
            x: p.drift,
            rotate: p.rotation,
            opacity: [1, 1, 1, 0],
          }}
          transition={{
            duration: 2.5 + Math.random(),
            delay: p.delay,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
    </div>
  );
}

/* ─── Success Screen ────────────────────────────────────────────── */

function SuccessScreen({
  amount,
  date,
  onDone,
}: {
  amount: string;
  date: string;
  onDone: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-[calc(100vw-32px)] sm:w-[440px] bg-[var(--bg-card)] rounded-2xl p-6 sm:p-8 relative overflow-hidden"
      style={{
        boxShadow: "0 20px 60px var(--shadow-color), 0 4px 16px var(--shadow-color)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <Confetti />

      <div className="flex flex-col items-center text-center relative z-20">
        {/* Checkmark */}
        <motion.div
          className="w-16 h-16 rounded-full bg-[var(--accent-success)] flex items-center justify-center mb-5"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.15 }}
        >
          <Check size={32} color="white" strokeWidth={3} />
        </motion.div>

        {/* Title */}
        <motion.h2
          className="text-xl font-bold text-[var(--text-primary)] mb-2"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Deposit Initiated!
        </motion.h2>

        {/* Amount */}
        <motion.p
          className="text-4xl font-bold mb-3"
          style={{ color: "var(--accent-success)" }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {amount}
        </motion.p>

        {/* Subtitle */}
        <motion.p
          className="text-sm text-[var(--text-secondary)] mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Your funds are on the way to your
          <br />
          Investo AI account
        </motion.p>

        {/* Details */}
        <motion.div
          className="w-full bg-[var(--bg-muted)] rounded-xl p-4 mb-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[var(--text-secondary)]">From</span>
            <span className="text-sm font-semibold text-[var(--text-primary)]">
              Chase Bank ••••4582
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--text-secondary)]">Expected by</span>
            <span className="text-sm font-semibold text-[var(--text-primary)]">
              {date}
            </span>
          </div>
        </motion.div>

        {/* Done Button */}
        <motion.button
          className="w-full py-4 rounded-full text-white font-semibold text-base"
          style={{ backgroundColor: "var(--accent-blue)" }}
          whileHover={{ opacity: 0.9 }}
          whileTap={{ scale: 0.98 }}
          onClick={onDone}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Done
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ─── Main Component ────────────────────────────────────────────── */

export function AddFundsButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(500);

  const formattedDeposit = `$${selectedAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

  const arrivalDate = new Date();
  arrivalDate.setDate(arrivalDate.getDate() + 1);
  const formattedDate = arrivalDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleClose = useCallback(() => {
    setIsOpen(false);
    // Reset after close animation
    setTimeout(() => {
      setConfirmed(false);
      setSelectedAmount(500);
    }, 300);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-6 py-3.5 rounded-[30px] text-white font-semibold text-[15px] hover:opacity-90 transition-opacity"
        style={{ backgroundColor: "var(--accent-blue)" }}
      >
        <span className="text-lg font-semibold">+</span>
        <span>Add Funds</span>
      </button>

      {/* Backdrop — rendered via portal to escape stacking context */}
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.25)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
              onClick={handleClose}
            >
              <AnimatePresence mode="wait">
                {!confirmed ? (
                  <motion.div
                    key="form"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="w-[calc(100vw-32px)] sm:w-[440px] bg-[var(--bg-card)] rounded-2xl p-6 sm:p-8 relative"
                  style={{
                    boxShadow: "0 20px 60px var(--shadow-color), 0 4px 16px var(--shadow-color)",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-[var(--text-primary)]">
                      Add Funds
                    </h2>
                    <button
                      onClick={handleClose}
                      className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[var(--bg-muted)] transition-colors"
                    >
                      <X size={20} className="text-[var(--text-secondary)]" />
                    </button>
                  </div>

                  {/* Enter Amount */}
                  <p className="text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Enter Amount
                  </p>
                  <div className="flex items-baseline mb-5">
                    <span className="text-3xl font-bold text-[var(--text-secondary)]">$</span>
                    <span className="text-5xl font-bold text-[var(--text-primary)] tracking-tight">
                      <BlurCounter value={selectedAmount} />
                    </span>
                    <span className="text-2xl font-medium text-[var(--text-secondary)] ml-0.5">
                      .00
                    </span>
                  </div>

                  {/* Preset Amounts */}
                  <div className="flex gap-3 mb-6">
                    {presetAmounts.map((amount) => {
                      const isSelected = amount === selectedAmount;
                      return (
                        <motion.button
                          key={amount}
                          onClick={() => setSelectedAmount(amount)}
                          className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                            isSelected
                              ? "bg-[var(--accent-blue)] text-white"
                              : "bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border-color)] hover:bg-[var(--bg-muted)]"
                          }`}
                          whileTap={{ scale: 0.95 }}
                        >
                          ${amount.toLocaleString()}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* From Bank */}
                  <p className="text-sm font-medium text-[var(--text-secondary)] mb-2">
                    From
                  </p>
                  <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--border-color)] mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-[var(--bg-muted)]">
                        <img src={ChaseLogo} alt="Chase" className="w-6 h-6 object-contain" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[var(--text-primary)]">
                          Chase Bank
                        </p>
                        <p className="text-xs text-[var(--text-secondary)]">
                          Checking ••••4582
                        </p>
                      </div>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-[var(--accent-blue)] flex items-center justify-center">
                      <Check size={14} color="white" strokeWidth={3} />
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="flex flex-col gap-2 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[var(--text-secondary)]">Deposit amount</span>
                      <span className="text-sm font-semibold text-[var(--text-primary)]">
                        {formattedDeposit}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[var(--text-secondary)]">Estimated arrival</span>
                      <span className="text-sm font-semibold text-[var(--text-primary)]">
                        {formattedDate}
                      </span>
                    </div>
                  </div>

                  {/* Confirm Button */}
                  <motion.button
                    className="w-full py-4 rounded-full text-white font-semibold text-base"
                    style={{ backgroundColor: "var(--accent-blue)" }}
                    whileHover={{ opacity: 0.9 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setConfirmed(true)}
                  >
                    Confirm Deposit
                  </motion.button>
                </motion.div>
              ) : (
                <SuccessScreen
                  key="success"
                  amount={formattedDeposit}
                  date={formattedDate}
                  onDone={handleClose}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
      )}
    </>
  );
}
