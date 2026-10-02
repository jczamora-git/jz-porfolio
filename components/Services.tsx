import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";

type ServiceItem = {
  num: string;
  title: string;
  desc: string;
  tags: string[];
};

const designServices: ServiceItem[] = [
  {
    num: "01",
    title: "Brand Identity & Visual Systems",
    desc: "Distinct visual identities built to stay consistent across digital products, campaigns, social media, print, and physical applications.",
    tags: ["LOGO", "IDENTITY", "DESIGN SYSTEM", "ART DIRECTION"],
  },
  {
    num: "02",
    title: "Campaign & Creative Direction",
    desc: "Campaign visuals, key art, typography, and creative systems designed to give brands and communities a recognizable point of view.",
    tags: ["CAMPAIGNS", "ART DIRECTION", "SOCIAL", "CREATIVE"],
  },
  {
    num: "03",
    title: "Print, Editorial & Apparel",
    desc: "Publication layouts, event collateral, certificates, jerseys, merchandise, and print assets built with disciplined typography and bold visual hierarchy.",
    tags: ["PRINT", "APPAREL", "EDITORIAL", "COLLATERAL"],
  },
];

const developmentServices: ServiceItem[] = [
  {
    num: "04",
    title: "Full-Stack Web Applications",
    desc: "End-to-end web platforms built across interface, authentication, backend logic, dashboards, realtime workflows, and database-driven operations.",
    tags: ["NEXT.JS", "REACT", "VUE", "TYPESCRIPT", "FULL-STACK"],
  },
  {
    num: "05",
    title: "Backend, Data & API Engineering",
    desc: "REST APIs, authentication and role-based access, relational data models, realtime data flows, integrations, and query optimization for production applications.",
    tags: ["REST API", "POSTGRESQL", "MYSQL", "SUPABASE", "AUTH"],
  },
  {
    num: "06",
    title: "Mobile, Desktop & Intelligent Systems",
    desc: "Hybrid mobile products, Windows desktop utilities, OCR and computer-vision workflows, offline AI tools, and deployment pipelines built around practical use cases.",
    tags: ["CAPACITOR", ".NET", "OCR", "AI", "CI/CD"],
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40"
    >
      <div data-section-content>
        <Reveal>
          <Eyebrow index="04" label="Services & Capabilities" />
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
          <p className="max-w-md text-sm leading-relaxed text-ash md:text-base">
            From visual identity to production software, I design and build complete digital experiences — combining strong creative direction with practical full-stack engineering.
          </p>
        </Reveal>
      </div>

      <div className="space-y-16">
        {/* Design Track */}
        <div>
          <Reveal>
            <div className="mb-6 flex items-center gap-3 border-b border-bone/15 pb-3">
              <span className="h-1.5 w-1.5 bg-blood" />
              <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-blood">
                DISCIPLINE 01 — DESIGN &amp; ART DIRECTION
              </h3>
            </div>
          </Reveal>

          <div>
            {designServices.map((s, i) => (
              <Reveal key={s.num} delay={i * 80}>
                <a
                  href="#contact"
                  className="group grid grid-cols-[auto_1fr] items-start gap-6 border-t border-bone/10 px-2 py-8 transition-colors duration-300 last:border-b hover:border-blood hover:bg-blood md:grid-cols-[5rem_1fr_1.2fr] md:items-center md:gap-10 md:px-6 md:py-10"
                >
                  <span className="font-mono text-sm text-blood transition-colors duration-300 group-hover:text-ink">
                    {s.num}
                  </span>

                  <div>
                    <h4 className="font-display text-2xl font-bold uppercase tracking-tight transition-colors duration-300 group-hover:text-ink md:text-4xl">
                      {s.title}
                    </h4>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-ash transition-colors duration-300 group-hover:text-ink/80">
                      {s.desc}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {s.tags.map((t) => (
                        <span
                          key={t}
                          className="border border-bone/20 px-2.5 py-0.5 font-mono text-[10px] tracking-[0.15em] text-ash transition-colors duration-300 group-hover:border-ink/30 group-hover:text-ink"
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
        </div>

        {/* Development Track */}
        <div>
          <Reveal>
            <div className="mb-6 flex items-center gap-3 border-b border-bone/15 pb-3">
              <span className="h-1.5 w-1.5 bg-blood" />
              <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-blood">
                DISCIPLINE 02 — SOFTWARE &amp; FULL-STACK SYSTEMS
              </h3>
            </div>
          </Reveal>

          <div>
            {developmentServices.map((s, i) => (
              <Reveal key={s.num} delay={i * 80}>
                <a
                  href="#contact"
                  className="group grid grid-cols-[auto_1fr] items-start gap-6 border-t border-bone/10 px-2 py-8 transition-colors duration-300 last:border-b hover:border-blood hover:bg-blood md:grid-cols-[5rem_1fr_1.2fr] md:items-center md:gap-10 md:px-6 md:py-10"
                >
                  <span className="font-mono text-sm text-blood transition-colors duration-300 group-hover:text-ink">
                    {s.num}
                  </span>

                  <div>
                    <h4 className="font-display text-2xl font-bold uppercase tracking-tight transition-colors duration-300 group-hover:text-ink md:text-4xl">
                      {s.title}
                    </h4>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-ash transition-colors duration-300 group-hover:text-ink/80">
                      {s.desc}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {s.tags.map((t) => (
                        <span
                          key={t}
                          className="border border-bone/20 px-2.5 py-0.5 font-mono text-[10px] tracking-[0.15em] text-ash transition-colors duration-300 group-hover:border-ink/30 group-hover:text-ink"
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
        </div>
      </div>
      </div>
    </section>
  );
}
