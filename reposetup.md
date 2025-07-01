# Sport Scribe - Initial Repository Setup

## Architecture: Supabase + Next.js + Hero UI + OpenAI Agents

**Tech Stack:**
- ✅ **Backend**: Supabase (PostgreSQL, Auth, Real-time, Storage)
- ✅ **Frontend**: Next.js 14 + TypeScript + Hero UI + Tailwind CSS
- ✅ **AI System**: OpenAI Agent SDK (Python) + Chainlit (LLM chat/demo UI)
- ✅ **Integration**: Real-time webhooks from AI agents to Supabase

## Directory Structure Overview

```
sport-scribe/
├── ai-backend/                 # Python AI agent system
├── web/                        # Next.js web platform
├── shared/                     # Shared schemas and types
├── docs/                       # Project documentation
├── scripts/                    # Build and deployment scripts
├── .github/                    # GitHub workflows & templates
├── docker-compose.yml          # Production container orchestration
├── docker-compose.dev.yml      # Development container setup
├── .env.example               # Environment variable template
├── .gitignore                 # Git ignore patterns
├── .pre-commit-config.yaml    # Code quality automation
├── LICENSE                    # Project license
├── CODE_OF_CONDUCT.md         # Community guidelines
├── CONTRIBUTING.md            # Contribution guidelines
└── README.md                  # Project overview
```

**Note**: This overview shows key files and directories. See individual setup steps for complete file structures within each subdirectory.

## Cursor Agent Setup Prompts

### Step 1: Create Root Directory Structure

**Prompt for Cursor:**
```
Create the initial directory structure for the Sport Scribe project with the following layout:

sport-scribe/
├── ai-backend/
├── web/
├── shared/
├── docs/
├── scripts/
└── .github/workflows/

Create all directories and add a .gitkeep file in each empty directory to ensure they're tracked by git.
```

### Step 2: Create AI Backend Structure

**Prompt for Cursor:**
```
In the ai-backend/ directory, create the following Python project structure with placeholder files:

ai-backend/
├── agents/
│   ├── __init__.py
│   ├── data_collector.py
│   ├── researcher.py
│   ├── writer.py
│   └── editor.py
├── tools/
│   ├── __init__.py
│   ├── sports_apis.py
│   ├── web_search.py
│   └── data_validation.py
├── config/
│   ├── __init__.py
│   ├── settings.py
│   └── agent_config.py
├── utils/
│   ├── __init__.py
│   ├── helpers.py
│   └── logging.py
├── tests/
│   ├── __init__.py
│   ├── test_agents.py
│   └── test_tools.py
├── requirements.txt
├── requirements-dev.txt
├── .env.example
├── Dockerfile
├── main.py
├── setup.py
├── ruff.toml
├── mypy.ini
├── .pre-commit-config.yaml
└── README.md

Add appropriate placeholder comments in each Python file indicating its purpose.

**Critical**: requirements.txt must include:
```
openai-agents>=0.1.0
pydantic>=2.0.0
python-dotenv>=1.0.0
requests>=2.28.0
supabase>=2.0.0
fastapi>=0.100.0
chainlit>=0.4.0
uvicorn[standard]>=0.23.0
structlog>=23.0.0
```

**requirements-dev.txt must include:**
```
pytest>=7.0
pytest-asyncio>=0.21
pytest-cov
pytest-mock
mypy>=1.5.0
ruff>=0.1.0
black>=23.0.0
isort>=5.12.0
pre-commit>=3.4.0
```
```

### Step 3: Create Web Platform Structure

