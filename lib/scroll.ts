/**
 * lib/scroll.ts
 *
 * Reusable smooth-scroll helper for intentional section positioning.
 * Centers compact section content in the viewport (with fixed navbar clearance)
 * and top-aligns taller content streams cleanly.
 */

export function scrollToSection(hashOrId: string, immediate = false) {
  if (typeof window === "undefined" || !hashOrId) return;
  const id = hashOrId.replace(/^#/, "").replace(/^\//, "").replace(/^#/, "");
  if (!id) return;

  const targetSection = document.getElementById(id);
  if (!targetSection) return;

  const contentWrapper =
    targetSection.querySelector<HTMLElement>("[data-section-content]") ||
    targetSection;

  const prefersReduced =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const behavior: ScrollBehavior = immediate || prefersReduced ? "auto" : "smooth";

  const rect = contentWrapper.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const navbarHeight = window.innerWidth >= 768 ? 80 : 64;

  // If content fits comfortably within the visible viewport below navbar,
  // center it vertically in the available viewport.
  // Otherwise (or for tall sections like #work), align top of content with navbar clearance.
  if (rect.height <= viewportHeight - navbarHeight - 32) {
    const availableSpace = viewportHeight - navbarHeight;
    const topOffset = navbarHeight + Math.max(0, (availableSpace - rect.height) / 2);
    const targetY = window.scrollY + rect.top - topOffset;
    window.scrollTo({
      top: Math.max(0, Math.round(targetY)),
      behavior,
    });
  } else {
    const targetY = window.scrollY + rect.top - navbarHeight - 16;
    window.scrollTo({
      top: Math.max(0, Math.round(targetY)),
      behavior,
    });
  }
}
