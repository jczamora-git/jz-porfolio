# Last Handoff

HANDOFF_VERSION: 1
UPDATED_AT: 2026-10-01
AUDITED_COMMIT: 6b9c8cd
CURRENT_HEAD: 6b9c8cd
STATE: READY

## CURRENT STATUS

1. `public/gallery/` (79 artwork files, 288.58 MB) has been completely untracked from Git (`git rm -r --cached public/gallery`) while remaining safely preserved on local disk.
2. `/public/gallery/` is explicitly ignored in `.gitignore` and `.dockerignore`.
3. Tracked gallery asset size is now 0 bytes.
4. Next.js Static Export generates cleanly (`out/` without gallery is ~8.6 MB).
5. All verification commands (`npm run verify`, `npm run build`, `npm run verify:static`, `npm run deploy:audit`) pass with code 0.

## CURRENT GOAL

Redeploy the application and measure the remote build context transfer and memory consumption against the previous 606.12 MB / 1255 MB numbers.

## VERIFIED FACTS

- `public/gallery` is ignored in both `.gitignore` and `.dockerignore`.
- `public/gallery` is no longer tracked in the Git repository index (0 files tracked).
- Local gallery artwork is preserved on disk for development and offline backup.
- Static artifact `out/` drops from 297.42 MB to ~8.6 MB in environments without local gallery files.
- Google Drive category folders are locked (Main folder: `1NP099TUQaYz7xs_wZ6QutJrZI5wl9kvi`, 79 expected works across 6 categories).
- Drive file ID mapping in `lib/gallery/manifest.ts` is the remaining step for images to display on the deployed site.

## LAST CHANGES

- `.gitignore`: Added `/public/gallery/`.
- `.dockerignore`: Excluded `public/gallery/`, `docs/`, `*.md`, and `**/.git`.
- `scripts/verify-static-output.mjs`: Made static output asset verification support builds both with and without local gallery files.
- `docs/harness/CHANGELOG.md`: Appended untracking task entry.
- `docs/harness/HANDOFF.md`: Updated to reflect untracked gallery state.
- Git index: Untracked 79 gallery image files.

## BLOCKERS / OPEN ISSUES

- Individual Google Drive file IDs need to be added to `lib/gallery/manifest.ts` so remote images render in production.

## READ NEXT

- `AGENTS.md`
- `docs/harness/HANDOFF.md`
- `lib/gallery/manifest.ts`
- `lib/gallery/storage.ts`

## NEXT ACTION

Redeploy and compare remote build-context size against the previous ~606.12 MB and verify container memory usage stays well below the 1536 MB ceiling.

## DO NOT REPEAT

- Drive category discovery (already locked in `AUDIT.md`).
- Local-vs-remote gallery migration investigation.
- Static export compatibility investigation.
- Previous image decode memory audit (~2.35 GB RGBA benchmarked).
- Re-measuring tracked gallery size (now 0 bytes).

## LAST VERIFICATION

- `npm run harness:status` ✅ (clean)
- `npm run deploy:audit` ✅ (export & context pass)
- `npm run verify` ✅ (TypeScript + ESLint pass)
- `npm run build` ✅ (Turbopack static export pass)
- `npm run verify:static` ✅ (routes and assets pass)
