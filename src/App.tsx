import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
      className="flex-1 p-6 overflow-auto min-h-0"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Good morning, Alex!
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Here's how your investments are doing today
          </p>
        </div>
        <AddFundsButton />
      </motion.div>

      {/* KPI Cards Row */}
      <motion.div variants={fadeUp} className="flex gap-4 mb-6">
        <KPICard label="Total Value" value="$40,000.00" change="+10.4%" />
        <KPICard label="Monthly Return" value="+$310.50" change="+2.4%" />
        <KPICard label="Annual Growth" value="+$3,760.00" change="+10.4%" />
        <KPICard label="Risk Level" value="Moderate" />
      </motion.div>

      {/* AI Allocation + Top Holdings */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <AIAllocation />
        <TopHoldings />
      </motion.div>

      {/* Tip of the Day */}
      <motion.div variants={fadeUp} className="mb-6">
        <TipOfTheDay />
      </motion.div>

      {/* Goals + Checklist */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [viewMode, setViewMode] = useState<"view" | "chat">("view");
  const [onboarded, setOnboarded] = useState(false);

  if (!onboarded) {
    return <Onboarding onComplete={() => setOnboarded(true)} />;
  }

  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: "var(--bg-page)" }}
    >
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <div className="pt-3 pl-5 pb-5">
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
