import Link from "next/link";
import ProgressiveImage from "@/components/ProgressiveImage";
import type { DevelopmentProject } from "@/lib/development/types";

interface DevelopmentProjectCardProps {
  project: DevelopmentProject;
  index?: number;
  priority?: boolean;
}

export default function DevelopmentProjectCard({
  project,
  priority = false,
}: DevelopmentProjectCardProps) {
  const previewStack = project.stack.slice(0, 5);
  const typeLabel =
    project.type === "client" ? "CLIENT SYSTEM" : "PERSONAL PRODUCT";

  const fitClass =
    project.coverFit === "contain"
      ? `object-contain ${project.coverPosition || "object-center"}`
      : `object-cover ${project.coverPosition || "object-top"}`;

  return (
    <article className="group relative flex flex-col border border-bone/10 bg-coal/40 transition-all duration-500 hover:border-blood/60">
      {/* Media container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-bone/10 bg-coal">
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
          <ProgressiveImage
            src={project.coverImage}
            alt={project.coverAlt || `${project.title} — preview`}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={fitClass}
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
          />
        </div>

        {/* Hover overlay tint */}
        <div className="absolute inset-0 bg-blood/0 transition-colors duration-500 group-hover:bg-blood/10 pointer-events-none" />

        {/* Index and Type indicator */}
        <div className="absolute left-4 top-4 flex items-center gap-2 border border-bone/20 bg-ink/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-bone backdrop-blur">
          <span className="h-1.5 w-1.5 bg-blood" />
          SYS.{project.number} — {typeLabel}
        </div>

        {/* Status tag */}
        {project.status && (
          <div className="absolute right-4 top-4 border border-bone/20 bg-ink/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-bone backdrop-blur">
            {project.status}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
        <div>
          {/* Tagline / Meta */}
          <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ash">
            <span>{project.role}</span>
            {project.year && <span>{project.year}</span>}
          </div>

          {/* Title */}
          <h3 className="mt-3 font-display text-2xl font-bold uppercase tracking-tight text-bone transition-colors duration-300 group-hover:text-blood md:text-3xl">
            <Link href={`/development/${project.slug}`}>
              {project.title}
            </Link>
          </h3>

          {/* Tagline */}
          <p className="mt-1 font-mono text-xs uppercase tracking-wider text-blood/90">
            {project.tagline}
          </p>

          {/* Summary */}
          <p className="mt-4 text-sm leading-relaxed text-ash">
            {project.summary}
          </p>

          {/* Stack preview chips */}
          {previewStack.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-1.5">
              {previewStack.map((tech) => (
                <span
                  key={tech}
                  className="border border-bone/10 bg-ink/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-ash transition-colors duration-300 group-hover:border-bone/20 group-hover:text-bone"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action footer */}
        <div className="mt-8 flex items-center justify-between border-t border-bone/10 pt-5 font-mono text-[11px] uppercase tracking-[0.2em]">
          <Link
            href={`/development/${project.slug}`}
            className="inline-flex items-center gap-2 text-bone transition-colors hover:text-blood"
          >
            VIEW CASE STUDY
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ash transition-colors hover:text-blood"
                aria-label={`Visit live site for ${project.title}`}
              >
                LIVE ↗
              </a>
            )}
            {project.repositoryUrl && (
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ash transition-colors hover:text-blood"
                aria-label={`View source code for ${project.title}`}
              >
                SRC ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
