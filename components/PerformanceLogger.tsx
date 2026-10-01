"use client";

import { useEffect } from "react";

export default function PerformanceLogger() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development" || typeof window === "undefined") {
      return;
    }

    const reportPerformance = () => {
      setTimeout(() => {
        const navEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
        if (navEntries && navEntries.length > 0) {
          const nav = navEntries[0];
          const dcl = Math.round(nav.domContentLoadedEventEnd);
          const load = Math.round(nav.loadEventEnd);
          console.log(`[perf] DOMContentLoaded: ${dcl}ms`);
          console.log(`[perf] Load: ${load}ms`);
        }

        // Measure media entries
        const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
        const mediaEntries = resources.filter(
          (r) =>
            r.initiatorType === "img" ||
            /\.(webp|png|jpg|jpeg|svg)/i.test(r.name) ||
            r.name.includes("googleusercontent.com")
        );
        console.log(`[perf] Media loaded: ${mediaEntries.length}`);
      }, 500);
    };

    // Observe LCP if available
    let lcpObserver: PerformanceObserver | null = null;
    try {
      if ("PerformanceObserver" in window) {
        lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (lastEntry) {
            console.log(`[perf] LCP: ${Math.round(lastEntry.startTime)}ms`);
          }
        });
        lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
      }
    } catch {
      // Ignore unsupported observer
    }

    if (document.readyState === "complete") {
      reportPerformance();
    } else {
      window.addEventListener("load", reportPerformance, { once: true });
    }

    return () => {
      lcpObserver?.disconnect();
    };
  }, []);

  return null;
}
