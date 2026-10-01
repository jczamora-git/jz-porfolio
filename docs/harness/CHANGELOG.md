# Harness Changelog

Append one compact entry per completed coding task. Newest entry first.
Do not copy raw logs.

## 2026-10-01 — Fix Hydration Mismatch in Reveal Component

**Goal:** Eliminate client hydration mismatch caused by server/client branch in `Reveal.tsx`.

**Changed:** `components/Reveal.tsx`, `docs/harness/HANDOFF.md`, `docs/harness/CHANGELOG.md`.

**Result:** Set `useState(false)` unconditionally for initial SSR and client render matching. Delegated `prefers-reduced-motion: reduce` styling strictly to CSS `@media (prefers-reduced-motion: reduce)` (`!important` opacity/transform/transition overrides), eliminating hydration divergence.

**Verified:** `npm run verify` ✅; `npm run build` ✅; `npm run verify:static` ✅; `npm run harness:status` ✅.

**Architecture impact:** Hydration stability for scroll-reveal components.

**Handoff:** `docs/harness/HANDOFF.md` updated.

## 2026-10-01 — UI Refinements: Shared Navbar, Favicon, About Portrait & Scroll Reveals

**Goal:** Reuse top navigation on `/gallery/`, configure `jeizi-logo.png` favicon, display Jeizi's portrait without red diamond in About section, and polish scroll reveals across the site.

**Changed:** `components/Navbar.tsx`, `app/gallery/page.tsx`, `app/layout.tsx`, `app/icon.svg` (deleted), `components/About.tsx`, `public/jeizi-zamora.webp`, `components/Reveal.tsx`, `components/gallery/GalleryGrid.tsx`, `scripts/verify-static-output.mjs`, `docs/harness/HANDOFF.md`, `docs/harness/CHANGELOG.md`.

**Result:** Reused `Navbar` on `/gallery/` with cross-route anchors (`/#work`, `/#about`, etc.) and active state. Configured `metadata.icons` for `jeizi-logo.png` favicon. Replaced About logo with `public/jeizi-zamora.webp` (49.7 KB, 97% byte reduction, preserving master PNG) and removed red diamond overlay. Upgraded `Reveal.tsx` to a singleton IntersectionObserver with GPU `translate3d`, subtle gallery card stagger (`(i % 6) * 45ms`), and full `prefers-reduced-motion: reduce` compliance.

**Verified:** `npm run verify` ✅; `npm run build` ✅; `npm run verify:static` ✅; `npm run gallery:audit` ✅; `npm run harness:status` ✅.

**Architecture impact:** Cross-route navigation, metadata favicon resolution, asset optimization, and singleton scroll animation system.

**Handoff:** `docs/harness/HANDOFF.md` updated.

## 2026-10-01 — Optimize Homepage Featured Images & Restore Marquee

**Goal:** Accelerate homepage featured project image delivery by 85.5% using WebP derivatives and restore continuous CSS-only marquee animation.

**Changed:** `scripts/generate-home-derivatives.mjs`, `public/projects/*.webp`, `components/Works.tsx`, `components/Marquee.tsx`, `app/globals.css`, `scripts/verify-static-output.mjs`, `docs/harness/HANDOFF.md`, `docs/harness/CHANGELOG.md`.

**Result:** Converted 6 oversized PNGs (7.22 MB) into lightweight WebP derivatives (1.05 MB) via Sharp (85.5% byte reduction). Prioritized first card `cmo-profile.webp` for LCP; lazy loaded remaining cards. Restored continuous marquee with dual `shrink-0` tracks, `aria-hidden="true"` on duplicate, and GPU `translate3d(-50%, 0, 0)` animation while preserving `prefers-reduced-motion: reduce`.

**Verified:** `npm run verify` ✅; `npm run build` ✅; `npm run verify:static` ✅; `npm run gallery:audit` ✅.

**Architecture impact:** Static asset optimization and CSS compositor animation. No layout or design alterations.

**Handoff:** `docs/harness/HANDOFF.md` updated.

## 2026-10-01 — Automated Google Drive Bulk Enumerator & Importer

**Goal:** Eliminate manual per-file collection of 79 Google Drive IDs by creating a one-time Google Apps Script enumerator and repository importer.

**Changed:** `scripts/google-drive-enumerator.gs`, `scripts/import-drive-manifest.mjs`, `lib/gallery/drive-files.ts`, `lib/gallery/storage.ts`, `lib/gallery/manifest.ts`, `docs/harness/DRIVE_GALLERY.md`, `docs/harness/HANDOFF.md`, `docs/harness/CHANGELOG.md`.