**Prompt for Cursor:**
```
In the web/ directory, create the following Next.js 14 project structure with placeholder files:

web/
├── app/
│   ├── articles/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   ├── sports/
│   │   ├── page.tsx
│   │   └── [sport]/
│   │       └── page.tsx
│   ├── admin/
│   │   ├── page.tsx
│   │   ├── articles/
│   │   │   └── page.tsx
│   │   └── analytics/
│   │       └── page.tsx
│   ├── api/
│   │   ├── articles/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   ├── webhooks/
│   │   │   └── article-generated/
│   │   │       └── route.ts
│   │   └── analytics/
│   │       └── route.ts
│   ├── providers.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   ├── not-found.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   │   ├── hero-button.tsx
│   │   ├── hero-card.tsx
│   │   ├── hero-input.tsx
│   │   └── hero-navbar.tsx
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── navigation.tsx
│   ├── articles/
│   │   ├── article-card.tsx
│   │   ├── article-grid.tsx
│   │   ├── article-content.tsx
│   │   └── related-articles.tsx
│   └── admin/
│       ├── dashboard.tsx
│       ├── article-manager.tsx
│       └── analytics-panel.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── database.types.ts
│   ├── ai-integration/
│   │   ├── webhook-handler.ts
│   │   └── article-processor.ts
│   └── utils/
│       ├── helpers.ts
│       ├── validations.ts
│       └── formatting.ts
├── hooks/
│   ├── use-articles.ts
│   ├── use-supabase.ts
│   └── use-analytics.ts
├── contexts/
│   ├── auth-context.tsx
│   └── theme-context.tsx
├── public/
│   ├── images/
│   │   └── .gitkeep
│   ├── icons/
│   │   └── .gitkeep
│   └── favicon.ico
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── .npmrc
├── .env.local.example
├── .eslintrc.json
├── .prettierrc
├── .prettierignore
├── Dockerfile
└── README.md

Add appropriate TypeScript interfaces and placeholder components with basic structure.

**Package.json dependencies for Supabase setup:**
```json
{
  "dependencies": {
    "@supabase/auth-helpers-nextjs": "^0.8.7",
    "@supabase/supabase-js": "^2.39.0",
    "@heroui/react": "^2.0.0",
    "framer-motion": "^11.9.0",
    "next": "14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "typescript": "^5.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "14.0.0",
    "eslint-config-prettier": "^9.0.0",
    "prettier": "^3.0.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "husky": "^8.0.0",
    "lint-staged": "^15.0.0",
    "@commitlint/config-conventional": "^18.0.0",
    "@commitlint/cli": "^18.0.0"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:setup": "supabase db reset && npm run db:seed",
    "generate:types": "supabase gen types typescript --project-id $NEXT_PUBLIC_SUPABASE_PROJECT_ID > lib/supabase/database.types.ts",
    "db:seed": "python3 ../scripts/seed-data.py"
  }
}
```

**Note**: Advanced migration scripts (rollbacks, multi-environment deployments, CI database hooks) are planned for later sprints once core functionality is established.
```

### Step 4: Create Shared Directory Structure

**Prompt for Cursor:**
```
In the shared/ directory, create the following structure for shared types and schemas:

shared/
├── types/
│   ├── article.ts
│   ├── game.ts
│   ├── player.ts
│   ├── team.ts
│   ├── agent.ts
│   └── api.ts
├── schemas/
│   ├── database/
│   │   ├── articles.sql
│   │   ├── games.sql
│   │   ├── users.sql
│   │   └── init.sql
│   ├── api/
│   │   ├── article-endpoints.json
│   │   ├── webhook-payloads.json
│   │   └── openapi.yaml
│   └── validation/
│       ├── article-schema.json
│       └── game-schema.json
├── constants/
│   ├── sports.ts
│   ├── leagues.ts
│   └── api-endpoints.ts
└── README.md

Add basic TypeScript interfaces and SQL table definitions as placeholders.
```

### Step 5: Create Documentation Structure

**Prompt for Cursor:**
```
In the docs/ directory, create comprehensive documentation structure:

docs/
├── research/
│   ├── day-1-sdk-research.md
│   ├── day-2-data-sources.md
│   ├── day-3-ai-content.md
│   ├── day-4-implementation.md
│   └── research-summary.md
├── api/
│   ├── endpoints.md
│   ├── webhooks.md
│   └── authentication.md
├── deployment/
│   ├── ai-backend.md
│   ├── web-platform.md
│   └── database-setup.md
├── development/
│   ├── getting-started.md
│   ├── coding-standards.md
│   └── testing.md
├── architecture/
│   ├── system-overview.md
│   ├── multi-agent-design.md
│   ├── data-flow.md
│   └── adr/
│       ├── 001-choose-supabase-over-firebase.md
│       ├── 002-chainlit-vs-streamlit.md
│       └── README.md
└── README.md

Add placeholder content in each markdown file with this just this "TBD" 

**Key Documentation Requirements:**
- **Getting Started Guide** (`docs/development/getting-started.md`): Walk through cloning, `.env.example` setup, running DB migrations, launching web & agent demos, and submitting a PR
- **Architecture Decision Records** (`docs/architecture/adr/`): Maintain ADRs to capture why key choices (Chainlit vs Streamlit, Supabase vs Firebase, etc.) were made for future reference and onboarding
```

