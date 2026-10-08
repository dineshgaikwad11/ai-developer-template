---
name: Frontend
description: React, TypeScript, state, forms, styling, and accessibility rules for the frontend app.
applyTo: "src/frontend/**/*.{ts,tsx,js,jsx,css}"
---
# React Frontend

- Use functional components, named exports, strict TypeScript, and feature-first modules. Export supported feature APIs through each feature's `index.ts`.
- Use TanStack Query for server state, cache invalidation, retries, and request lifecycle. Keep local ephemeral UI state in component state; use Zustand/Redux only for genuinely shared client state.
- Keep transport code in feature `api/` modules and use the shared Axios client for timeouts, base URL, and common headers. Type every request and response.
- Put reusable behavior in custom hooks and reusable primitives in `components/`. Avoid feature-specific logic in global components.
- Use React Hook Form with Zod for forms. Show field-level errors and preserve accessible labels and keyboard navigation.
- Use Bootstrap 5 classes for feature UIs (see `docs/adr/0002-frontend-styling-system.md`). Tailwind remains only in the starter health shell; never mix both in one component. Avoid arbitrary one-off values where a standard class exists.
- Handle loading, empty, success, and error states for every asynchronous view. Prevent stale async work and do not display raw server exceptions.
- Keep routes lazy-loadable as the application grows. Protect routes on the server as well as the client; frontend route guards are usability, not authorization.
- Use semantic HTML, visible focus indicators, accessible names, and WCAG AA contrast. Test meaningful user workflows with Testing Library and Playwright.
- Never put secrets in `VITE_*` variables: Vite embeds these values in public client bundles.
