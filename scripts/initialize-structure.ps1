$ErrorActionPreference = 'Stop'
$repositoryRoot = Split-Path -Parent $PSScriptRoot
$directories = @(
    '.github/instructions', '.github/agents', '.github/workflows',
    'ai/skills/generic/code-review', 'ai/skills/generic/testing', 'ai/skills/generic/security',
    'ai/skills/generic/git', 'ai/skills/generic/documentation', 'ai/skills/project', 'ai/prompts', 'docs',
    'src/backend/Core/Domain/Entities', 'src/backend/Core/Domain/ValueObjects',
    'src/backend/Core/Domain/Enums', 'src/backend/Core/Domain/Events',
    'src/backend/Core/Application/Commands', 'src/backend/Core/Application/Queries',
    'src/backend/Core/Application/Common/Behaviors', 'src/backend/Infrastructure/Persistence/Configurations',
    'src/backend/Infrastructure/Persistence/Interceptors', 'src/backend/Infrastructure/Identity',
    'src/backend/API/Controllers/V1', 'src/backend/API/Middleware', 'src/backend/API/Extensions',
    'src/backend/Tests/UnitTests', 'src/backend/Tests/IntegrationTests',
    'src/frontend/src/assets/styles', 'src/frontend/src/components/ui',
    'src/frontend/src/features/health/api', 'src/frontend/src/features/health/components',
    'src/frontend/src/features/health/hooks', 'src/frontend/src/features/health/types',
    'src/frontend/src/hooks', 'src/frontend/src/layouts', 'src/frontend/src/providers',
    'src/frontend/src/routes', 'src/frontend/src/services', 'src/frontend/src/stores',
    'src/frontend/src/types', 'src/frontend/src/utils', 'scripts', 'deploy/docker', 'deploy/kubernetes'
)

foreach ($relativePath in $directories) {
    $path = Join-Path $repositoryRoot $relativePath
    New-Item -ItemType Directory -Path $path -Force | Out-Null
    if ((Get-ChildItem -LiteralPath $path -Force | Measure-Object).Count -eq 0) {
        New-Item -ItemType File -Path (Join-Path $path '.gitkeep') -Force | Out-Null
    }
}

Write-Host "Repository structure initialized at $repositoryRoot"
