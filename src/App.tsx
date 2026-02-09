import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Sidebar } from "./components/Sidebar";
import { KPICard } from "./components/KPICard";
import { AddFundsButton } from "./components/AddFundsButton";
import { AIAllocation } from "./components/AIAllocation";
import { TopHoldings } from "./components/TopHoldings";
import { GoalsProgress } from "./components/GoalsProgress";
import { Checklist } from "./components/Checklist";
import { TipOfTheDay } from "./components/TipOfTheDay";
import { ChatBubble } from "./components/ChatBubble";
import { ChatMode } from "./components/ChatMode";
import { Academy } from "./components/Academy";
import { GoalsPage } from "./components/GoalsPage";
import { AgentsPage } from "./components/AgentsPage";
import { SettingsPage } from "./components/SettingsPage";
import { Onboarding } from "./onboarding/Onboarding";
import IconImg from "./assets/Icon.png";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const } },
};

function DashboardContent() {
  return (
    <motion.main
      className="flex-1 p-4 md:p-6 overflow-auto min-h-0"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="flex items-center justify-between mb-4 md:mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-[var(--text-primary)]">
            Good morning, Alex!
          </h1>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] mt-1">
            Here's how your investments are doing today
          </p>
        </div>
        <div className="hidden md:block">
          <AddFundsButton />
        </div>
      </motion.div>

      {/* KPI Cards Row */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 md:flex gap-3 md:gap-4 mb-4 md:mb-6">
        <KPICard label="Total Value" value="$40,000.00" change="+10.4%" />
        <KPICard label="Monthly Return" value="+$310.50" change="+2.4%" />
        <KPICard label="Annual Growth" value="+$3,760.00" change="+10.4%" />
        <KPICard label="Risk Level" value="Moderate" />
      </motion.div>

      {/* AI Allocation + Top Holdings */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
        <AIAllocation />
        <TopHoldings />
      </motion.div>

      {/* Tip of the Day */}
      <motion.div variants={fadeUp} className="mb-4 md:mb-6">
        <TipOfTheDay />
      </motion.div>

      {/* Goals + Checklist */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <GoalsProgress />
        <Checklist />
      </motion.div>
    </motion.main>
  );
}

const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const },
};

function MobileHeader({
  activePage,
  onMenuOpen,
}: {
  activePage: string;
  onMenuOpen: () => void;
}) {
  return (
    <div className="md:hidden flex items-center justify-between px-4 py-3 shrink-0 border-b border-[var(--border-color)] bg-[var(--bg-card)]">
      <div className="flex items-center gap-2.5">
        <img src={IconImg} alt="Investo AI" className="w-7 h-7 object-contain" />
        <span className="text-base font-semibold text-[var(--text-primary)]">
          Investo AI
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-[var(--text-secondary)]">
          {activePage}
        </span>
        <button
          onClick={onMenuOpen}
          className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-[var(--bg-muted)] transition-colors"
          aria-label="Open menu"
        >
          <Menu size={22} className="text-[var(--text-primary)]" />
        </button>
      </div>
    </div>
  );
}

function MobileDrawer({
  isOpen,
  onClose,
  activePage,
  onNavigate,
  viewMode,
  onViewModeChange,
}: {
  isOpen: boolean;
  onClose: () => void;
  activePage: string;
  onNavigate: (page: string) => void;
  viewMode: "view" | "chat";
  onViewModeChange: (mode: "view" | "chat") => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
            onClick={onClose}
          />
          {/* Drawer */}
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="fixed inset-y-0 left-0 z-50 w-[280px] md:hidden"
          >
            <div className="h-full flex flex-col">
              <div className="absolute top-3 right-3 z-10">
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[var(--bg-muted)] transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} className="text-[var(--text-secondary)]" />
                </button>
              </div>
              <Sidebar
                activePage={activePage}
                onNavigate={(page) => {
                  onNavigate(page);
                  onClose();
                }}
                viewMode={viewMode}
                onViewModeChange={(mode) => {
                  onViewModeChange(mode);
                  onClose();
                }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [viewMode, setViewMode] = useState<"view" | "chat">("view");
  const [onboarded, setOnboarded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!onboarded) {
    return <Onboarding onComplete={() => setOnboarded(true)} />;
  }

  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: "var(--bg-page)" }}
    >
      {/* Mobile Header */}
      <MobileHeader
        activePage={activePage}
        onMenuOpen={() => setMobileMenuOpen(true)}
      />

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activePage={activePage}
        onNavigate={setActivePage}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <div className="flex flex-1 min-h-0">
        {/* Desktop Sidebar */}
        <div className="hidden md:block pt-3 pl-5 pb-5">
          <Sidebar
            activePage={activePage}
            onNavigate={setActivePage}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </div>

        {/* Page Content */}
        <AnimatePresence mode="wait">
          {viewMode === "chat" ? (
            <ChatMode key="chatmode" activePage={activePage} />
          ) : (
            <>
              {activePage === "Dashboard" && (
                <motion.div key="dashboard" className="flex-1 min-h-0 flex" {...pageTransition}>
                  <DashboardContent />
                </motion.div>
              )}
              {activePage === "Academy" && (
                <motion.div key="academy" className="flex-1 min-h-0 flex" {...pageTransition}>
                  <Academy />
                </motion.div>
              )}
              {activePage === "Goals" && (
                <motion.div key="goals" className="flex-1 min-h-0 flex" {...pageTransition}>
                  <GoalsPage />
                </motion.div>
              )}
              {activePage === "Agents" && (
                <motion.div key="agents" className="flex-1 min-h-0 flex" {...pageTransition}>
                  <AgentsPage />
                </motion.div>
              )}
              {activePage === "Settings" && (
                <motion.div key="settings" className="flex-1 min-h-0 flex" {...pageTransition}>
                  <SettingsPage />
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Chat Bubble — only shown in view mode */}
      {viewMode === "view" && <ChatBubble activePage={activePage} />}
    </div>
  );
}

export default App;
