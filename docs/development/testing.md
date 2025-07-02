# Testing Guide

This document outlines the testing strategy, tools, and best practices for the Sport Scribe project.

## Overview

Sport Scribe uses a comprehensive testing strategy that includes unit tests, integration tests, end-to-end tests, and performance tests across both the AI backend and web frontend.

## Testing Stack

### Backend (Python/FastAPI)

- **pytest** - Primary testing framework
- **pytest-asyncio** - Async test support
- **httpx** - HTTP client for API testing
- **factory_boy** - Test data factories
- **pytest-mock** - Mocking utilities
- **coverage** - Code coverage reporting

### Frontend (Next.js/React)

- **Jest** - JavaScript testing framework
- **React Testing Library** - Component testing
- **Playwright** - End-to-end testing
- **MSW (Mock Service Worker)** - API mocking
- **@testing-library/jest-dom** - Custom Jest matchers

## Test Structure

### Backend Tests (`ai-backend/tests/`)

```
tests/
├── __init__.py
├── conftest.py              # Shared fixtures and configuration
├── test_agents.py           # Agent functionality tests
├── test_tools.py            # Tool integration tests
├── unit/                    # Unit tests
│   ├── test_data_collector.py
│   ├── test_editor.py
│   ├── test_researcher.py
│   └── test_writer.py
├── integration/             # Integration tests
│   ├── test_api_endpoints.py
│   ├── test_database.py
│   └── test_external_apis.py
└── e2e/                     # End-to-end tests
    └── test_article_generation.py
```

### Frontend Tests (`web/`)

```
__tests__/                   # Test files
├── components/
│   ├── articles/
│   └── ui/
├── hooks/
├── lib/
└── pages/
jest.config.js              # Jest configuration
playwright.config.ts        # Playwright configuration
```

## Running Tests

### Backend Tests

```bash
# Run all tests
cd ai-backend
pytest

# Run with coverage
pytest --cov=. --cov-report=html

# Run specific test file
pytest tests/test_agents.py

# Run specific test
pytest tests/test_agents.py::test_writer_agent_creation

# Run tests with verbose output
pytest -v

# Run only unit tests
pytest tests/unit/

# Run only integration tests
pytest tests/integration/
```

### Frontend Tests

```bash
# Run all tests
cd web
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- components/articles/article-card.test.tsx

# Run end-to-end tests
npm run test:e2e

# Run e2e tests in headed mode
npm run test:e2e:headed
```

## Test Categories

### 1. Unit Tests

Test individual functions, classes, and components in isolation.

#### Backend Unit Test Example

```python
# tests/unit/test_writer.py
import pytest
from unittest.mock import Mock, patch
from agents.writer import WriterAgent
from config.agent_config import WriterConfig

class TestWriterAgent:
    @pytest.fixture
    def writer_config(self):
        return WriterConfig(
            model="gpt-4",
            max_tokens=2000,
            temperature=0.7
        )

    @pytest.fixture
    def writer_agent(self, writer_config):
        return WriterAgent(config=writer_config)

    def test_writer_initialization(self, writer_agent):
        assert writer_agent.config.model == "gpt-4"
        assert writer_agent.status == "ready"

    @patch('agents.writer.OpenAI')
    async def test_generate_article(self, mock_openai, writer_agent):
        # Mock OpenAI response
        mock_response = Mock()
        mock_response.choices[0].message.content = "Generated article content"
        mock_openai.return_value.chat.completions.create.return_value = mock_response

        game_data = {"home_team": "Lakers", "away_team": "Warriors"}
        result = await writer_agent.generate_article(game_data)

        assert "Generated article content" in result
        mock_openai.return_value.chat.completions.create.assert_called_once()
```

#### Frontend Unit Test Example

