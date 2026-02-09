import { motion } from "framer-motion";
import IconImg from "../assets/Icon.png";

const navItems = ["Dashboard", "Academy", "Goals", "Agents", "Settings"];

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  viewMode: "view" | "chat";
  onViewModeChange: (mode: "view" | "chat") => void;
}

export function Sidebar({ activePage, onNavigate, viewMode, onViewModeChange }: SidebarProps) {
  return (
    <aside
      className="w-[278px] h-full bg-[var(--bg-card)] rounded-xl flex flex-col shrink-0"
      style={{
        boxShadow: "4px 2px 23px 5px var(--shadow-color)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 pt-6 pb-8">
        <img src={IconImg} alt="Investo AI" className="w-[40px] h-[40px] object-contain" />
        <span className="text-lg font-semibold text-[var(--text-primary)]">
          Investo AI
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 px-6">
        {navItems.map((label) => {
          const isActive = label === activePage;
          return (
            <motion.button
              key={label}
              onClick={() => onNavigate(label)}
              className={`px-4 py-3 rounded-xl text-left relative ${
                isActive
                  ? "text-[var(--text-primary)] font-semibold"
                  : "text-[var(--text-secondary)]"
              }`}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-[var(--bg-muted)] rounded-xl"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="text-sm font-medium relative z-10">{label}</span>
            </motion.button>
          );
        })}
      </nav>

      {/* Spacer */}
      <div className="flex-1 min-h-[200px]" />

      {/* View Toggle */}
      <div className="px-6 pb-6">
        <div className="flex gap-2 p-1 bg-[var(--bg-muted)] rounded-xl">
          {(["view", "chat"] as const).map((mode) => {
            const isActive = viewMode === mode;
            return (
              <motion.button
                key={mode}
                onClick={() => onViewModeChange(mode)}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium relative ${
                  isActive
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
                whileTap={{ scale: 0.97 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="viewToggle"
                    className="absolute inset-0 bg-[var(--bg-card)] rounded-lg shadow-sm"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  {mode === "view" ? "View mode" : "Chat mode"}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
