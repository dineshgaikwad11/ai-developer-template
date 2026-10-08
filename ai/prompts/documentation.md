# Documentation and API Contract Prompt

Update documentation for the change without inventing behavior.

## OpenAPI
- Describe stable routes, HTTP methods, request/response DTOs, status codes, validation failures, authorization requirements, and pagination where applicable.
- Use XML comments/attributes only for durable API meaning. Keep examples valid and free of secrets or real personal data.
- Ensure generated OpenAPI reflects runtime behavior and versioning. Do not hand-edit generated artifacts as the source of truth.

## TypeScript Documentation
- Add TSDoc/JSDoc to exported APIs only when types and naming do not adequately explain contract, constraints, side effects, or examples.
- Document feature entry points, shared hooks, and non-obvious query/cache behavior. Avoid comments that merely restate code.

## Workflow
1. Inspect the implementation and tests as the source of truth.
2. Update relevant architecture, database, security, deployment, README, or feature docs.
3. Verify links, commands, examples, OpenAPI metadata, and terminology.
4. Call out any undocumented decision or unresolved behavior rather than guessing.