```typescript
// __tests__/components/articles/article-card.test.tsx
import { render, screen } from '@testing-library/react';
import { ArticleCard } from '@/components/articles/article-card';
import type { Article } from '@/shared/types/article';

const mockArticle: Article = {
  id: '1',
  title: 'Lakers Beat Warriors 120-110',
  summary: 'Great game between two rivals',
  author: 'AI Sports Writer',
  sport: 'basketball',
  league: 'NBA',
  status: 'published',
  published_at: new Date('2024-01-15'),
  created_at: new Date('2024-01-15'),
  updated_at: new Date('2024-01-15'),
  tags: ['NBA', 'Lakers', 'Warriors'],
  reading_time_minutes: 5,
  seo_keywords: ['Lakers', 'Warriors', 'NBA'],
  content: 'Full article content...'
};

describe('ArticleCard', () => {
  it('renders article information correctly', () => {
    render(<ArticleCard article={mockArticle} />);

    expect(screen.getByText('Lakers Beat Warriors 120-110')).toBeInTheDocument();
    expect(screen.getByText('Great game between two rivals')).toBeInTheDocument();
    expect(screen.getByText('AI Sports Writer')).toBeInTheDocument();
    expect(screen.getByText('5 min read')).toBeInTheDocument();
  });

  it('displays tags correctly', () => {
    render(<ArticleCard article={mockArticle} />);

    expect(screen.getByText('NBA')).toBeInTheDocument();
    expect(screen.getByText('Lakers')).toBeInTheDocument();
    expect(screen.getByText('Warriors')).toBeInTheDocument();
  });
});
```

### 2. Integration Tests

Test interactions between different components, services, and external APIs.

#### Backend Integration Test Example

```python
# tests/integration/test_api_endpoints.py
import pytest
from httpx import AsyncClient
from main import app

@pytest.mark.asyncio
class TestArticleEndpoints:
    async def test_create_article_generation_request(self):
        async with AsyncClient(app=app, base_url="http://test") as client:
            request_data = {
                "game_id": "123e4567-e89b-12d3-a456-426614174000",
                "focus_type": "game_recap",
                "target_length": 800,
                "include_stats": True,
                "tone": "professional"
            }

            response = await client.post("/api/articles/generate", json=request_data)

            assert response.status_code == 201
            data = response.json()
            assert data["status"] == "pending"
            assert "id" in data

    async def test_get_articles_by_sport(self):
        async with AsyncClient(app=app, base_url="http://test") as client:
            response = await client.get("/api/articles?sport=basketball")

            assert response.status_code == 200
            data = response.json()
            assert "articles" in data
            assert "pagination" in data
```

### 3. End-to-End Tests

Test complete user workflows from frontend to backend.

#### E2E Test Example

```typescript
// __tests__/e2e/article-generation.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Article Generation Flow', () => {
  test('user can generate article from game data', async ({ page }) => {
    // Navigate to admin panel
    await page.goto('/admin');

    // Click on generate article button
    await page.click('[data-testid="generate-article-btn"]');

    // Fill out article generation form
    await page.selectOption('[data-testid="sport-select"]', 'basketball');
    await page.selectOption('[data-testid="league-select"]', 'NBA');
    await page.selectOption('[data-testid="focus-type"]', 'game_recap');
    await page.fill('[data-testid="target-length"]', '800');
    await page.check('[data-testid="include-stats"]');

    // Submit generation request
    await page.click('[data-testid="submit-generation"]');

    // Verify success message
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible();

    // Wait for article generation (with timeout)
    await page.waitForSelector('[data-testid="generated-article"]', { timeout: 60000 });

    // Verify article content
    const articleTitle = await page.textContent('[data-testid="article-title"]');
    expect(articleTitle).toBeTruthy();

    const articleContent = await page.textContent('[data-testid="article-content"]');
    expect(articleContent?.length).toBeGreaterThan(500);
  });
});
```

## Test Data and Fixtures

### Backend Fixtures

```python
# tests/conftest.py
import pytest
import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from config.settings import get_settings

@pytest.fixture(scope="session")
def event_loop():
    """Create an instance of the default event loop for the test session."""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()

@pytest.fixture
async def db_session():
    """Create a test database session."""
    settings = get_settings()
    engine = create_async_engine(settings.test_database_url)

    async_session = sessionmaker(
        engine, class_=AsyncSession, expire_on_commit=False
    )

    async with async_session() as session:
        yield session

@pytest.fixture
def sample_game_data():
    """Sample game data for testing."""
    return {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "home_team": "Los Angeles Lakers",
        "away_team": "Golden State Warriors",
        "home_score": 120,
        "away_score": 110,
        "game_date": "2024-01-15T20:00:00Z",
        "status": "final",
        "venue": "Crypto.com Arena"
    }
```

