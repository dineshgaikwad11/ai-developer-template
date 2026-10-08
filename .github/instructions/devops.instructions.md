---
name: DevOps
description: Container, CI/CD, Kubernetes, and deployment rules for Docker, Compose, and YAML files.
applyTo: "**/{Dockerfile,docker-compose*.yml,*.bicep,*.tf,*.yaml,*.yml}"
---
# DevOps and Delivery

- Build containers in multi-stage Dockerfiles, use supported pinned base images, run as a non-root user, minimize layers, and keep secrets out of build arguments and image layers.
- CI validates formatting, restores locked dependencies, builds, tests, scans dependencies/images, and publishes coverage and test results. Protect release environments with approvals and least privilege.
- Use GitHub Actions permissions at the minimum required scope and pin third-party actions to reviewed immutable commit SHAs in production workflows.
- Deploy immutable artifacts through development, staging, and production with environment-specific configuration supplied at runtime.
- Kubernetes manifests must define resource requests/limits, non-root security contexts, probes, rolling-update behavior, disruption strategy, and external secret/config references. Avoid embedding credentials.
- Apply database migrations as a deliberate, observable release stage. Use backward-compatible expand/migrate/contract changes for rolling deployments.
- Emit health, logs, and metrics with correlation IDs. Readiness should represent required dependencies; liveness should only represent process viability.
- Document rollback, incident ownership, backup/restore, and disaster-recovery expectations before production.
