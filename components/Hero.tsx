import Link from "next/link";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pb-24 pt-32 md:px-10">
      {/* ambient red glow */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-blood/20 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-40 w-[60rem] -translate-x-1/2 bg-blood/10 blur-[120px]" />

      {/* giant watermark */}
      <span className="text-outline pointer-events-none absolute -bottom-20 -left-10 select-none font-display text-[24rem] font-bold leading-none md:text-[30rem]">
        J
      </span>

      <div className="relative mx-auto w-full max-w-7xl">
        <Reveal>
          <div className="mb-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.35em] text-ash">
            <span className="h-2 w-2 animate-pulse-dot bg-blood" />
            Portfolio © 2026 — Graphic Designer &amp; Art Director
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="font-display text-[clamp(3.2rem,10.5vw,10.5rem)] font-bold uppercase leading-[0.86] tracking-tight">
            Bold ideas,
            <br />
            <span className="italic text-blood">sharp</span> design.
          </h1>
        </Reveal>

        <div className="mt-12 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <Reveal delay={200} className="max-w-md">
            <p className="text-base leading-relaxed text-ash md:text-lg">
              I&apos;m <span className="text-bone">Jeizi</span> — the designer
              behind Jeizi Productions, crafting identities, campaigns, and
              visuals that refuse to be ignored. Based in the Philippines,
              working worldwide.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/#work"
                className="group inline-flex items-center justify-center gap-3 bg-blood px-8 py-4 font-mono text-xs tracking-[0.25em] text-ink transition-colors hover:bg-bone"
              >
                VIEW WORK
                <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-3 border border-bone/25 px-8 py-4 font-mono text-xs tracking-[0.25em] text-bone transition-colors hover:border-blood hover:text-blood"
              >
                GET IN TOUCH
              </Link>
            </div>
          </Reveal>
        </div>

        {/* bottom meta row */}
        <div className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-bone/10 pt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-ash">
          <span>14.5995° N — 120.9842° E</span>
          <span className="hidden items-center gap-2 md:inline-flex">
            <span className="h-1.5 w-1.5 animate-blink bg-blood" />
            Scroll
          </span>
          <a
            href="mailto:hello@jeiziproductions.com"
            className="transition-colors hover:text-blood"
          >
            hello@jeiziproductions.com
          </a>
        </div>
      </div>
    </section>
  );
}
