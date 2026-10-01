# Harness Changelog

Append one compact entry per completed coding task. Newest entry first.
Do not copy raw logs.

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
