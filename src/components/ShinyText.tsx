import type { CSSProperties } from "react";

interface ShinyTextProps {
  text: string;
  speed?: number;
  delay?: number;
  color?: string;
  shineColor?: string;
  spread?: number;
  direction?: "left" | "right";
  yoyo?: boolean;
  pauseOnHover?: boolean;
  disabled?: boolean;
  className?: string;
}

export function ShinyText({
  text,
  speed = 2,
  delay = 0,
  color = "#b5b5b5",
  shineColor = "#ffffff",
  spread = 120,
  direction = "left",
  yoyo = false,
  pauseOnHover = false,
  disabled = false,
  className = "",
}: ShinyTextProps) {
  const animationName = "shiny-text-slide";
  const directionValue = direction === "left" ? "reverse" : "normal";
  const iterationCount = yoyo ? "infinite" : "infinite";
  const animationDirection = yoyo ? "alternate" : directionValue;

  // A larger background-size means the shine highlight is a thinner
  // "beam" relative to the text, producing a subtler sweep instead of
  // a full-text flash. ease-in-out softens the start/end of each loop.
  const bgSize = Math.max(spread, 200);

  const style: CSSProperties = {
    color,
    backgroundImage: `linear-gradient(${direction === "left" ? "90deg" : "270deg"}, ${color} 40%, ${shineColor} 50%, ${color} 60%)`,
    backgroundSize: `${bgSize}% 100%`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: disabled
      ? "none"
      : `${animationName} ${speed}s ${animationDirection} ${iterationCount} ease-in-out`,
    animationDelay: `${delay}s`,
  };

  return (
    <>
      <style>{`
        @keyframes ${animationName} {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
      <span
        className={`${className} ${pauseOnHover ? "shiny-text-hover" : ""}`}
        style={style}
      >
        {text}
      </span>
      {pauseOnHover && (
        <style>{`
          .shiny-text-hover:hover {
            animation-play-state: paused !important;
          }
        `}</style>
      )}
    </>
  );
}