### Frontend Test Utilities

```typescript
// __tests__/utils/test-utils.tsx
import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/auth-context';
import { ThemeProvider } from '@/contexts/theme-context';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = createTestQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
```

## Mocking Strategies

### API Mocking with MSW

```typescript
// __tests__/mocks/handlers.ts
import { rest } from 'msw';
import type { Article } from '@/shared/types/article';

export const handlers = [
  rest.get('/api/articles', (req, res, ctx) => {
    const mockArticles: Article[] = [
      {
        id: '1',
        title: 'Test Article',
        content: 'Test content',
        // ... other properties
      },
    ];

    return res(
      ctx.status(200),
      ctx.json({
        articles: mockArticles,
        pagination: {
          page: 1,
          limit: 10,
          total: 1,
          total_pages: 1,
        },
      })
    );
  }),

  rest.post('/api/articles/generate', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        id: 'generated-id',
        status: 'pending',
      })
    );
  }),
];
```

## Performance Testing

### Load Testing with Locust

```python
# tests/performance/locustfile.py
from locust import HttpUser, task, between

class SportScribeUser(HttpUser):
    wait_time = between(1, 3)

    def on_start(self):
        """Called when a simulated user starts running."""
        self.client.headers.update({'Content-Type': 'application/json'})

    @task(3)
    def get_articles(self):
        """Test getting articles list."""
        self.client.get("/api/articles")

    @task(1)
    def get_article_detail(self):
        """Test getting specific article."""
        self.client.get("/api/articles/123e4567-e89b-12d3-a456-426614174000")

    @task(1)
    def generate_article(self):
        """Test article generation."""
        self.client.post("/api/articles/generate", json={
            "game_id": "123e4567-e89b-12d3-a456-426614174000",
            "focus_type": "game_recap",
            "target_length": 800
        })
```

## Continuous Integration

### GitHub Actions Test Workflow

```yaml
# .github/workflows/test.yml
name: Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  backend-tests:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: sportscribe_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v4
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'

      - name: Install dependencies
        run: |
          cd ai-backend
          pip install -r requirements-dev.txt

      - name: Run tests
        run: |
          cd ai-backend
          pytest --cov=. --cov-report=xml

      - name: Upload coverage
        uses: codecov/codecov-action@v3

  frontend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: web/package-lock.json

      - name: Install dependencies
        run: |
          cd web
          npm ci

      - name: Run tests
        run: |
          cd web
          npm run test:coverage

      - name: Run E2E tests
        run: |
          cd web
          npx playwright install
          npm run test:e2e
```

## Best Practices

### 1. Test Organization

- Group related tests in describe blocks
- Use descriptive test names that explain what is being tested
- Follow the AAA pattern: Arrange, Act, Assert
- Keep tests independent and isolated

### 2. Test Data

- Use factories for creating test data
- Avoid hardcoded values where possible
- Clean up test data after each test
- Use realistic but anonymized data

### 3. Mocking

- Mock external dependencies (APIs, databases, file systems)
- Don't mock what you're testing
- Use dependency injection to make mocking easier
- Verify mock interactions when relevant

### 4. Coverage Goals

- Aim for 80%+ code coverage
- Focus on critical business logic
- Don't chase 100% coverage at the expense of test quality
- Use coverage reports to identify untested code paths

### 5. Test Maintenance

- Regularly review and update tests
- Remove obsolete tests
- Refactor tests when code changes
- Keep test dependencies up to date

## Debugging Tests

### Backend Debugging

```bash
# Run tests with pdb debugger
pytest --pdb

# Run specific test with verbose output
pytest -v -s tests/test_agents.py::test_specific_function

# Run tests with print statements visible
pytest -s
```

### Frontend Debugging

```bash
# Run tests in debug mode
npm test -- --verbose

# Run specific test file
npm test -- --testPathPattern=article-card

# Run tests with coverage and open report
npm run test:coverage && open coverage/lcov-report/index.html
```

## Related Documentation

- [Development Setup](./getting-started.md)
- [Coding Standards](./coding-standards.md)
- [API Documentation](../api/)
- [Deployment Guide](../deployment/)
