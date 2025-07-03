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

### TypeScript Tools

**Formatter**: ESLint (with formatting rules)
**Linter**: ESLint

We use ESLint for both linting and formatting (Prettier not separately configured)

**Running Tools:**
```bash
npm run lint      # Lint and format
npm run lint:fix  # Fix auto-fixable issues
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
        return GameData(**response)
    except HTTPException as e:
        logger.error(f"Failed to collect game data: {e}")
        raise DataCollectionError(f"API request failed: {e}")
    except ValidationError as e:
        logger.error(f"Invalid game data format: {e}")
        raise DataCollectionError(f"Data validation failed: {e}")
```

## 📊 Database Standards

### Schema Design

```sql
-- Use descriptive table names
CREATE TABLE articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    summary TEXT,
    author TEXT NOT NULL,
    sport VARCHAR(50) NOT NULL,
    league VARCHAR(50),
    game_id UUID REFERENCES games(id),
    status article_status NOT NULL DEFAULT 'draft',
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX idx_articles_sport ON articles(sport);
CREATE INDEX idx_articles_published_at ON articles(published_at) WHERE status = 'published';
CREATE INDEX idx_articles_game_id ON articles(game_id);
```

### Database Guidelines

- **Use UUIDs** for primary keys
- **Add foreign key constraints** for data integrity
- **Use enum types** for status columns
- **Add indexes** for frequently queried columns
- **Use snake_case** for table and column names
- **Add meaningful comments** for complex tables

## 📝 Documentation Standards

### Code Documentation

```python
def generate_article(
    game_id: str,
    focus_type: str,
    target_length: int = 2000
) -> Article:
    """Generate a sports article based on game data.

    Args:
        game_id: Unique identifier for the game
        focus_type: Type of article focus ('recap', 'analysis', 'preview')
        target_length: Target word count for the article

    Returns:
        Generated article with title, content, and metadata

    Raises:
        GameNotFoundError: If game_id doesn't exist
        ArticleGenerationError: If article generation fails

    Example:
        >>> article = generate_article("game-123", "recap", 1500)
        >>> print(article.title)
        "Lakers Beat Warriors in Overtime Thriller"
    """
```

### API Documentation

```python
@app.post("/api/articles", response_model=ArticleResponse)
async def create_article(
    request: ArticleRequest,
    current_user: User = Depends(get_current_user)
) -> ArticleResponse:
    """Create a new article.

    **Parameters:**
    - **request**: Article creation request
    - **current_user**: Authenticated user

    **Returns:**
    - Article with generated content and metadata

    **Raises:**
    - **400**: Invalid request data
    - **401**: Authentication required
    - **500**: Article generation failed
    """
```

## 🧪 Testing Standards

### Test Organization

```
tests/
├── test_agents.py       # Agent functionality tests
├── test_tools.py        # Tool integration tests
├── test_api.py          # API endpoint tests
├── fixtures/            # Test data fixtures
└── conftest.py          # Pytest configuration
```

### Test Guidelines

```python
# Use descriptive test names
def test_writer_agent_generates_article_with_valid_game_data():
    """Test that writer agent generates article when given valid game data."""

def test_writer_agent_raises_error_with_invalid_game_id():
    """Test that writer agent raises error for invalid game ID."""

# Use fixtures for test data
@pytest.fixture
def sample_game_data():
    return {
        "id": "game-123",
        "teams": ["Lakers", "Warriors"],
        "score": {"Lakers": 120, "Warriors": 115},
        "status": "final"
    }

# Test edge cases
def test_article_generation_with_empty_game_data():
    """Test article generation handles empty game data gracefully."""
```

## 🔧 Configuration Standards

### Environment Variables

```python
# Use Pydantic for configuration
from pydantic import BaseSettings

class Settings(BaseSettings):
    openai_api_key: str
    supabase_url: str
    supabase_key: str
    database_url: str
    log_level: str = "INFO"

    class Config:
        env_file = ".env"
        case_sensitive = False

settings = Settings()
```

### Configuration Guidelines

- **Use environment variables** for sensitive data
- **Provide default values** for optional settings
- **Validate configuration** on startup
- **Use type hints** for all configuration fields
- **Document required vs optional** settings

## 🚀 Performance Standards

### Database Optimization

```python
# Use connection pooling
engine = create_async_engine(
    DATABASE_URL,
    pool_size=20,
    max_overflow=30,
    pool_pre_ping=True
)

# Use indexes for queries
@app.get("/api/articles")
async def get_articles(
    sport: str = None,
    limit: int = 20,
    offset: int = 0
):
    query = select(Article)
    if sport:
        query = query.where(Article.sport == sport)  # Uses index
    query = query.limit(limit).offset(offset)
```

### API Performance

```python
# Use async/await for I/O operations
async def fetch_game_data(game_id: str) -> GameData:
    async with httpx.AsyncClient() as client:
        response = await client.get(f"/api/games/{game_id}")
        return GameData(**response.json())

# Cache frequently accessed data
@lru_cache(maxsize=128)
def get_team_info(team_id: str) -> TeamInfo:
    return TeamInfo.from_database(team_id)
```

## 🔒 Security Standards

### Data Protection

```python
# Never log sensitive data
logger.info(f"Processing game {game_id}")  # Good
logger.info(f"API key: {api_key}")        # Bad

# Use environment variables for secrets
API_KEY = os.getenv("OPENAI_API_KEY")

# Validate all input data
class ArticleRequest(BaseModel):
    game_id: str = Field(..., regex=r'^[a-zA-Z0-9-]+$')
    focus_type: str = Field(..., regex=r'^(recap|analysis|preview)$')
```

### Authentication

```python
# Use proper authentication middleware
@app.middleware("http")
async def auth_middleware(request: Request, call_next):
    if request.url.path.startswith("/api/"):
        token = request.headers.get("Authorization")
        if not token or not validate_token(token):
            return JSONResponse(
                status_code=401,
                content={"error": "Authentication required"}
            )
    return await call_next(request)
```

## 📚 Resources

### Python Resources
- [PEP 8 Style Guide](https://pep8.org/)
- [Ruff Documentation](https://docs.astral.sh/ruff/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)

### TypeScript Resources
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Best Practices](https://react.dev/learn)
- [ESLint Configuration](https://eslint.org/docs/user-guide/configuring/)

### Tools
- **Ruff**: Python linting and formatting
- **ESLint**: TypeScript linting
- **Tailwind CSS**: Utility-first styling
- **HeroUI**: React component library

Following these coding standards ensures consistency, maintainability, and quality across the Sport Scribe codebase.
