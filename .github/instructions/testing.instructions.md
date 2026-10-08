---
name: Testing
description: xUnit, Vitest, Testing Library, and Playwright standards for deterministic tests.
applyTo: "**/*.{cs,ts,tsx,js,jsx}"
---
# Testing Standards

- Backend: xUnit for tests, FluentAssertions for readable assertions, Moq only at meaningful boundaries. Prefer real domain/application behavior over implementation-detail mocks.
- Frontend: Vitest and Testing Library for units/components; Playwright for critical end-to-end journeys. Assert observable behavior, not component internals.
- Separate unit, integration, and end-to-end tests. Integration tests exercise HTTP contracts and persistence behavior with isolated dependencies.
- Test success, validation failures, authorization boundaries, cancellation, not-found/conflict cases, and failure recovery where applicable.
- Keep tests deterministic: freeze time where needed, isolate data, avoid shared mutable state, and do not depend on test ordering or external services.
- Target 80% line coverage for maintained application code. Exclude generated code and report exclusions transparently; never optimize solely for a percentage.
- Run focused tests during development and the full relevant suite before merge. CI must fail on test failures and publish coverage artifacts.
- Name tests by scenario and expected result. Use arrange/act/assert structure without unnecessary comments.
