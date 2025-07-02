# Contributing to Sport Scribe

Thank you for your interest in contributing to Sport Scribe! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

Before contributing, ensure you have:

- Node.js 18+ and npm
- Python 3.9+ and pip
- Git
- A Supabase account
- An OpenAI API key

### Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/sport-scribe.git
   cd sport-scribe
   ```

2. **Set up the development environment**
   ```bash
   ./scripts/setup-dev.sh
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   cp web/.env.local.example web/.env.local
   cp ai-backend/.env.example ai-backend/.env
   # Edit the files with your actual API keys
   ```

4. **Install dependencies and start development servers**
   ```bash
   # Install dependencies
   cd web && npm install && cd ..
   cd ai-backend && pip install -r requirements.txt && cd ..
   
   # Start development servers
   docker-compose -f docker-compose.dev.yml up
   ```

## 📋 How to Contribute

### Reporting Issues

Before creating an issue, please:

1. **Search existing issues** to avoid duplicates
2. **Use the issue templates** provided
3. **Provide detailed information** including:
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (OS, Node.js version, etc.)
   - Screenshots or logs if applicable

### Suggesting Features

For feature requests:

1. **Check the roadmap** in the README
2. **Open a discussion** first for major features
3. **Use the feature request template**
4. **Explain the use case** and expected benefit

### Code Contributions

#### 1. Choose an Issue

- Look for issues labeled `good first issue` for beginners
- Check issues labeled `help wanted` for areas needing attention
- Comment on the issue to indicate you're working on it

#### 2. Create a Branch

```bash
git checkout -b feature/issue-number-short-description
# or
git checkout -b fix/issue-number-short-description
```

#### 3. Make Your Changes

- Follow the [coding standards](#coding-standards)
- Write tests for new functionality
- Update documentation as needed
- Keep commits focused and atomic

#### 4. Test Your Changes

```bash
# Run all tests
./scripts/run-tests.sh

# Run linting and formatting
./scripts/lint-fix.sh

# Type checking
./scripts/type-check.sh
```

#### 5. Commit Your Changes

Use conventional commit messages:

```bash
git commit -m "feat: add game recap generation"
git commit -m "fix: resolve database connection timeout"
git commit -m "docs: update API documentation"
git commit -m "test: add unit tests for writer agent"
```

Commit types:
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

#### 6. Push and Create a Pull Request

```bash
git push origin your-branch-name
```

Then create a pull request using the provided template.

## 🏗️ Project Structure

Understanding the codebase structure will help you contribute effectively:

```
sport-scribe/
├── ai-backend/          # Python AI system
│   ├── agents/          # AI agent implementations
│   ├── tools/           # Sports APIs and utilities
│   ├── config/          # Configuration files
│   └── tests/           # Backend tests
├── web/                 # Next.js frontend
│   ├── app/             # App router pages
│   ├── components/      # React components
│   ├── lib/             # Utilities and integrations
│   └── hooks/           # Custom React hooks
├── shared/              # Shared types and schemas
│   ├── types/           # TypeScript interfaces
│   ├── schemas/         # Database and API schemas
│   └── constants/       # Shared constants
└── docs/                # Documentation
```

## 🎯 Coding Standards

### General Principles

- **Write clean, readable code** with meaningful names
- **Follow DRY principles** (Don't Repeat Yourself)
- **Add comments** for complex logic
- **Write tests** for new functionality
- **Update documentation** when needed

### Frontend (TypeScript/React)

```typescript
// Use TypeScript interfaces
interface ArticleProps {
  article: Article;
  onEdit: (id: string) => void;
}

// Use functional components with hooks
export function ArticleCard({ article, onEdit }: ArticleProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <div className="article-card">
      {/* Component content */}
    </div>
  );
}
```

**Frontend Guidelines:**
- Use TypeScript for all new code
- Follow React hooks patterns
- Use Hero UI components when possible
- Follow Tailwind CSS utility-first approach
- Use meaningful component and variable names
- Extract reusable logic into custom hooks

### Backend (Python)

```python
from typing import Optional, List
from pydantic import BaseModel

class ArticleRequest(BaseModel):
    """Request model for article generation."""
    game_id: str
    focus_type: str
    target_length: Optional[int] = 2000

class WriterAgent:
    """AI agent responsible for generating sports articles."""
    
    def __init__(self, config: WriterConfig):
        self.config = config
        self.client = OpenAI()
    
    async def generate_article(self, request: ArticleRequest) -> Article:
        """Generate an article based on the request parameters."""
        # Implementation here
        pass
