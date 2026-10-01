# Project Audit

STATUS: VERIFIED
AUDITED_COMMIT: 6dd26fb
AUDITED_AT: 2026-10-01

This file is the durable architecture map and verified project facts for Jeizi Portfolio.

## Project identity

- Runtime/framework: Next.js 16.2.12 (Turbopack, App Router)
- React: 19.2.4
- Package manager: npm (Windows x64 / Node.js 20+)
- Rendering/deployment model: Native Next.js Static Export (`output: "export"`, `trailingSlash: true`, `images.unoptimized: true`)
- Production output: `out/` static artifact (pure HTML, CSS, JS chunks, static assets)
- Hosting/build provider: Anybuild Static Node.js provider (runs `next build` -> serves `out/`)
- Important version constraints: Next.js 16 breaking changes; static export requires all routes to be static and images unoptimized or served remotely.

## Architecture map

| Area | Responsibility | Primary files | Depends on |
| --- | --- | --- | --- |
| Home route | Landing page, hero, bio, preview works, contact | `app/page.tsx`, `components/Hero.tsx`, `components/Works.tsx`, `components/About.tsx`, `components/Contact.tsx` | `lib/projects.ts`, Tailwind CSS v4 |
| Gallery route | Full portfolio masonry grid, category filter, modal lightbox | `app/gallery/page.tsx`, `components/gallery/GalleryGrid.tsx` | `lib/gallery.ts`, `lib/gallery/storage.ts` |
| Gallery data | Normalized manifest records and storage adapters | `lib/gallery.ts`, `lib/gallery/manifest.ts`, `lib/gallery/storage.ts` | Remote or local image sources |
| Gallery UI/lightbox | Masonry grid with keyboard navigation, full view modal | `components/gallery/GalleryGrid.tsx` | React client state, `next/image` (unoptimized) |
| Styling/performance | Theme variables, noise overlay, responsive typography, font tokens | `app/globals.css`, `app/layout.tsx` | Tailwind CSS v4, Google Fonts (Syne, Outfit, Space Mono) |
| Build/deploy | Static export configuration, Docker ignore context rules | `next.config.ts`, `.dockerignore`, `package.json` | Next.js CLI |
| Harness | Agent routing, verification scripts, status and handoff protocol | `AGENTS.md`, `docs/harness/*`, `scripts/*` | Node.js built-ins |

## Route map

| Route | Type | Entry file | Runtime requirement |
| --- | --- | --- | --- |
| `/` | Static HTML | `app/page.tsx` | Client browser (interactive scrolling) |
| `/gallery/` | Static HTML | `app/gallery/page.tsx` | Client browser (category filtering & lightbox) |
| `/_not-found` | Static HTML | `app/not-found.tsx` | Client browser |
| `/icon.svg` | Static Asset | `app/icon.svg` | None |

## Data flow

1. **Homepage composition**: `app/page.tsx` statically imports and composes `Navbar`, `Hero`, `Works`, `About`, and `Contact`.
2. **Gallery data & lightbox**: `lib/gallery/manifest.ts` holds canonical entries -> `lib/gallery/storage.ts` resolves storage providers (`local`, `google-drive`, `custom`) into clean `src` strings -> `GalleryGrid.tsx` renders masonry items and manages active modal state via keyboard / click triggers.
3. **Image source/storage**: Currently configured with dual support for local paths (`public/gallery/*`) and remote URLs (`drive.google.com`, `lh3.googleusercontent.com`, or custom CDNs).
4. **Build & deployment**: `npm run build` runs Turbopack static export -> generates `out/` -> Anybuild static provider consumes `out/` without server runtime.

## Deployment facts

### VERIFIED Facts
- **Provider detection**: Anybuild detects `Static Node.js provider`, Framework: `Next.js`, Output directory: `out`.
- **Build command**: `npm run build` (`next build`).
- **Output directory**: `out/`.
- **Last known build result**: `next build` static export succeeds completely in ~4s (local) / ~17s (Turbopack).
- **Builder memory ceiling**: 1536 MB total memory limit on remote builder.
- **Measured build context size**: 606.12 MB transferred in remote Docker/Git clone context.
  - Mathematical composition: `public/` (310.30 MB) + `.git/` history (293.24 MB) + source code (~2.64 MB) = 606.18 MB.
- **Measured static artifact size**:
  - Full local `out/`: 311.87 MB (297.42 MiB) across 149 files.
  - `out/gallery/`: 302.82 MB (97.10% of total artifact).
  - `out/_next/`: 1.07 MB (1.02 MiB).
  - `out/projects/`: 7.57 MB (7.22 MiB).
  - Without `public/gallery/`: `out/` is only ~8.6 MB.
- **Root cause of remote OOM failure**:
  1. Cloned repo context brings ~606 MB into builder container.
  2. `npm install` adds ~400 MB `node_modules`.
  3. `next build` copies `public/` into `out/`, adding another ~312 MB.
  4. Container filesystem/page-cache reaches 1,315 MB, breaching the 1255 MB watchdog threshold within the 1536 MB cgroup.

### OPEN QUESTIONS
- Whether Anybuild will respect `.dockerignore` for non-Dockerized Git deployments, or if the repository Git history itself must be freed of the 293 MB gallery blobs (e.g. via a clean deployment branch `release`).

## Asset / performance facts

