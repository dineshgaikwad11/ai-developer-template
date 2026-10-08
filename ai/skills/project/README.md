# Project AI Skills

Project-specific AI guidance lives in `.github/copilot-instructions.md`, `.github/instructions/`, `.github/agents/`, and `docs/`. Keep this folder for product-domain rules that are not generic engineering standards.

## Adding a Skill
Create a focused folder with a `SKILL.md` containing a short name, an explicit description/trigger, constraints, workflow, and completion checks. Keep guidance actionable and scoped; link to the canonical project docs rather than duplicating them. Add examples that use this repository's actual folder structure and commands.

Review skills whenever architecture, scripts, toolchain versions, or security requirements change. Do not put secrets or customer data in skill files.
