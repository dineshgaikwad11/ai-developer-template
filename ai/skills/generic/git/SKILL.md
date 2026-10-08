---
name: git
description: Prepare safe, reviewable Git changes and inspect repository history or working-tree state.
---
# Git Workflow

- Inspect status and diff before editing; preserve user changes and generated artifacts that are not part of the task.
- Keep commits (when explicitly requested) focused and use meaningful messages. Never rewrite shared history or discard user work without explicit approval.
- Use history/blame only when it helps explain ownership, intent, or regressions.
- Review staged paths before commit and exclude secrets, local state, build output, and unrelated changes.
- Do not commit or create branches unless the user asks.
