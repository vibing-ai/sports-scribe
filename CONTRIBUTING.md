# Contributing to Sport Scribe

Thank you for your interest in contributing to Sport Scribe! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

Before contributing, ensure you have:

- Node.js 18+ and npm
- Python 3.11+ and pip
- Git
- A Supabase account
- An OpenAI API key

### Development Environment Setup

**CRITICAL: Python Virtual Environment Setup**
```bash
cd ai-backend
python3.11 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
pip install -r requirements-dev.txt
```

**Verify Setup:**
```bash
# Test Python environment
python --version  # Should show 3.11+
ruff check .       # Should run without errors
ruff format .      # Should format code

# Test Node environment
cd ../web
node --version     # Should show 18+
npm install        # Install dependencies
npm run build      # Should build successfully
```

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
   cp env.example .env
   cp web/env.local.example web/.env.local
   cp ai-backend/env.example ai-backend/.env
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
# Testing framework currently in development
# For now, run linting and type checking:
npm run lint               # Frontend linting
cd ai-backend && source venv/bin/activate && ruff check .  # Backend linting
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

### Python (Backend)

**Formatter**: Ruff
**Linter**: Ruff

We use Ruff for both linting and formatting with these settings:
- Line length: 100 characters (configured in ruff.toml)
- Import sorting included
- Fast performance with same rules as Black + flake8

**Running Tools:**
```bash
ruff format .     # Format code
ruff check .      # Lint code
ruff check --fix . # Fix auto-fixable issues
```

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
- Use HeroUI components when possible
- Follow Tailwind CSS utility-first approach
- Use meaningful component and variable names

**TypeScript Tools:**

**Formatter**: ESLint (with formatting rules)
**Linter**: ESLint

We use ESLint for both linting and formatting (Prettier not separately configured)

**Running Tools:**
```bash
npm run lint      # Lint and format
npm run lint:fix  # Fix auto-fixable issues
```

### Database

- Use descriptive table and column names
- Add proper indexes for performance
- Include comments for complex queries
- Use migrations for schema changes

## 🔧 Environment Setup

### Local Development

1. **Python Backend Setup**:
   ```bash
   cd ai-backend
   python3.11 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   pip install -r requirements-dev.txt
   ```

2. **Frontend Setup**:
   ```bash
   cd web
   npm install
   npm run dev
   ```

3. **Database Setup**:
   ```bash
   # Requires Supabase CLI
   supabase start
   supabase db reset
   ```

### Code Quality Tools

We use Ruff for Python code formatting and linting:

```bash
# Python (AI Backend)
cd ai-backend
ruff format .     # Code formatting
ruff check .      # Linting
```

### Pre-commit Hooks

Set up pre-commit hooks to automatically run quality checks:

```bash
pre-commit install
```

## 🧪 Testing

Testing framework currently in development. For now, focus on:

- Code quality through linting
- Type checking with TypeScript/mypy
- Manual testing of features
- Integration testing with actual API calls

## 📖 Documentation

When contributing, please:

- Update relevant documentation
- Add docstrings to new functions
- Update API documentation for new endpoints
- Include examples in code comments

## 🤝 Code Review Process

1. **Pull Request Requirements**:
   - Clear description of changes
   - Link to related issues
   - Tests passing (when available)
   - Code review approval

2. **Review Criteria**:
   - Code quality and standards
   - Documentation completeness
   - Performance impact
   - Security considerations

## 💬 Getting Help

- Check existing documentation
- Look at similar implementations
- Ask questions in issues or discussions
- Reach out to maintainers

## 🎉 Recognition

Contributors will be recognized in:
- README acknowledgments
- Release notes
- Hall of fame (coming soon)

Thank you for contributing to Sport Scribe! 🏆
