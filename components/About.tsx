import Image from "next/image";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";

const stats = [
  { value: "08+", label: "Years of experience" },
  { value: "140+", label: "Projects delivered" },
  { value: "46", label: "Happy clients" },
  { value: "12", label: "Design awards" },
];

const tools = [
  "PHOTOSHOP",
  "ILLUSTRATOR",
  "INDESIGN",
  "AFTER EFFECTS",
  "FIGMA",
  "BLENDER",
  "PROCREATE",
];

export default function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-7xl scroll-mt-20 px-6 py-28 md:px-10 md:py-40"
    >
      <Reveal>
        <Eyebrow index="02" label="About" />
      </Reveal>

      <div className="grid gap-16 md:grid-cols-[2fr_3fr]">
        {/* Brand mark block */}
        <Reveal delay={100}>
          <div className="relative aspect-[3/4] overflow-hidden border border-bone/10 bg-coal">
            <div className="absolute inset-0">
              <Image
                src="/jeizi-logo.png"
                alt="Jeizi Productions logo"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-contain"
              />
            </div>
            <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rotate-45 border-2 border-blood/80" />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-ink/70 p-5 font-mono text-[10px] uppercase tracking-[0.25em] text-bone backdrop-blur">
              <span>Jeizi Productions</span>
              <span className="text-blood">Est. 2018</span>
            </div>
          </div>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-ash">
            Fig. 01 — The mark.
          </p>
        </Reveal>

        <div>
          <Reveal delay={150}>
            <h2 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight md:text-6xl">
              A designer who{" "}
              <span className="italic text-blood">believes</span> in noise.
            </h2>
          </Reveal>

          <Reveal delay={250}>
            <div className="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-ash md:text-lg">
              <p>
                For over eight years I&apos;ve helped brands find their voice —
                loud, clear, and unmistakably theirs. My work sits at the
                intersection of bold typography, raw contrast, and ideas that
                actually do something.
              </p>
              <p>
                From barangay and campaign identities that serve communities to
                startups and brands that need to fight for attention, I treat
                every brief like a blank page worth making a scene on. No safe
                logos. No beige. Just work with a pulse.
              </p>
            </div>
          </Reveal>

          <Reveal delay={350}>
            <div className="mt-12 grid grid-cols-2 border border-bone/10 bg-bone/10 md:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-ink p-6">
                  <p className="font-display text-4xl font-bold text-blood md:text-5xl">
                    {s.value}
                  </p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ash">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={450}>
            <div className="mt-10 flex flex-wrap gap-2">
              {tools.map((t) => (
                <span
                  key={t}
                  className="border border-bone/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ash transition-colors hover:border-blood hover:text-blood"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
