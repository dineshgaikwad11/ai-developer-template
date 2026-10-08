# Requirements

One file per feature, named after the feature (for example `employee-management.md`). Prompts and agents start from these files, so keep them current with the code in the same change.

## Template

```markdown
# <Feature name>

## Scope
Outcome, actors, and what is explicitly out of scope.

## Decisions
Choices that constrain implementation; link ADRs in `docs/adr/`.

## Tasks
- [ ] Checklist items, updated as work completes.

## Acceptance Criteria
Observable behavior, including authorization, validation, empty/error states, and status codes.

## Verification
Commands to run and recorded results.
```

Existing requirements: [Employee Management](employee-management.md).
