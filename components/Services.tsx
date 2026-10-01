import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";

const services = [
  {
    num: "01",
    title: "Brand Identity",
    desc: "Logos, systems, and guidelines that give brands a spine — built to scale from business card to billboard.",
    tags: ["LOGO", "GUIDELINES", "STRATEGY"],
  },
  {
    num: "02",
    title: "Art Direction",
    desc: "Campaigns with a point of view. Concepts, photography direction, and visual worlds that stop the scroll.",
    tags: ["CAMPAIGNS", "PHOTOGRAPHY", "CONCEPT"],
  },
  {
    num: "03",
    title: "Editorial & Print",
    desc: "Magazines, books, posters, and zines designed with typographic precision and editorial rhythm.",
    tags: ["MAGAZINES", "BOOKS", "POSTERS"],
  },
  {
    num: "04",
    title: "Digital & Motion",
    desc: "Websites, social kits, and motion graphics that translate bold print thinking into living interfaces.",
    tags: ["WEB", "SOCIAL", "MOTION"],
  },
  {
    num: "05",
    title: "Packaging",
    desc: "Shelves are battlefields. Packaging that wins at arm's length and photographs itself.",
    tags: ["STRUCTURE", "LABELS", "D2C"],
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="mx-auto max-w-7xl scroll-mt-20 px-6 py-28 md:px-10 md:py-40"
    >
      <Reveal>
        <Eyebrow index="03" label="Services" />
      </Reveal>

      <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
        <Reveal delay={100}>
          <h2 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight md:text-7xl">
            What I
            <br />
            <span className="italic text-blood">do.</span>
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="max-w-sm text-sm leading-relaxed text-ash md:text-base">
            Everything a modern brand needs to look sharp and mean it. Hover a
            row — consider it a preview of the energy.
          </p>
        </Reveal>
      </div>

      <div>
        {services.map((s, i) => (
          <Reveal key={s.num} delay={i * 80}>
            <a
              href="#contact"
              className="group grid grid-cols-[auto_1fr] items-start gap-6 border-t border-bone/10 px-2 py-10 transition-colors duration-300 last:border-b hover:border-blood hover:bg-blood md:grid-cols-[5rem_1fr_1.2fr] md:items-center md:gap-10 md:px-6 md:py-12"
            >
              <span className="font-mono text-sm text-blood transition-colors duration-300 group-hover:text-ink">
                {s.num}
              </span>

              <div>
                <h3 className="font-display text-3xl font-bold uppercase tracking-tight transition-colors duration-300 group-hover:text-ink md:text-5xl">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-ash transition-colors duration-300 group-hover:text-ink/80">
                  {s.desc}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="border border-bone/20 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-ash transition-colors duration-300 group-hover:border-ink/30 group-hover:text-ink"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <span className="hidden justify-self-end font-display text-3xl opacity-0 transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-100 group-hover:text-ink md:block">
                ↗
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