```

**Backend Guidelines:**
- Use type hints for all function parameters and return values
- Follow PEP 8 style guide
- Use Pydantic models for data validation
- Write async functions for I/O operations
- Add docstrings to classes and functions
- Handle errors gracefully with proper logging

### Database

- **Use migrations** for schema changes
- **Add indexes** for performance-critical queries
- **Follow naming conventions**: snake_case for tables and columns
- **Use foreign keys** for data integrity
- **Add comments** to complex SQL

### Testing

```typescript
// Frontend tests (Jest + Testing Library)
import { render, screen } from '@testing-library/react';
import { ArticleCard } from './ArticleCard';

describe('ArticleCard', () => {
  it('displays article title and summary', () => {
    const article = mockArticle();
    render(<ArticleCard article={article} onEdit={jest.fn()} />);
    
    expect(screen.getByText(article.title)).toBeInTheDocument();
    expect(screen.getByText(article.summary)).toBeInTheDocument();
  });
});
```

```python
# Backend tests (pytest)
import pytest
from ai_backend.agents.writer import WriterAgent

@pytest.mark.asyncio
async def test_writer_agent_generates_article():
    """Test that writer agent generates valid articles."""
    agent = WriterAgent(test_config)
    request = ArticleRequest(game_id="test-id", focus_type="game_recap")
    
    article = await agent.generate_article(request)
    
    assert article.title
    assert len(article.content) > 100
    assert article.sport == "football"
```

## 🔍 Code Review Process

### For Contributors

- **Self-review** your code before submitting
- **Respond promptly** to review feedback
- **Ask questions** if feedback is unclear
- **Be open** to suggestions and improvements

### For Reviewers

- **Be constructive** and helpful in feedback
- **Focus on** code quality, logic, and standards
- **Suggest improvements** rather than just pointing out problems
- **Approve** when the code meets standards

### Review Checklist

- [ ] Code follows project standards
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] No security vulnerabilities
- [ ] Performance considerations addressed
- [ ] Accessibility guidelines followed (frontend)

## 🚀 Release Process

### Versioning

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR** version for incompatible API changes
- **MINOR** version for new functionality (backward compatible)
- **PATCH** version for bug fixes (backward compatible)

### Release Steps

1. Update version numbers
2. Update CHANGELOG.md
3. Create release branch
4. Run full test suite
5. Deploy to staging
6. Create release tag
7. Deploy to production

## 🏷️ Labels and Workflow

### Issue Labels

- `bug` - Something isn't working
- `feature` - New feature request
- `documentation` - Documentation improvements
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `priority/high` - High priority issue
- `priority/low` - Low priority issue

### Pull Request Labels

- `breaking change` - Introduces breaking changes
- `needs review` - Ready for review
- `work in progress` - Still being worked on
- `ready to merge` - Approved and ready

## 📚 Resources

### Documentation

- [Getting Started Guide](docs/development/getting-started.md)
- [Architecture Overview](docs/architecture/system-overview.md)
- [API Documentation](docs/api/endpoints.md)
- [Coding Standards](docs/development/coding-standards.md)

### Tools and Technologies

- **Frontend**: [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), [Hero UI](https://heroui.com/)
- **Backend**: [FastAPI](https://fastapi.tiangolo.com/), [OpenAI](https://openai.com/), [Pydantic](https://pydantic.dev/)
- **Database**: [Supabase](https://supabase.com/), [PostgreSQL](https://www.postgresql.org/)
- **Testing**: [Jest](https://jestjs.io/), [pytest](https://pytest.org/)

### Learning Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)
- [FastAPI Tutorial](https://fastapi.tiangolo.com/tutorial/)
- [OpenAI API Documentation](https://platform.openai.com/docs/)

## 🤝 Community

### Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

### Communication

- **GitHub Discussions** for general questions and ideas
- **GitHub Issues** for bug reports and feature requests
- **Pull Request comments** for code-specific discussions

### Getting Help

If you need help:

1. Check the documentation
2. Search existing issues and discussions
3. Ask in GitHub Discussions
4. Tag maintainers in issues if urgent

## 🎉 Recognition

Contributors are recognized in:

- Release notes for significant contributions
- README.md contributors section
- Special recognition for first-time contributors

Thank you for contributing to Sport Scribe! Your efforts help make sports journalism more accessible and efficient. 🏆 