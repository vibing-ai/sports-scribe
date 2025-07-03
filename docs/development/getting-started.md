# Getting Started

Welcome to Sport Scribe, an AI-powered sports journalism platform. This guide
will help you set up the development environment and get the application running
locally.

## Prerequisites

### Required Software
- **Python 3.11+** (specifically 3.11, not 3.9)
- **Node.js 18+**
- **npm** or **yarn**
- **Git**
- **Code Editor** (VS Code recommended with Python and TypeScript extensions)

### Optional but Recommended
- **Docker** (for containerized development)
- **Supabase CLI** (for database management - install via `npm install -g @supabase/cli`)

### Verify Installation
```bash
python3.11 --version  # Should show 3.11.x
node --version         # Should show 18.x+
npm --version          # Should show recent version
git --version          # Should show 2.x+
```

## Complete Development Setup

### 1. Clone and Enter Repository
```bash
git clone https://github.com/vibing-ai/sport-scribe.git
cd sport-scribe
```

### 2. Backend Setup (AI Agent Service)
```bash
cd ai-backend

# Create virtual environment
python3.11 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
pip install -r requirements-dev.txt

# Verify setup
python --version  # Should show 3.11+
ruff check .      # Should run without errors
```

### 3. Frontend Setup (Web Platform)
```bash
cd ../web

# Install dependencies
npm install

# Verify setup
npm run lint      # Should run ESLint
npm run build     # Should build successfully
```

### 4. Environment Configuration
```bash
# Copy environment files
cp env.example .env
cp ai-backend/env.example ai-backend/.env
cp web/env.local.example web/.env.local

# Edit files with your actual values:
# - OpenAI API key
# - Supabase URL and keys
# - Any other required configuration
```

### 5. Start Development Servers
```bash
# Terminal 1: Start AI Backend
cd ai-backend
source venv/bin/activate
python -m uvicorn main:app --reload --port 8000

# Terminal 2: Start Web Platform
cd web
npm run dev
```

### 6. Verify Setup
- **AI Backend**: Visit http://localhost:8000/health
- **Web Platform**: Visit http://localhost:3000
- Both should load without errors

## Development Workflow

### Code Quality

We use several tools to maintain code quality:

```bash
# Python (AI Backend)
cd ai-backend
ruff format .     # Code formatting
ruff check .      # Linting
mypy .            # Type checking (if configured)

# TypeScript (Web Platform)
cd web
npm run lint      # ESLint
npm run build     # TypeScript checking
```

### Database Setup

If you're using Supabase:

1. Create a new Supabase project
2. Run the SQL scripts in `shared/schemas/database/`
3. Update your environment variables with the Supabase URL and keys

```bash
# Install Supabase CLI
npm install -g @supabase/cli

# Login to Supabase
supabase login

# Initialize local development
supabase init

# Start local Supabase
supabase start

# Apply migrations
supabase db reset
```

## Architecture Overview

Sport Scribe consists of three main components:

### 1. AI Backend (`ai-backend/`)

- FastAPI-based REST API
- AI agent framework for content generation (currently in development)
- Sports data collection and processing
- Built with Python 3.11+

### 2. Web Platform (`web/`)

- Next.js 14 with App Router
- TypeScript and Tailwind CSS
- HeroUI component library
- Supabase integration for data storage
- Modern React components

### 3. Shared Resources (`shared/`)

- Common types and schemas
- Database migrations
- API specifications
- Validation schemas

## Common Development Tasks

### Adding New Dependencies

**Python Backend:**
```bash
cd ai-backend
source venv/bin/activate
pip install new-package
pip freeze > requirements.txt
```

**Node.js Frontend:**
```bash
cd web
npm install new-package
```

### Running Quality Checks

```bash
# Python code quality
cd ai-backend
source venv/bin/activate
ruff format .     # Format code
ruff check .      # Lint code
ruff check --fix . # Fix auto-fixable issues

# TypeScript code quality
cd web
npm run lint      # Lint and format
npm run lint:fix  # Fix auto-fixable issues
```

### Docker Development

```bash
# Start all services
docker-compose -f docker-compose.dev.yml up

# Start specific service
docker-compose -f docker-compose.dev.yml up web
docker-compose -f docker-compose.dev.yml up ai-backend

# Rebuild services
docker-compose -f docker-compose.dev.yml build
```

## Troubleshooting

### Common Issues

1. **Python version conflicts**: Ensure you're using Python 3.11+
   ```bash
   python3.11 --version
   which python3.11
   ```

2. **Node.js version issues**: Use Node.js 18+ for the web platform
   ```bash
   node --version
   npm --version
   ```

3. **Environment variables**: Double-check all required environment variables are set
   ```bash
   # Check if variables are loaded
   cd ai-backend
   source venv/bin/activate
   python -c "import os; print(os.getenv('OPENAI_API_KEY'))"
   ```

4. **Port conflicts**: Ensure ports 3000 and 8000 are available
   ```bash
   # Check if ports are in use
   lsof -i :3000
   lsof -i :8000
   ```

5. **Virtual environment issues**: Recreate virtual environment
   ```bash
   cd ai-backend
   rm -rf venv
   python3.11 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   pip install -r requirements-dev.txt
   ```

### Getting Help

- Check the [API documentation](../api/endpoints.md)
- Review the [architecture documentation](../architecture/system-overview.md)
- Look at existing [GitHub issues](https://github.com/vibing-ai/sport-scribe/issues)
- Read the [coding standards](coding-standards.md)

## Next Steps

Once you have the development environment running:

1. Explore the [API documentation](../api/endpoints.md)
2. Read about our [multi-agent architecture](../architecture/multi-agent-design.md)
3. Check out the [coding standards](coding-standards.md)
4. Review the [contribution guidelines](../../CONTRIBUTING.md)
5. Start with issues labeled `good first issue`

## Development Tips

- **Use the virtual environment**: Always activate the Python virtual environment before running backend commands
- **Check logs**: Monitor both terminal outputs for errors and debugging information
- **Environment variables**: Keep your `.env` files secure and never commit them to version control
- **Code quality**: Run linting before committing to maintain code standards
- **Documentation**: Update documentation when adding new features or changing APIs

Happy coding! 🚀
