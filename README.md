# AI Developer Template

A production-minded starter for a Clean Architecture ASP.NET Core API and a feature-first React + TypeScript application. The template includes a working health-check vertical slice, engineering instructions, reusable AI prompts, CI, local containers, and setup scripts.

## Stack
- Backend: .NET 8+, ASP.NET Core Web API, MediatR CQRS, FluentValidation, EF Core, SQL Server, Serilog, Problem Details.
- Frontend: React 18, TypeScript strict mode, Vite, Tailwind CSS, Bootstrap 5, TanStack Query, React Router, Axios, Zustand.
- Quality: xUnit, FluentAssertions, Moq, Vitest, Testing Library, Playwright.

## Prerequisites
- .NET SDK 8 or later.
- Node.js 20.19+ and npm.
- SQL Server for Employee Management persistence, locally installed or through Docker Compose.
- Docker Desktop / Docker Engine for the optional container workflow.

## Run Locally
1. Start SQL Server and apply the Employee migration, then start the API from the repository root: `dotnet run --project src/backend/API/API.csproj`.
2. In another terminal, install frontend packages and start Vite: `cd src/frontend`, `npm install`, then `npm run dev`.
3. Open the Vite URL printed in the terminal. The Employee API is available at `http://localhost:5000/api`.
4. API docs are available at `/swagger` in Development. Liveness/readiness routes are `/health/live` and `/health/ready`.

Employee endpoints require a migrated SQL Server database and a configured JWT authority/audience. The health vertical slice remains independent of the database. Add required dependency checks before treating readiness as a production dependency signal.

## Build and Test
- `dotnet build src/backend/API/API.csproj`
- `dotnet test src/backend/Tests/UnitTests/UnitTests.csproj`
- `dotnet test src/backend/Tests/IntegrationTests/IntegrationTests.csproj`
- `cd src/frontend && npm ci && npm run lint && npm test && npm run build`

## Configuration
Copy `src/backend/API/appsettings.Development.example.json` to a local development settings file or use .NET user secrets. Configure `Authentication:Authority` and `Authentication:Audience` for the existing JWT provider and connect a browser token provider with `setAccessTokenProvider`. Use `src/frontend/.env.example` as a reference. Never commit credentials. `VITE_*` values are public build-time configuration and must not contain secrets.

## Repository Map
- `.github/`: Copilot instructions, scoped engineering guidance, role agents, and CI workflow.
- `ai/prompts/` and `ai/skills/`: repeatable task prompts and domain guidance for AI-assisted changes.
- `docs/`: architecture, standards, data, security, and deployment decisions.
- `src/backend/`: Domain, Application, Infrastructure, API, and tests.
- `src/frontend/`: shared application shell and feature modules.
- `deploy/`: Docker and Kubernetes examples; review and tailor before production use.
- `scripts/`: cross-platform directory/bootstrap helpers.

## Start a Feature
Use `ai/prompts/feature.md` to scope an end-to-end vertical slice. Keep domain rules in Domain, coordinate use cases in Application, add persistence details in Infrastructure, expose versioned API contracts, then consume them from a frontend feature. Add tests at each affected boundary and update docs when contracts change.

## Production Readiness
This repository is a secure-by-default starting point, not a turnkey deployment. Configure a real OIDC provider, authorization policies, TLS ingress, secret management, database backups, dependency scanning, observability, and environment approvals before production. Review the deployment and security guides before release.
