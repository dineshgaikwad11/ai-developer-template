# Security Guide

## Identity and Token Lifecycle
Integrate a trusted OAuth 2.0 / OpenID Connect provider. The API must validate JWT signature, issuer, audience, expiry, and signing keys; cache discovery metadata safely and support key rotation. Access tokens should be short-lived. Use refresh-token rotation and revocation at the identity provider where applicable. Do not issue or validate custom tokens without a reviewed threat model.

Use authorization policies for roles and claims, plus resource/tenant ownership checks for each operation. A valid token alone does not authorize access to every record. Default to deny and test cross-tenant access explicitly.

For browser clients, prefer an established OIDC SDK and authorization-code flow with PKCE. Avoid storing bearer tokens in localStorage. If using cookies, set Secure, HttpOnly, and SameSite attributes and add CSRF defenses.

## Secrets and Configuration
- Use .NET user secrets for local backend secrets and a managed secret store/workload identity in hosted environments.
- `VITE_*` variables are public and bundled into frontend assets; only non-sensitive configuration belongs there.
- Rotate credentials, use least privilege, separate environments, and redact sensitive fields from logs/traces.
- Keep `.env`, key files, certificates, and production settings out of source control.

## API Protections
Use exact CORS origin allowlists, HTTPS, input validation, request-size/time limits, endpoint rate limits, safe Problem Details, and parameterized data access. Apply output encoding and avoid unsafe HTML. Validate outbound URL destinations to mitigate SSRF.

Run dependency and container scanning in CI, keep frameworks patched, and review security advisories. Threat-model changes involving identity, tenancy, uploads, payments, cryptography, or sensitive data. Follow OWASP Top 10 and applicable privacy/retention obligations.

## Incident Readiness
Centralize audit events without secrets, correlate by trace ID, restrict telemetry access, define retention, and maintain credential revocation and incident response procedures. Document backup restore and breach escalation before production launch.
