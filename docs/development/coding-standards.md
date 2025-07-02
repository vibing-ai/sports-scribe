# Coding Standards

This document outlines the coding standards and best practices for the Sport Scribe project.

## 🎯 General Principles

- **Readability**: Code should be self-documenting and easy to understand
- **Consistency**: Follow established patterns and conventions
- **Maintainability**: Write code that is easy to modify and extend
- **Performance**: Consider performance implications of code decisions
- **Security**: Never commit secrets or expose sensitive data

## 🌐 Frontend Standards (TypeScript/React)

### File Organization

```
components/
├── ui/              # Reusable UI components
├── layout/          # Layout components (header, footer, nav)
├── articles/        # Article-specific components
├── admin/           # Admin dashboard components
└── forms/           # Form components

hooks/
├── use-articles.ts  # Article-related hooks
├── use-auth.ts      # Authentication hooks
└── use-analytics.ts # Analytics hooks

lib/
├── supabase/        # Database client and utilities
├── utils/           # General utility functions
└── validations/     # Form validation schemas
```

### TypeScript Guidelines

```typescript
// Use interfaces for object shapes
interface ArticleProps {
  article: Article;
  onEdit?: (id: string) => void;
  className?: string;
}

// Use type unions for specific values
type ArticleStatus = 'draft' | 'published' | 'archived' | 'scheduled';

// Use generics for reusable components
interface ApiResponse<T> {
  data: T;
  error?: string;
  loading: boolean;
}

// Prefer const assertions for constants
const ARTICLE_STATUSES = ['draft', 'published', 'archived'] as const;
```

### React Component Standards

```typescript
// Use functional components with hooks
export function ArticleCard({ article, onEdit, className }: ArticleProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = useCallback(() => {
    if (onEdit) {
      onEdit(article.id);
    }
  }, [article.id, onEdit]);

  return (
    <div className={cn("article-card", className)}>
      <h2>{article.title}</h2>
      <p>{article.summary}</p>
      {onEdit && (
        <button onClick={handleEdit} disabled={isLoading}>
          Edit
        </button>
      )}
    </div>
  );
}
```

### Styling Guidelines

```typescript
// Use Tailwind CSS utility classes
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">

// Use cn() utility for conditional classes
<button
  className={cn(
    "px-4 py-2 rounded-md font-medium transition-colors",
    variant === 'primary' ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900",
    disabled && "opacity-50 cursor-not-allowed"
  )}
>

// Extract complex styles to component variants
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
    },
  }
);
```

## 🐍 Backend Standards (Python)

### File Organization

```
ai-backend/
├── agents/          # AI agent implementations
├── tools/           # External API integrations
├── config/          # Configuration management
├── utils/           # Utility functions
├── models/          # Pydantic models
├── services/        # Business logic services
└── tests/           # Test files
```

### Python Code Style

```python
# Follow PEP 8 style guide
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field
import logging

logger = logging.getLogger(__name__)

class ArticleRequest(BaseModel):
    """Request model for article generation."""
    game_id: str = Field(..., description="Unique game identifier")
    focus_type: str = Field(..., description="Type of article focus")
    target_length: Optional[int] = Field(2000, description="Target word count")
    include_stats: bool = Field(True, description="Include statistical data")

class WriterAgent:
    """AI agent responsible for generating sports articles."""

    def __init__(self, config: WriterConfig) -> None:
        self.config = config
        self.client = OpenAI(api_key=config.openai_api_key)

    async def generate_article(self, request: ArticleRequest) -> Optional[str]:
        """Generate an article based on the request parameters.

        Args:
            request: Article generation request with game details

        Returns:
            Generated article content or None if generation fails

        Raises:
            ArticleGenerationError: If article generation fails
        """
        try:
            # Implementation here
            logger.info(f"Generating article for game {request.game_id}")
            return await self._generate_content(request)
        except Exception as e:
            logger.error(f"Article generation failed: {e}")
            raise ArticleGenerationError(f"Failed to generate article: {e}")
```

### Error Handling

```python
# Use custom exceptions for better error handling
class SportScribeError(Exception):
    """Base exception for Sport Scribe errors."""
    pass

class ArticleGenerationError(SportScribeError):
    """Raised when article generation fails."""
    pass

class DataCollectionError(SportScribeError):
    """Raised when data collection fails."""
    pass

# Handle errors gracefully
async def collect_game_data(game_id: str) -> Optional[GameData]:
    try:
        response = await sports_api.get_game(game_id)
        return GameData.parse_obj(response)
    except httpx.HTTPError as e:
        logger.error(f"HTTP error collecting game data: {e}")
        raise DataCollectionError(f"Failed to collect game data: {e}")
    except ValidationError as e:
        logger.error(f"Data validation error: {e}")
        raise DataCollectionError(f"Invalid game data format: {e}")
```

