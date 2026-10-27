---
name: buenas-noches-actualizar-guia
description: 'Use when the user says "buenas noches" in the Sanitarios La Pampa project, or asks to close the session by updating the project guide with the latest changes.'
user-invocable: true
disable-model-invocation: false
---

# Buenas noches: actualizar guía

Use this workflow in the Sanitarios La Pampa repository when the user says "buenas noches" as a request to wrap up. Update the internal project guide with the latest verified work so the next session can resume easily.

## Procedure

1. Find the repository root with `git rev-parse --show-toplevel`. Confirm it is the Sanitarios La Pampa project before changing files.
2. Review `git status --short`, the latest commits, and staged and unstaged diffs. Inspect the files needed to distinguish completed changes from work in progress. Do not overwrite or stage unrelated user changes.
3. Keep documentation in `guias-internas/`. The `public/` directory is deployed by Cloudflare; never put internal guides or the guide viewer there.
4. Use the current local date to select `guias-internas/avance-YYYY-MM-DD.md`. Update that day's file if it already exists; otherwise create a concise entry based on the latest guide.
5. Write in Spanish. Record the actual changes, relevant files, tests or visual checks and their results, and Git/Cloudflare status. Clearly distinguish verified, pending, and not-run work. Never claim a push or deployment happened unless it was confirmed.
6. If the guide viewer needs to be mentioned, it is local-only. From the repository root it can be served with `python -m http.server 8003` and opened at `http://localhost:8003/guias-internas/`.
7. Do not create a commit unless the user explicitly asks for one. If requested, commit only the guide file you changed, using a concise Spanish message; never include unrelated files or existing user changes.
8. Never push or deploy as part of this workflow. Each push or deployment requires a new, explicit user request.
9. Confirm the guide is outside `public/`, validate the edited Markdown and any commit, then give the user a brief Spanish summary of what was recorded and what remains pending.

## Boundaries

- Do not make unrelated source-code or design changes while closing the session.
- Do not delete older guides; preserve the history.
- If there are no new changes to record, add a short dated status only when it helps document a meaningful verification or remaining task. Avoid creating duplicate or empty entries.
- If the repository root or the correct private guide location cannot be confirmed, stop before editing and explain the blocker.
