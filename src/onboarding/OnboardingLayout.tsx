import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import IconImg from "../assets/Icon.png";

const steps = [
  { label: "Create account", detail: "Enter your email and password" },
  { label: "Share goals", detail: "Tell us about your financial goals" },
  { label: "Setup investment profile", detail: "Setup your investment profile" },
  { label: "Start your financial journey", detail: "Start your financial journey" },
];

const contentTransition = {
  initial: { opacity: 0, y: 10, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -8, filter: "blur(3px)" },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
};

interface OnboardingLayoutProps {
  currentStep: number;
  children: React.ReactNode;
}

export function OnboardingLayout({ currentStep, children }: OnboardingLayoutProps) {
  return (
    <div
      className="h-screen flex flex-col md:flex-row overflow-hidden"
      style={{ backgroundColor: "var(--bg-page)" }}
    >
      {/* Left Sidebar — hidden on mobile, shown on md+ */}
      <div className="hidden md:flex w-[520px] shrink-0 bg-[var(--bg-card)] px-14 py-10 flex-col border-r border-[var(--border-color)]">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <img src={IconImg} alt="Investo AI" className="w-10 h-10 object-contain" />
            <span className="text-lg font-semibold text-[var(--text-primary)]">
              Investo AI
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
            Get started Today
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-10">
            Complete these steps to set up your personalized investment experience.
          </p>

          {/* Steps */}
          <div className="flex flex-col gap-6">
            {steps.map((step, i) => {
              const isCompleted = i < currentStep;
              const isActive = i === currentStep;

              return (
                <div key={step.label} className="flex items-start gap-3.5">
                  {/* Step indicator */}
                  <div className="mt-0.5">
                    {isCompleted || isActive ? (
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 rounded-full bg-[var(--accent-success)] flex items-center justify-center"
                      >
                        <Check size={14} color="white" strokeWidth={3} />
                      </motion.div>
                    ) : (
                      <div
                        className="w-6 h-6 rounded-full border-2 flex items-center justify-center"
                        style={{ borderColor: "var(--border-color)" }}
                      />
                    )}
                  </div>

                  {/* Step text */}
                  <div>
                    <p
                      className={`text-sm font-semibold ${
                        isActive || isCompleted
                          ? "text-[var(--text-primary)]"
                          : "text-[var(--text-secondary)]"
                      }`}
                    >
                      {step.label}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                      {step.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex-1" />
      </div>

      {/* Mobile Step Indicator */}
      <div className="md:hidden shrink-0 bg-[var(--bg-card)] px-4 py-4 border-b border-[var(--border-color)]">
        <div className="flex items-center gap-3 mb-3">
          <img src={IconImg} alt="Investo AI" className="w-7 h-7 object-contain" />
          <span className="text-base font-semibold text-[var(--text-primary)]">
            Investo AI
          </span>
        </div>
        {/* Step dots */}
        <div className="flex items-center gap-2">
          {steps.map((step, i) => {
            const isCompleted = i < currentStep;
            const isActive = i === currentStep;
            return (
              <div key={step.label} className="flex items-center gap-2">
                {i > 0 && (
                  <div
                    className="h-px w-6"
                    style={{
                      backgroundColor: isCompleted ? "var(--accent-success)" : "var(--border-color)",
                    }}
                  />
                )}
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor:
                      isCompleted || isActive ? "var(--accent-success)" : "transparent",
                    border:
                      isCompleted || isActive ? "none" : "2px solid var(--border-color)",
                  }}
                >
                  {(isCompleted || isActive) && (
                    <Check size={10} color="white" strokeWidth={3} />
                  )}
                </div>
              </div>
            );
          })}
          <span className="ml-2 text-xs text-[var(--text-secondary)]">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-6 overflow-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            className="w-full max-w-[496px] bg-[var(--bg-card)] rounded-2xl"
            style={{
              padding: "24px 16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              boxShadow: "0 1px 4px var(--shadow-color)",
            }}
            {...contentTransition}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