## 🗄️ Database Standards

### Schema Design

```sql
-- Use descriptive table and column names
CREATE TABLE article_generation_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    game_id UUID NOT NULL REFERENCES games (id),
    focus_type VARCHAR(50) NOT NULL,
    target_length INTEGER DEFAULT 2000,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),

    -- Add constraints for data integrity
    CONSTRAINT generation_focus_check CHECK (
        focus_type IN ('game_recap', 'player_spotlight', 'team_analysis')
    ),
    CONSTRAINT generation_status_check CHECK (
        status IN ('pending', 'in_progress', 'completed', 'failed')
    )
);

-- Add indexes for performance
CREATE INDEX idx_article_generation_requests_status
ON article_generation_requests (status);

CREATE INDEX idx_article_generation_requests_created_at
ON article_generation_requests (created_at DESC);
```

### Migration Guidelines

```sql
-- Always include rollback instructions
-- Migration: 001_add_article_generation_requests.sql

-- Forward migration
CREATE TABLE article_generation_requests (
    -- table definition
);

-- Rollback (in separate file: 001_add_article_generation_requests_rollback.sql)
DROP TABLE IF EXISTS article_generation_requests;
```

## 🧪 Testing Standards

### Frontend Testing

```typescript
// Use React Testing Library for component tests
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ArticleCard } from './ArticleCard';

describe('ArticleCard', () => {
  const mockArticle = {
    id: '1',
    title: 'Test Article',
    summary: 'Test summary',
    status: 'published' as const,
  };

  it('renders article information correctly', () => {
    render(<ArticleCard article={mockArticle} />);

    expect(screen.getByText('Test Article')).toBeInTheDocument();
    expect(screen.getByText('Test summary')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', async () => {
    const mockOnEdit = jest.fn();
    render(<ArticleCard article={mockArticle} onEdit={mockOnEdit} />);

    fireEvent.click(screen.getByText('Edit'));

    await waitFor(() => {
      expect(mockOnEdit).toHaveBeenCalledWith('1');
    });
  });
});
```

### Backend Testing

```python
# Use pytest for backend tests
import pytest
from unittest.mock import Mock, AsyncMock
from ai_backend.agents.writer import WriterAgent
from ai_backend.models.article import ArticleRequest

@pytest.fixture
def writer_agent():
    config = Mock()
    config.openai_api_key = "test-key"
    return WriterAgent(config)

@pytest.mark.asyncio
async def test_generate_article_success(writer_agent):
    """Test successful article generation."""
    request = ArticleRequest(
        game_id="test-game-id",
        focus_type="game_recap",
        target_length=1000
    )

    # Mock the OpenAI client
    writer_agent.client.chat.completions.create = AsyncMock(
        return_value=Mock(choices=[Mock(message=Mock(content="Generated article"))])
    )

    result = await writer_agent.generate_article(request)

    assert result is not None
    assert "Generated article" in result
    writer_agent.client.chat.completions.create.assert_called_once()

@pytest.mark.asyncio
async def test_generate_article_failure(writer_agent):
    """Test article generation failure handling."""
    request = ArticleRequest(
        game_id="test-game-id",
        focus_type="game_recap"
    )

    # Mock API failure
    writer_agent.client.chat.completions.create = AsyncMock(
        side_effect=Exception("API Error")
    )

    with pytest.raises(ArticleGenerationError):
        await writer_agent.generate_article(request)
```

## 📏 Code Quality Tools

### Linting Configuration

```json
// .eslintrc.json (Frontend)
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

```toml
# ruff.toml (Backend)
[tool.ruff]
line-length = 88
target-version = "py39"

[tool.ruff.lint]
select = [
    "E",  # pycodestyle errors
    "W",  # pycodestyle warnings
    "F",  # pyflakes
    "I",  # isort
    "B",  # flake8-bugbear
    "C4", # flake8-comprehensions
    "UP", # pyupgrade
]
ignore = [
    "E501", # line too long (handled by formatter)
]
```

### Pre-commit Hooks

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.4.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-added-large-files

  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.1.6
    hooks:
      - id: ruff
        args: [--fix, --exit-non-zero-on-fix]

  - repo: https://github.com/psf/black
    rev: 23.11.0
    hooks:
      - id: black
```

