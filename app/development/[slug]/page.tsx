import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DevelopmentCaseStudy from "@/components/development/DevelopmentCaseStudy";
import {
  getDevelopmentProjectBySlug,
  getAllDevelopmentProjectSlugs,
} from "@/lib/development/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  const slugs = getAllDevelopmentProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getDevelopmentProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Jeizi",
    };
  }

  return {
    title: `${project.title} — Software Case Study | Jeizi`,
    description: project.summary,
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getDevelopmentProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main id="top">
        <DevelopmentCaseStudy project={project} />
      </main>
      <Footer />
      <div className="grain" aria-hidden="true" />
    </>
  );
}
