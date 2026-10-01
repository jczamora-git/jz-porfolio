# Jeizi Portfolio — Agent Protocol

This file is the router, not the project history. Keep it short.

## Mandatory startup

Before inspecting application code:

1. Read `docs/harness/HANDOFF.md`.
2. Run `npm run harness:status`.
3. If the handoff is fresh, read only the files named under `READ NEXT`.
4. Use `docs/harness/AUDIT.md` for architecture/file ownership before searching the repository.
5. Do not run a broad repository search unless the handoff/audit cannot answer the question.

Default mode is **FAST PATH**. Full audit is exceptional.

## FAST PATH

Use this for normal bug fixes, UI work, refactors, and follow-up tasks.

Allowed discovery order:

`AGENTS.md`
→ `docs/harness/HANDOFF.md`
→ (for gallery/Drive/storage tasks: `docs/harness/DRIVE_GALLERY.md`)
→ `npm run harness:status`
→ exact files in `HANDOFF.md > READ NEXT`
→ exact symbol search only if required
→ `docs/harness/AUDIT.md` only for missing architecture context

Do not:
- recursively read the repository
- re-audit already documented modules
- inspect `node_modules`, `.next`, `out`, or image binaries without a task-specific reason
- run broad `grep -R` / unrestricted searches when an exact symbol/path is known
- reopen unchanged files repeatedly
- repeat measurements already marked VERIFIED in the handoff unless the relevant inputs changed

Prefer:
- `git diff --name-only`
- `git diff --stat`
- exact `rg -n "SymbolName" path/`
- existing harness scripts
- narrow file reads

## FULL AUDIT trigger

Run a full audit only when at least one is true:

`docs/harness/HANDOFF.md` or `AUDIT.md` is missing;
the handoff explicitly says `FULL_AUDIT_REQUIRED`;
package/dependency, routing, deployment, storage, or build architecture changed outside the recorded handoff;
the current task crosses an undocumented subsystem;
the user explicitly requests a full audit;
the documented state is contradicted by the repository.

A new commit alone does not require a full audit.

When the audited commit differs from HEAD, first inspect the delta:

`git diff --name-only <AUDITED_COMMIT>..HEAD`

If the delta is already explained by CHANGELOG/HANDOFF and does not change architecture, continue FAST PATH.

## Source of truth

`docs/harness/AUDIT.md`
Stable architecture map and verified project facts. Rewrite only after a real audit or architectural change.

`docs/harness/CHANGELOG.md`
Append-only engineering journal. Add one compact entry per completed task.

`docs/harness/HANDOFF.md`
The latest working state. Replace/update at the end of every coding task. This is the primary resume file for the next agent.

`docs/harness/DRIVE_GALLERY.md`
Durable source of truth for Google Drive folder IDs, category mapping, and the 79-work collection contract. Read before any gallery/storage task.

If these disagree with code, code wins; update the harness before ending the task.

## Mandatory end-of-task handoff

Every coding task ends by updating `docs/harness/HANDOFF.md`.

Keep it concise. It must contain:
- current goal/status
- audited commit and current HEAD
- exact files changed
- commands run and pass/fail
- known blockers
- verified facts that should not be re-investigated
- `READ NEXT`: the smallest exact file set for the next task
- `NEXT ACTION`: one concrete next step
- `DO NOT REPEAT`: completed investigations the next agent should skip

Then append one compact entry to `docs/harness/CHANGELOG.md`.

Do not paste long terminal logs into either file. Summarize results and point to relevant files/scripts.

## Verification

Use existing project scripts first. Do not invent new tooling when a harness command already covers the check.

For deployment-related changes, preserve and run the repository's existing verification commands where applicable, including lint/typecheck, production build, static-output verification, deployment audit, gallery audit, or memory audit.

Do not run `npm audit fix --force`.

## Next.js rule

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing framework-specific code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

Only read the specific installed Next.js documentation relevant to the current task. Do not browse the whole docs tree.
