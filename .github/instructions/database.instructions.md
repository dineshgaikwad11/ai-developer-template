---
name: Database
description: EF Core, migration, indexing, soft-delete, and persistence rules for Infrastructure code.
applyTo: "src/backend/Infrastructure/**/*.cs"
---
# Database and Persistence

- Employee Management currently targets SQL Server. Any additional provider must use a provider-specific Infrastructure adapter and migration set; keep provider details out of Domain and Application.
- Use EF Core migrations as the sole schema evolution path. Review migration operations and generated SQL, especially renames, drops, backfills, and data conversions.
- Name tables, columns, constraints, indexes, and migrations consistently. Configure entities explicitly rather than relying on accidental conventions for important schema.
- Add indexes for demonstrated filters, joins, and ordering; consider composite column order and write amplification. Verify changes with query plans and representative data.
- Use UTC timestamps and an explicit soft-delete field/policy. Prefer `DateTimeOffset` for instants; preserve explicit public contracts such as Employee's `DateTime CreatedAt`. Audit identity only from a trusted server-side principal.
- Apply soft-delete query filters consistently and test that writes, reads, unique constraints, and administrative restore paths behave as intended.
- Use transactions only for invariants crossing multiple writes; use concurrency tokens for conflicting updates. Avoid long-lived contexts and N+1 queries.
- Parameterize all raw SQL. Never concatenate user input into SQL identifiers or predicates.
- Store connection strings in secret providers or environment-specific configuration, never migrations or committed settings.
- Production migration execution is a controlled deployment step with backup, observability, and rollback/forward-fix planning; do not migrate automatically on every API startup.
