"use client";

import { useEffect, useState } from "react";

interface HeadlineItem {
  line1: string;
  accent: string;
  rest: string;
}

const HEADLINES: HeadlineItem[] = [
  { line1: "BOLD IDEAS,", accent: "sharp", rest: "design." },
  { line1: "I'M A", accent: "FULL-STACK", rest: "DEVELOPER." },
  { line1: "I'M A", accent: "GRAPHIC", rest: "DESIGNER." },
  { line1: "I BUILD", accent: "DIGITAL", rest: "SYSTEMS." },
  { line1: "I DESIGN", accent: "VISUAL", rest: "IDENTITIES." },
];

export default function HeroRotatingHeadline() {
  const [index, setIndex] = useState(0);
  const [stage, setStage] = useState<"idle" | "exit" | "enter">("idle");

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    let enterTimer: NodeJS.Timeout;
    let nextTimer: NodeJS.Timeout;

    const interval = setInterval(() => {
      // Exit: fade out & slide up (-12px)
      setStage("exit");

      nextTimer = setTimeout(() => {
        // Change headline and reset position (+12px) without transition
        setIndex((prev) => (prev + 1) % HEADLINES.length);
        setStage("enter");

        // Enter: smoothly fade in to normal position
        enterTimer = setTimeout(() => {
          setStage("idle");
        }, 30);
      }, 400);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(nextTimer);
      clearTimeout(enterTimer);
    };
  }, []);

  const current = HEADLINES[index];

  return (
    <div className="min-h-[2.2em] sm:min-h-[2.1em] md:min-h-[1.95em] flex flex-col justify-center">
      <h1
        className={`font-display text-[clamp(3.2rem,10.5vw,10.5rem)] font-bold uppercase leading-[0.86] tracking-tight transform-gpu ${
          stage === "idle"
            ? "opacity-100 translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            : stage === "exit"
            ? "opacity-0 -translate-y-3 transition-all duration-400 ease-[cubic-bezier(0.4,0,1,1)]"
            : "opacity-0 translate-y-3 transition-none"
        }`}
      >
        {current.line1}
        <br />
        <span className="italic text-blood">{current.accent}</span> {current.rest}
      </h1>
    </div>
  );
}
