---
name: testing
description: Design, add, run, or troubleshoot focused deterministic tests for this .NET and React repository.
---
# Testing

- Locate the behavior owner and nearest existing tests before choosing a test layer.
- Use xUnit for backend; use Vitest and Testing Library for frontend; use Playwright for critical browser workflows.
- Assert observable contracts. Cover important failure, validation, authorization, and boundary cases.
- Isolate data/time/external I/O. Avoid flaky sleeps and order-dependent state.
- Run the narrow test first after changes, then broader relevant quality gates. Report exact commands and failures.
