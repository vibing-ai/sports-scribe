# Sport Scribe 🏈⚽🏀

> AI-Powered Sports Journalism Platform

Sport Scribe is an intelligent sports journalism platform that leverages AI
agents to automatically generate high-quality sports articles, game recaps,
and analysis from live game data and statistics.

## 🌟 Features

- **AI-Powered Content Generation**: Basic AI agent framework for content
  generation (currently in development - basic agents implemented with room
  for expansion)
- **Real-time Game Integration**: Connects to sports APIs for live game data
  and statistics
- **Modern Web Platform**: Next.js frontend with responsive design and
  real-time updates
- **Football-Focused Platform**: Specializing in football (soccer) coverage
  with comprehensive league support including Premier League, La Liga,
  Bundesliga, Serie A, and more
- **Content Management**: Full editorial workflow with drafts, reviews, and publishing
- **Analytics Dashboard**: Track article performance and user engagement

## 🏗️ Architecture

- **Frontend**: Next.js 14 (App Router) + TypeScript + HeroUI
  (@heroui/react) + Tailwind CSS
- **Backend**: Python FastAPI with OpenAI integration
- **Database**: Supabase (PostgreSQL) with real-time capabilities
- **AI System**: AI agent framework (currently in development - basic
  agents implemented with room for expansion):
  - **Data Collector**: Gathers game data from sports APIs
  - **Researcher**: Analyzes team and player backgrounds
  - **Writer**: Generates articles with various tones and styles
  - **Editor**: Reviews and improves content quality
  - **Basic content generation** (fact-checking planned for future
    releases)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Python 3.11+
- Supabase account
- OpenAI API key

### Important Setup Notes

⚠️ **Before starting, ensure you have:**

- Python 3.11+ installed
- Node.js 18+ installed
- Git installed
- A code editor (VS Code recommended)

### Python Virtual Environment Setup (REQUIRED)

```bash
cd ai-backend
python3.11 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
pip install -r requirements-dev.txt
```

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/vibing-ai/sport-scribe.git
   cd sport-scribe
   ```

2. **Set up environment variables**

   ```bash
   cp env.example .env
   cp web/env.local.example web/.env.local
   cp ai-backend/env.example ai-backend/.env
   ```

3. **Install dependencies**

   ```bash
   # Web platform
   cd web && npm install && cd ..

   # AI backend
   cd ai-backend && pip install -r requirements.txt && cd ..
   ```

4. **Initialize database**

   ```bash
   # Database setup requires Supabase CLI - see deployment/database-setup.md
   ```

5. **Start development servers**

   ```bash
   # Option 1: Docker Compose
   docker-compose -f docker-compose.dev.yml up

   # Option 2: Individual services
   cd web && npm run dev &
   cd ai-backend && python main.py &
   ```

6. **Access the application**
   - Web Platform: <http://localhost:3000>
   - AI Backend API: <http://localhost:8000>
   - API Docs: <http://localhost:8000/docs>

For detailed setup instructions, see
[Getting Started Guide](docs/development/getting-started.md).

## 📁 Project Structure

```text
sport-scribe/
├── ai-backend/          # Python AI agent system
│   ├── agents/          # AI agent implementations
│   ├── tools/           # Sports APIs and data tools
│   ├── config/          # Agent configurations
│   └── tests/           # Backend tests
├── web/                 # Next.js web platform
│   ├── app/             # App router pages
│   ├── components/      # React components
│   ├── lib/             # Utilities and integrations
│   └── hooks/           # Custom React hooks
├── shared/              # Shared schemas and types
│   ├── types/           # TypeScript interfaces
│   ├── schemas/         # Database and API schemas
│   └── constants/       # Shared constants
├── docs/                # Project documentation
└── scripts/             # Build and deployment scripts
```

## 🤖 AI Agent System

Sport Scribe uses a multi-agent architecture where specialized AI agents
collaborate to produce high-quality sports content:

### Agent Workflow

1. **Data Collector** → Gathers real-time game data and statistics
2. **Researcher** → Analyzes team history, player backgrounds, and context
3. **Writer** → Generates articles with appropriate tone and style
4. **Editor** → Reviews content for quality, grammar, and readability
5. **Basic content generation** (fact-checking planned for future
   releases)

### Supported Content Types

- Game recaps and summaries
- Player spotlights and profiles
- Team analysis and previews
- Season reviews and predictions
- Trade news and roster changes

## 🛠️ Development

### Code Quality

Sport Scribe uses comprehensive quality tools to ensure code excellence:

```bash
# Install quality tools (one-time setup)
./scripts/setup-ci-tools.sh

# Run comprehensive quality checks
./scripts/lint-all.sh

# Auto-fix linting issues
./scripts/lint-fix.sh [ai|web|sql|all]

# Type checking
./scripts/type-check.sh

# Testing setup in progress - see CONTRIBUTING.md for current testing
# approach
```

#### Quality Tools

- **shellcheck**: Shell script linting
- **yamllint**: YAML file validation
- **hadolint**: Dockerfile linting
- **ajv-cli**: JSON schema validation
- **sqlfluff**: SQL linting and formatting
- **ruff**: Python linting and formatting (fast)
- **mypy**: Python type checking
- **bandit**: Python security analysis
- **safety**: Python vulnerability scanning
- **ESLint**: TypeScript/JavaScript linting
- **Prettier**: Code formatting

### Database Management

```bash
# Reset database
supabase db reset

# Apply migrations
supabase db push

# Generate TypeScript types
npm run generate:types
```

### Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Run quality checks: `./scripts/lint-fix.sh`
5. Commit your changes: `git commit -m 'feat: add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

See [Contributing Guidelines](CONTRIBUTING.md) for detailed information.

## 📊 Technology Stack

### Frontend

- **Next.js 14** (App Router)
- **TypeScript** for type safety
- **HeroUI** (@heroui/react) for UI components
- **Tailwind CSS** for styling
- **Supabase** for database and auth

### Backend

- **Python 3.11+** runtime
- **FastAPI** for API framework
- **Ruff** for linting and formatting
- **OpenAI** for AI model integration
- **Supabase** for database

### Development Tools

- **Docker** for containerization
- **GitHub Actions** for CI/CD
- **Ruff** for Python code quality
- **ESLint** for TypeScript code quality

## 🚀 Deployment

- **AI Backend**: Docker containerized FastAPI service
- **Web Platform**: Next.js application (Vercel ready)
- **Database**: Supabase managed PostgreSQL
- **CI/CD**: GitHub Actions workflows

See [Deployment Documentation](docs/deployment/) for detailed
instructions.

## 📚 Documentation

- [Getting Started](docs/development/getting-started.md)
- [API Documentation](docs/api/endpoints.md)
- [Architecture Overview](docs/architecture/system-overview.md)
- [Contributing Guidelines](CONTRIBUTING.md)
- [Deployment Guide](docs/deployment/)

## 🤝 Contributing

We welcome contributions! Please see our
[Contributing Guidelines](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the
[LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for AI model capabilities
- Supabase for backend infrastructure
- Next.js for frontend framework
- The sports data API providers
