# Code Review Prompt

Review the proposed change against the task requirements and repository guidance. Do not edit files.

## Review Order
1. Correctness and data integrity defects.
2. Authentication/authorization bypass, injection, secrets/PII exposure, and unsafe configuration.
3. API/data compatibility and migration/deployment risks.
4. Performance, availability, concurrency, and resource-lifecycle issues.
5. Missing regression/security tests and broken CI assumptions.

## Evidence Rules
- Findings first, sorted by severity. Each finding must include a file reference, the triggering condition, concrete impact, and a practical remediation.
- Distinguish confirmed defects from assumptions. Do not report purely stylistic opinions as bugs.
- If no findings remain, explicitly state that and mention unverified paths, test gaps, or residual risks.
- Keep summaries secondary to actionable findings.
