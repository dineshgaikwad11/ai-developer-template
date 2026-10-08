---
applyTo: "src/**/*.{cs,ts,tsx,js,jsx,json,yml,yaml}"
---
# Security Requirements

- Require TLS in deployed environments. Use OAuth 2.0 / OpenID Connect with a trusted identity provider; validate JWT signature, issuer, audience, lifetime, and signing-key rotation.
- Authorize every protected operation with explicit RBAC policies and resource/tenant-level checks where needed. Deny by default.
- Configure CORS with exact trusted origins. Do not combine wildcard origins with credentials.
- Apply endpoint-appropriate rate limits, request-size limits, timeouts, and abuse controls. Return safe, consistent errors.
- Validate and normalize input at boundaries; use parameterized queries and output encoding. Avoid unsafe HTML rendering and open redirects.
- Protect against OWASP Top 10 risks, including broken access control, injection, security misconfiguration, vulnerable dependencies, and SSRF.
- Store secrets in a managed secret store or developer secret provider. Rotate credentials; least-privilege identities; do not commit `.env` files, certificates, keys, or tokens.
- Use secure cookies when cookie-based auth is selected (Secure, HttpOnly, appropriate SameSite, CSRF protection). Do not persist bearer tokens in localStorage by default.
- Redact credentials and personal data from logs, telemetry, errors, and test snapshots. Apply retention and access controls to diagnostic data.
- Pin and scan dependencies, run static analysis, and address critical/high findings before release with documented exceptions.
- Add security tests for authorization, tenancy isolation, mass assignment, and sensitive data exposure.
