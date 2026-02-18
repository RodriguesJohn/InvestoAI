import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import IconImg from "../assets/Icon.png";

const APP_PASSWORD = "investo123";

interface LockScreenProps {
  onUnlock: () => void;
}

export function LockScreen({ onUnlock }: LockScreenProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password === APP_PASSWORD) {
      onUnlock();
    } else {
      setError("Incorrect password");
      setPassword("");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "var(--bg-page)" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full max-w-sm text-center"
      >
        {/* Logo only */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center cursor-pointer"
          style={{ backgroundColor: "var(--bg-card)" }}
          onClick={() => setShowInput(true)}
        >
          <img src={IconImg} alt="Investo AI" className="w-12 h-12 object-contain" />
        </motion.div>
        <h1
          className="text-2xl font-bold text-[var(--text-primary)] cursor-pointer"
          onClick={() => setShowInput(true)}
        >
          Investo AI
        </h1>

        {/* Hidden password input - appears on tap */}
        <AnimatePresence>
          {showInput && (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="mt-8 space-y-4"
            >
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full h-12 px-4 pr-12 rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                  style={{ backgroundColor: "var(--bg-card)" }}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5"
                >
                  {showPassword ? (
                    <EyeOff size={18} className="text-[var(--text-tertiary)]" />
                  ) : (
                    <Eye size={18} className="text-[var(--text-tertiary)]" />
                  )}
                </button>
              </div>

              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}

              <motion.button
                type="submit"
                whileTap={{ scale: 0.98 }}
                className="w-full h-12 rounded-xl font-semibold text-white"
                style={{ backgroundColor: "var(--accent-primary)" }}
              >
                Unlock
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>

        {!showInput && (
          <p className="text-xs text-[var(--text-tertiary)] mt-4">
            Tap to unlock
          </p>
        )}
      </motion.div>
    </div>
  );
}
