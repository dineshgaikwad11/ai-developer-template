---
description: Reproduce, root-cause, and fix a bug with a regression test.
agent: agent
argument-hint: Observed vs expected behavior, reproduction steps, environment, impact
---
# Bug Investigation and Fix Prompt

## Incident
Use the user's message for: observed behavior, expected behavior, reproduction/environment, and impact/urgency. Ask only for what is missing. Apply the `testing` skill for the regression test and the `security` skill if the path is security-sensitive.

## Workflow
1. Reproduce the failure with the cheapest reliable check. Record the failing test, request, log, or diagnostic.
2. Trace the controlling code path one boundary at a time. Identify a falsifiable root-cause hypothesis.
3. Check recent changes and configuration only where they intersect the failing path.
4. Add or update a regression test that fails before the fix.
5. Fix the root cause with the smallest cohesive change. Avoid unrelated cleanup and preserve user data.
6. Rerun the regression test, then the narrow suite/build. Expand verification for shared or security-sensitive behavior.
7. Summarize root cause, fix, verification, and any mitigation or residual risk.

## Guardrails
- Do not mask symptoms with retries, broad exception catches, or silent fallback unless resilience requirements justify it.
- Do not remove existing changes or data to get a green test.
- Keep logs free of tokens, credentials, and sensitive payloads.
- If the evidence disproves the first hypothesis, follow the nearest controlling abstraction instead of broad speculative edits.
