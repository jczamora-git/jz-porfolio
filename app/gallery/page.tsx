import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import Reveal from "@/components/Reveal";
import { galleryItems } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "GALLERY — JEIZI PRODUCTIONS",
  description:
    "The full collection of work by Jeizi — event & competition graphics, logo design, print & collateral, apparel, and social media graphics.",
};

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="bg-ink text-bone">
        <section className="mx-auto max-w-7xl px-6 pb-32 pt-32 md:px-10 md:pt-44">
          <Reveal>
            <div className="mb-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.35em] text-ash">
              <span className="h-2 w-2 animate-pulse-dot bg-blood" />
              The full collection — {galleryItems.length} works
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="font-display text-[clamp(3rem,9vw,8.5rem)] font-bold uppercase leading-[0.9] tracking-tight">
              The
              <br />
              <span className="italic text-blood">gallery.</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
              <p className="max-w-md text-base leading-relaxed text-ash md:text-lg">
                Broadcast overlays, tournament systems, identities, certificates,
                jerseys, and pubmats — everything that&apos;s left the studio.
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ash">
                Click any work to view full size
              </p>
            </div>
          </Reveal>

          <div className="mt-16">
            <GalleryGrid items={galleryItems} />
          </div>
        </section>
      </main>
      <Footer />
      <div className="grain" aria-hidden="true" />
    </>
  );
}
