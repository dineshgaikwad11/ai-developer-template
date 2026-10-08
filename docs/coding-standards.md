# Coding Standards

## C#
- Use PascalCase for types and public members; use camelCase for parameters and locals; prefix private instance fields with `_` only when that improves clarity.
- Use one public type per file when practical. File names match the primary type, for example `CreateOrderCommandHandler.cs`.
- Prefer explicit nullable annotations, immutable request/response records, constructor injection, and async APIs with cancellation propagation.
- Keep controllers transport-focused. Put business invariants in Domain and orchestration in Application.
- Use braces for control flow, `var` when the right-hand side makes the type obvious, and meaningful names. Avoid magic values.
- Run `dotnet format src/backend/AI-Developer-Template.sln` before merge when formatting changes.

## TypeScript and React
- Use strict TypeScript; do not use `any` to bypass compiler errors. Use `unknown` at untrusted boundaries and narrow it.
- Use PascalCase for React components/types, camelCase for values/functions, and `useX` for hooks. Use `.tsx` for JSX and `.ts` otherwise.
- Prefer named exports and feature public entry points. Avoid cross-feature imports into another module's internals.
- Keep components focused; move reusable effects/behavior into custom hooks. Use query keys consistently and invalidate only affected data.
- Use semantic HTML, accessible labels, stable list keys, and visible keyboard focus.

## Tooling and Review
- Frontend checks: `npm run lint`, `npm test`, `npm run build`.
- Backend checks: `dotnet build` and `dotnet test` for affected projects.
- Keep formatting and lint rules automated in CI. Do not suppress diagnostics without a narrow, documented reason.
- Tests should describe externally observable behavior and meaningful edge cases.
