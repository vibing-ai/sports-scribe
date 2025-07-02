# Getting Started with Sport Scribe

Welcome to Sport Scribe, an AI-powered sports journalism platform. This guide will help you set up the development environment and get the application running locally.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **Python** (v3.9 or higher)
- **Git**
- **Docker** (optional, for containerized development)
- **Supabase CLI** (for database management)

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/sport-scribe.git
cd sport-scribe
```

### 2. Environment Setup

Copy the environment example files and configure them:

```bash
# Copy environment files
cp .env.example .env
cp web/.env.local.example web/.env.local
cp ai-backend/.env.example ai-backend/.env
```

### 3. Configure Environment Variables

Edit the environment files with your actual values:

#### Root `.env`:
```bash
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Database
DATABASE_URL=your_supabase_database_url
```

#### Web Platform (`web/.env.local`):
```bash
# Supabase (Frontend)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### AI Backend (`ai-backend/.env`):
```bash
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# Supabase (Backend)
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Sports APIs
ESPN_API_KEY=your_espn_api_key
SPORTS_REFERENCE_API_KEY=your_sports_reference_api_key

# Agent Configuration
CHAINLIT_AUTH_SECRET=your_chainlit_secret
```

### 4. Database Setup

Initialize the database with the required tables and seed data:

```bash
# Run database migrations
cd shared/schemas/database
supabase db reset
supabase db push

# Seed the database with sample data
cd ../../../
python scripts/seed-data.py
```

### 5. Install Dependencies

#### Web Platform:
```bash
cd web
npm install
cd ..
```

#### AI Backend:
```bash
cd ai-backend
pip install -r requirements.txt
pip install -r requirements-dev.txt
cd ..
```

### 6. Start Development Servers

#### Option A: Start All Services with Docker
```bash
docker-compose -f docker-compose.dev.yml up
```

#### Option B: Start Services Individually

**Terminal 1 - Web Platform:**
```bash
cd web
npm run dev
```

**Terminal 2 - AI Backend:**
```bash
cd ai-backend
python main.py
```

**Terminal 3 - Chainlit Demo (Optional):**
```bash
cd ai-backend
chainlit run main.py --port 8001
```

### 7. Verify Installation

Once all services are running, you should be able to access:

- **Web Platform**: http://localhost:3000
- **AI Backend API**: http://localhost:8000
- **Chainlit Demo**: http://localhost:8001
- **API Documentation**: http://localhost:8000/docs

## Development Workflow

### Making Changes

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** in the appropriate directories:
   - `web/` - Frontend components and pages
   - `ai-backend/` - AI agents and backend logic
   - `shared/` - Shared types and schemas

3. **Run tests:**
   ```bash
   # Frontend tests
   cd web && npm test

   # Backend tests
   cd ai-backend && pytest
   ```

4. **Check code quality:**
   ```bash
   # Run linting and formatting
   ./scripts/lint-fix.sh
   ./scripts/type-check.sh
   ```

5. **Commit and push:**
   ```bash
   git add .
   git commit -m "feat: your descriptive commit message"
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** using the GitHub interface

### Database Changes

When making database schema changes:

1. Update SQL files in `shared/schemas/database/`
2. Update TypeScript interfaces in `shared/types/`
3. Run migrations: `supabase db push`
4. Update seed data if necessary: `python scripts/seed-data.py`

### Adding New AI Agents

1. Create agent class in `ai-backend/agents/`
2. Add configuration in `ai-backend/config/agent_config.py`
3. Register agent in `ai-backend/main.py`
4. Add tests in `ai-backend/tests/`

## Troubleshooting

### Common Issues

**Database Connection Errors:**
- Verify Supabase credentials in environment files
- Check if Supabase project is active
- Ensure database tables are created

**Port Conflicts:**
- Web: Change port in `web/package.json` scripts
- AI Backend: Set `PORT` environment variable
- Chainlit: Use `--port` flag

**Missing Dependencies:**
```bash
# Reset node modules
cd web && rm -rf node_modules && npm install

# Reset Python environment
cd ai-backend && pip install -r requirements.txt --force-reinstall
```

**Environment Variable Issues:**
- Ensure all `.env` files are properly configured
- Restart development servers after changing environment variables
- Check for trailing spaces or quotes in environment values

### Getting Help

- Check the [API Documentation](../api/endpoints.md)
- Review [Architecture Overview](../architecture/system-overview.md)
- See [Coding Standards](./coding-standards.md)
- Open an issue on GitHub for bugs or questions

## Next Steps

After successfully setting up the development environment:

1. Explore the [Architecture Documentation](../architecture/system-overview.md)
2. Review the [API Endpoints](../api/endpoints.md)
3. Check out the [Testing Guide](./testing.md)
4. Read the [Coding Standards](./coding-standards.md)

Happy coding! 🚀 