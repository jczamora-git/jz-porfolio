import ProgressiveImage from "./ProgressiveImage";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";

type Project = {
  title: string;
  category: string;
  image: string;
};

const projects: Project[] = [
  {
    title: "CMO — CALAPAN MOBILE ESPORTS",
    category: "Featured — Esports Organization Branding",
    image: "/projects/cmo-profile.webp",
  },
  {
    title: "EVENT & COMPETITION GRAPHICS",
    category: "Broadcast Overlays & Stage Screens",
    image: "/projects/event-preview.webp",
  },
  {
    title: "LOGO DESIGN",
    category: "Tournament & Organization Identities",
    image: "/projects/logo-preview.webp",
  },
  {
    title: "PRINT DESIGN & COLLATERAL",
    category: "Certificates, Tarps & Publications",
    image: "/projects/printed-preview.webp",
  },
  {
    title: "T-SHIRT & APPAREL",
    category: "Jerseys, Team Shirts & Merch",
    image: "/projects/shirt-preview.webp",
  },
  {
    title: "SOCIAL MEDIA GRAPHICS",
    category: "Pubmats, Stories & Standings",
    image: "/projects/social-preview.webp",
  },
];

export default function Works() {
  return (
    <section id="work" className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
      <div data-section-content>
        <Reveal>
          <Eyebrow index="01" label="Selected Work" />
        </Reveal>

      <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
        <Reveal delay={100}>
          <h2 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight md:text-7xl">
            Featured
            <br />
            <span className="italic text-blood">projects.</span>
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="max-w-sm text-sm leading-relaxed text-ash md:text-base">
            Esports broadcasts, tournament systems, identities, print, apparel,
            and social — real work built for real communities.
          </p>
        </Reveal>
      </div>

      <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={(i % 2) * 120} className={i % 2 === 1 ? "md:mt-24" : ""}>
            <article className="group cursor-pointer">
              <div className="relative aspect-square overflow-hidden border border-bone/10 bg-coal transition-colors duration-500 group-hover:border-blood/60">
                <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                  <ProgressiveImage
                    src={p.image}
                    alt={`${p.title} — work preview`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                    priority={i === 0}
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </div>
                <div className="absolute inset-0 bg-blood/0 transition-colors duration-500 group-hover:bg-blood/10" />
                <span className="absolute right-4 top-4 flex h-10 w-10 translate-y-2 items-center justify-center border border-bone/20 bg-ink/60 font-mono text-sm text-bone opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  ↗
                </span>
              </div>

              <div className="mt-5">
                <h3 className="font-display text-xl font-bold uppercase tracking-tight transition-colors duration-300 group-hover:text-blood md:text-2xl">
                  {p.title}
                </h3>
                <p className="mt-1.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-ash">
                  <span className="h-1.5 w-1.5 bg-blood/60 transition-colors duration-300 group-hover:bg-blood" />
                  {p.category}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-24 flex justify-center">
        <a
          href="/gallery"
          className="group inline-flex items-center gap-3 border border-bone/25 px-8 py-4 font-mono text-xs tracking-[0.25em] text-bone transition-colors hover:border-blood hover:text-blood"
        >
          VIEW FULL GALLERY
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
      </div>
    </section>
  );
}
