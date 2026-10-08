# 0001: SQL Server provider and Employee contract exceptions

## Status
Accepted

## Context
The starter defaulted to PostgreSQL and `DateTimeOffset` audit fields with `AuditableEntity`. The Employee feature was specified with SQL Server, the `/api/employees` route, and `DateTime CreatedAt` plus `bool IsDeleted`.

## Decision
- Infrastructure targets SQL Server (`Microsoft.EntityFrameworkCore.SqlServer`); the migration set under `Infrastructure/Persistence/Migrations` is SQL Server only.
- Employee does not inherit `AuditableEntity`; it keeps `DateTime` UTC timestamps and an `IsDeleted` flag with an EF global query filter.
- Employee routes are `/api/employees`; the health route stays `/api/v1/health`.

## Consequences
- Adding another provider requires a separate Infrastructure adapter and migration set.
- New entities should prefer `DateTimeOffset` and `AuditableEntity` unless a contract requires otherwise.
- API versioning is inconsistent between health and Employee; introduce versioning before the first breaking change.