### Step 6: Create Scripts and Configuration

**Prompt for Cursor:**
```
Create the following scripts and configuration files:

scripts/
├── setup-dev.sh
├── setup-env.sh
├── deploy-ai.sh
├── deploy-web.sh
├── run-tests.sh
├── lint-fix.sh
├── type-check.sh
└── seed-data.py

.github/workflows/
├── ci.yml
├── deploy-ai.yml
├── deploy-web.yml
├── security-audit.yml
└── dependabot.yml

.github/ISSUE_TEMPLATE/
├── bug_report.md
├── feature_request.md
└── config.yml

.github/
├── PULL_REQUEST_TEMPLATE.md
└── CODEOWNERS

Root level files:
├── docker-compose.yml
├── docker-compose.dev.yml
├── .gitignore
├── .env.example
├── LICENSE
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── .pre-commit-config.yaml
└── README.md

**Environment Configuration:**
- **Sample Environment Files**: Both `web/.env.local.example` and `ai-backend/.env.example` should be checked into the repository with placeholders for all required variables
- **Security**: Never commit actual API keys or secrets - only `.example` files with placeholder values

**GitHub Governance:**
- **Issue Templates**: Standardized bug reports and feature requests in `.github/ISSUE_TEMPLATE/`
- **Pull Request Template**: Consistent PR descriptions in `.github/PULL_REQUEST_TEMPLATE.md`
- **Code Ownership**: Auto-assign reviewers via `.github/CODEOWNERS` file

Add appropriate placeholder content and basic configuration for each file.

**docker-compose.dev.yml must include both services:**
```yaml
version: '3.8'

services:
  ai-backend:
    build:
      context: ./ai-backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    volumes:
      - ./ai-backend:/app
    env_file:
      - ./ai-backend/.env
    environment:
      - FASTAPI_RELOAD=true
      - DEBUG=true
    command: uvicorn main:app --host 0.0.0.0 --port 8000 --reload

  web:
    build:
      context: ./web
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    volumes:
      - ./web:/app
      - /app/node_modules
    env_file:
      - ./web/.env.local
    environment:
      - NODE_ENV=development
    command: npm run dev
```

> **Note:** Before running Docker Compose, be sure to copy your env files:  
> ```bash
> cp .env.example ai-backend/.env
> cp web/.env.local.example web/.env.local
> ```
> This ensures Docker loads the correct environment variables.

**web/Dockerfile content:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
```

**web/tsconfig.json with strict TypeScript enabled:**
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```
```

## Key Placeholder Files Content

### Root README.md Template
```markdown
# Sport Scribe - AI-Powered Sports Journalism Platform

## Overview
Sport Scribe is an intelligent sports journalism platform that uses multi-agent AI to generate real-time sports articles.

## Project Structure
- `ai-backend/` - Python-based AI agent system using OpenAI Agent SDK
- `web/` - Next.js web platform for publishing and managing articles
- `shared/` - Shared types, schemas, and constants
- `docs/` - Project documentation
- `scripts/` - Build and deployment scripts

## Quick Start
```bash
# Clone the repository
git clone https://github.com/vibing-ai/sports-scribe
cd sport-scribe

# Set up development environment
./scripts/setup-dev.sh

# Start AI backend
cd ai-backend
python main.py

# Start web platform (in new terminal)
cd web
npm run dev
```

## Documentation
See the `docs/` directory for comprehensive documentation.

## Contributing
Please read our development guidelines in `docs/development/`.
```

### AI Backend README.md Template
```markdown
# AI Backend - Sport Scribe

## Overview
Multi-agent AI system for generating sports articles using OpenAI Agent SDK.

## Architecture
- **Data Collector Agent**: Gathers game data from sports APIs
- **Research Agent**: Provides contextual background and analysis
- **Writing Agent**: Generates engaging sports articles
- **Editor Agent**: Reviews and refines article quality

## Setup
```bash
# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys

# Run the system
python main.py
```

## Configuration
See `config/` directory for agent configurations and settings.
```

