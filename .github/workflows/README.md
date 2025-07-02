# GitHub Actions Workflows

This directory contains the CI/CD workflows for the Sport Scribe project.

## Active Workflows

- **`ci.yml`** - Main CI pipeline (tests, linting, type checking, security scans)
- **`security-audit.yml`** - Security vulnerability scanning and dependency checks
- **`quality-checks.yml`** - Code quality and standards enforcement

## Disabled Workflows

The following workflows are temporarily disabled (`.disabled` extension) because
they require production deployment credentials that are not yet configured:

- **`deploy-web.yml.disabled`** - Web platform deployment to Vercel
  - Requires: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
  - Requires: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
    `SUPABASE_SERVICE_ROLE_KEY`

- **`deploy-ai.yml.disabled`** - AI backend deployment to Render
  - Requires: `RENDER_REGISTRY_USERNAME`, `RENDER_REGISTRY_PASSWORD`
  - Requires: `RENDER_SERVICE_NAME`, `RENDER_DEPLOY_HOOK_URL`

## Enabling Deployment Workflows

To enable deployment workflows:

1. Set up the required secrets in GitHub repository settings
2. Configure your deployment platforms (Vercel, Render, etc.)
3. Rename the `.disabled` files back to `.yml`
4. Test the workflows on a feature branch first

## Development Focus

Currently, the project focuses on:

- ✅ Code quality and testing
- ✅ Security scanning and vulnerability detection
- ✅ Automated formatting and linting
- 🚧 Production deployment (coming soon)

This approach ensures a solid foundation before deploying to production
environments.
