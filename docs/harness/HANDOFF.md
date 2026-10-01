# Last Handoff

HANDOFF_VERSION: 1
UPDATED_AT: 2026-10-01
AUDITED_COMMIT: ac14090
CURRENT_HEAD: ac14090
STATE: READY

## CURRENT STATUS

Homepage featured images and marquee animation have been optimized and restored.
- FEATURED IMAGE STRATEGY: Generated WebP derivatives for homepage cards via `scripts/generate-home-derivatives.mjs` (quality 82, 1000x1000px, 85.5% byte reduction from 7.22 MB to 1.05 MB).
- LCP: First visible card `CMO — CALAPAN MOBILE ESPORTS` (`/projects/cmo-profile.webp`) prioritized with `priority` and `loading="eager"`; below-the-fold cards use `loading="lazy"` and `decoding="async"`.
- MARQUEE: Restored continuous CSS-only GPU transform animation (`translate3d(-50%, 0, 0)`, `25s linear infinite`, `will-change: transform`). Dual-track with `shrink-0` and `aria-hidden="true"` on duplicate. Preserved `@media (prefers-reduced-motion: reduce)` accessibility.

## CURRENT GOAL

Maintain homepage performance and monitor user deployment.

## VERIFIED FACTS

- Featured images: Total encoded size reduced from 7,572,202 bytes (7.22 MB) to 1,097,904 bytes (1.05 MB) — 85.5% byte savings.
- Largest featured image: `event-preview` reduced from 2.04 MB (`.png`) to 296 KB (`.webp`).
- LCP prioritized image: `/projects/cmo-profile.webp` (28 KB).
- Marquee: CSS-only dual-track loop (`translate3d(-50%, 0, 0)`), pauses on hover, zero JavaScript animation overhead, zero layout shift.
- Reduced motion: Supported via `@media (prefers-reduced-motion: reduce)` without breaking default `no-preference` playback.
- Repeatable derivative script: `scripts/generate-home-derivatives.mjs` (does NOT run during `npm run build`).
- Static export verified: All routes and `.webp` assets pass static export verification.

## LAST CHANGES

- `scripts/generate-home-derivatives.mjs`: Created script to generate WebP derivatives (quality 82, max 1600px edge).
- `public/projects/*.webp`: Generated 6 lightweight WebP derivatives.
- `components/Works.tsx`: Updated project sources to `.webp`; added `priority` and eager loading to LCP card, lazy loading to others.
- `components/Marquee.tsx`: Restructured into dual `shrink-0` tracks with `aria-hidden="true"` on duplicated items.
- `app/globals.css`: Updated `@keyframes marquee` to `translate3d(0, 0, 0)` -> `translate3d(-50%, 0, 0)` with `will-change: transform`.
- `scripts/verify-static-output.mjs`: Added `projects/shirt-preview.webp` to static verification checklist.
- `docs/harness/HANDOFF.md` & `docs/harness/CHANGELOG.md`: Updated.

## BLOCKERS / OPEN ISSUES

- None.

## READ NEXT

- `components/Works.tsx`
- `components/Marquee.tsx`
- `app/globals.css`
- `scripts/generate-home-derivatives.mjs`

## NEXT ACTION

Commit and push homepage performance improvements to Git.

## DO NOT REPEAT

- Marquee root-cause investigation (root cause was lack of `shrink-0`/GPU translate3d + OS-level `prefers-reduced-motion`).
- Featured image source tracing (`public/projects/*` via `components/Works.tsx`).
- Manual Drive file-ID discovery.
- Previous gallery performance audit.

## LAST VERIFICATION

- `npm run harness:status` ✅ (clean)
- `npm run verify` ✅ (TypeScript + ESLint pass)
- `npm run build` ✅ (Turbopack static export pass)
- `npm run verify:static` ✅ (routes, WebP assets, and unoptimized pass)
- `npm run gallery:audit` ✅ (79 Drive mapped, 0 local, 0 unresolved)


