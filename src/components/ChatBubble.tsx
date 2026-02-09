import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IconImg from "../assets/Icon.png";
import { ArrowRight, X } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  type?: "text" | "portfolio" | "courses" | "goals" | "agents";
}

/* ─── Dashboard data ────────────────────────────────────────────── */

const portfolioData = [
  { label: "Technology", value: 70, color: "#3366FF" },
  { label: "Healthcare", value: 15, color: "#22C55E" },
  { label: "Finance", value: 10, color: "#F59E0B" },
  { label: "Energy", value: 5, color: "#8B5CF6" },
];

const dashboardMessages: Message[] = [
  {
    id: 1,
    text: "Hey Alex! 👋 Your portfolio is up 12.5% this quarter. How can I help you today?",
    sender: "ai",
  },
];

const dashboardSuggestions = [
  "How's my portfolio?",
  "Best stocks to buy",
  "Reduce my risk",
  "Tax strategies",
];

/* ─── Academy data ──────────────────────────────────────────────── */

const coursesData = [
  { label: "Investing Basics", count: 4, color: "#3366FF" },
  { label: "Stock Analysis", count: 3, color: "#3366FF" },
  { label: "Risk Management", count: 2, color: "#3366FF" },
  { label: "Tax Strategy", count: 1, color: "#3366FF" },
];

const academyMessages: Message[] = [
  {
    id: 1,
    text: "Hey Alex! 👋 Welcome to the Academy. What would you like to learn today?",
    sender: "ai",
  },
];

const academySuggestions = [
  "Next course for me?",
  "Beginner courses",
  "Advanced topics",
  "Quiz me",
];

/* ─── Goals data ───────────────────────────────────────────────── */

const goalsProgressData = [
  { label: "Emergency Fund", value: 68 },
  { label: "Retirement", value: 42 },
  { label: "Home Down Payment", value: 25 },
  { label: "Vacation Fund", value: 90 },
];

const goalsMessages: Message[] = [
  {
    id: 1,
    text: "Hey Alex! 👋 Great news! You're 68% towards your Emergency Fund goal. Keep it up!",
    sender: "ai",
  },
  {
    id: 2,
    text: "Want to see how all your financial goals are progressing?",
    sender: "ai",
  },
  {
    id: 3,
    text: "Yes, show me my goals progress!",
    sender: "user",
  },
  {
    id: 4,
    text: "Here's your goals overview:",
    sender: "ai",
  },
  {
    id: 5,
    text: "",
    sender: "ai",
    type: "goals",
  },
];

const goalsSuggestions = [
  "Am I on track?",
  "Adjust contributions",
  "New goal ideas",
  "Boost savings",
];

/* ─── Agents data ──────────────────────────────────────────────── */

const agentStatusData = [
  { label: "Portfolio Optimizer", status: "Active", progress: 80 },
  { label: "Tax Optimizer", status: "Done", progress: 20 },
  { label: "Risk Monitor", status: "Active", progress: 15 },
  { label: "Dividend Hunter", status: "Idle", progress: 5 },
];

const agentsMessages: Message[] = [
  {
    id: 1,
    text: "Hey Alex! 👋 Your agents have been busy! 3 agents completed tasks while you were away.",
    sender: "ai",
  },
  {
    id: 2,
    text: "Would you like a status update on your active agents?",
    sender: "ai",
  },
  {
    id: 3,
    text: "Yes, show me what they've been up to!",
    sender: "user",
  },
  {
    id: 4,
    text: "Here's your agent activity summary:",
    sender: "ai",
  },
  {
    id: 5,
    text: "",
    sender: "ai",
    type: "agents",
  },
];

const agentsSuggestions = [
  "Agent performance",
  "Activate an agent",
  "Pause all agents",
  "Agent logs",
];

/* ─── Data Cards ────────────────────────────────────────────────── */

