# Sport Scribe Documentation

Welcome to the Sport Scribe documentation! This guide provides comprehensive
information about our AI-powered sports journalism platform.

## 📚 Documentation Structure

### Getting Started

- [**Getting Started Guide**](development/getting-started.md) - Complete setup and installation instructions
- [**Contributing Guidelines**](../CONTRIBUTING.md) - How to contribute to the project
- [**Coding Standards**](development/coding-standards.md) - Development guidelines and best practices

### Architecture

- [**System Overview**](architecture/system-overview.md) - High-level architecture and design decisions
- [**Multi-Agent Design**](architecture/multi-agent-design.md) - AI agent system architecture
- [**Data Flow**](architecture/data-flow.md) - How data moves through the system
- [**Architecture Decision Records**](architecture/adr/README.md) - Historical design decisions

### API Reference

- [**API Endpoints**](api/endpoints.md) - REST API documentation
- [**Authentication**](api/authentication.md) - Authentication and authorization
- [**Webhooks**](api/webhooks.md) - Webhook integration guide

### Deployment

- [**Web Platform Deployment**](deployment/web-platform.md) - Frontend deployment guide
- [**AI Backend Deployment**](deployment/ai-backend.md) - Backend deployment guide
- [**Database Setup**](deployment/database-setup.md) - Database configuration and migrations

### Development

- [**Testing Guide**](development/testing.md) - Testing strategies and guidelines
- [**Coding Standards**](development/coding-standards.md) - Code quality and style guidelines

### Research & Planning

- [**Research Summary**](research/research-summary.md) - Project research and findings
- [**Implementation Journey**](research/day-4-implementation.md) - Development progress and learnings

## 🚀 Quick Navigation

### For New Contributors

1. Start with [Getting Started Guide](development/getting-started.md)
2. Review [Contributing Guidelines](../CONTRIBUTING.md)
3. Check [Coding Standards](development/coding-standards.md)
4. Explore [System Overview](architecture/system-overview.md)

### For API Integration

1. Read [API Endpoints](api/endpoints.md)
2. Set up [Authentication](api/authentication.md)
3. Configure [Webhooks](api/webhooks.md) if needed

### For Deployment

1. Follow [Database Setup](deployment/database-setup.md)
2. Deploy [AI Backend](deployment/ai-backend.md)
3. Deploy [Web Platform](deployment/web-platform.md)

## 🛠️ Technology Stack

### Frontend

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **UI Library**: Hero UI + Tailwind CSS
- **State Management**: React Context + Custom Hooks

### Backend

- **Framework**: Python FastAPI
- **AI Integration**: OpenAI SDK
- **Database**: Supabase (PostgreSQL)
- **Real-time**: WebSocket connections

### Infrastructure

- **Hosting**: Vercel (Frontend), Render (Backend)
- **Database**: Supabase Cloud
- **CI/CD**: GitHub Actions
- **Monitoring**: Supabase Dashboard + Custom Analytics

## 📖 Key Concepts

### AI Agent System

Sport Scribe uses a multi-agent architecture where specialized AI agents collaborate:

- **Data Collector**: Gathers game data from sports APIs
- **Researcher**: Analyzes team and player backgrounds
- **Writer**: Generates articles with appropriate tone
- **Editor**: Reviews and improves content quality
- **Fact Checker**: Verifies statistical accuracy

### Content Pipeline

1. **Data Collection** → Real-time sports data ingestion
2. **Research** → Background analysis and context gathering
3. **Generation** → AI-powered article creation
4. **Review** → Quality assurance and fact-checking
5. **Publishing** → Content distribution and analytics

### Database Schema

- **Articles**: Content storage with metadata
- **Games**: Sports event data and statistics
- **Teams & Players**: Entity information and relationships
- **Users**: Authentication and user management
- **Analytics**: Performance tracking and insights

## 🔧 Development Workflow

### Local Development

```bash
# 1. Clone and setup
git clone https://github.com/your-org/sport-scribe.git
cd sport-scribe

# 2. Environment setup
cp .env.example .env
# Edit .env with your API keys

# 3. Install dependencies
cd web && npm install && cd ..
cd ai-backend && pip install -r requirements.txt && cd ..

# 4. Start development servers
docker-compose -f docker-compose.dev.yml up
```

### Making Changes

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes following [coding standards](development/coding-standards.md)
3. Add tests and update documentation
4. Run quality checks: `./scripts/lint-fix.sh`
5. Submit pull request

## 🧪 Testing Strategy

- **Unit Tests**: Individual component and function testing
- **Integration Tests**: API endpoint and database testing
- **End-to-End Tests**: Full user workflow testing
- **AI Agent Tests**: Agent behavior and output validation

## 📊 Performance Considerations

- **Article Generation**: ~30-60 seconds per article
- **API Response Time**: <200ms average
- **Database Queries**: Optimized with indexes
- **Real-time Updates**: WebSocket for live data

## 🆘 Support & Help

### Getting Help

1. **Check Documentation**: Search this documentation first
2. **GitHub Issues**: Report bugs and request features
3. **GitHub Discussions**: Ask questions and share ideas
4. **Code Review**: Get help with pull requests

### Common Issues

- **Setup Problems**: See [Getting Started Guide](development/getting-started.md)
- **API Issues**: Check [API Documentation](api/endpoints.md)
- **Deployment Issues**: Review [Deployment Guides](deployment/)

## 🎯 Roadmap

### Current Sprint

- [ ] Enhanced article generation capabilities
- [ ] Improved real-time data integration
- [ ] Advanced analytics dashboard

### Future Plans

- [ ] Mobile application development
- [ ] Multi-language support
- [ ] Video content generation
- [ ] Social media integration

## 📄 License

This project is licensed under the MIT License. See [LICENSE](../LICENSE) for details.

---

**Need help?** Check our [Contributing Guidelines](../CONTRIBUTING.md) or open an issue on GitHub.
