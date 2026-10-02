import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import DevelopmentProjectCard from "@/components/development/DevelopmentProjectCard";
import {
  getClientProjects,
  getPersonalProjects,
} from "@/lib/development/projects";

export const metadata: Metadata = {
  title: "DEVELOPMENT — Digital Systems & Full-Stack Engineering | Jeizi",
  description:
    "Full-stack software engineering, client web applications, desktop automation, security tools, and APIs built by Jeizi — combining distinct visual art direction with disciplined technical execution.",
};

const engineeringCapabilities = [
  {
    num: "01",
    title: "Full-Stack Web Applications",
    desc: "Production Next.js, React, and Django web platforms featuring server-side RBAC, database-level pagination, real-time sync, and sub-100ms render targets.",
    tags: ["NEXT.JS 15", "REACT 19", "TYPESCRIPT", "DJANGO", "TAILWIND CSS", "PWA"],
  },
  {
    num: "02",
    title: "Backend & API Engineering",
    desc: "PostgreSQL RPC stored procedures, type-safe REST APIs, microservices, tokenized guest access, authentication, and query aggregation under load.",
    tags: ["POSTGRESQL RPCS", "SUPABASE", "PHP LAVALUST", "NODE.JS", "REST", "JWT"],
  },
  {
    num: "03",
    title: "Desktop Systems & Computer Vision",
    desc: "High-performance .NET 8 desktop utilities, real-time video stream capture, OpenCV image thresholding, Tesseract OCR, and NAudio WASAPI recording.",
    tags: ["C# 12", ".NET 8", "OPENCV", "TESSERACT OCR", "WASAPI", "DIRECTSHOW", "FFMPEG"],
  },
  {
    num: "04",
    title: "Mobile Security & Offline AI",
    desc: "Hybrid mobile applications with native biometric authentication, Web Crypto AES-GCM-256 local vaults, and local Whisper speech-to-text inference.",
    tags: ["IONIC VUE", "CAPACITOR", "AES-GCM", "PBKDF2", "WHISPER.NET", "FCM PUSH"],
  },
];

const workflowSteps = [
  { label: "DESIGN", desc: "Visual Identity & Systems" },
  { label: "INTERFACE", desc: "UI / UX & Component Models" },
  { label: "FRONTEND", desc: "Client State & Logic" },
  { label: "BACKEND", desc: "APIs & Business Rules" },
  { label: "DATABASE", desc: "Relational Schemas & RPCs" },
  { label: "DEPLOYMENT", desc: "CI/CD & Edge Delivery" },
];

