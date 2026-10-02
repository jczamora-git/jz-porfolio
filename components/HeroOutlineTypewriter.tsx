"use client";

import { useEffect, useState } from "react";

const BRAND_TEXT = "JEIZI PRODUCTIONS";
const TYPING_SPEED_MS = 100;
const HOLD_MS = 2000;
const ERASE_SPEED_MS = 50;
const PAUSE_MS = 600;

export default function HeroOutlineTypewriter() {
  const [displayedText, setDisplayedText] = useState("");
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      const t = setTimeout(() => {
        setIsReducedMotion(true);
        setDisplayedText(BRAND_TEXT);
      }, 0);
      return () => clearTimeout(t);
    }

    let timeoutId: NodeJS.Timeout;
    let charIndex = 0;
    let mode: "typing" | "holding" | "erasing" | "pausing" = "typing";

    const tick = () => {
      if (mode === "typing") {
        if (charIndex < BRAND_TEXT.length) {
          charIndex++;
          setDisplayedText(BRAND_TEXT.slice(0, charIndex));
          timeoutId = setTimeout(tick, TYPING_SPEED_MS);
        } else {
          mode = "holding";
          timeoutId = setTimeout(tick, HOLD_MS);
        }
      } else if (mode === "holding") {
        mode = "erasing";
        timeoutId = setTimeout(tick, ERASE_SPEED_MS);
      } else if (mode === "erasing") {
        if (charIndex > 0) {
          charIndex--;
          setDisplayedText(BRAND_TEXT.slice(0, charIndex));
          timeoutId = setTimeout(tick, ERASE_SPEED_MS);
        } else {
          mode = "pausing";
          timeoutId = setTimeout(tick, PAUSE_MS);
        }
      } else if (mode === "pausing") {
        mode = "typing";
        timeoutId = setTimeout(tick, TYPING_SPEED_MS);
      }
    };

    timeoutId = setTimeout(tick, 400);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div
      className="pointer-events-none absolute bottom-4 left-6 z-0 max-w-[92vw] overflow-hidden select-none sm:bottom-6 sm:left-8 md:bottom-8 md:left-10 lg:bottom-10 lg:left-10"
      aria-hidden="true"
    >
      <span className="text-outline font-display text-[clamp(2.5rem,9.5vw,10.5rem)] font-bold uppercase leading-none tracking-tight whitespace-pre">
        {displayedText}
        {!isReducedMotion && (
          <span className="ml-1 inline-block font-sans text-[0.85em] font-light text-blood animate-blink not-italic">
            |
          </span>
        )}
      </span>
    </div>
  );
}
