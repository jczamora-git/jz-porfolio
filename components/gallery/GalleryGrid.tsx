"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { GalleryItem } from "@/lib/gallery";

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<string>("all");
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const categories = useMemo(() => {
    const seen = new Map<string, string>();
    for (const item of items) {
      if (!seen.has(item.categorySlug)) seen.set(item.categorySlug, item.category);
    }
    return [
      { slug: "all", label: "All" },
      ...[...seen.entries()].map(([slug, label]) => ({ slug, label })),
    ];
  }, [items]);

  const filtered = useMemo(
    () =>
      active === "all"
        ? items
        : items.filter((item) => item.categorySlug === active),
    [items, active]
  );

  const open = (i: number) => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    setIndex(i);
  };

  const close = useCallback(() => {
    setIndex(null);
    triggerRef.current?.focus?.();
    triggerRef.current = null;
  }, []);

  const step = useCallback(
    (dir: number) =>
      setIndex((cur) =>
        cur === null ? null : (cur + dir + filtered.length) % filtered.length
      ),
    [filtered.length]
  );

  useEffect(() => {
    if (index === null) return;
    document.body.style.overflow = "hidden";
    const dialog = dialogRef.current;
    dialog?.querySelector<HTMLElement>("button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "Tab" && dialog) {
        const focusables = [...dialog.querySelectorAll<HTMLButtonElement>("button")].filter(
          (b) => !b.disabled && b.tabIndex !== -1
        );
        if (focusables.length) {
          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            last.focus();
            e.preventDefault();
          } else if (!e.shiftKey && document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, close, step]);

  const current = index !== null ? filtered[index] : null;

  return (
    <div>
      {/* Category filter */}
      <div className="mb-12 flex flex-wrap gap-x-7 gap-y-3">
        {categories.map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => {
              setActive(c.slug);
              setIndex(null);
            }}
            className={`link-underline pb-0.5 font-mono text-[11px] uppercase tracking-[0.25em] transition-colors ${
              active === c.slug ? "is-active text-bone" : "text-ash hover:text-bone"
            }`}
          >
            {c.label}
          </button>
        ))}
        <span className="ml-auto hidden font-mono text-[11px] uppercase tracking-[0.25em] text-ash md:inline">
          {filtered.length} works
        </span>
      </div>

      {/* Masonry grid */}
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {filtered.map((item, i) => (
          <button
            key={item.id || item.src}
            type="button"
            onClick={() => open(i)}
            className="gallery-item group mb-5 block w-full break-inside-avoid text-left"
            aria-label={`Open ${item.title} full size`}
          >
            <div
              className="relative w-full overflow-hidden border border-bone/10 bg-coal transition-colors duration-500 group-hover:border-blood/60"
              style={{ aspectRatio: `${item.w} / ${item.h}` }}
            >
              <Image
                src={item.src}
                alt={item.alt || item.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="font-display text-sm font-bold uppercase tracking-wide text-bone">
                  {item.title}
                </p>
                <p className="mt-1 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-ash">
                  <span className="h-1 w-1 bg-blood" />
                  {item.category}
                </p>
              </div>
              <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center border border-bone/20 bg-ink/60 font-mono text-sm text-bone opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:backdrop-blur">
                +
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {current && (
        <div
          ref={dialogRef}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={`${current.title} — image ${index! + 1} of ${filtered.length}`}
          onClick={close}
        >
          <div
            className="relative flex h-[85vh] w-full items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-full w-full">
              <Image
                src={current.src}
                alt={current.title}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center border border-bone/25 text-bone transition-colors hover:border-blood hover:text-blood"
          >
            ✕
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-bone/25 bg-ink/50 text-bone backdrop-blur transition-colors hover:border-blood hover:text-blood md:left-6"
          >
            ←
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next image"
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-bone/25 bg-ink/50 text-bone backdrop-blur transition-colors hover:border-blood hover:text-blood md:right-6"
          >
            →
          </button>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.25em] text-ash">
            {index! + 1} / {filtered.length} — {current.category}
          </div>
        </div>
      )}
    </div>
  );
}
