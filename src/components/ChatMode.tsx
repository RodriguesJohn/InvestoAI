import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import IconImg from "../assets/Icon.png";
import { ArrowRight } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
}

const dashboardMessages: Message[] = [
  {
    id: 1,
    text: "Hey Alex! 👋 How can I help you with your investments today?",
    sender: "ai",
  },
];

const academyMessages: Message[] = [
  {
    id: 1,
    text: "Hey Alex! 👋 Welcome to the Academy. What would you like to learn today?",
    sender: "ai",
  },
];

const dashboardSuggestions = [
  "How's my portfolio?",
  "Best stocks to buy",
  "Reduce my risk",
  "Tax strategies",
];

const academySuggestions = [
  "Next course for me?",
  "Beginner courses",
  "Advanced topics",
  "Quiz me",
];

const goalsMessages: Message[] = [
  {
    id: 1,
    text: "Hey Alex! 👋 You're 68% towards your Emergency Fund goal. Keep it up!",
    sender: "ai",
  },
];

const goalsSuggestions = [
  "Show my goals progress",
  "Am I on track?",
  "Adjust contributions",
  "New goal ideas",
];

const agentsMessages: Message[] = [
  {
    id: 1,
    text: "Hey Alex! 👋 Your agents have been busy! 3 agents completed tasks while you were away.",
    sender: "ai",
  },
];

const agentsSuggestions = [
  "Agent performance",
  "Activate an agent",
  "Pause all agents",
  "Agent logs",
];

/* ─── Avatars ───────────────────────────────────────────────────── */

function AiAvatar({ size = "md" }: { size?: "sm" | "md" }) {
  const img = size === "md" ? "w-10 h-10" : "w-8 h-8";
  return (
    <div className="shrink-0">
      <img src={IconImg} alt="" className={`${img} object-contain`} />
    </div>
  );
}

function UserAvatar() {
  return (
    <div
      className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold text-white"
      style={{ backgroundColor: "var(--accent-blue)" }}
    >
      AR
    </div>
  );
}

/* ─── ChatMode (full-page) ──────────────────────────────────────── */

interface ChatModeProps {
  activePage?: string;
}

function getInitialMessages(page: string) {
  if (page === "Academy") return academyMessages;
  if (page === "Goals") return goalsMessages;
  if (page === "Agents") return agentsMessages;
  return dashboardMessages;
}

function getInitialSuggestions(page: string) {
  if (page === "Academy") return academySuggestions;
  if (page === "Goals") return goalsSuggestions;
  if (page === "Agents") return agentsSuggestions;
  return dashboardSuggestions;
}

export function ChatMode({ activePage = "Dashboard" }: ChatModeProps) {
  const [messages, setMessages] = useState<Message[]>(
    getInitialMessages(activePage),
  );
  const [suggestions, setSuggestions] = useState(
    getInitialSuggestions(activePage),
  );
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prevPageRef = useRef(activePage);

  useEffect(() => {
    if (prevPageRef.current !== activePage) {
      prevPageRef.current = activePage;
      setMessages(getInitialMessages(activePage));
      setSuggestions(getInitialSuggestions(activePage));
    }
  }, [activePage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text?: string) => {
    const msgText = text || input.trim();
    if (!msgText) return;

    const userMsg: Message = { id: Date.now(), text: msgText, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      let responseText =
        "Your portfolio is up 12.5% this month! 📈 You're outperforming the S&P 500 by 3.2%. Would you like me to break down the gains by asset class?";
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
    <motion.div
      className="flex-1 flex flex-col min-h-0 p-4 md:p-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div
        className="flex-1 flex flex-col bg-[var(--bg-card)] rounded-2xl overflow-hidden min-h-0"
        style={{ boxShadow: "0 1px 4px var(--shadow-color)" }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 md:px-8 py-4 md:py-5 shrink-0 border-b border-[var(--border-color)]">
          <AiAvatar size="md" />
          <div>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Investo AI Assistant
            </h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-2 h-2 rounded-full bg-[var(--accent-success)]" />
              <span className="text-xs text-[var(--accent-success)] font-medium">
                Online
              </span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-auto px-4 md:px-8 py-4 md:py-6 flex flex-col gap-4 md:gap-5 min-h-0">
          {messages.map((msg) => {
            if (msg.sender === "ai") {
              return (
                <div key={msg.id} className="flex gap-3 max-w-2xl">
                  <AiAvatar size="sm" />
                  <div className="bg-[var(--bg-muted)] px-5 py-3.5 rounded-2xl rounded-bl-md">
                    <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                      {msg.text}
                    </p>
                  </div>
                </div>
              );
            }

            return (
              <div key={msg.id} className="flex justify-end gap-3">
                <div className="bg-[var(--accent-blue)] px-5 py-3.5 rounded-full max-w-2xl">
                  <p className="text-sm text-white font-medium">{msg.text}</p>
                </div>
                <UserAvatar />
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        <div className="shrink-0 border-t border-[var(--border-color)] px-4 md:px-8 py-3">
          <p className="text-xs text-[var(--text-secondary)] mb-2.5 text-center">
            Suggested questions
          </p>
          <div className="flex gap-2 justify-center flex-wrap">
            {suggestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="px-4 py-1.5 rounded-full border border-[var(--border-color)] text-xs text-[var(--text-primary)] hover:bg-[var(--bg-muted)] transition-colors whitespace-nowrap"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="px-4 md:px-8 py-4 md:py-5 shrink-0">
          <div
            className="flex items-center gap-3 rounded-full px-6 py-4"
            style={{
              backgroundColor: "var(--bg-muted)",
            }}
          >
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
              className="w-10 h-10 rounded-full bg-[var(--accent-blue)] flex items-center justify-center hover:opacity-90 transition-opacity shrink-0"
            >
              <ArrowRight size={18} color="white" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
