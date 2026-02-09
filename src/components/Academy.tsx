import { motion } from "framer-motion";
import { Play } from "lucide-react";
import gradient1 from "../assets/mymind-tZCrFpSNiIQ-unsplash.jpg";
import gradient2 from "../assets/philipp-hubert-E61ygGqknDA-unsplash.jpg";
import gradient3 from "../assets/mymind-XUlsF9LYeVk-unsplash.jpg";
import gradient4 from "../assets/codioful-formerly-gradienta-LeG68PrXA6Y-unsplash.jpg";

const courseContents = [
  { num: "01", title: "Introduction to Investing", duration: "12:34" },
  { num: "02", title: "Understanding Risk", duration: "8:20" },
  { num: "03", title: "Types of Investments", duration: "15:45" },
  { num: "04", title: "Building a Portfolio", duration: "11:10" },
  { num: "05", title: "Setting Goals", duration: "9:55" },
];

const deepDiveResources = [
  {
    title: "Stock Analysis Fundamentals",
    duration: "25 min",
    type: "Video",
    image: gradient1,
  },
  {
    title: "ETF Investment Strategies",
    duration: "18 min",
    type: "Video",
    image: gradient2,
  },
  {
    title: "Retirement Planning 101",
    duration: "22 min",
    type: "Video",
    image: gradient3,
  },
  {
    title: "Tax-Efficient Investing",
    duration: "15 min",
    type: "Video",
    image: gradient4,
  },
];

function FeaturedImage() {
  return (
    <div className="flex-1 min-w-0 min-h-0">
      <div className="relative rounded-2xl overflow-hidden h-full cursor-pointer group">
        {/* Stock image — group of people in a collaborative setting */}
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80"
          alt="Getting Started with Investing"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
            <Play size={24} className="text-white ml-0.5" fill="currentColor" />
          </div>
        </div>

        {/* Overlay text */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-white font-semibold text-lg">
            Getting Started with Investing
          </h3>
          <p className="text-white/70 text-sm mt-0.5">
            12:34 • Introduction
          </p>
        </div>
      </div>
    </div>
  );
}

export function Academy() {
  return (
    <div className="flex-1 p-4 md:p-6 min-h-0 flex flex-col overflow-auto">
      {/* Header */}
      <div className="mb-4 shrink-0">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          Academy
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Master investing with expert-led courses and resources
        </p>
      </div>

      {/* Featured Video + Course Contents */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-4" style={{ flex: "1 1 0", minHeight: 0, maxHeight: "55vh" }}>
        {/* Featured Image */}
        <FeaturedImage />

        {/* Course Contents */}
        <div
          className="w-full md:w-[300px] shrink-0 bg-white rounded-2xl p-5 overflow-auto"
          style={{ boxShadow: "4px 2px 23px 5px rgba(242, 242, 242, 0.25)" }}
        >
          <h3 className="text-base font-bold text-[var(--text-primary)] mb-4">
            Course Contents
          </h3>
          <div className="flex flex-col gap-1">
            {courseContents.map((item, i) => (
              <button
                key={item.num}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-colors ${
                  i === 0
                    ? "bg-[var(--bg-muted)]"
                    : "hover:bg-[var(--bg-muted)]"
                }`}
              >
                <span className="text-xs font-semibold text-[var(--text-secondary)] w-5">
                  {item.num}
                </span>
                <span className="text-sm font-medium text-[var(--text-primary)] flex-1">
                  {item.title}
                </span>
                <span className="text-xs text-[var(--text-secondary)]">
                  {item.duration}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Continue Learning */}
      <div className="shrink-0">
        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3">
          Continue Learning - Deep Dive Resources
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {deepDiveResources.map((resource) => (
            <motion.div
              key={resource.title}
              className="min-w-0 cursor-pointer group bg-white rounded-2xl overflow-hidden"
              style={{ boxShadow: "4px 2px 23px 5px rgba(242, 242, 242, 0.25)" }}
              whileHover={{
                y: -6,
                boxShadow: "0 12px 32px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.06)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Thumbnail */}
              <div className="aspect-[2/1] relative overflow-hidden">
                <img
                  src={resource.image}
                  alt={resource.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-white/40 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play
                      size={20}
                      className="text-white ml-0.5"
                      fill="currentColor"
                    />
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="px-3 py-2.5">
                <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-0.5 truncate">
                  {resource.title}
                </h4>
                <p className="text-xs text-[var(--text-secondary)]">
                  {resource.duration} • {resource.type}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