### Web Platform README.md Template
```markdown
# Web Platform - Sport Scribe

## Overview
Next.js web platform for publishing and managing AI-generated sports articles.

## Tech Stack
- Next.js 14 with App Router
- TypeScript
- Tailwind CSS + Hero UI
- Supabase (Database & Auth)
- Framer Motion (for animations)

## Setup
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials

# Run development server
npm run dev
```

## Hero UI Configuration
This project uses Hero UI for components. Key files:
- `app/providers.tsx` - Hero UI provider setup
- `tailwind.config.js` - Hero UI plugin configuration
- `.npmrc` - pnpm hoisting configuration (if using pnpm)

## Features
- Real-time article publishing
- Admin dashboard
- Article management
- Analytics and monitoring
```

## Issues Fixed & Best Practices Applied

### ✅ Next.js App Router Corrections
- **Removed route group conflict**: Eliminated `app/(home)/page.tsx` that would conflict with `app/page.tsx`
- **Proper dynamic routing**: Used correct `[id]` and `[sport]` syntax for dynamic segments
- **API routes**: Used `route.ts` files in App Router (not `api.ts`)

### ✅ Hero UI Setup Corrections  
- **Added providers.tsx**: Essential `app/providers.tsx` file for Hero UI provider setup
- **Removed components.json**: This is for shadcn/ui, not Hero UI (conflicting libraries)
- **Added .npmrc**: For pnpm users to properly hoist Hero UI packages
- **Component naming**: Hero UI specific component examples (`hero-button.tsx` vs generic `button.tsx`)

### ✅ Type Organization
- **Removed redundancy**: Eliminated `lib/types/` directory to avoid duplication with `shared/types/`
- **Centralized types**: All TypeScript interfaces will be in `shared/types/` for consistency
- **Import strategy**: Web platform will import types from `../../shared/types/`

### ✅ Essential Config Files Added
- **PostCSS config**: `postcss.config.js` for Tailwind CSS processing
- **NPM config**: `.npmrc` for proper pnpm package hoisting
- **Proper structure**: All Next.js 14 + Hero UI requirements covered

### ✅ Python Package Structure
- **Proper __init__.py files**: Every Python package has correct initialization
- **Standard layout**: Follows Python packaging best practices
- **Clear separation**: Agents, tools, config, and utils properly organized

## Key Architectural Decisions

### Directory Naming
- ✅ `ai-backend` (not just `backend`) - clearly indicates AI focus
- ✅ `web` (not `frontend`) - shorter, more common in industry
- ✅ `shared` - standard name for monorepo shared code

### File Extensions
- ✅ `.tsx` for React components
- ✅ `.ts` for TypeScript utilities and API routes
- ✅ `.py` for Python modules
- ✅ `.sql` for database schemas

### Import Strategy
```typescript
// In web platform, import shared types like this:
import { Article, GameData } from '../../shared/types/article';
import { SPORTS, LEAGUES } from '../../shared/constants/sports';
```

```python
# In ai-backend, access shared schemas like this:
import json
with open('../shared/schemas/validation/article-schema.json') as f:
    article_schema = json.load(f)
```

## Final Setup Command

**Run this single command in Cursor to create everything:**
```
Create the complete Sport Scribe project structure as outlined above. Start with the root directory structure, then create each subdirectory with all placeholder files. Ensure all Python files have proper __init__.py files, all TypeScript files have basic interface definitions, and all README files have the template content provided. Add .gitkeep files where directories might be empty initially.

Include all configuration files:
- Python: ruff.toml, mypy.ini, .pre-commit-config.yaml
- TypeScript: .eslintrc.json, .prettierrc, .prettierignore
- Docker: Dockerfile in ai-backend, docker-compose.yml in root
- GitHub Actions: All workflow files in .github/workflows/
- Project files: LICENSE, CODE_OF_CONDUCT.md, CONTRIBUTING.md
- Scripts: All shell scripts in scripts/ directory

