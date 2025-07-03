# API Endpoints

This document provides a comprehensive reference for all Sport Scribe API endpoints.

## Current API Endpoints

### Health Check
- **GET** `/health` - Service health status
  - **Status**: ✅ Implemented
  - **Response**: `{"status": "healthy"}`

### Article Generation (Basic)
- **POST** `/generate-article` - Trigger article generation
  - **Status**: 🚧 Basic implementation
  - **Note**: Currently returns placeholder responses

### Planned Endpoints
- **GET** `/api/articles` - List articles (to be implemented)
- **POST** `/api/webhooks/article-generated` - Webhook for completed articles (planned)
- **GET** `/api/agents/status` - Agent system status (planned)

### Development Notes
- API is in early development stage
- Endpoints will be added as agent system matures
- Current focus on establishing core FastAPI structure
- Authentication integration planned with Supabase

## Base URL

- **Production**: `https://api.sportscribe.com` (when deployed)
- **Staging**: `https://staging-api.sportscribe.com` (when available)
- **Development**: `http://localhost:8000`

## Common Headers

```http
Content-Type: application/json
Authorization: Bearer <jwt_token>  # Planned for future implementation
```

## Response Format

All API responses follow a consistent format:

```json
{
  "success": boolean,
  "data": any,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message"
  },
  "timestamp": "2024-01-15T10:00:00Z"
}
```

## Health Check Endpoint

### Service Health Status

```http
GET /health
```

**Description**: Check if the API service is running and healthy.

**Request**: No parameters required

**Response**:
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "version": "1.0.0",
    "uptime": "2h 15m 30s"
  },
  "timestamp": "2024-01-15T10:00:00Z"
}
```

**Status Codes**:
- `200 OK` - Service is healthy
- `503 Service Unavailable` - Service is unhealthy

## Article Generation Endpoints

### Generate Article (Basic)

```http
POST /generate-article
```

**Description**: Generate a sports article using AI agents (basic implementation).

**Request Body**:
```json
{
  "game_id": "string",
  "focus_type": "recap" | "analysis" | "preview",
  "target_length": 1500,
  "sport": "basketball" | "football" | "baseball" | "soccer" | "hockey"
}
```

**Example Request**:
```bash
curl -X POST http://localhost:8000/generate-article \
  -H "Content-Type: application/json" \
  -d '{
    "game_id": "lakers-warriors-2024-01-15",
    "focus_type": "recap",
    "target_length": 1200,
    "sport": "basketball"
  }'
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Lakers Beat Warriors in Thrilling Matchup",
    "content": "Generated article content here...",
    "status": "generated",
    "word_count": 1180,
    "generated_at": "2024-01-15T20:00:00Z"
  },
  "timestamp": "2024-01-15T20:00:00Z"
}
```

**Status Codes**:
- `200 OK` - Article generated successfully
- `400 Bad Request` - Invalid request data
- `500 Internal Server Error` - Generation failed

**Error Example**:
```json
{
  "success": false,
  "error": {
    "code": "GENERATION_FAILED",
    "message": "Failed to generate article due to AI service error"
  },
  "timestamp": "2024-01-15T20:00:00Z"
}
```

## Planned API Endpoints

The following endpoints are planned for future implementation:

### Articles Management

#### List Articles
```http
GET /api/articles
```

**Planned Parameters**:
- `page` (integer): Page number (default: 1)
- `limit` (integer): Items per page (default: 20, max: 100)
- `sport` (string): Filter by sport
- `status` (string): Filter by status (draft, published, archived)
- `search` (string): Search in title and content

#### Get Article by ID
```http
GET /api/articles/{article_id}
```

#### Update Article
```http
PUT /api/articles/{article_id}
```

#### Delete Article
```http
DELETE /api/articles/{article_id}
```

### Agent System Endpoints

#### Agent Status
```http
GET /api/agents/status
```

**Planned Response**:
```json
{
  "success": true,
  "data": {
    "data_collector": {
      "status": "active",
      "last_execution": "2024-01-15T19:55:00Z",
      "success_rate": 0.95
    },
    "writer": {
      "status": "active",
      "last_execution": "2024-01-15T19:58:00Z",
      "success_rate": 0.92
    }
  }
}
```

### Webhooks

#### Article Generation Complete
```http
POST /api/webhooks/article-generated
```

**Planned Usage**: Notify external systems when article generation completes.

## Error Handling

### Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": "Additional technical details (optional)"
  },
  "timestamp": "2024-01-15T10:00:00Z"
}
```

### Common Error Codes

- `INVALID_REQUEST` - Request validation failed
- `GENERATION_FAILED` - Article generation failed
- `SERVICE_UNAVAILABLE` - External service unavailable
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `INTERNAL_ERROR` - Unexpected server error

### HTTP Status Codes

- `200 OK` - Request successful
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required (planned)
- `403 Forbidden` - Access denied (planned)
- `404 Not Found` - Resource not found
- `429 Too Many Requests` - Rate limit exceeded (planned)
- `500 Internal Server Error` - Server error
- `503 Service Unavailable` - Service temporarily unavailable

## Rate Limiting (Planned)

Future rate limiting will be implemented:

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

## Authentication (Planned)

Future authentication will use Supabase Auth:

```http
Authorization: Bearer <jwt_token>
```

## API Versioning (Planned)

Future API versioning strategy:

- **Header-based**: `Accept: application/vnd.sportscribe.v1+json`
- **URL-based**: `/api/v1/articles`

## Development Guidelines

### API Design Principles
- RESTful design patterns
- Consistent response formats
- Comprehensive error handling
- Clear documentation
- Backward compatibility

### Testing Endpoints

```bash
# Health check
curl http://localhost:8000/health

# Article generation (when implemented)
curl -X POST http://localhost:8000/generate-article \
  -H "Content-Type: application/json" \
  -d '{"game_id": "test-game", "focus_type": "recap"}'
```

### Development Server

Start the FastAPI development server:

```bash
cd ai-backend
source venv/bin/activate
python -m uvicorn main:app --reload --port 8000
```

Access API documentation:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Implementation Status

### Current Implementation ✅
- [x] FastAPI server setup
- [x] Health check endpoint
- [x] Basic article generation endpoint structure
- [x] Error handling framework
- [x] Response format standardization

### In Progress 🚧
- [ ] Complete article generation implementation
- [ ] Request validation
- [ ] Logging and monitoring
- [ ] Docker containerization

### Planned 📋
- [ ] Authentication and authorization
- [ ] Rate limiting
- [ ] Webhooks
- [ ] Agent status endpoints
- [ ] Article management endpoints
- [ ] API versioning
- [ ] Comprehensive testing

## Related Documentation

- [Getting Started](../development/getting-started.md)
- [Multi-Agent Design](../architecture/multi-agent-design.md)
- [System Overview](../architecture/system-overview.md)
- [Deployment Guide](../deployment/ai-backend.md)
