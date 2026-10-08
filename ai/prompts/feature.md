# Full-Stack Feature Prompt

## Request
Describe the user outcome, actors, acceptance criteria, and constraints:

> [Feature description]

## Workflow
1. Inspect existing domain, API, frontend modules, architecture docs, and tests. Identify the narrowest owning boundary.
2. Clarify assumptions and write acceptance criteria, including authorization, validation, empty/error, and concurrency behavior.
3. Model domain invariants and value objects/entities where business rules require them.
4. Add an EF Core mapping and reviewed migration only when persistence changes are required. Include indexes/constraints and audit/retention behavior.
5. Implement the Application command/query, handler, validator, DTO, and port/adapters required by the use case.
6. Expose a versioned API contract with authorization, Problem Details behavior, and OpenAPI metadata.
7. Add a feature module with typed API hooks, custom hooks/components/types, and a public `index.ts`; use React Query for server state and accessible form validation.
8. Add unit, integration, and UI tests at the affected boundaries. Include authorization and failure scenarios.
9. Run focused tests, full relevant quality gates, and review security/performance implications. Update docs and report files, verification, assumptions, and follow-up risks.

## Constraints
- Follow `.github/copilot-instructions.md` and scoped instructions.
- Keep layers and features isolated; do not return EF entities to the browser.
- Do not invent identity, tenancy, retention, or cloud-provider behavior. Call out missing requirements.
- Preserve backward compatibility unless a breaking change is approved and versioned.

## Deliverable
Summarize the user-visible behavior, architectural changes, migration/deployment steps, test evidence, and unresolved decisions.
