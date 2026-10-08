# GitHub Actions CI Plan

## Scope

Update the existing `.github/workflows/ci.yml` so pull requests targeting `main` or `master` run the repository's current CI checks. This is validation-only; it will not deploy the React application or provision Azure resources.

## Repository Evidence

- Repository: `dineshgaikwad11/ai-developer-template`.
- Frontend: `src/frontend`, React + TypeScript + Vite, Node 22.
- Existing workflow: `.github/workflows/ci.yml` already runs backend and frontend jobs.
- Existing frontend checks: `npm ci`, `npm run lint`, `npm test`, `npm run build`, Playwright install, and `npm run test:e2e`.
- Current triggers: pushes to `main`; pull requests currently target any branch.

## Proposed Workflow Change

- Keep the existing backend and frontend jobs, permissions (`contents: read`), and test/build steps unchanged.
- Restrict `pull_request` target branches to `[main, master]`, so PR creation, updates, and reopen events targeting either branch run CI.
- Keep push CI on `main` as-is. Do not add a deploy job, Azure credentials, secrets, or environment configuration.

## Verification

- Parse/validate the workflow YAML and inspect the resulting `on.pull_request.branches` filter.
- Run the existing frontend lint, unit tests, build, and Playwright tests locally where available.
- Confirm the workflow contains no deployment steps or secret requirements.

## Approval Gate

Wait for approval of this plan before editing `.github/workflows/ci.yml`.