## 📝 Documentation Standards

### Code Comments

```typescript
/**
 * Generates a summary for an article based on its content.
 *
 * @param content - The full article content
 * @param maxLength - Maximum length of the summary (default: 200)
 * @returns A concise summary of the article
 *
 * @example
 * ```typescript
 * const summary = generateSummary("Long article content...", 150);
 * console.log(summary); // "Concise summary..."
 * ```
 */
function generateSummary(content: string, maxLength = 200): string {
  // Implementation
}
```

```python
def collect_game_stats(game_id: str, include_player_stats: bool = True) -> GameStats:
    """Collect comprehensive statistics for a specific game.

    Args:
        game_id: Unique identifier for the game
        include_player_stats: Whether to include individual player statistics

    Returns:
        GameStats object containing team and optionally player statistics

    Raises:
        DataCollectionError: If game data cannot be retrieved
        ValidationError: If retrieved data is invalid

    Example:
        >>> stats = collect_game_stats("game-123", include_player_stats=True)
        >>> print(stats.home_team_score)
        105
    """
```

### API Documentation

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

class ArticleResponse(BaseModel):
    """Response model for article operations."""
    id: str
    title: str
    content: str
    status: str

@app.post("/api/articles", response_model=ArticleResponse)
async def create_article(request: ArticleRequest) -> ArticleResponse:
    """Create a new article.

    - **game_id**: The ID of the game to write about
    - **focus_type**: Type of article (game_recap, player_spotlight, etc.)
    - **target_length**: Desired word count for the article

    Returns the created article with generated content.
    """
```

## 🔒 Security Standards

### Environment Variables

```bash
# Never commit actual secrets
# Use .env.example for templates
OPENAI_API_KEY=your_openai_api_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Use strong, unique keys in production
JWT_SECRET=$(openssl rand -base64 32)
ENCRYPTION_KEY=$(openssl rand -base64 32)
```

### Input Validation

```python
from pydantic import BaseModel, validator, Field

class ArticleRequest(BaseModel):
    game_id: str = Field(..., regex=r'^[a-zA-Z0-9-]+$')
    focus_type: str = Field(..., min_length=1, max_length=50)

    @validator('focus_type')
    def validate_focus_type(cls, v):
        allowed_types = ['game_recap', 'player_spotlight', 'team_analysis']
        if v not in allowed_types:
            raise ValueError(f'focus_type must be one of {allowed_types}')
        return v
```

## 🚀 Performance Guidelines

### Frontend Performance

```typescript
// Use React.memo for expensive components
export const ArticleCard = React.memo(({ article }: ArticleProps) => {
  // Component implementation
});

// Use useMemo for expensive calculations
const sortedArticles = useMemo(() => {
  return articles.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
}, [articles]);

// Use useCallback for event handlers
const handleEdit = useCallback((id: string) => {
  onEdit?.(id);
}, [onEdit]);
```

### Backend Performance

```python
# Use async/await for I/O operations
async def fetch_multiple_games(game_ids: List[str]) -> List[GameData]:
    tasks = [fetch_game_data(game_id) for game_id in game_ids]
    return await asyncio.gather(*tasks)

# Use database indexes for common queries
# Add to migration files
CREATE INDEX CONCURRENTLY idx_articles_sport_published
ON articles (sport, published_at DESC)
WHERE status = 'published';
```

## 📋 Checklist

Before submitting code, ensure:

- [ ] Code follows style guidelines (run `./scripts/lint-fix.sh`)
- [ ] All tests pass (run `./scripts/run-tests.sh`)
- [ ] Type checking passes (run `./scripts/type-check.sh`)
- [ ] Documentation is updated for new features
- [ ] No secrets or sensitive data in commits
- [ ] Meaningful commit messages using conventional commits
- [ ] Code is reviewed by at least one other developer

## 🛠️ Tools and Scripts

```bash
# Development scripts
./scripts/lint-fix.sh      # Fix linting issues
./scripts/type-check.sh    # Run type checking
./scripts/run-tests.sh     # Run all tests
./scripts/setup-dev.sh     # Setup development environment

# Frontend specific
cd web && npm run lint     # ESLint
cd web && npm run type-check # TypeScript checking
cd web && npm test         # Jest tests

# Backend specific
cd ai-backend && ruff check # Ruff linting
cd ai-backend && mypy .    # Type checking
cd ai-backend && pytest   # Run tests
```

Following these coding standards ensures consistency, maintainability, and quality across the Sport Scribe codebase.
