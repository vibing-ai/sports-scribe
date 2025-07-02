# Sport Scribe 🏈⚽🏀

> AI-Powered Sports Journalism Platform

Sport Scribe is an intelligent sports journalism platform that leverages AI agents to automatically generate high-quality sports articles, game recaps, and analysis from live game data and statistics.

## 🌟 Features

- **AI-Powered Content Generation**: Multi-agent system that researches, writes, and edits sports content
- **Real-time Game Integration**: Connects to sports APIs for live game data and statistics
- **Modern Web Platform**: Next.js frontend with responsive design and real-time updates
- **Comprehensive Coverage**: Supports football, basketball, baseball, soccer, and hockey
- **Content Management**: Full editorial workflow with drafts, reviews, and publishing
- **Analytics Dashboard**: Track article performance and user engagement

## 🏗️ Architecture

- **Frontend**: Next.js 14 + TypeScript + Hero UI + Tailwind CSS
- **Backend**: Python FastAPI with OpenAI integration
- **Database**: Supabase (PostgreSQL) with real-time capabilities
- **AI System**: Multi-agent architecture with specialized roles:
  - **Data Collector**: Gathers game data from sports APIs
  - **Researcher**: Analyzes team and player backgrounds
  - **Writer**: Generates articles with various tones and styles
  - **Editor**: Reviews and improves content quality
  - **Fact Checker**: Verifies accuracy of claims and statistics

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Python 3.9+
- Supabase account
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/sport-scribe.git
   cd sport-scribe
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   cp web/.env.local.example web/.env.local
   cp ai-backend/.env.example ai-backend/.env
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
   supabase db reset
   python scripts/seed-data.py
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
   - Web Platform: http://localhost:3000
   - AI Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

For detailed setup instructions, see [Getting Started Guide](docs/development/getting-started.md).

## 📁 Project Structure

```
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

Sport Scribe uses a multi-agent architecture where specialized AI agents collaborate to produce high-quality sports content:

### Agent Workflow

1. **Data Collector** → Gathers real-time game data and statistics
2. **Researcher** → Analyzes team history, player backgrounds, and context
3. **Writer** → Generates articles with appropriate tone and style
4. **Editor** → Reviews content for quality, grammar, and readability
5. **Fact Checker** → Verifies statistical accuracy and claims

### Supported Content Types

- Game recaps and summaries
- Player spotlights and profiles
- Team analysis and previews
- Season reviews and predictions
- Trade news and roster changes

## 🛠️ Development

### Code Quality

```bash
# Run linting and formatting
./scripts/lint-fix.sh

# Type checking
./scripts/type-check.sh

# Run tests
./scripts/run-tests.sh
```

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

## 📚 Documentation

- [Getting Started](docs/development/getting-started.md) - Setup and installation
- [Architecture Overview](docs/architecture/system-overview.md) - System design
- [API Documentation](docs/api/endpoints.md) - REST API reference
- [Deployment Guide](docs/deployment/web-platform.md) - Production deployment
- [Coding Standards](docs/development/coding-standards.md) - Development guidelines

## 🔧 Configuration

### Environment Variables

Key environment variables to configure:

```bash
# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Sports APIs
ESPN_API_KEY=your_espn_api_key
```

### Agent Configuration

AI agents can be configured in `ai-backend/config/agent_config.py`:

```python
WRITER_CONFIG = {
    "tone": "professional",
    "max_length": 2000,
    "include_stats": True,
    "fact_check": True
}
```

## 🚢 Deployment

### Production Deployment

```bash
# Deploy web platform
./scripts/deploy-web.sh

# Deploy AI backend
./scripts/deploy-ai.sh
```

### Docker

```bash
# Production build
docker-compose up -d

# Development with hot reload
docker-compose -f docker-compose.dev.yml up
```

## 🧪 Testing

```bash
# Frontend tests
cd web && npm test

# Backend tests
cd ai-backend && pytest

# End-to-end tests
npm run test:e2e
```

## 📊 Performance

- **Article Generation**: ~30-60 seconds per article
- **API Response Time**: <200ms average
- **Database Queries**: Optimized with indexes and caching
- **Real-time Updates**: WebSocket connections for live data

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md).

### Development Team

- **Frontend**: Next.js, TypeScript, Hero UI
- **Backend**: Python, FastAPI, OpenAI
- **Database**: PostgreSQL, Supabase
- **DevOps**: Docker, GitHub Actions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📖 [Documentation](docs/README.md)
- 🐛 [Issue Tracker](https://github.com/your-org/sport-scribe/issues)
- 💬 [Discussions](https://github.com/your-org/sport-scribe/discussions)

## 🎯 Roadmap

- [ ] Mobile app development
- [ ] Advanced analytics and insights
- [ ] Multi-language support
- [ ] Video content generation
- [ ] Social media integration
- [ ] Custom team/league support

---

**Built with ❤️ for sports journalism** 