# Last Handoff

HANDOFF_VERSION: 1
UPDATED_AT: 2026-10-01
AUDITED_COMMIT: 2e1ae03
CURRENT_HEAD: 2e1ae03
STATE: READY

## CURRENT STATUS

Harness v2 is augmented with `docs/harness/DRIVE_GALLERY.md` as the durable source of truth. Production static export on Wasmer works cleanly, but deployed gallery images show broken alt text placeholders because individual Google Drive file IDs have not yet been mapped into `lib/gallery/manifest.ts`. `public/gallery/` is completely untracked and ignored in Git.

## CURRENT GOAL

Verify and populate the individual Google Drive file IDs for all 79 gallery entries in `lib/gallery/manifest.ts` to restore image delivery in production.

## VERIFIED FACTS

- Drive source-of-truth document is established at `docs/harness/DRIVE_GALLERY.md`.
- 79-work collection contract is locked: `featured` (6), `event` (10), `logo` (13), `print` (9), `social` (20), `shirts` (21).
- Main Drive folder (`1NP099TUQaYz7xs_wZ6QutJrZI5wl9kvi`) and 6 category folder IDs are locked in `DRIVE_GALLERY.md`.
- Individual Drive file IDs are considered verified only when present in `lib/gallery/manifest.ts`; currently 0 verified / 79 unresolved.
- `public/gallery/` is ignored in `.gitignore` and `.dockerignore`, and untracked from Git; must not be restored to Git as primary storage.
- Next.js static export generates cleanly (`out/` is ~8.6 MB without local gallery).

## LAST CHANGES

- `docs/harness/DRIVE_GALLERY.md`: Created durable source-of-truth document with folder IDs, category mapping, and 79 display titles.
- `AGENTS.md`: Added `DRIVE_GALLERY.md` discovery step and source-of-truth entry.
- `docs/harness/AUDIT.md`: Added reference to `DRIVE_GALLERY.md` and updated file ownership table.
- `docs/harness/CHANGELOG.md`: Appended task entry for persisting Google Drive gallery source of truth.
- `docs/harness/HANDOFF.md`: Updated with Drive status, open issues, and next action.

## BLOCKERS / OPEN ISSUES

- Individual Google Drive file IDs are missing/unresolved in `lib/gallery/manifest.ts` (0 of 79 populated).
- Open issue: service-worker image cache registration in dev logs requests `/sw.js` resulting in 404 (file currently absent).

## READ NEXT

- `docs/harness/DRIVE_GALLERY.md`
- `lib/gallery/manifest.ts`
- `lib/gallery/storage.ts`
- `scripts/audit-gallery-sources.mjs`

## NEXT ACTION

Verify and populate the individual Google Drive file IDs for all 79 gallery entries, then validate actual browser-loadable image URLs through the storage adapter.

## DO NOT REPEAT

- Drive main/category folder discovery (locked in `DRIVE_GALLERY.md`).
- 79-work collection counting and category counting.
- Local-vs-remote gallery migration investigation.
- Previous static-export investigation and Node-server requirement investigation.
- Previous image decoded-memory audit (~2.35 GB RGBA benchmarked).
- Previous grain/CSS performance audit.

## LAST VERIFICATION

- `npm run harness:status` ✅ (clean)
- `npm run deploy:audit` ✅ (export & context pass)
- `npm run verify` ✅ (TypeScript + ESLint pass)
- `npm run build` ✅ (Turbopack static export pass)
- `npm run verify:static` ✅ (routes and assets pass)
- `npm run gallery:audit` ✅ (79 entries and category counts pass)
