import ProgressiveImage from "./ProgressiveImage";
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
  "FIGMA",
  "AFTER EFFECTS",
  "TYPESCRIPT",
  "NEXT.JS",
  "REACT",
  "VUE",
  "POSTGRESQL",
  "SUPABASE",
  "C#",
  ".NET",
];

export default function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40"
    >
      <div data-section-content>
        <Reveal>
          <Eyebrow index="03" label="About" />
        </Reveal>

      <div className="grid gap-16 md:grid-cols-[2fr_3fr]">
        {/* Portrait block */}
        <Reveal delay={100}>
          <div className="relative aspect-[3/4] overflow-hidden border border-bone/10 bg-coal">
            <div className="absolute inset-0">
              <ProgressiveImage
                src="/jeizi-zamora.webp"
                alt="John Christopher King Zamora (Jeizi)"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover object-top"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-ink/70 p-5 font-mono text-[10px] uppercase tracking-[0.25em] text-bone backdrop-blur">
              <span>Jeizi Productions</span>
              <span className="text-blood">Est. 2018</span>
            </div>
          </div>
          <div className="mt-5 space-y-1.5">
            <h3 className="font-display text-xl font-bold uppercase tracking-tight text-bone md:text-2xl">
              John Christopher King Zamora
            </h3>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-blood font-semibold">
              Jeizi / Jeizi Productions
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
              Full-Stack Developer &amp; Graphic Designer
            </p>
          </div>
        </Reveal>

        <div>
          <Reveal delay={150}>
            <h2 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight md:text-6xl">
              Built with{" "}
              <span className="italic text-blood">a designer&apos;s</span> eye.
            </h2>
          </Reveal>

          <Reveal delay={250}>
            <div className="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-ash md:text-lg">
              <p>
                Design has been the foundation of my work for over eight years.
                It taught me hierarchy, clarity, composition, and how to turn an
                idea into something people remember. Programming expanded that
                craft — today I build complete digital products across frontend
                interfaces, backend logic, databases, realtime workflows, mobile
                apps, and desktop systems.
              </p>
              <p>
                That combination means I don&apos;t stop at how a product looks.
                I care about how it works, how it feels to use, and how the
                entire system fits together. From visual identities to
                full-stack applications, I build work that is both technically
                solid and visually intentional.
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
      </div>
    </section>
  );
}