**Result:** Created `scripts/google-drive-enumerator.gs` to perform read-only enumeration of the 6 category folders, validate counts (79 total), and output JSON. Created `scripts/import-drive-manifest.mjs` to validate category counts, reject duplicate IDs, verify `social/story-2.png`, and update `lib/gallery/drive-files.ts` and `lib/gallery/manifest.ts`.

**Verified:** `npm run verify` ✅; `npm run gallery:audit` ✅; `npm run build` ✅; `npm run verify:static` ✅.

**Architecture impact:** Standardized Drive data pipeline from bulk script enumeration to canonical manifest.

**Handoff:** `docs/harness/HANDOFF.md` updated.

## 2026-10-01 — Migrate 79 Gallery Works to Remote Google Drive Storage

**Goal:** Resolve production 404s for local gallery images by mapping all 79 works to verified individual Google Drive file IDs and adding persistent client caching.

**Changed:** `lib/gallery/manifest.ts`, `lib/gallery/storage.ts`, `next.config.ts`, `components/gallery/GalleryGrid.tsx`, `public/sw.js`, `docs/harness/HANDOFF.md`, `docs/harness/CHANGELOG.md`.

**Result:** All 79 individual Google Drive file IDs were extracted and mapped to canonical manifest records. Storage adapter resolves works to `https://lh3.googleusercontent.com/d/${fileId}` (HTTP 200). Implemented `public/sw.js` CacheFirst image caching, lazy-loading, adjacent prefetch in lightbox, and fallback retry. Generated static export `out/gallery/index.html` has 0 local `/gallery/*.png` references.

**Verified:** `npm run verify` ✅; `npm run build` ✅; `npm run verify:static` ✅; `npm run gallery:audit` ✅ (79 Drive mapped, 0 local, 0 unresolved).

**Architecture impact:** Pure remote asset delivery for portfolio gallery works. Preserves static export without local image assets.

**Handoff:** `docs/harness/HANDOFF.md` updated.

## 2026-10-01 — Persist Google Drive Gallery Source of Truth

**Goal:** Prevent future agents from rediscovering Drive/category/gallery metadata.

**Changed:** `docs/harness/DRIVE_GALLERY.md`, `AGENTS.md`, `docs/harness/AUDIT.md`, `docs/harness/HANDOFF.md`, `docs/harness/CHANGELOG.md`.

**Result:** Drive hierarchy, 6 category folder IDs, and the 79-work contract are now durable harness knowledge.

**Architecture impact:** Documentation/harness only. No application behavior change.

**Handoff:** `docs/harness/HANDOFF.md` updated.

## 2026-10-01 — Untrack Local Gallery Assets & Configure .gitignore

**Goal:** Untrack 79 heavyweight local gallery assets (288.58 MB) from Git index and ignore `/public/gallery/` to reduce deployment build context.

**Changed:** `.gitignore`, `scripts/verify-static-output.mjs`, `docs/harness/CHANGELOG.md`, `docs/harness/HANDOFF.md`, Git index (79 gallery files untracked).

**Result:** All 79 gallery images untracked from Git working tree (`git rm -r --cached public/gallery`), master artwork preserved on local disk, `/public/gallery/` added to `.gitignore`. Remote static build artifact will drop to ~8.6 MB.

**Verified:** `npm run verify` ✅; `npm run build` ✅; `npm run verify:static` ✅; `npm run deploy:audit` ✅; `npm run harness:status` ✅.

**Architecture impact:** None to Next.js rendering; static export preserved.

**Handoff:** `docs/harness/HANDOFF.md` updated.

## 2026-10-01 — Deployment Context Audit & Harness v2 Initialization

**Goal:** Diagnose root cause of 606 MB remote build context and 1255 MB/1536 MB memory exhaustion, add build context exclusions, and bootstrap Harness v2.

**Changed:** `.dockerignore`, `package.json`, `docs/harness/AUDIT.md`, `docs/harness/HANDOFF.md`, `docs/harness/CHANGELOG.md`, `scripts/harness-status.mjs`.

**Result:** Identified exact 606.12 MB context breakdown (310.3 MB public assets + 293.2 MB .git history + 2.6 MB source code). Verified that Next.js static export generates without local gallery assets (~8.6 MB artifact), updated `.dockerignore` to block artwork and workspace overhead, registered `npm run harness:status`, and populated AUDIT.md.

**Verified:** `npm run harness:status` ✅; `npm run deploy:audit` ✅; `npm run verify` ✅; `npm run build` ✅; `npm run verify:static` ✅; `npm run gallery:audit` ✅.

**Architecture impact:** Refreshed `docs/harness/AUDIT.md`. Core static export architecture preserved.

**Handoff:** `docs/harness/HANDOFF.md` updated.
