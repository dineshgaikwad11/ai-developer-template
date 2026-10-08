---
name: Backend
description: ASP.NET Core Clean Architecture, CQRS, validation, API, and error-handling rules for backend C# code.
applyTo: "src/backend/**/*.cs"
---
# ASP.NET Core Backend

- Keep Domain framework-free; Application owns CQRS messages, handlers, validators, and interfaces; Infrastructure owns EF Core/adapters; API owns HTTP concerns and composition.
- Use MediatR request/handler pairs for application use cases. Keep controllers thin: bind, authorize, dispatch, translate to HTTP.
- Put FluentValidation validators beside their request or feature. Register validation as a MediatR pipeline behavior; do not rely on controller-only validation.
- Use DTOs at transport boundaries. Never return EF entities or persistence navigation graphs from controllers.
- Use EF Core async methods with `CancellationToken`. Add migrations for schema changes and review generated SQL for destructive operations.
- Use explicit entity configuration, bounded transactions, and indexes aligned to observed query patterns. Avoid generic repositories that only wrap `DbSet` without adding domain value.
- Keep soft-delete filters and audit behavior explicit and tested; ensure privileged restore/reporting paths deliberately bypass filters.
- Use `DateTimeOffset` in UTC for instants. Use optimistic concurrency for records with competing writers.
- Configure global exception handling to RFC 7807 Problem Details. Map known domain/application exceptions intentionally; do not leak exception details outside development.
- Use Serilog structured properties, request logging, and trace IDs. Redact secrets and sensitive fields.
- Apply authentication, authorization policies, CORS allowlists, and rate limits at the API boundary. Never trust client-supplied identity/tenant claims without validation.
- Keep options strongly typed and validate them on startup. Do not check secrets into appsettings or source control.
- Preserve backward compatibility for public API changes and update OpenAPI metadata and integration tests.
