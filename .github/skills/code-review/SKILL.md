---
name: code-review
description: Review code changes for correctness, security, compatibility, performance, and test gaps. Use when asked to review a diff, pull request, or implementation.
---
# Code Review

1. Read the task, repository guidance, and changed code with relevant callers/tests.
2. Trace concrete behavior and identify only actionable defects or meaningful risks.
3. Prioritize data loss/security, correctness, compatibility, then performance and tests.
4. Report findings first with severity, file reference, triggering case, impact, and remediation.
5. If no findings, state that explicitly and list only material verification gaps. Do not modify code during review unless requested.
