# Safe Refactoring Prompt

## Goal
- Desired structural improvement: [goal]
- Invariants and public contracts to preserve: [contracts]
- Target modules: [paths]

## Rules
1. Capture current behavior with focused tests or characterization checks before restructuring.
2. Identify dependency direction, consumers, serialization/API contracts, and migration implications.
3. Refactor in small behavior-preserving steps. Avoid combining architecture change with feature change.
4. Keep public APIs stable unless explicitly approved; provide adapters/deprecation paths for necessary changes.
5. Move tests with behavior, not private implementation details. Preserve meaningful coverage and edge cases.
6. Run focused tests after each logical edit, then relevant full test/build/lint gates.
7. Compare before/after behavior and report what changed, what did not, and any residual risk.

## Avoid
- Broad formatting or renaming unrelated to the goal.
- New abstractions that do not reduce real coupling or complexity.
- Weakening assertions or deleting failing tests to force green.
- Changing database/API contracts without a migration and rollout plan.
