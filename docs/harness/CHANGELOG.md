# Harness Changelog

Append one compact entry per completed coding task. Newest entry first.
Do not copy raw logs.

## 2026-10-01 — Deployment Context Audit & Harness v2 Initialization

**Goal:** Diagnose root cause of 606 MB remote build context and 1255 MB/1536 MB memory exhaustion, add build context exclusions, and bootstrap Harness v2.

**Changed:** `.dockerignore`, `package.json`, `docs/harness/AUDIT.md`, `docs/harness/HANDOFF.md`, `docs/harness/CHANGELOG.md`, `scripts/harness-status.mjs`.

**Result:** Identified exact 606.12 MB context breakdown (310.3 MB public assets + 293.2 MB .git history + 2.6 MB source code). Verified that Next.js static export generates without local gallery assets (~8.6 MB artifact), updated `.dockerignore` to block artwork and workspace overhead, registered `npm run harness:status`, and populated AUDIT.md.

**Verified:** `npm run harness:status` ✅; `npm run deploy:audit` ✅; `npm run verify` ✅; `npm run build` ✅; `npm run verify:static` ✅; `npm run gallery:audit` ✅.

**Architecture impact:** Refreshed `docs/harness/AUDIT.md`. Core static export architecture preserved.

**Handoff:** `docs/harness/HANDOFF.md` updated.
