"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }

    const registerSW = () => {
      navigator.serviceWorker.register("/sw.js").then(
        (reg) => {
          if (process.env.NODE_ENV === "development") {
            const time = performance.now();
            console.log(`[perf] SW registered: ${Math.round(time)}ms`, reg.scope);
          }
        },
        () => {
          // Registration failures are non-fatal
        }
      );
    };

    const scheduleRegistration = () => {
      if ("requestIdleCallback" in window) {
        requestIdleCallback(registerSW);
      } else {
        setTimeout(registerSW, 1500);
      }
    };

    if (document.readyState === "complete") {
      scheduleRegistration();
    } else {
      window.addEventListener("load", scheduleRegistration, { once: true });
      return () => {
        window.removeEventListener("load", scheduleRegistration);
      };
    }
  }, []);

  return null;
}
