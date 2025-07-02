# Getting Started

Welcome to Sport Scribe, an AI-powered sports journalism platform. This guide
will help you set up the development environment and get the application running
locally.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Python 3.11+** (for the AI backend)
- **Node.js 18+** (for the web platform)
- **Docker** (optional, for containerized development)
- **Git** (for version control)

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/sport-scribe.git
cd sport-scribe
```

### 2. Set Up Environment Variables

Copy the example environment files:

```bash
# Root environment
cp env.example .env

# AI Backend environment
cp ai-backend/env.example ai-backend/.env

# Web platform environment
cp web/env.local.example web/.env.local
```

### 3. Install Dependencies

#### Backend Dependencies

```bash
cd ai-backend
pip install -r requirements.txt
pip install -r requirements-dev.txt
```

#### Frontend Dependencies

```bash
cd web
npm install
```

### 4. Start Development Servers

#### Start AI Backend

```bash
cd ai-backend
python -m uvicorn main:app --reload --port 8000
```

#### Start Web Platform

```bash
cd web
npm run dev
```

The application will be available at:

- Web Platform: <http://localhost:3000>
- AI Backend API: <http://localhost:8000>
- API Documentation: <http://localhost:8000/docs>

## Development Workflow

### Code Quality

We use several tools to maintain code quality:

```bash
# Python (AI Backend)
cd ai-backend
ruff check .          # Linting
black .               # Code formatting
mypy .                # Type checking
pytest                # Testing

# TypeScript (Web Platform)
cd web
npm run lint          # ESLint
npm run type-check    # TypeScript checking
npm test              # Testing
```

### Pre-commit Hooks

Set up pre-commit hooks to automatically run quality checks:

```bash
pre-commit install
```

### Database Setup

If you're using Supabase:

1. Create a new Supabase project
2. Run the SQL scripts in `shared/schemas/database/`
3. Update your environment variables with the Supabase URL and keys

## Architecture Overview

Sport Scribe consists of three main components:

### 1. AI Backend (`ai-backend/`)

- FastAPI-based REST API
- Multi-agent AI system for content generation
- Sports data collection and processing
- Built with Python 3.11+

### 2. Web Platform (`web/`)

- Next.js 14 with App Router
- TypeScript and Tailwind CSS
- Supabase integration for data storage
- Modern React components

### 3. Shared Resources (`shared/`)

- Common types and schemas
- Database migrations
- API specifications
- Validation schemas

## Troubleshooting

### Common Issues

1. **Python version conflicts**: Ensure you're using Python 3.11+
2. **Node.js version issues**: Use Node.js 18+ for the web platform
3. **Environment variables**: Double-check all required environment variables are set
4. **Port conflicts**: Ensure ports 3000 and 8000 are available

### Getting Help

- Check the [API documentation](../api/README.md)
- Review the [architecture documentation](../architecture/README.md)
- Look at existing [issues](https://github.com/your-username/sport-scribe/issues)
- Join our [Discord community](https://discord.gg/sport-scribe)

## Next Steps

Once you have the development environment running:

1. Explore the [API documentation](../api/README.md)
2. Read about our [multi-agent architecture](../architecture/multi-agent-design.md)
3. Check out the [coding standards](coding-standards.md)
4. Learn about our [testing approach](testing.md)

Happy coding! 🚀
