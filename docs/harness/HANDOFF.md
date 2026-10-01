# Last Handoff

HANDOFF_VERSION: 1
UPDATED_AT: 2026-10-01
AUDITED_COMMIT: 6dd26fb
CURRENT_HEAD: 6dd26fb
STATE: READY

## CURRENT STATUS

Harness v2 is initialized and active. The Next.js 16 static export architecture (`output: "export"`, `trailingSlash: true`, `images.unoptimized: true`) is verified and functional. The active production deployment blocker is the ~606 MB remote build context and 1255 MB of 1536 MB builder memory exhaustion caused by tracking 302.6 MB of raw gallery artwork in Git history.

## CURRENT GOAL

Decouple the 302.6 MB gallery assets from the deployable repository so Anybuild's build context drops below 15 MB and static build memory stays below 200 MB.

## VERIFIED FACTS

- Mathematical build context breakdown: `public/` (310.30 MB) + `.git/` (293.24 MB) + source code (2.64 MB) = 606.18 MB.
- Gallery collection contains exactly 79 works across 6 categories (featured=6, event=10, logo=13, print=9, social=20, shirts=21).
- Duplicate display titles are valid; stable manifest IDs must remain unique.
- Decoded gallery RGBA memory is ~2.35 GB; performance mitigations (noise texture, `content-visibility: auto`, hover-only blur) are completed and committed.
- Google Drive folder IDs are locked (Main: `1NP099TUQaYz7xs_wZ6QutJrZI5wl9kvi`, Social: `1mkO97F5i1JNoTQcLD5R4UFIEN-a-pZPm`, Print: `1yr7jqSf7MvoN2of8QwFngwdAkwySBVzW`, Shirts: `1iPkgip2CDJkiq6tfp0D_iTu3GptvBg1r`, Logo: `1pICY8qRqJvIY1MrSVpQLmSBGwEoJstkc`, Featured: `1VjkTQ1zrOngNlHngLaTpkVXBWR7ooj7n`, Event: `1RDSIMmbxpi_EbJV6kH9GDPHWtMdBFT-5`).
- Individual Drive file IDs remain UNRESOLVED; do not invent file IDs.
- `next build` static export succeeds completely without local gallery images, producing an ~8.6 MB static artifact.

## LAST CHANGES

- `AGENTS.md`: Router and FAST PATH rules finalized.
- `docs/harness/AUDIT.md`: Complete architecture map, deployment facts, and Drive mappings documented.
- `docs/harness/HANDOFF.md`: Updated to READY state.
- `docs/harness/CHANGELOG.md`: Seeded bootstrap entry.
- `scripts/harness-status.mjs`: Added `AGENTS.md` verification.
- `.dockerignore`: Excluded `public/gallery/`, `docs/`, `*.md`, and `**/.git`.
- `package.json`: Registered `"harness:status": "node scripts/harness-status.mjs"`.

## BLOCKERS / OPEN ISSUES

- Anybuild clones the Git repository from GitHub; because `public/gallery/` was committed in `9993e3e`, `git clone` downloads 293 MB of `.git` objects unless deployed from a clean deployment branch or history is rewritten.

## READ NEXT

- `AGENTS.md`
- `docs/harness/HANDOFF.md`
- `.dockerignore`
- `lib/gallery/manifest.ts`
- `lib/gallery/storage.ts`

## NEXT ACTION

Create a clean deployment branch (e.g. `release`) containing source code and remote gallery manifest without historical artwork blobs, or map individual Google Drive file IDs into `lib/gallery/manifest.ts`.

## DO NOT REPEAT

- Do not re-measure directory byte sizes or re-audit the 606 MB context breakdown.
- Do not re-investigate static export compatibility or attempt to switch back to a Node server.
- Do not re-open `Hero.tsx`, `Navbar.tsx`, `GalleryGrid.tsx`, or `globals.css` to re-audit performance.
- Do not rediscover category counts from UI; locked at exactly 79 works.
- Do not rediscover Google Drive folder IDs.

## LAST VERIFICATION

- `npm run harness:status` ✅ (branch: main, head: 1db1e18, clean)
- `npm run deploy:audit` ✅ (export config & context valid)
- `npm run verify` ✅ (TypeScript + ESLint clean)
- `npm run build` ✅ (Turbopack static export successful)
- `npm run verify:static` ✅ (routes and static output valid)
- `npm run gallery:audit` ✅ (manifest records valid)
