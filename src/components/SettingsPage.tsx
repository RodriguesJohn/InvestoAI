import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

/* ─── Data ──────────────────────────────────────────────────────── */

const securityItems = [
  { label: "Two-factor authentication", detail: "Enabled", action: "Manage" },
  { label: "Change password", detail: "Last changed 30 days ago", action: "Update" },
  { label: "Login sessions", detail: "2 active devices", action: "View" },
];

const notificationDefaults = [
  { label: "Portfolio alerts", detail: "Get notified of significant changes", defaultOn: true },
  { label: "Goal updates", detail: "Progress towards your goals", defaultOn: true },
  { label: "Market news", detail: "Daily market summaries", defaultOn: false },
  { label: "Agent activity", detail: "When agents take actions", defaultOn: true },
];

const connectedAccounts = [
  { name: "Chase Bank", detail: "Checking ••••4582" },
  { name: "Fidelity", detail: "Brokerage ••••9123" },
];

/* ─── Animations ────────────────────────────────────────────────── */

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
};

/* ─── Toggle Switch ─────────────────────────────────────────────── */

function Toggle({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="relative w-11 h-6 rounded-full transition-colors shrink-0"
      style={{
        backgroundColor: enabled ? "var(--accent-success)" : "var(--border-color)",
      }}
    >
      <motion.div
        className="absolute top-0.5 w-5 h-5 rounded-full bg-white"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }}
        animate={{ left: enabled ? 22 : 2 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />
    </button>
  );
}

/* ─── Settings Page ─────────────────────────────────────────────── */

export function SettingsPage() {
  const [notifications, setNotifications] = useState(
    notificationDefaults.map((n) => n.defaultOn),
  );

  const toggleNotification = (index: number) => {
    setNotifications((prev) => prev.map((v, i) => (i === index ? !v : v)));
  };

  return (
    <motion.div
      className="flex-1 p-6 overflow-auto min-h-0"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          Settings
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Manage your account preferences and security
        </p>
      </motion.div>

      {/* Top Row: Profile + Security */}
      <div className="grid grid-cols-2 gap-5 mb-5">
        {/* Profile */}
        <motion.div
          variants={fadeUp}
          className="bg-[var(--bg-card)] rounded-2xl p-6"
          style={{ boxShadow: "0 1px 4px var(--shadow-color)" }}
        >
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-5">
            Profile
          </h3>
          <div className="flex items-center gap-4 mb-5">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white text-base font-bold shrink-0"
              style={{ backgroundColor: "var(--accent-blue)" }}
            >
              AJ
            </div>
            <div>
              <p className="text-base font-semibold text-[var(--text-primary)]">
                Alex Johnson
              </p>
              <p className="text-sm text-[var(--text-secondary)]">
                alex.johnson@email.com
              </p>
            </div>
          </div>
          <button className="text-sm font-semibold px-5 py-2.5 rounded-lg border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--bg-muted)] transition-colors">
            Edit Profile
          </button>
        </motion.div>

        {/* Security */}
        <motion.div
          variants={fadeUp}
          className="bg-[var(--bg-card)] rounded-2xl p-6"
          style={{ boxShadow: "0 1px 4px var(--shadow-color)" }}
        >
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-5">
            Security
          </h3>
          <div className="flex flex-col gap-5">
            {securityItems.map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div>
                  <p className="text-base font-medium text-[var(--text-primary)]">
                    {item.label}
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {item.detail}
                  </p>
                </div>
                <button className="text-base font-medium text-[var(--accent-blue)] hover:underline">
                  {item.action}
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Row: Notifications + Connected Accounts */}
      <div className="grid grid-cols-2 gap-5">
        {/* Notifications */}
        <motion.div
          variants={fadeUp}
          className="bg-[var(--bg-card)] rounded-2xl p-6"
          style={{ boxShadow: "0 1px 4px var(--shadow-color)" }}
        >
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-5">
            Notifications
          </h3>
          <div className="flex flex-col gap-5">
            {notificationDefaults.map((item, i) => (
              <div key={item.label} className="flex items-center justify-between">
                <div>
                  <p className="text-base font-medium text-[var(--text-primary)]">
                    {item.label}
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {item.detail}
                  </p>
                </div>
                <Toggle
                  enabled={notifications[i]}
                  onToggle={() => toggleNotification(i)}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Connected Accounts */}
        <motion.div
          variants={fadeUp}
          className="bg-[var(--bg-card)] rounded-2xl p-6"
          style={{ boxShadow: "0 1px 4px var(--shadow-color)" }}
        >
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-5">
            Connected Accounts
          </h3>
          <div className="flex flex-col gap-5 mb-6">
            {connectedAccounts.map((account) => (
              <div key={account.name} className="flex items-center justify-between">
                <div>
                  <p className="text-base font-medium text-[var(--text-primary)]">
                    {account.name}
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {account.detail}
                  </p>
                </div>
                <button className="text-base text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  Remove
                </button>
              </div>
            ))}
          </div>
          <motion.button
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-semibold"
            style={{ backgroundColor: "var(--accent-blue)" }}
            whileHover={{ opacity: 0.9 }}
            whileTap={{ scale: 0.97 }}
          >
            <Plus size={14} strokeWidth={2.5} />
            Link New Account
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