Ensure all requirements.txt files include the specified dependencies and all package.json files include the development and production dependencies listed.
```

This setup provides a **production-ready, enterprise-grade** foundation that follows industry best practices for:
- ✅ **Code Quality** (linting, formatting, type checking)
- ✅ **Testing** (unit tests, coverage reporting, CI/CD)
- ✅ **Security** (dependency auditing, error tracking, monitoring)
- ✅ **Developer Experience** (pre-commit hooks, automated workflows)
- ✅ **Deployment** (containerization, cloud-native architecture)
- ✅ **Scalability** (microservices, real-time capabilities, global CDN)

## Post-Setup Validation Checklist

After running all the Cursor prompts, verify:

### ✅ Directory Structure
- [ ] All 6 main directories exist (`ai-backend`, `web`, `shared`, `docs`, `scripts`, `.github`)
- [ ] No empty directories (all have `.gitkeep` or actual files)
- [ ] Python packages have `__init__.py` files

### ✅ Next.js Structure 
- [ ] Only one `page.tsx` at app root (no route group conflict)
- [ ] API routes use `route.ts` files
- [ ] All required config files present (`postcss.config.js`, `.npmrc`)
- [ ] **Critical**: `app/providers.tsx` exists for Hero UI setup
- [ ] `web/Dockerfile` exists for containerized development

### ✅ Hero UI Requirements
- [ ] `app/providers.tsx` file created (required for Hero UI)
- [ ] `.npmrc` file exists (for pnpm users)
- [ ] No `components.json` file (conflicts with Hero UI)
- [ ] Hero UI component examples in `components/ui/`

### ✅ File Extensions
- [ ] React components use `.tsx`
- [ ] TypeScript utilities use `.ts`
- [ ] Python files use `.py`
- [ ] Documentation uses `.md`

### ✅ Import Paths Will Work
- [ ] Shared types accessible from both `ai-backend` and `web`
- [ ] No circular dependencies in structure
- [ ] Clear separation between frontend and backend

### ⚠️ Hero UI Specific Setup (Post-Generation)
After Cursor creates the structure, you'll need to manually add:
1. **Package.json dependencies**: `@heroui/react`, `framer-motion`
2. **Tailwind config**: Hero UI plugin configuration
3. **Provider content**: Actual Hero UI provider code in `app/providers.tsx`
4. **Layout wrapping**: Wrap `app/layout.tsx` with providers

## ✅ **Key Technical Requirements**
This setup provides enterprise-grade foundations including: OpenAI Agent SDK integration, Supabase real-time backend, Hero UI components, strict TypeScript configuration, containerized development environment, and comprehensive CI/CD workflows.

### ⚠️ Post-Setup Requirements
1. **Supabase project setup**: Create project at supabase.com
2. **Database schema**: Run SQL migrations for articles, games, users tables
3. **API keys**: Get project URL and anon key from Supabase dashboard
4. **Row Level Security**: Configure RLS policies for data access
5. **Deployment platforms**: Set up Vercel (web) and Render (AI backend)

## Immediate Next Steps After Setup

### Step 1: Repository Setup
```bash
# Initialize git and commit initial structure
git init
git add .
git commit -m "Initial project structure"
```

### Step 2: Web Platform Setup (Next.js + Supabase + Hero UI)
```bash
cd web

# Install production dependencies
npm install @supabase/auth-helpers-nextjs @supabase/supabase-js @heroui/react framer-motion

# Install Next.js dependencies
npm install next react react-dom typescript @types/react @types/react-dom

# Install development dependencies
npm install -D tailwindcss postcss autoprefixer eslint @types/node eslint-config-prettier prettier husky lint-staged

# Set up environment variables
cp .env.local.example .env.local
# Add your Supabase credentials (see environment variables section below)

# Initialize git hooks
npx husky install

# Configure pre-commit hooks for code quality
npx husky add .husky/pre-commit "npx lint-staged"

# Configure commit message linting for conventional commits
npx husky add .husky/commit-msg "npx --no -- commitlint --edit \$1"

# Create lint-staged configuration for both TypeScript and Python
echo '{
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{js,jsx}": ["eslint --fix", "prettier --write"],
  "*.py": ["ruff check --fix", "black", "mypy"]
}' > .lintstagedrc.json

# Create commitlint configuration for conventional commits
echo 'module.exports = {extends: ["@commitlint/config-conventional"]};' > commitlint.config.js
```

**Git Hooks & Linting:**
- **Husky Pre-commit Hooks**: Automatically run TypeScript (ESLint/Prettier) and Python linters (Ruff/Black/mypy) before commits
- **Conventional Commits**: Enforced via commitlint for clear, standardized commit message history
- **Lint-staged**: Only lint files that are being committed for faster feedback
- **Multi-language Support**: Handles both TypeScript and Python codebases in the monorepo

### Step 3: AI Backend Setup (OpenAI Agent SDK + FastAPI)
```bash
cd ai-backend

