import Link from "next/link";
import ProgressiveImage from "@/components/ProgressiveImage";
import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/Eyebrow";
import type { DevelopmentProject } from "@/lib/development/types";

interface DevelopmentCaseStudyProps {
  project: DevelopmentProject;
}

export default function DevelopmentCaseStudy({ project }: DevelopmentCaseStudyProps) {
  const typeLabel =
    project.type === "client" ? "CLIENT SYSTEM" : "PERSONAL PRODUCT";

  const isContained =
    project.heroMediaMode === "contained" ||
    (!project.heroMediaMode && project.coverFit === "contain");

  const fitClass = isContained
    ? `object-contain ${project.coverPosition || "object-center"}`
    : `object-cover ${project.coverPosition || "object-top"}`;

  return (
    <article className="mx-auto max-w-7xl px-6 pb-28 pt-32 md:px-10 md:pb-40 md:pt-40">
      {/* Back Navigation */}
      <Reveal>
        <div className="mb-10 flex items-center justify-between">
          <Link
            href="/development"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-ash transition-colors hover:text-blood"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            ALL DEVELOPMENT PROJECTS
          </Link>

          <div className="flex items-center gap-3">
            <span className="border border-bone/20 bg-ink px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ash">
              {typeLabel}
            </span>
            {project.status && (
              <div className="flex items-center gap-2 border border-bone/20 bg-ink px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-bone">
                <span className="h-1.5 w-1.5 bg-blood" />
                {project.status}
              </div>
            )}
          </div>
        </div>
      </Reveal>

      {/* Header Eyebrow & Title */}
      <Reveal delay={100}>
        <Eyebrow index={`SYS.${project.number}`} label={project.eyebrow} />
        <h1 className="font-display text-4xl font-bold uppercase leading-[0.92] tracking-tight md:text-7xl lg:text-8xl">
          {project.title}
        </h1>
        <p className="mt-4 font-mono text-sm uppercase tracking-wider text-blood md:text-lg">
          {project.tagline}
        </p>
      </Reveal>

      {/* Meta Row / Links */}
      <Reveal delay={150}>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-y border-bone/10 py-6 font-mono text-xs uppercase tracking-[0.2em]">
          <div className="flex flex-wrap items-center gap-6 text-ash">
            {project.client && (
              <span>
                CLIENT / ORG: <strong className="text-bone">{project.client}</strong>
              </span>
            )}
            {project.year && (
              <span>
                YEAR: <strong className="text-bone">{project.year}</strong>
              </span>
            )}
            <span>
              ROLE: <strong className="text-bone">{project.role}</strong>
            </span>
          </div>

          <div className="flex items-center gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blood px-5 py-2.5 font-mono text-xs tracking-[0.2em] text-ink transition-colors hover:bg-bone"
              >
                LIVE APP ↗
              </a>
            )}
            {project.repositoryUrl && (
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-bone/25 px-5 py-2.5 font-mono text-xs tracking-[0.2em] text-bone transition-colors hover:border-blood hover:text-blood"
              >
                SOURCE REPO ↗
              </a>
            )}
          </div>
        </div>
      </Reveal>

      {/* Cover / Hero Media */}
      <Reveal delay={200} className="mt-12">
        <div className="relative aspect-[16/9] w-full overflow-hidden border border-bone/10 bg-coal">
          <ProgressiveImage
            src={project.coverImage}
            alt={project.coverAlt || `${project.title} cover`}
            fill
            sizes="100vw"
            className={fitClass}
            priority
            loading="eager"
            decoding="async"
          />
        </div>
      </Reveal>

      {/* 01 — Overview & Problem */}
      <div className="mt-24 grid gap-12 border-t border-bone/10 pt-16 md:grid-cols-[1fr_2fr]">
        <Reveal delay={100}>
          <Eyebrow index="01" label="System Overview" />
          <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-bone md:text-5xl">
            PROJECT
            <br />
            <span className="italic text-blood">CONTEXT.</span>
          </h2>
        </Reveal>

        <Reveal delay={150} className="space-y-6">
          <p className="text-lg leading-relaxed text-bone md:text-xl">
            {project.summary}
          </p>
          {project.problem && (
            <div className="border-l-2 border-blood/60 bg-coal/20 p-6">
              <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-blood">
                The Operational Bottleneck / Problem
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ash md:text-base">
                {project.problem}
              </p>
            </div>
          )}
          {project.solution && (
            <div className="border-l-2 border-bone/40 bg-coal/10 p-6">
              <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-bone">
                Engineering Solution
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ash md:text-base">
                {project.solution}
              </p>
            </div>
          )}
        </Reveal>
      </div>

      {/* 02 — Role & Architecture */}
      <div className="mt-24 border-t border-bone/10 pt-16">
        <Reveal>
          <Eyebrow index="02" label="Architecture & Pipeline" />
          <h2 className="font-display text-3xl font-bold uppercase tracking-tight md:text-5xl">
            SYSTEM
            <br />
            <span className="italic text-blood">ARCHITECTURE.</span>
          </h2>
        </Reveal>

        {project.architecture && (
          <Reveal delay={100} className="mt-8 max-w-3xl">
            <p className="text-base leading-relaxed text-ash md:text-lg">
              {project.architecture}
            </p>
          </Reveal>
        )}

        {/* Visual Pipeline Block */}
        {project.architectureSteps && project.architectureSteps.length > 0 && (
          <Reveal delay={150} className="mt-10">
            <div className="border border-bone/10 bg-coal/30 p-6 md:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-blood">
                Data &amp; Execution Pipeline
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-xs">
                {project.architectureSteps.map((step, idx) => (
                  <div key={step} className="flex items-center gap-3">
                    <div className="border border-bone/15 bg-ink px-3.5 py-2 text-bone">
                      <span className="text-blood">0{idx + 1}.</span> {step}
                    </div>
                    {idx < project.architectureSteps!.length - 1 && (
                      <span className="font-bold text-blood">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </div>

      {/* 03 — Engineering Highlights */}
      {project.highlights && project.highlights.length > 0 && (
        <div className="mt-24 border-t border-bone/10 pt-16">
          <Reveal>
            <Eyebrow index="03" label="Technical Focus" />
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight md:text-5xl">
              ENGINEERING
              <br />
              <span className="italic text-blood">HIGHLIGHTS.</span>
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {project.highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 80}>
                <div className="flex h-full flex-col justify-between border border-bone/10 bg-coal/30 p-6 md:p-8 transition-colors hover:border-blood/40">
                  <div>
                    <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-blood">
                      <span className="h-1.5 w-1.5 bg-blood" />
                      HL.0{i + 1}
                    </div>
                    <h3 className="mt-3 font-display text-xl font-bold uppercase tracking-tight text-bone md:text-2xl">
                      {h.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ash">
                      {h.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      )}

      {/* 04 — Core Features */}
      {project.features && project.features.length > 0 && (
        <div className="mt-24 border-t border-bone/10 pt-16">
          <Reveal>
            <Eyebrow index="04" label="Implemented Capabilities" />
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight md:text-5xl">
              CORE
              <br />
              <span className="italic text-blood">FEATURES.</span>
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {project.features.map((feat, i) => (
              <Reveal key={feat} delay={(i % 4) * 50}>
                <div className="flex items-start gap-4 border border-bone/10 bg-coal/20 p-5">
                  <span className="font-mono text-xs text-blood">
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                  <p className="text-sm leading-relaxed text-bone/90">
                    {feat}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      )}

      {/* 05 — Technology Stack */}
      {project.stackGroups && project.stackGroups.length > 0 && (
        <div className="mt-24 border-t border-bone/10 pt-16">
          <Reveal>
            <Eyebrow index="05" label="Technology Stack" />
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight md:text-5xl">
              STACK
              <br />
              <span className="italic text-blood">ARCHITECTURE.</span>
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {project.stackGroups.map((group, idx) => (
              <Reveal key={group.label} delay={idx * 70}>
                <div className="border border-bone/10 bg-coal/30 p-6">
                  <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-blood">
                    {group.label}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="border border-bone/15 bg-ink/70 px-3 py-1 font-mono text-xs uppercase tracking-[0.1em] text-bone"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      )}

      {/* 06 — Challenges & Solutions */}
      {project.challengeSections && project.challengeSections.length > 0 && (
        <div className="mt-24 border-t border-bone/10 pt-16">
          <Reveal>
            <Eyebrow index="06" label="Problem Solving" />
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight md:text-5xl">
              TECHNICAL
              <br />
              <span className="italic text-blood">CHALLENGES.</span>
            </h2>
          </Reveal>

          <div className="mt-12 space-y-6">
            {project.challengeSections.map((ch, i) => (
              <Reveal key={ch.title} delay={i * 80}>
                <div className="border border-bone/10 bg-coal/30 p-6 md:p-8">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blood">
                    CHALLENGE 0{i + 1}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-bold uppercase tracking-tight text-bone md:text-2xl">
                    {ch.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-ash md:text-base">
                    {ch.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      )}

      {/* 07 — Security, Testing & Status */}
      {(project.privacySecurity || project.testing) && (
        <div className="mt-24 border-t border-bone/10 pt-16">
          <Reveal>
            <Eyebrow index="07" label="Reliability & Governance" />
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight md:text-5xl">
              SECURITY &amp;{" "}
              <span className="italic text-blood">TESTING.</span>
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {project.privacySecurity && (
              <Reveal delay={100}>
                <div className="border border-bone/10 bg-coal/20 p-6 md:p-8">
                  <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-blood">
                    Privacy &amp; Security Model
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-ash">
                    {project.privacySecurity}
                  </p>
                </div>
              </Reveal>
            )}

            {project.testing && (
              <Reveal delay={150}>
                <div className="border border-bone/10 bg-coal/20 p-6 md:p-8">
                  <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-blood">
                    Quality Assurance &amp; Tests
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-ash">
                    {project.testing}
                  </p>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      )}

      {/* Footer Return Action */}
      <div className="mt-28 border-t border-bone/10 pt-16 text-center">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-ash">
            EXPLORE MORE WORK
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/development"
              className="inline-flex items-center gap-3 bg-blood px-8 py-4 font-mono text-xs tracking-[0.25em] text-ink transition-colors hover:bg-bone"
            >
              ← ALL DEVELOPMENT PROJECTS
            </Link>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-bone/25 px-8 py-4 font-mono text-xs tracking-[0.25em] text-bone transition-colors hover:border-blood hover:text-blood"
              >
                VISIT LIVE SITE ↗
              </a>
            )}
            {project.repositoryUrl && (
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-bone/25 px-8 py-4 font-mono text-xs tracking-[0.25em] text-bone transition-colors hover:border-blood hover:text-blood"
              >
                VIEW SOURCE REPO ↗
              </a>
            )}
            <Link
              href="/gallery"
              className="inline-flex items-center gap-3 border border-bone/25 px-8 py-4 font-mono text-xs tracking-[0.25em] text-bone transition-colors hover:border-blood hover:text-blood"
            >
              DESIGN GALLERY ↗
            </Link>
          </div>
        </Reveal>
      </div>
    </article>
  );
}