function PortfolioCard() {
  const total = portfolioData.reduce((sum, d) => sum + d.value, 0);
  return (
    <div className="bg-white rounded-xl p-4 mt-1 border border-[var(--border-color)]">
      <h4 className="text-sm font-bold text-[var(--text-primary)] mb-4">
        Portfolio Allocation
      </h4>
      <div className="flex h-3 rounded-full overflow-hidden mb-4">
        {portfolioData.map((item) => (
          <div
            key={item.label}
            className="h-full first:rounded-l-full last:rounded-r-full"
            style={{
              width: `${(item.value / total) * 100}%`,
              backgroundColor: item.color,
            }}
          />
        ))}
      </div>
      <div className="flex flex-col gap-2.5">
        {portfolioData.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-[var(--text-primary)]">
                {item.label}
              </span>
            </div>
            <span className="text-xs font-bold text-[var(--text-primary)]">
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CoursesCard() {
  const maxCount = Math.max(...coursesData.map((d) => d.count));
  return (
    <div className="bg-white rounded-xl p-4 mt-1 border border-[var(--border-color)]">
      <h4 className="text-sm font-bold text-[var(--text-primary)] mb-4">
        Courses Completed
      </h4>
      <div className="flex flex-col gap-3">
        {coursesData.map((item) => (
          <div key={item.label}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-[var(--text-primary)]">
                {item.label}
              </span>
              <span className="text-xs font-bold text-[var(--text-primary)]">
                {item.count}
              </span>
            </div>
            <div className="h-2 bg-[var(--border-color)] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${(item.count / maxCount) * 100}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GoalsCard() {
  return (
    <div className="bg-[var(--bg-card)] rounded-xl p-4 mt-1 border border-[var(--border-color)]">
      <h4 className="text-sm font-bold text-[var(--text-primary)] mb-4">
        Goal Progress
      </h4>
      <div className="flex flex-col gap-3">
        {goalsProgressData.map((item) => (
          <div key={item.label}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-[var(--text-primary)]">
                {item.label}
              </span>
              <span className="text-xs font-bold text-[var(--text-primary)]">
                {item.value}%
              </span>
            </div>
            <div className="h-2 bg-[var(--border-color)] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${item.value}%`,
                  backgroundColor: "var(--accent-blue)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AgentsCard() {
  return (
    <div className="bg-[var(--bg-card)] rounded-xl p-4 mt-1 border border-[var(--border-color)]">
      <h4 className="text-sm font-bold text-[var(--text-primary)] mb-4">
        Agent Status
      </h4>
      <div className="flex flex-col gap-3">
        {agentStatusData.map((item) => (
          <div key={item.label}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-[var(--text-primary)]">
                {item.label}
              </span>
              <span className="text-xs font-bold text-[var(--text-primary)]">
                {item.status}
              </span>
            </div>
            <div className="h-2 bg-[var(--border-color)] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${item.progress}%`,
                  backgroundColor: "var(--accent-blue)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Shared Components ─────────────────────────────────────────── */

function AiAvatar() {
  return (
    <div className="w-8 h-8 rounded-full bg-[var(--bg-muted)] flex items-center justify-center shrink-0 mt-0.5">
      <img src={IconImg} alt="" className="w-5 h-5 object-contain" />
    </div>
  );
}

/* ─── Main ChatBubble ───────────────────────────────────────────── */

interface ChatBubbleProps {
  activePage?: string;
}

export function ChatBubble({ activePage = "Dashboard" }: ChatBubbleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(dashboardMessages);
  const [suggestions, setSuggestions] = useState(dashboardSuggestions);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prevPageRef = useRef(activePage);

  // Reset chat when switching pages
  useEffect(() => {
    if (prevPageRef.current !== activePage) {
      prevPageRef.current = activePage;
      if (activePage === "Academy") {
        setMessages(academyMessages);
        setSuggestions(academySuggestions);
      } else if (activePage === "Goals") {
        setMessages(goalsMessages);
        setSuggestions(goalsSuggestions);
      } else if (activePage === "Agents") {
        setMessages(agentsMessages);
        setSuggestions(agentsSuggestions);
      } else {
        setMessages(dashboardMessages);
        setSuggestions(dashboardSuggestions);
      }
    }
  }, [activePage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text?: string) => {
    const msgText = text || input.trim();
    if (!msgText) return;

    const userMsg: Message = {
      id: Date.now(),
      text: msgText,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      let responseText =
        "Thanks for your question! I'm analyzing your portfolio data to give you the best advice.";
      if (activePage === "Academy") {
        responseText =
          "Great question! Based on your learning history, I'd recommend exploring our advanced modules next.";
      } else if (activePage === "Goals") {
        responseText =
          "Here's your goals overview: Emergency Fund is at 68%, Retirement at 42%, Home Down Payment at 25%, and Vacation Fund at 90%. Want me to suggest adjustments?";
      } else if (activePage === "Agents") {
        responseText =
          "Your Portfolio Optimizer completed 12 rebalancing actions today. Risk Monitor flagged 2 items for review. Want me to show the details?";
      }
      const aiMsg: Message = {
        id: Date.now() + 1,
        text: responseText,
        sender: "ai",
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1000);
  };

  return (
    <>
      {/* Backdrop overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
            }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-28 right-4 md:right-6 z-50 w-[calc(100vw-32px)] sm:w-[400px] bg-white rounded-2xl flex flex-col overflow-hidden"
            style={{
              height: "calc(100vh - 160px)",
              maxHeight: "720px",
              boxShadow:
                "0 8px 40px rgba(0, 0, 0, 0.15), 0 2px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 shrink-0">
              <div>
                <h4 className="text-lg font-bold text-[var(--text-primary)]">
                  Investo AI Assistant
                </h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-[var(--accent-success)]" />
                  <span className="text-xs text-[var(--accent-success)] font-medium">
                    Online
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[var(--bg-muted)] transition-colors"
              >
                <X size={20} className="text-[var(--text-secondary)]" />
              </button>
            </div>

            <div className="w-full h-px bg-[var(--border-color)] shrink-0" />

            {/* Messages */}
            <div className="flex-1 overflow-auto px-5 py-4 flex flex-col gap-4 min-h-0">
              {messages.map((msg) => {
                if (msg.type === "portfolio") {
                  return (
                    <div key={msg.id} className="flex gap-2.5">
                      <AiAvatar />
                      <div className="flex-1 min-w-0 max-w-[85%]">
                        <PortfolioCard />
                      </div>
                    </div>
                  );
                }

                if (msg.type === "courses") {
                  return (
                    <div key={msg.id} className="flex gap-2.5">
                      <AiAvatar />
                      <div className="flex-1 min-w-0 max-w-[85%]">
                        <CoursesCard />
                      </div>
                    </div>
                  );
                }

                if (msg.type === "goals") {
                  return (
                    <div key={msg.id} className="flex gap-2.5">
                      <AiAvatar />
                      <div className="flex-1 min-w-0 max-w-[85%]">
                        <GoalsCard />
                      </div>
                    </div>
                  );
                }

                if (msg.type === "agents") {
                  return (
                    <div key={msg.id} className="flex gap-2.5">
                      <AiAvatar />
                      <div className="flex-1 min-w-0 max-w-[85%]">
                        <AgentsCard />
                      </div>
                    </div>
                  );
                }

                if (msg.sender === "ai") {
                  return (
                    <div key={msg.id} className="flex gap-2.5">
                      <AiAvatar />
                      <div className="max-w-[85%] bg-[var(--bg-muted)] px-4 py-3 rounded-2xl rounded-bl-md">
                        <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                          {msg.text}
                        </p>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={msg.id} className="flex justify-end">
                    <div className="max-w-[85%] bg-[var(--accent-blue)] px-5 py-3 rounded-full">
                      <p className="text-sm text-white font-medium">
                        {msg.text}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            <div className="shrink-0 py-3 border-t border-[var(--border-color)]">
              <p className="text-xs text-[var(--text-secondary)] mb-2 px-5">
                Suggested questions
              </p>
              <div className="flex gap-2 overflow-x-auto px-5 pb-1">
                {suggestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="px-3 py-1.5 rounded-full border border-[var(--border-color)] text-xs text-[var(--text-primary)] hover:bg-[var(--bg-muted)] transition-colors whitespace-nowrap shrink-0"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="px-5 py-4 shrink-0">
              <div className="flex items-center gap-3 border border-[var(--border-color)] rounded-full px-4 py-2.5">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] outline-none"
                />
                <button
                  onClick={() => handleSend()}
                  className="w-9 h-9 rounded-full bg-[var(--accent-blue)] flex items-center justify-center hover:opacity-90 transition-opacity shrink-0"
                >
                  <ArrowRight size={16} color="white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Bubble */}
      <motion.button
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 cursor-pointer focus:outline-none"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open chat"
      >
        <div className="relative">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center bg-white"
            style={{
              boxShadow:
                "0 4px 20px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.06)",
            }}
          >
            <img
              src={IconImg}
              alt="Chat"
              className="w-11 h-11 object-contain"
            />
          </div>
          <div
            className="absolute -bottom-1.5 right-2 w-5 h-5 bg-white"
            style={{
              borderRadius: "0 0 12px 0",
              clipPath: "polygon(0 0, 100% 0, 100% 100%)",
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.05)",
            }}
          />
        </div>
      </motion.button>
    </>
  );
}