- **Gallery items**: 79 items.
- **Compressed gallery asset size**: 302,598,791 bytes (288.58 MB) across 79 PNG files.
- **Decoded RGBA memory**: Approximately 2.35 GB across all gallery images combined.
- **Oversized original images**: Includes dimensions around 9508×4317, 9883×3863, 5674×5665, 4000×4000.
- **Completed performance work**:
  - Replaced heavy procedural SVG `feTurbulence` grain filter with lightweight static noise texture (`public/noise.png`).
  - Added native browser `content-visibility: auto` and CSS containment to offscreen gallery items.
  - Restricted expensive backdrop-blur transitions to active hover states.
  - Coalesced/throttled scroll event handlers in Navbar.

## 79 Work collection contract

The gallery collection must remain exactly 79 works unless explicitly modified:

| Category | Category Slug | Expected Works |
| :--- | :--- | :--- |
| Featured | `featured` | 6 |
| Event & Competition | `event` | 10 |
| Logo Design | `logo` | 13 |
| Print & Collateral | `print` | 9 |
| Social Media | `social` | 20 |
| T-Shirt & Apparel | `shirts` | 21 |
| **Total** | | **79** |

- **Duplicate display titles are valid** (e.g. repeated titles like "Display", "Loading Screen", "Match Overlay").
- **ID Uniqueness**: NEVER use display title alone as a unique key or ID. Stable IDs (e.g. `event-bracket`, `social-overlay-1`) must remain unique in `lib/gallery/manifest.ts`.

## Google Drive storage map

Locked folder IDs for future remote migration:

- **Main Drive folder**: `1NP099TUQaYz7xs_wZ6QutJrZI5wl9kvi`
  - URL: `https://drive.google.com/drive/folders/1NP099TUQaYz7xs_wZ6QutJrZI5wl9kvi?usp=drive_link`
- **Social Media (20 works)**: `1mkO97F5i1JNoTQcLD5R4UFIEN-a-pZPm`
- **Print & Collateral (9 works)**: `1yr7jqSf7MvoN2of8QwFngwdAkwySBVzW`
- **T-Shirt & Apparel (21 works)**: `1iPkgip2CDJkiq6tfp0D_iTu3GptvBg1r`
- **Logo Design (13 works)**: `1pICY8qRqJvIY1MrSVpQLmSBGwEoJstkc`
- **Featured (6 works)**: `1VjkTQ1zrOngNlHngLaTpkVXBWR7ooj7n`
- **Event & Competition (10 works)**: `1RDSIMmbxpi_EbJV6kH9GDPHWtMdBFT-5`

*Status*: Folder IDs are verified and locked. Individual Drive file IDs for the 79 works are UNRESOLVED (not yet uploaded/mapped). Do not invent Drive file IDs.

## Critical invariants

1. Visual identity, typography, and dark aesthetics must be preserved.
2. Gallery categories, ordering, lightbox modal, and keyboard accessibility must remain intact.
3. Static export compatibility (`output: "export"`, `trailingSlash: true`, `images.unoptimized: true`) must not be undone.
4. Storage provider isolation in `lib/gallery/storage.ts` must remain independent of React components.
5. No Node server runtime in production.
6. Do NOT delete local gallery files until remote mapping is fully verified.

## Verification matrix

| Concern | Command | Expected result |
| --- | --- | --- |
| Harness status | `npm run harness:status` | Exit code 0, reports git head and script status |
| Lint + types | `npm run verify` | Exit code 0, 0 errors |
| Production build | `npm run build` | Exit code 0, `out/` generated |
| Static output | `npm run verify:static` | Exit code 0, routes and static assets verified |
| Deployment audit | `npm run deploy:audit` | Exit code 0, export settings and context checked |
| Gallery audit | `npm run gallery:audit` | Exit code 0, manifest integrity validated |

## File ownership / where to look

| Task | Read first | Usually do not need |
| --- | --- | --- |
| Hero/home visual change | `components/Hero.tsx`, `app/page.tsx` | Gallery files, scripts |
| Navbar/scroll behavior | `components/Navbar.tsx` | Data manifests |
| Gallery UI | `components/gallery/GalleryGrid.tsx` | Home components |
| Gallery data/source | `lib/gallery/manifest.ts`, `lib/gallery/storage.ts` | UI layout code |
| Deployment failure | `next.config.ts`, `.dockerignore`, `scripts/deploy-audit.mjs` | Component code |
| Asset performance | `app/globals.css`, `lib/gallery.ts` | Next config |
| Harness maintenance | `AGENTS.md`, `docs/harness/*`, `scripts/harness-status.mjs` | App routes |

## Known completed investigations

- **Turbopack Dev Panic**: Turbopack panic during local dev was caused by concurrent multi-process file contention with Turbopack persistent cache; resolved by starting webpack fallback `npm run dev:webpack` when needed.
- **Node Server OOM Incident**: Transitioned to native static export (`output: "export"`); static build succeeds in ~4s.
- **606 MB Build Context Breakdown**: Reconciled exactly to `public/gallery/` (302.6 MB) + `.git/` history (293.2 MB) + source code (2.6 MB).
- **Runtime Scroll Lag**: Eliminated expensive full-screen SVG filters and unneeded continuous backdrop filters.

## Open technical debt

1. Decouple or purge the 302 MB gallery binaries from Git commit history / deployable branch so Anybuild context drops from 606 MB to < 15 MB.
2. Complete remote storage migration (Google Drive / Cloudflare R2 / S3) via `lib/gallery/manifest.ts` entries.
