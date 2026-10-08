# Repository Instructions

## Mission
Build secure, maintainable full-stack software with explicit ownership boundaries. Treat this file as the repository-wide contract; more specific `*.instructions.md` files add scoped requirements.

## Architecture
- Backend uses Clean Architecture: Domain has no framework dependencies; Application owns use cases, CQRS requests, validation, and ports; Infrastructure implements persistence and external adapters; API is the composition and transport boundary.
- Keep dependencies pointing inward. Domain and Application must not depend on Infrastructure or API.
- Model business concepts and invariants in the Domain. Prefer explicit value objects and domain methods over anemic data mutation.
- Use CQRS for application use cases. Queries do not mutate state; commands validate input and commit through an explicit unit-of-work/repository abstraction when needed.
- Apply SOLID pragmatically. Avoid abstractions without a concrete second use or testability benefit.
- Frontend uses strict TypeScript, feature-first modules, and public feature entry points. Feature internals must not be imported directly by unrelated features.
- Use React function components and custom hooks. TanStack Query owns server state; Zustand/Redux is reserved for cross-route client state. Do not mirror query data into a global store.

## Implementation Rules
- Preserve established public contracts unless a requested change requires migration. Make API changes additive where feasible and document breaking changes.
- Validate at system boundaries. Use FluentValidation on backend requests and schema-based validation (Zod) for frontend forms.
- Use async APIs end-to-end, propagate `CancellationToken`, and avoid blocking calls.
- Handle errors centrally. Return RFC 7807 Problem Details; never expose stack traces or secrets to clients.
- Use structured logs and correlation/trace identifiers. Never log credentials, tokens, or sensitive personal data.
- Persist UTC timestamps as `DateTimeOffset`. Use EF Core migrations for schema changes; never edit production schema manually.
- Keep configuration outside source code. Commit placeholders only; use local secret stores and deployment secret managers.

## Quality Gates
- Add or update focused tests for behavior changes. Target at least 80% line coverage for maintained application code; coverage is a gate to measure, not a reason to write brittle tests.
- Run backend tests/build and frontend tests/lint/build for affected areas before claiming completion.
- Review authorization, validation, data exposure, resource use, accessibility, and failure paths for each change.
- Keep changes small and explain architectural trade-offs in documentation when they affect future contributors.

## Source of Truth
Follow the scoped instructions in `.github/instructions/`, the agent boundaries in `.github/agents/`, and the architecture decisions in `docs/`. If instructions conflict, follow the narrower applicable instruction and report unresolved contradictions.
