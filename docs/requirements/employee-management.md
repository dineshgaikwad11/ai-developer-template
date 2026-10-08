# Employee Management

## Scope

Implement employee creation and active-employee listing using the existing ASP.NET Core Clean Architecture backend and React/TypeScript frontend. The UI uses Bootstrap 5; the existing health route and feature remain available.

## Decisions

- API routes: `POST /api/employees` and `GET /api/employees`.
- Local API base URL: `http://localhost:5000/api`.
- First database provider: SQL Server. PostgreSQL support is out of scope for this first migration because EF Core migrations are provider-specific.
- Employee fields follow the requested contract: `Guid Id`, first/last name, email, phone number, department, decimal salary, `DateTime HireDate`, `DateTime CreatedAt`, and `bool IsDeleted`.
- Employee does not inherit `AuditableEntity`; its timestamp and soft-delete contract is intentionally different. The server assigns `CreatedAt`, and EF filters deleted employees from ordinary reads.
- Employee API endpoints require JWT authorization under the `Employees` policy. Supply the existing provider's authority/issuer and audience through configuration; do not add an anonymous fallback.
- Bootstrap styles the Employee feature. Preserve the current health experience and its route.
- Put only safe development examples in committed configuration. Keep production connection strings and identity secrets in user secrets or the deployment secret store.

## Tasks

- [x] Add this feature checklist at `docs/requirements/employee-management.md`.
- [x] Add the domain entity, create/output DTOs, create command and handler, active-employee query and handler, and FluentValidation rules.
- [x] Add `AppDbContext`, the employee DbSet, explicit EF configuration (bounded lengths, email index, salary precision `18,2`), SQL Server registration, and design-time migration support.
- [x] Add the SQL Server `InitialCreate` migration and verify its schema and generated SQL.
- [x] Add the employee API controller, 201 creation response, validation Problem Details (400), safe unexpected-error response (500), JWT policy, CORS allowlist, and local port/proxy configuration.
- [x] Add Bootstrap 5 and the responsive Navbar, Footer, and MainLayout; implement typed employee contracts, Axios/React Query hooks, validated form, list states, and the `/employees` route.
- [x] Add focused backend unit/integration tests, frontend component tests, and a Playwright create/list workflow.
- [x] Run the backend and frontend quality gates and update this checklist with results.
- [ ] Apply the migration to a local SQL Server instance.
- [ ] Configure the existing JWT provider and browser token acquisition for a live authenticated UI/API session.

## Acceptance Criteria

- Creating a valid employee persists the record and returns `201 Created` with an `EmployeeDto`.
- Invalid required fields, malformed email, non-positive salary, and invalid hire date return `400` Problem Details with field-level validation details.
- Listing returns active employees only and never exposes persistence entities.
- Unexpected failures return safe `500` Problem Details without exception details or sensitive data.
- Unauthorized requests are denied; allowed origins are explicitly configured.
- The responsive Bootstrap UI shows loading, empty, error, validation, and submission states, and the newly created employee appears in the list.
- The existing health experience remains functional.

## Local SQL Server Migration Commands

Run from `src/backend` after configuring the development connection string and installing the EF Core CLI:

```powershell
dotnet ef migrations add InitialCreate --project Infrastructure/Infrastructure.csproj --startup-project API/API.csproj --output-dir Persistence/Migrations
dotnet ef database update --project Infrastructure/Infrastructure.csproj --startup-project API/API.csproj
```

Review the migration and generated SQL before applying it outside a local development database. Do not run migrations automatically during API startup.

## Verification

From the repository root:

```powershell
dotnet test src/backend/Tests/UnitTests/UnitTests.csproj
dotnet test src/backend/Tests/IntegrationTests/IntegrationTests.csproj
dotnet build src/backend/AI-Developer-Template.sln
```

From `src/frontend`:

```powershell
npm test
npm run lint
npm run build
npm run test:e2e
```

Integration and end-to-end tests that exercise employee persistence require SQL Server and a configured JWT test identity.

## Verification Results

- Backend solution tests: 9 passed; solution build passed.
- Frontend unit/component tests: 8 passed; ESLint and production build passed.
- Playwright create/list and health workflows: 2 passed using a mocked Employee API.
- Migration generation and SQL review: passed. Local database update could not connect because SQL Server is not installed/running at `localhost`.
- Docker Compose configuration validation: passed with a temporary local-only environment value.
- Workspace diagnostics reported no Employee domain errors. The workspace does not contain a `.git` directory, so this checklist is present locally but is not currently tracked or pushed to GitHub.

## Implementation Notes

- The health route remains `/api/v1/health`. Employee Management intentionally uses `/api/employees`, local API port `5000`, and SQL Server; the container frontend uses the same-origin `/api` proxy.
- The JWT provider's authority/issuer, API audience, and browser token-acquisition integration were not supplied. Keep those values configurable and record any resulting execution blocker here rather than weakening endpoint authorization.