export default function DevelopmentPage() {
  const clientProjects = getClientProjects();
  const personalProjects = getPersonalProjects();

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 pb-28 pt-32 md:px-10 md:pb-40 md:pt-40">
        {/* Hero Section */}
        <section>
          <Reveal>
            <Eyebrow
              index={`07 PROJECTS`}
              label="Full-Stack Development &amp; Systems"
            />
          </Reveal>

          <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
            <Reveal delay={100}>
              <h1 className="font-display text-[clamp(2.8rem,8vw,7.5rem)] font-bold uppercase leading-[0.92] tracking-tight">
                DIGITAL
                <br />
                <span className="italic text-blood">SYSTEMS.</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="max-w-md text-base leading-relaxed text-ash md:text-lg">
                Software architecture, full-stack applications, desktop tools,
                and applied security systems. Designed with brutalist precision
                and engineered for speed, reliability, and maintainability.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Unified Workflow Banner */}
        <section className="mb-24 border-y border-bone/10 py-10 md:mb-32 md:py-12">
          <Reveal>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xs">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-blood">
                  End-to-End Pipeline
                </span>
                <h2 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight text-bone">
                  Design the product.
                  <br />
                  <span className="text-blood">Build the system.</span>
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {workflowSteps.map((step, idx) => (
                  <div
                    key={step.label}
                    className="border border-bone/10 bg-coal/40 p-4 transition-colors hover:border-blood/40"
                  >
                    <span className="font-mono text-[10px] text-blood">
                      0{idx + 1}.
                    </span>
                    <p className="mt-1 font-mono text-xs font-bold uppercase tracking-wider text-bone">
                      {step.label}
                    </p>
                    <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-ash">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* SECTION 01: CLIENT SYSTEMS */}
        <section id="client-systems" className="mb-24 md:mb-36 scroll-mt-24">
          <Reveal>
            <div className="mb-12 flex flex-wrap items-end justify-between gap-4 border-b border-bone/10 pb-6">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-blood">
                  CATEGORY 01
                </span>
                <h2 className="mt-1 font-display text-3xl font-bold uppercase tracking-tight text-bone md:text-5xl">
                  CLIENT <span className="italic text-blood">SYSTEMS.</span>
                </h2>
                <p className="mt-2 font-mono text-xs uppercase tracking-widest text-ash">
                  Production community &amp; institutional platforms
                </p>
              </div>

              <span className="font-mono text-xs text-blood">
                [{clientProjects.length} CLIENT PLATFORMS]
              </span>
            </div>
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-2">
            {clientProjects.map((project, index) => (
              <Reveal key={project.slug} delay={(index % 2) * 100}>
                <DevelopmentProjectCard
                  project={project}
                  priority={index === 0}
                />
              </Reveal>
            ))}
          </div>
        </section>

        {/* SECTION 02: PERSONAL PRODUCTS */}
        <section id="personal-products" className="mb-24 md:mb-36 scroll-mt-24">
          <Reveal>
            <div className="mb-12 flex flex-wrap items-end justify-between gap-4 border-b border-bone/10 pb-6">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-blood">
                  CATEGORY 02
                </span>
                <h2 className="mt-1 font-display text-3xl font-bold uppercase tracking-tight text-bone md:text-5xl">
                  PERSONAL <span className="italic text-blood">PRODUCTS.</span>
                </h2>
                <p className="mt-2 font-mono text-xs uppercase tracking-widest text-ash">
                  Desktop automation, local-first security, computer vision &amp; mobile tools
                </p>
              </div>

              <span className="font-mono text-xs text-blood">
                [{personalProjects.length} SOFTWARE PRODUCTS]
              </span>
            </div>
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-2">
            {personalProjects.map((project, index) => (
              <Reveal key={project.slug} delay={(index % 2) * 100}>
                <DevelopmentProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* Engineering Capabilities & Stack Pillars */}
        <section id="capabilities" className="scroll-mt-24">
          <Reveal>
            <Eyebrow index="CAPABILITIES" label="Technical Competencies" />
            <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
              <h2 className="font-display text-3xl font-bold uppercase leading-[0.95] tracking-tight md:text-6xl">
                ENGINEERING
                <br />
                <span className="italic text-blood">DISCIPLINES.</span>
              </h2>
              <p className="max-w-sm text-sm leading-relaxed text-ash md:text-base">
                Core technical competencies derived from actual shipped systems,
                desktop software, and mobile applications.
              </p>
            </div>
          </Reveal>

          <div className="space-y-4">
            {engineeringCapabilities.map((cap, i) => (
              <Reveal key={cap.num} delay={i * 70}>
                <div className="group grid gap-6 border border-bone/10 bg-coal/20 p-6 transition-colors duration-300 hover:border-blood/60 md:grid-cols-[4rem_1.5fr_2fr] md:items-start md:p-8">
                  <span className="font-mono text-sm text-blood">
                    {cap.num}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-bone transition-colors duration-300 group-hover:text-blood md:text-3xl">
                      {cap.title}
                    </h3>
                  </div>
                  <div>
                    <p className="text-sm leading-relaxed text-ash">
                      {cap.desc}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {cap.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-bone/10 bg-ink/60 px-2.5 py-1 font-mono text-[10px] tracking-[0.15em] text-ash transition-colors duration-300 group-hover:border-bone/20 group-hover:text-bone"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <div className="grain" aria-hidden="true" />
    </>
  );
}