# Create Python virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install production dependencies
pip install openai-agents pydantic python-dotenv requests supabase fastapi chainlit uvicorn structlog

# Install development dependencies
pip install -r requirements-dev.txt

# Set up environment variables
cp .env.example .env
# Add your OpenAI API key and Supabase credentials

# Install pre-commit hooks
pre-commit install
```

### Step 4: Supabase Project Setup
1. **Create Supabase project** at [supabase.com](https://supabase.com)
2. **Copy your credentials** from Project Settings → API
3. **Add to environment files** (see environment variables section)
4. **Run database migrations** (SQL files in shared/schemas/database/)



## Environment Variables

### Web Platform (.env.local):
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Next.js Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Development
NODE_ENV=development
```

### AI Backend (.env):
```bash
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# Supabase Configuration (for AI agents to publish articles)
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# FastAPI Configuration
FASTAPI_HOST=0.0.0.0
FASTAPI_PORT=8000
FASTAPI_RELOAD=true

# Chainlit Configuration
CHAINLIT_HOST=0.0.0.0
CHAINLIT_PORT=8001

# Logging
LOG_LEVEL=info
LOG_FORMAT=json

# Development
DEBUG=true
ENVIRONMENT=development
```

## License

This project is open source and released under the [MIT License](LICENSE).

## Benefits of This Architecture

### ✅ **Supabase Advantages for AI Sports Platform:**
- **Real-time article publishing** from AI agents
- **Built-in authentication** for users and admins
- **Auto-generated APIs** for all database operations
- **Real-time subscriptions** for live updates
- **PostgreSQL** with full SQL support
- **Storage** for images and media files
- **Edge functions** for server-side logic

### ✅ **Perfect for AI Content Generation:**
- AI agents can directly insert articles via service role key
- Real-time updates push new articles to frontend instantly
- Built-in user management for article interactions
- Scalable PostgreSQL for large content volumes

## Deployment Strategy

### 🚀 **Recommended Production Deployment**

#### **Web Platform (Next.js) → Vercel**
- ✅ **First-class Next.js support** with App Router, ISR, Edge Functions
- ✅ **GitHub integration** for auto-deploy on pushes to main
- ✅ **Global CDN** for fast content delivery
- ✅ **Automatic preview deployments** for pull requests
- ✅ **Environment variables** management in dashboard

```bash
# Deploy to Vercel
cd web
npx vercel --prod

# Or connect GitHub repo in Vercel dashboard for automatic deployments
```

#### **AI Backend (Python) → Render**
- ✅ **Docker support** for containerized Python applications
- ✅ **Managed HTTP services** with auto-scaling
- ✅ **Environment variables** and secrets management
- ✅ **Auto-deploy** on git pushes
- ✅ **Built-in health checks** and monitoring

```dockerfile
# ai-backend/Dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### **Database & Auth → Supabase Cloud**
- ✅ **Managed PostgreSQL** with automatic backups
- ✅ **Global edge network** for low latency
- ✅ **Built-in monitoring** and analytics
- ✅ **Automatic scaling** based on usage

### 📊 **Monitoring & Observability**

#### **Application Monitoring**
- **Vercel Analytics**: Frontend performance and user behavior
- **Render Metrics**: Backend performance, memory usage, response times
- **Supabase Dashboard**: Database performance, query analytics

### 🔧 **Development Workflow**

```bash
# Local development
docker-compose -f docker-compose.dev.yml up  # Starts both ai-backend and web services

# Testing
cd ai-backend && pytest --cov
cd web && npm test

# Code quality
./scripts/lint-fix.sh  # Runs ruff, black, eslint, prettier
./scripts/type-check.sh  # Runs mypy and tsc

# Deployment
git push origin main  # Auto-deploys to Vercel and Render
```

### 💰 **Cost Estimation (Monthly)**

#### **Development/MVP:**
- **Vercel**: Free tier (sufficient for MVP)
- **Render**: $7/month (Starter plan)
- **Supabase**: Free tier (500MB database, 50k auth users)
- **Total**: ~$7/month

#### **Production (Medium Scale):**
- **Vercel**: $20/month (Pro plan)
- **Render**: $25/month (Standard plan with more resources)
- **Supabase**: $25/month (Pro plan, 8GB database)
- **Total**: ~$70/month