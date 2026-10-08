# AI Skills

Skills live in `.github/skills/<name>/SKILL.md`; the folder name must equal the `name` in the frontmatter, and the `description` must say when to use the skill. Generic skills here: `code-review`, `testing`, `security`, `documentation`, `git`. Add product-domain skills as new sibling folders.

Related guidance: `.github/copilot-instructions.md` (always-on rules), `.github/instructions/` (scoped rules), `.github/agents/` (roles and handoffs), `.github/prompts/` (task entry points), and `docs/`.

## Adding a Skill
Create a focused folder with a `SKILL.md` containing a short name, an explicit description/trigger, constraints, workflow, and completion checks. Keep guidance actionable and scoped; link to the canonical project docs rather than duplicating them. Add examples that use this repository's actual folder structure and commands.

Review skills whenever architecture, scripts, toolchain versions, or security requirements change. Do not put secrets or customer data in skill files.
