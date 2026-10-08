# 0002: Frontend styling system

## Status
Proposed

## Context
The starter shell and health page use Tailwind CSS. The Employee feature uses Bootstrap 5 as requested. Both load globally, which duplicates styling systems and increases bundle size and cognitive load for a large application.

## Decision
Until resolved: Bootstrap 5 for feature UIs, Tailwind only in the starter health shell, and never both in one component. Choose one system before adding more features, then migrate the other and remove its dependency.

## Consequences
- Resolving this removes either `tailwindcss`/`@tailwindcss/vite` or `bootstrap`, and updates `frontend.instructions.md` and the Frontend Developer agent.
- The two layouts (`layouts/AppLayout.tsx` and `components/layout/MainLayout.tsx`) should be merged at the same time.
