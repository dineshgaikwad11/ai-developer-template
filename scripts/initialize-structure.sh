#!/usr/bin/env bash
set -euo pipefail

repository_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
directories=(
  ".github/instructions" ".github/agents" ".github/prompts" ".github/workflows"
  ".github/skills/code-review" ".github/skills/testing" ".github/skills/security"
  ".github/skills/git" ".github/skills/documentation" "docs/requirements" "docs/adr"
  "src/backend/Core/Domain/Entities" "src/backend/Core/Domain/ValueObjects"
  "src/backend/Core/Domain/Enums" "src/backend/Core/Domain/Events"
  "src/backend/Core/Application/Features"
  "src/backend/Core/Application/Common/Behaviors" "src/backend/Infrastructure/Persistence/Configurations"
  "src/backend/Infrastructure/Persistence/Interceptors" "src/backend/Infrastructure/Identity"
  "src/backend/API/Controllers/V1" "src/backend/API/Middleware" "src/backend/API/Extensions"
  "src/backend/Tests/UnitTests" "src/backend/Tests/IntegrationTests"
  "src/frontend/src/assets/styles" "src/frontend/src/components/ui"
  "src/frontend/src/features/health/api" "src/frontend/src/features/health/components"
  "src/frontend/src/features/health/hooks" "src/frontend/src/features/health/types"
  "src/frontend/src/hooks" "src/frontend/src/layouts" "src/frontend/src/providers"
  "src/frontend/src/routes" "src/frontend/src/services" "src/frontend/src/stores"
  "src/frontend/src/types" "src/frontend/src/utils" "scripts" "deploy/docker" "deploy/kubernetes"
)

for relative_path in "${directories[@]}"; do
  directory="$repository_root/$relative_path"
  mkdir -p "$directory"
  if [[ -z "$(find "$directory" -mindepth 1 -maxdepth 1 -print -quit)" ]]; then
    touch "$directory/.gitkeep"
  fi
done

printf 'Repository structure initialized at %s\n' "$repository_root"
