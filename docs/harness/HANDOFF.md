# Last Handoff

HANDOFF_VERSION: 1
UPDATED_AT: 2026-10-01
AUDITED_COMMIT: d56e413
CURRENT_HEAD: d56e413
STATE: ACTIVE

## CURRENT STATUS

1. The Next.js Static Export architecture works and is fully verified (`output: "export"`, `trailingSlash: true`, `images.unoptimized: true`).
2. Remote Anybuild deployment fails with memory exhaustion (`1255 MB of 1536 MB`) because the Git clone and build context transferred is 606.12 MB.
3. Root cause of 606.12 MB context is verified: `public/gallery/` (302.6 MB) is tracked in Git history (`.git/` is 293.2 MB), duplicating artwork across the clone.
4. When `next build` copies `public/` into `out/`, the container filesystem totals ~1.3 GB (`.git` + `public` + `node_modules` + `out`), tripping container memory limits.
5. `.dockerignore` has been updated with explicit rules for `public/gallery/`, `docs/`, and `*.md`.
6. Harness v2 is initialized with `harness:status` registered in `package.json`.

## CURRENT GOAL

Decouple the 302 MB gallery binaries from the deployable repository so Anybuild's transferred context shrinks from 606 MB to < 15 MB and container build memory stays under 200 MB.

## VERIFIED FACTS

- Mathematical build context breakdown: `public/` (310.30 MB) + `.git/` history (293.24 MB) + source code (2.64 MB) = 606.18 MB.
- `public/gallery/` accounts for 97.46% of all Git blob history and 97.10% of the static `out/` artifact.
- `next build` does NOT require local gallery files to prerender static pages; when `public/gallery/` is excluded, `out/` drops to 8.6 MB and export succeeds cleanly.
- `npm run verify`, `npm run build`, `npm run verify:static`, `npm run deploy:audit`, `npm run gallery:audit`, and `npm run harness:status` all pass with exit code 0.

## LAST CHANGES

- `.dockerignore`: Added explicit exclusion rules for `public/gallery/`, `docs/`, `*.md`, and `**/.git`.
- `package.json`: Registered `"harness:status": "node scripts/harness-status.mjs"`.
- `docs/harness/AUDIT.md`: Bootstrapped stable architecture map, deployment facts, and verification matrix.
- `docs/harness/CHANGELOG.md`: Added bootstrap changelog entry.
- `docs/harness/HANDOFF.md`: Updated to active working state.

## BLOCKERS / OPEN ISSUES

- Anybuild clones the Git repository from GitHub; because `public/gallery/` was committed in `9993e3e`, `git clone` alone pulls 293 MB of `.git` objects unless deployed from a clean deployment branch or history is rewritten.

## READ NEXT

- `AGENTS.md`
- `docs/harness/HANDOFF.md`
- `.dockerignore`
- `lib/gallery/manifest.ts`
- `lib/gallery/storage.ts`

## NEXT ACTION

Execute Option 1 (create a clean deployment branch `release` containing source code and remote storage manifest, excluding local artwork blobs) or begin remote storage upload to Google Drive/R2.

## DO NOT REPEAT

- Do not re-measure directory byte counts or re-audit the 606 MB context breakdown; mathematically verified.
- Do not revert static export settings in `next.config.ts`.
- Do not run `git-filter-repo` or destructive history rewrites without explicit user instruction.

## LAST VERIFICATION

- `npm run harness:status` ✅ (clean)
- `npm run deploy:audit` ✅ (static export ready)
- `npm run verify` ✅ (TypeScript + ESLint clean)
- `npm run build` ✅ (Turbopack static export successful)
- `npm run verify:static` ✅ (out/ verified)
- `npm run gallery:audit` ✅ (manifest valid)
