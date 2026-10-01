# Codex Prompt — Jeizi Harness v2 Bootstrap

You are bootstrapping a persistent engineering harness for this repository.

The purpose is to make future Codex sessions FAST and deterministic:
AGENTS → LAST HANDOFF → exact files → change → verify → update handoff.

This is a ONE-TIME full audit. After this task, future agents must not repeatedly scan the whole repository.

## Hard constraints

Do not redesign the application.
Do not migrate storage.
Do not convert/delete artwork.
Do not rewrite Git history.
Do not upgrade dependencies.
Do not run `npm audit fix --force`.
Do not make speculative application fixes.

Preserve all existing working deployment/performance changes.

## Step 0 — preserve existing knowledge

Read the current:
- `AGENTS.md`
- `package.json`
- `next.config.ts`
- existing `docs/**` that relate to deployment/harness
- existing `scripts/**` that relate to audit/verification
- `git status --short`
- `git diff --name-only`
- recent local diff for currently changed files

Do not read image binaries or generated build output.

If an existing harness already provides a fact, verify it through its script instead of manually rediscovering it.

## Step 1 — install/consolidate Harness v2

Use the supplied Harness v2 structure:

- `AGENTS.md`
- `docs/harness/AUDIT.md`
- `docs/harness/CHANGELOG.md`
- `docs/harness/HANDOFF.md`
- `scripts/harness-status.mjs`

Preserve the repository's existing Next.js agent warning.

If existing deployment docs contain useful detailed history, keep them. Do not duplicate their entire content into AGENTS or HANDOFF.

Add this package script if missing:

`"harness:status": "node scripts/harness-status.mjs"`

Do not remove existing useful scripts.

## Step 2 — one-time full audit

Perform a deliberate architecture audit, but avoid waste.

Use `git ls-files`, targeted directory listings, package/config reads, and exact symbol searches.
Do not recursively read every source file.

Audit these concerns:

PROJECT
- framework/runtime/package-manager versions
- package scripts
- static/server rendering model
- routes

ARCHITECTURE
- homepage composition
- gallery data source/model/manifest
- gallery rendering/lightbox/filter flow
- image source strategy
- CSS/performance layers
- build/deployment path

DEPLOYMENT
- current `next.config`
- static export state
- `.dockerignore`
- existing deployment verification scripts
- last known deployment issue already documented in repo
- current static artifact/build-context measurements if scripts exist

ASSETS
- gallery item count
- encoded gallery size
- decoded-memory findings from existing scripts
- derivative/storage state

HARNESS
- every existing audit/verify script
- overlapping/redundant scripts
- exact commands that define "green"

Use installed Next.js docs only when a framework-specific question cannot be answered from current config/code. Read only the relevant document/section.

## Step 3 — write `docs/harness/AUDIT.md`

Make this the stable project map, not a session transcript.

It must contain:
- `AUDITED_COMMIT`
- audit timestamp
- project identity
- architecture map
- route map
- data flow
- deployment facts
- asset/performance facts
- critical invariants
- verification matrix
- task → file ownership map
- completed investigations that should not be repeated
- open technical debt

Keep it concise enough to read in a future session without consuming large context.

Target: roughly 150–250 lines maximum.

Do not paste source code or terminal logs.

## Step 4 — seed CHANGELOG from current state

Create one bootstrap entry only.

Summarize:
- Harness v2 bootstrap
- files changed
- commands run
- whether architecture changed

Do not reconstruct the entire historical Git log.

## Step 5 — write the authoritative LAST HANDOFF

`docs/harness/HANDOFF.md` is the most important file.

Keep it under roughly 120 lines.

It must describe CURRENT reality only:

- status
- current active problem
- audited commit
- current HEAD
- exact files changed in this task
- verification results
- known blockers
- verified facts future agents must not re-investigate
- `READ NEXT` with the SMALLEST exact file set for the next task
- one `NEXT ACTION`
- `DO NOT REPEAT`

Use the current repository state, not assumptions from training data.

If the current known deployment state still shows:
- static provider correctly detected,
- successful Next build/static export,
- but remote builder memory failure related to very large context/assets,

record that precisely if supported by existing project docs/logs.

If the current performance audit already established oversized gallery decode memory and added rendering mitigations, record that as completed work rather than redoing it.

## Step 6 — enforce fast-path behavior

Ensure `AGENTS.md` tells future agents:

Normal task:
`AGENTS → HANDOFF → harness:status → READ NEXT files`

Do not perform broad codebase search by default.

Before broad search, consult `AUDIT.md`.

A full audit is allowed only on documented triggers.

At task end:
update CHANGELOG and HANDOFF.

## Step 7 — validate harness

Run:
- `npm run harness:status`
- existing lightweight verification commands that are appropriate and already present

Do not run expensive or unrelated commands just to fill the report.

If application code was not changed, do not pretend a full production rebuild is necessary unless a harness edit affected build scripts/config.

## Final response

Return only:

### Harness result
What was installed/consolidated.

### Audit snapshot
5–10 key facts only.

### Fast path
Show the exact read order a future Codex session will follow.

### Files changed
Compact.

### Verification
Commands + result.

### Next session
State exactly what the next Codex agent should read and do.

The final response itself should be concise because the durable context belongs in the harness files.
