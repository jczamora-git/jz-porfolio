"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  { label: "WORK", href: "/#work" },
  { label: "GALLERY", href: "/gallery/" },
  { label: "DEVELOPMENT", href: "/development/" },
  { label: "ABOUT", href: "/#about" },
  { label: "SERVICES", href: "/#services" },
  { label: "CONTACT", href: "/#contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 24);
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transform-gpu transition-all duration-300 ${
        scrolled
          ? "border-b border-bone/10 bg-ink/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20 md:px-10">
        <Link
          href="/"
          className="flex items-center"
          aria-label="Jeizi Productions — home"
        >
          <Image
            src="/jeizi-logo.png"
            alt="Jeizi Productions logo"
            width={44}
            height={44}
            priority
            className="h-9 w-auto md:h-11"
          />
        </Link>

        <ul className="hidden items-center gap-7 lg:gap-8 md:flex">
          {links.map((l) => {
            const isGallery = l.href.startsWith("/gallery");
            const isDev = l.href.startsWith("/development");
            const isActive = isGallery
              ? pathname?.startsWith("/gallery")
              : isDev
              ? pathname?.startsWith("/development")
              : false;

            return (
              <li key={l.label}>
                <a
                  href={l.href}
                  className={`link-underline font-mono text-[11px] tracking-[0.2em] lg:tracking-[0.25em] transition-colors ${
                    isActive ? "is-active text-bone" : "text-ash hover:text-bone"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-4">
          <Link
            href="/#contact"
            className="hidden bg-blood px-5 py-2.5 font-mono text-[11px] tracking-[0.2em] text-ink transition-colors hover:bg-bone md:inline-block"
          >
            LET&apos;S TALK ↗
          </Link>
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={`h-0.5 w-6 bg-bone transition-all duration-300 ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-bone transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-bone transition-all duration-300 ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-x-0 top-16 z-40 flex h-[calc(100dvh-4rem)] flex-col justify-between bg-ink px-6 pb-10 pt-8 transition-all duration-500 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-2">
          {links.map((l, i) => (
            <li
              key={l.label}
              style={{ transitionDelay: open ? `${i * 70}ms` : "0ms" }}
              className={`transition-all duration-500 ${
                open
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
            >
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-5xl font-bold uppercase leading-tight tracking-tight"
              >
                {l.label} <span className="text-blood">/</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between">
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="bg-blood px-6 py-3 font-mono text-xs tracking-[0.2em] text-ink"
          >
            LET&apos;S TALK ↗
          </Link>
          <p className="font-mono text-[10px] tracking-widest text-ash">
            AVAILABLE FOR WORK
          </p>
        </div>
      </div>
    </header>
  );
}
