"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-bone/10 bg-ink px-6 py-8 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-ash md:flex-row">
        <span className="flex items-center gap-2">
          <Image
            src="/jeizi-logo.png"
            alt="Jeizi Productions logo"
            width={22}
            height={22}
            className="h-5 w-auto"
          />
          Jeizi Productions © 2026 — All rights reserved
        </span>
        <span className="hidden md:inline">Designed &amp; engineered by Jeizi Productions</span>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="transition-colors hover:text-blood"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
