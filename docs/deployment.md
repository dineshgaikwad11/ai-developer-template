# Deployment Guide

## Environments
- **Development**: local .NET/Vite processes or Docker Compose; use synthetic data and developer secrets.
- **Staging**: production-like identity, database version, TLS, telemetry, and deployment topology; validate migrations and rollback procedures.
- **Production**: immutable artifacts, managed secrets, workload identity, restricted network ingress, approvals, backup/restore, and on-call ownership.

Do not use a shared connection string or signing key across environments. Configuration is injected at runtime; secrets are never baked into container images.

## Local Containers
`docker compose up --build` starts SQL Server and the API; set `MSSQL_SA_PASSWORD` in the environment first. The frontend container serves on port 8080 and the API on port 5000. Alternatively, run Vite separately with `cd src/frontend && npm install && npm run dev`. Compose health checks gate startup ordering but do not replace API readiness checks. Apply migrations deliberately; the API does not migrate automatically.

## Health and Observability
- `/health/live` indicates that the API process can continue running.
- `/health/ready` must be extended to verify dependencies required to serve traffic. The starter currently maps both to basic health checks only.
- Emit structured logs with trace/correlation identifiers. Add metrics and distributed tracing before production, with PII/secret redaction.

## CI/CD Stages
1. Restore locked dependencies and run format, lint, static analysis, unit/integration tests, and coverage.
2. Scan dependencies, source, and container images. Fail release for unapproved critical/high findings.
3. Build immutable API/frontend artifacts and attach provenance/SBOM where supported.
4. Deploy to staging, apply reviewed migrations as a controlled stage, run smoke tests, and verify dashboards.
5. Promote the same artifact to production after approval. Monitor rollout and execute documented rollback or forward-fix steps.

GitHub Actions should use least-privilege permissions, protected environments, and pinned reviewed actions. Kubernetes manifests are examples; set resource budgets, probes, non-root security contexts, network policies, ingress TLS, secret references, and disruption/rollout settings for the target platform.
