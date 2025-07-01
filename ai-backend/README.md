# AI Backend - Sport Scribe

## Overview
Multi-agent AI system for generating sports articles using OpenAI Agent SDK.

## Architecture
- **Data Collector Agent**: Gathers game data from sports APIs
- **Research Agent**: Provides contextual background and analysis
- **Writing Agent**: Generates engaging sports articles
- **Editor Agent**: Reviews and refines article quality

## Tech Stack
- **Python 3.11+**: Modern Python with type hints
- **FastAPI**: High-performance web framework for APIs
- **OpenAI Agent SDK**: Multi-agent AI coordination
- **Supabase**: Real-time database and storage
- **Chainlit**: Interactive AI chat interface
- **Structlog**: Structured logging for production
- **AsyncIO**: Asynchronous programming for performance

## Setup

### Prerequisites
- Python 3.11 or higher
- OpenAI API key
- Supabase project credentials

### Installation

```bash
# Clone the repository
git clone https://github.com/vibing-ai/sports-scribe
cd sports-scribe/ai-backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Install development dependencies (optional)
pip install -r requirements-dev.txt

# Set up environment variables
cp env.example .env
# Edit .env with your API keys and configuration
# See env.example for all required variables
```

### Environment Variables

Create a `.env` file from the provided template:

```bash
cp env.example .env
```

The template includes all required variables:

```bash
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4

# Supabase Configuration (for AI agents to publish articles)
SUPABASE_URL=your_supabase_project_url_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# API-Football Configuration (RapidAPI)
RAPIDAPI_KEY=your_rapidapi_key_here
API_FOOTBALL_BASE_URL=https://api-football-v1.p.rapidapi.com/v3

# FastAPI Configuration
FASTAPI_HOST=0.0.0.0
FASTAPI_PORT=8000
FASTAPI_RELOAD=true

# Logging
LOG_LEVEL=info
LOG_FORMAT=json

# Development
DEBUG=true
ENVIRONMENT=development

# Football Settings
DEFAULT_SEASON=2024
DEFAULT_LEAGUES=premier_league,la_liga,serie_a,bundesliga,ligue_1
```

## Running the Application

### Development Mode
```bash
# Run with auto-reload
python main.py

# Or using uvicorn directly
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### Production Mode
```bash
# Run in production mode
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

### Using Docker
```bash
# Build the image
docker build -t sport-scribe-ai .

# Run the container
docker run -p 8000:8000 --env-file .env sport-scribe-ai
```

## API Endpoints

### Health Check
```
GET /health
```
Returns system health status and agent availability.

### Generate Article
```
POST /generate-article
```
Generate a sports article using the multi-agent system.

**Request Body:**
```json
{
  "game_id": "string",
  "article_type": "game_recap",
  "target_length": 800,
  "priority": "normal"
}
```

**Response:**
```json
{
  "article_id": "string",
  "status": "completed",
  "content": "Generated article content...",
  "metadata": {
    "review_feedback": {},
    "word_count": 785,
    "generation_time": "2024-01-15T10:30:00Z"
  }
}
```

## Configuration

### Agent Configuration
Agent personalities and capabilities are configured in `config/agent_config.py`. Key settings include:

- **Temperature**: Controls creativity vs. consistency
- **Max Tokens**: Limits response length
- **System Prompts**: Defines agent personality and instructions
- **Tools**: Available tools for each agent

### Application Settings
Global settings are managed in `config/settings.py` and loaded from environment variables.

## Testing

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=. --cov-report=html

# Run specific test file
pytest tests/test_agents.py

# Run with verbose output
pytest -v
```

## Code Quality

This project uses several tools for maintaining code quality:

```bash
# Format code
black .
isort .

# Lint code
ruff check .
ruff check . --fix  # Auto-fix issues

# Type checking
mypy .

# Run all quality checks
pre-commit run --all-files
```

## Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the existing code style
   - Add tests for new functionality
   - Update documentation as needed

3. **Run quality checks**
   ```bash
   pre-commit run --all-files
   pytest
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

5. **Push and create a PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## Project Structure

```
ai-backend/
├── agents/                 # AI agent implementations
│   ├── data_collector.py   # Data collection agent
│   ├── researcher.py       # Research agent
│   ├── writer.py          # Writing agent
│   └── editor.py          # Editing agent
├── tools/                 # Utility tools for agents
│   ├── sports_apis.py     # Sports API clients
│   ├── web_search.py      # Web scraping tools
│   └── data_validation.py # Data validation utilities
├── config/                # Configuration files
│   ├── settings.py        # Application settings
│   └── agent_config.py    # Agent configurations
├── utils/                 # Shared utilities
│   ├── helpers.py         # General helper functions
│   └── logging.py         # Logging configuration
├── tests/                 # Test files
├── main.py               # FastAPI application entry point
├── requirements.txt      # Production dependencies
├── requirements-dev.txt  # Development dependencies
├── Dockerfile           # Container configuration
├── ruff.toml           # Linting configuration
├── mypy.ini            # Type checking configuration
└── .pre-commit-config.yaml # Pre-commit hooks
```

## Deployment

### Docker Deployment
```bash
# Build and run with docker-compose
docker-compose up --build

# Or build manually
docker build -t sport-scribe-ai .
docker run -p 8000:8000 --env-file .env sport-scribe-ai
```

### Cloud Deployment
The application is designed to be deployed on cloud platforms like:
- **Render**: Automatic deployment from GitHub
- **Railway**: Easy Docker deployment
- **Google Cloud Run**: Serverless container deployment
- **AWS ECS**: Managed container orchestration

## Monitoring and Observability

- **Structured Logging**: All logs are structured using structlog
- **Health Checks**: Built-in health endpoints for monitoring
- **Error Tracking**: Comprehensive error handling and logging
- **Performance Metrics**: Request timing and agent performance tracking

## Contributing

Please read the main project's CONTRIBUTING.md for guidelines on:
- Code style and standards
- Testing requirements
- Documentation expectations
- Pull request process

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details. 