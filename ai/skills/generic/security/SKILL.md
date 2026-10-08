---
name: security
description: Threat-model and implement secure changes involving identity, data, APIs, secrets, or external input.
---
# Security

- Identify protected assets, trust boundaries, actors, and abuse cases before changing a security-sensitive path.
- Verify server-side authorization for every operation, including resource/tenant ownership.
- Validate input, parameterize data access, constrain outbound requests, and encode output.
- Keep secrets out of source, browser bundles, logs, and error responses; use managed secret providers.
- Check CORS, rate limits, TLS, token validation, dependency risk, and safe failure behavior.
- Add regression tests for bypasses and data exposure. Follow `docs/security.md` and report assumptions.
