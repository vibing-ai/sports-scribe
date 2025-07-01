# Sport Scribe - AI-Powered Sports Journalism Platform

<div align="center">

![Sport Scribe Logo](web/public/images/logo.png)

**Intelligent sports journalism powered by multi-agent AI**

[![CI](https://github.com/your-username/sport-scribe/workflows/CI/badge.svg)](https://github.com/your-username/sport-scribe/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)](https://www.python.org/)

</div>

## Overview

Sport Scribe is an intelligent sports journalism platform that uses multi-agent AI to generate real-time, engaging sports articles. The system combines data collection, research, writing, and editing agents to produce high-quality sports content automatically.

### 🚀 Key Features

- **Multi-Agent AI System**: Specialized agents for data collection, research, writing, and editing
- **Real-time Article Generation**: Automatic content creation from live sports data
- **Modern Web Platform**: Next.js 14 with TypeScript and Hero UI components
- **Supabase Backend**: PostgreSQL database with real-time subscriptions
- **Admin Dashboard**: Comprehensive content management and analytics
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Project Structure

```
sport-scribe/
├── ai-backend/          # Python-based AI agent system using OpenAI SDK
│   ├── agents/          # Individual AI agents (collector, researcher, writer, editor)
│   ├── tools/           # Sports APIs and data validation tools
│   ├── config/          # Agent configurations and settings
│   └── utils/           # Helper functions and logging
├── web/                 # Next.js web platform for publishing and managing articles
│   ├── app/             # Next.js 14 App Router pages and API routes
│   ├── components/      # React components with Hero UI
│   ├── lib/             # Utilities and Supabase integration
│   └── hooks/           # Custom React hooks
├── shared/              # Shared types, schemas, and constants
│   ├── types/           # TypeScript interfaces
│   ├── schemas/         # Database schemas and API definitions
│   └── constants/       # Sports leagues, teams, and API endpoints
├── docs/                # Project documentation
├── scripts/             # Build and deployment scripts
└── .github/             # GitHub workflows and templates
```

## Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.11+ and pip
- **Supabase** account and project
- **OpenAI** API key

### 1. Clone and Setup

```bash
# Clone the repository
git clone https://github.com/your-username/sport-scribe
cd sport-scribe

# Set up development environment
./scripts/setup-dev.sh
```

### 2. Environment Configuration

```bash
# Copy environment template
cp env.example .env

# Edit .env with your API keys and credentials
# Required: OPENAI_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
```

### 3. Database Setup

```bash
# Initialize Supabase database
cd web
npm run db:setup

# Generate TypeScript types
npm run generate:types
```

### 4. Start Development Servers

```bash
# Option 1: Using Docker (Recommended)
docker-compose -f docker-compose.dev.yml up

# Option 2: Manual startup
# Terminal 1 - AI Backend
cd ai-backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py

# Terminal 2 - Web Platform
cd web
npm install
npm run dev
```

### 5. Access the Application

- **Web Platform**: http://localhost:3000
- **AI Backend API**: http://localhost:8000
- **Chainlit Demo**: http://localhost:8001
- **API Documentation**: http://localhost:8000/docs

## Development Workflow

### Code Quality

```bash
# Run linting and formatting
./scripts/lint-fix.sh

# Run type checking
./scripts/type-check.sh

# Run tests
./scripts/run-tests.sh
```

### Git Hooks

Pre-commit hooks are automatically installed to ensure code quality:

- **Python**: Ruff, Black, mypy
- **TypeScript**: ESLint, Prettier
- **General**: Trailing whitespace, YAML validation, secret detection

## Architecture

### AI Agent System

- **Data Collector Agent**: Gathers real-time game data from sports APIs
- **Research Agent**: Provides contextual background and historical analysis
- **Writing Agent**: Generates engaging, human-like sports articles
- **Editor Agent**: Reviews content for quality, accuracy, and style

### Technology Stack

#### Frontend
- **Next.js 14** with App Router
- **TypeScript** with strict mode
- **Hero UI** for components
- **Tailwind CSS** for styling
- **Framer Motion** for animations

#### Backend
- **Python** with FastAPI
- **OpenAI SDK** for AI orchestration
- **Chainlit** for AI chat interface
- **Supabase** for database and real-time features

#### Infrastructure
- **Vercel** for web platform deployment
- **Render** for AI backend hosting
- **Supabase Cloud** for managed database
- **GitHub Actions** for CI/CD

## Documentation

Comprehensive documentation is available in the `docs/` directory:

- **[Getting Started](docs/development/getting-started.md)** - Detailed setup guide
- **[API Documentation](docs/api/endpoints.md)** - REST API reference
- **[Architecture Overview](docs/architecture/system-overview.md)** - System design
- **[Deployment Guide](docs/deployment/)** - Production deployment
- **[Contributing Guidelines](docs/development/coding-standards.md)** - Development standards

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Deployment

### Production Deployment

The application is designed for cloud-native deployment:

```bash
# Deploy web platform to Vercel
cd web
npx vercel --prod

# Deploy AI backend to Render
# Connect your GitHub repo in Render dashboard

# Database migrations
npm run db:migrate
```

### Environment Variables

See `env.example` for all required environment variables. Key variables include:

- `OPENAI_API_KEY` - OpenAI API access
- `SUPABASE_URL` & `SUPABASE_SERVICE_ROLE_KEY` - Database access
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Frontend database access

## Monitoring & Analytics

- **Application Performance**: Vercel Analytics
- **Error Tracking**: Sentry integration
- **Database Monitoring**: Supabase Dashboard
- **AI Usage**: OpenAI usage dashboard

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **OpenAI** for the Agent SDK and GPT models
- **Supabase** for the backend infrastructure
- **Vercel** for the deployment platform
- **Hero UI** for the component library

## Support

- 📖 **Documentation**: [docs/](docs/)
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/your-username/sport-scribe/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/your-username/sport-scribe/discussions)
- 📧 **Email**: support@sportscribe.ai

---

<div align="center">
Made with ❤️ by the Sport Scribe team
</div> 