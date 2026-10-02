import Link from "next/link";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";
import DevelopmentProjectCard from "./development/DevelopmentProjectCard";
import { getFeaturedDevelopmentProjects } from "@/lib/development/projects";

export default function DevelopmentSection() {
  const featuredProjects = getFeaturedDevelopmentProjects();

  return (
    <section
      id="development"
      className="mx-auto max-w-7xl scroll-mt-20 px-6 py-28 md:px-10 md:py-40"
    >
      <Reveal>
        <Eyebrow index="02" label="Full-Stack Development" />
      </Reveal>

      <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
        <Reveal delay={100}>
          <h2 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight md:text-7xl">
            Digital
            <br />
            <span className="italic text-blood">systems.</span>
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="max-w-md text-sm leading-relaxed text-ash md:text-base">
            I design the interface and engineer the system behind it — full-stack web applications, mobile products, realtime platforms, desktop automation, and AI-assisted tools built around real operational needs.
          </p>
        </Reveal>
      </div>

      {/* Dual-discipline workflow banner */}
      <Reveal delay={250}>
        <div className="mb-16 border border-bone/10 bg-coal/30 p-6 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-blood">
                Dual-Discipline Workflow
              </p>
              <h3 className="mt-1 font-display text-xl font-bold uppercase tracking-tight text-bone md:text-2xl">
                Design the product. Build the system.
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-ash">
              <span className="text-bone">DESIGN</span>
              <span className="text-blood">→</span>
              <span className="text-bone">INTERFACE</span>
              <span className="text-blood">→</span>
              <span className="text-bone">FRONTEND</span>
              <span className="text-blood">→</span>
              <span className="text-bone">BACKEND</span>
              <span className="text-blood">→</span>
              <span className="text-bone">DEPLOYMENT</span>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Featured Projects Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {featuredProjects.map((project, idx) => (
          <Reveal key={project.slug} delay={idx * 100}>
            <DevelopmentProjectCard project={project} index={idx} />
          </Reveal>
        ))}
      </div>

      {/* Link to dedicated development route */}
      <div className="mt-20 flex justify-center">
        <Link
          href="/development"
          className="group inline-flex items-center gap-3 border border-bone/25 px-8 py-4 font-mono text-xs tracking-[0.25em] text-bone transition-colors hover:border-blood hover:text-blood"
        >
          VIEW ALL 07 DEVELOPMENT PROJECTS
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
