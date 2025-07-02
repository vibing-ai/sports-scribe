# System Overview

This document provides a high-level overview of the Sport Scribe system architecture, including its core components, data flow, and technology stack.

## Architecture Overview

Sport Scribe is a modern, cloud-native platform built using a microservices architecture pattern. The system is designed for scalability, reliability, and maintainability while providing AI-powered sports content generation capabilities.

```mermaid
graph TB
    subgraph "Client Layer"
        WEB[Web Application]
        MOBILE[Mobile App]
        API_CLIENT[API Clients]
    end
    
    subgraph "Load Balancer"
        LB[Load Balancer]
    end
    
    subgraph "Application Layer"
        WEB_SERVER[Next.js Web Server]
        API_GATEWAY[API Gateway]
    end
    
    subgraph "AI Backend Services"
        AI_API[AI Backend API]
        AGENTS[Multi-Agent System]
        SCHEDULER[Task Scheduler]
    end
    
    subgraph "Data Layer"
        SUPABASE[(Supabase)]
        REDIS[(Redis Cache)]
        STORAGE[File Storage]
    end
    
    subgraph "External Services"
        SPORTS_API[Sports APIs]
        AI_SERVICES[AI Services]
        CDN[CDN]
    end
    
    WEB --> LB
    MOBILE --> LB
    API_CLIENT --> LB
    
    LB --> WEB_SERVER
    LB --> API_GATEWAY
    
    WEB_SERVER --> SUPABASE
    API_GATEWAY --> AI_API
    
    AI_API --> AGENTS
    AI_API --> SCHEDULER
    AI_API --> SUPABASE
    AI_API --> REDIS
    
    AGENTS --> SPORTS_API
    AGENTS --> AI_SERVICES
    
    WEB_SERVER --> CDN
    STORAGE --> CDN
```

## Core Components

### 1. Web Application (Frontend)

**Technology**: Next.js 14, React, TypeScript, Tailwind CSS

The web application provides the user interface for Sport Scribe, including:

- **Public Website**: Article browsing, search, and reading
- **Admin Dashboard**: Content management, analytics, and system configuration
- **User Portal**: Profile management, API key management, and preferences

**Key Features**:
- Server-side rendering (SSR) for SEO optimization
- Real-time updates using WebSocket connections
- Responsive design for mobile and desktop
- Progressive Web App (PWA) capabilities

### 2. AI Backend Services

**Technology**: Python, FastAPI, Celery, Redis

The AI backend is responsible for automated content generation using multiple AI agents:

- **Data Collector Agent**: Gathers sports data from various APIs
- **Researcher Agent**: Analyzes data and identifies key storylines
- **Writer Agent**: Generates article content using LLMs
- **Editor Agent**: Reviews and refines generated content

**Key Features**:
- Multi-agent orchestration
- Asynchronous task processing
- Real-time generation status updates
- Quality control and content validation

### 3. Database Layer

**Technology**: Supabase (PostgreSQL), Redis

**Supabase Database**:
- Primary data storage for articles, users, games, and system configuration
- Row Level Security (RLS) for data protection
- Real-time subscriptions for live updates
- Built-in authentication and authorization

**Redis Cache**:
- Session storage and caching
- Task queue for background jobs
- Rate limiting and API throttling
- Real-time data caching

### 4. API Gateway

**Technology**: FastAPI, Supabase Edge Functions

The API gateway provides:
- RESTful API endpoints
- Authentication and authorization
- Rate limiting and request validation
- API versioning and documentation
- Webhook management

### 5. External Integrations

**Sports Data APIs**:
- ESPN API for game data and statistics
- NBA API for basketball-specific data
- Custom data aggregation services

**AI Services**:
- OpenAI GPT models for content generation
- Custom fine-tuned models for sports writing
- Content quality assessment services

## Data Flow

### Article Generation Workflow

```mermaid
sequenceDiagram
    participant User
    participant Web
    participant API
    participant AI
    participant Agents
    participant DB
    participant External
    
    User->>Web: Request article generation
    Web->>API: POST /api/articles/generate
    API->>DB: Create generation request
    API->>AI: Queue generation task
    API-->>Web: Return request ID
    Web-->>User: Show pending status
    
    AI->>Agents: Initialize agent workflow
    Agents->>External: Fetch game data
    External-->>Agents: Return sports data
    Agents->>Agents: Research & analyze
    Agents->>Agents: Generate content
    Agents->>Agents: Edit & review
    Agents->>DB: Save generated article
    AI->>API: Notify completion
    API->>Web: Send webhook/realtime update
    Web-->>User: Display generated article
```

### Real-time Data Synchronization

```mermaid
graph LR
    subgraph "Data Sources"
        SPORTS[Sports APIs]
        USER_INPUT[User Input]
        SYSTEM[System Events]
    end
    
    subgraph "Processing"
        COLLECTOR[Data Collector]
        VALIDATOR[Data Validator]
        CACHE[Redis Cache]
    end
    
    subgraph "Storage"
        DB[(Database)]
        SEARCH[Search Index]
    end
    
    subgraph "Distribution"
        WEBSOCKET[WebSocket]
        WEBHOOK[Webhooks]
        API_RESPONSE[API Responses]
    end
    
    SPORTS --> COLLECTOR
    USER_INPUT --> VALIDATOR
    SYSTEM --> COLLECTOR
    
    COLLECTOR --> CACHE
    VALIDATOR --> CACHE
    CACHE --> DB
    DB --> SEARCH
    
    DB --> WEBSOCKET
    DB --> WEBHOOK
    DB --> API_RESPONSE
```

## Technology Stack

### Frontend Technologies

| Component | Technology | Purpose |
|-----------|------------|---------|
| Framework | Next.js 14 | React-based full-stack framework |
| Language | TypeScript | Type-safe JavaScript development |
| Styling | Tailwind CSS | Utility-first CSS framework |
| State Management | Zustand | Lightweight state management |
| Data Fetching | TanStack Query | Server state management |
| Authentication | Supabase Auth | User authentication and authorization |
| Real-time | Supabase Realtime | Live data updates |

### Backend Technologies

| Component | Technology | Purpose |
|-----------|------------|---------|
| API Framework | FastAPI | High-performance Python API framework |
| Language | Python 3.11+ | Backend application development |
| Task Queue | Celery | Asynchronous task processing |
| Message Broker | Redis | Task queue and caching |
| Database | PostgreSQL | Primary data storage |
| ORM | SQLAlchemy | Database object-relational mapping |
| Validation | Pydantic | Data validation and serialization |
| Testing | pytest | Unit and integration testing |

### Infrastructure Technologies

| Component | Technology | Purpose |
|-----------|------------|---------|
| Database | Supabase | Managed PostgreSQL with real-time features |
| Hosting | Vercel (Web), Railway (API) | Cloud hosting platforms |
| CDN | Vercel Edge Network | Global content delivery |
| Monitoring | Sentry | Error tracking and performance monitoring |
| Analytics | PostHog | Product analytics and user tracking |
| CI/CD | GitHub Actions | Continuous integration and deployment |

### AI and ML Technologies

| Component | Technology | Purpose |
|-----------|------------|---------|
| LLM Provider | OpenAI GPT-4 | Large language model for content generation |
| Agent Framework | Custom Python | Multi-agent orchestration system |
| Data Processing | Pandas, NumPy | Data analysis and manipulation |
| Natural Language | spaCy | NLP processing and entity recognition |
| Content Quality | Custom Models | Content assessment and validation |

## Security Architecture

### Authentication and Authorization

```mermaid
graph TB
    subgraph "Authentication Flow"
        USER[User]
        AUTH[Supabase Auth]
        JWT[JWT Tokens]
        RLS[Row Level Security]
    end
    
    subgraph "Authorization Layers"
        API_AUTH[API Authentication]
        RBAC[Role-Based Access Control]
        PERMISSIONS[Fine-grained Permissions]
    end
    
    USER --> AUTH
    AUTH --> JWT
    JWT --> API_AUTH
    API_AUTH --> RBAC
    RBAC --> PERMISSIONS
    PERMISSIONS --> RLS
```

**Security Features**:
- JWT-based authentication with automatic refresh
- Row Level Security (RLS) for database access control
- Role-based access control (RBAC) with fine-grained permissions
- API key authentication for service-to-service communication
- Rate limiting and DDoS protection
- HTTPS/TLS encryption for all communications

### Data Protection

- **Encryption at Rest**: All data encrypted in Supabase
- **Encryption in Transit**: TLS 1.3 for all communications
- **Data Anonymization**: PII handling and user privacy protection
- **Backup and Recovery**: Automated backups with point-in-time recovery
- **Audit Logging**: Comprehensive activity logging for compliance

## Scalability and Performance

### Horizontal Scaling

```mermaid
graph TB
    subgraph "Load Distribution"
        LB[Load Balancer]
        WEB1[Web Instance 1]
        WEB2[Web Instance 2]
        API1[API Instance 1]
        API2[API Instance 2]
    end
    
    subgraph "Data Layer Scaling"
        DB_PRIMARY[(Primary DB)]
        DB_REPLICA[(Read Replica)]
        CACHE_CLUSTER[Redis Cluster]
    end
    
    subgraph "Background Processing"
        WORKER1[Worker 1]
        WORKER2[Worker 2]
        WORKER3[Worker 3]
    end
    
    LB --> WEB1
    LB --> WEB2
    LB --> API1
    LB --> API2
    
    API1 --> DB_PRIMARY
    API2 --> DB_PRIMARY
    WEB1 --> DB_REPLICA
    WEB2 --> DB_REPLICA
    
    API1 --> CACHE_CLUSTER
    API2 --> CACHE_CLUSTER
    
    API1 --> WORKER1
    API2 --> WORKER2
    API2 --> WORKER3
```

**Performance Optimizations**:
- **CDN**: Global content delivery for static assets
- **Caching**: Multi-layer caching strategy (Redis, CDN, browser)
- **Database Optimization**: Query optimization and indexing
- **Lazy Loading**: Component and data lazy loading
- **Image Optimization**: Automatic image compression and WebP conversion
- **Code Splitting**: JavaScript bundle optimization

### Monitoring and Observability

```mermaid
graph TB
    subgraph "Application Metrics"
        APP_METRICS[Application Metrics]
        CUSTOM_METRICS[Custom Business Metrics]
        PERFORMANCE[Performance Metrics]
    end
    
    subgraph "Infrastructure Metrics"
        SYSTEM_METRICS[System Metrics]
        DATABASE_METRICS[Database Metrics]
        NETWORK_METRICS[Network Metrics]
    end
    
    subgraph "Logging and Tracing"
        ERROR_TRACKING[Error Tracking]
        REQUEST_TRACING[Request Tracing]
        AUDIT_LOGS[Audit Logs]
    end
    
    subgraph "Alerting"
        ALERTS[Automated Alerts]
        DASHBOARDS[Monitoring Dashboards]
        NOTIFICATIONS[Notification Channels]
    end
    
    APP_METRICS --> ALERTS
    SYSTEM_METRICS --> ALERTS
    ERROR_TRACKING --> ALERTS
    
    ALERTS --> DASHBOARDS
    ALERTS --> NOTIFICATIONS
```

**Monitoring Tools**:
- **Sentry**: Error tracking and performance monitoring
- **PostHog**: Product analytics and user behavior tracking
- **Supabase Dashboard**: Database performance and query analysis
- **Vercel Analytics**: Web performance and Core Web Vitals
- **Custom Dashboards**: Business metrics and KPI tracking

## Deployment Architecture

### Environment Strategy

```mermaid
graph TB
    subgraph "Development"
        DEV_LOCAL[Local Development]
        DEV_BRANCH[Feature Branches]
    end
    
    subgraph "Staging"
        STAGING_WEB[Staging Web]
        STAGING_API[Staging API]
        STAGING_DB[(Staging DB)]
    end
    
    subgraph "Production"
        PROD_WEB[Production Web]
        PROD_API[Production API]
        PROD_DB[(Production DB)]
    end
    
    DEV_LOCAL --> DEV_BRANCH
    DEV_BRANCH --> STAGING_WEB
    DEV_BRANCH --> STAGING_API
    STAGING_WEB --> STAGING_DB
    STAGING_API --> STAGING_DB
    
    STAGING_WEB --> PROD_WEB
    STAGING_API --> PROD_API
    PROD_WEB --> PROD_DB
    PROD_API --> PROD_DB
```

**Deployment Strategy**:
- **Development**: Local development with hot reloading
- **Staging**: Full production-like environment for testing
- **Production**: Multi-region deployment with blue-green deployments
- **CI/CD**: Automated testing, building, and deployment
- **Rollback**: Instant rollback capabilities for production issues

## Data Architecture

### Database Schema Overview

```mermaid
erDiagram
    USERS ||--o{ ARTICLES : creates
    USERS ||--o{ API_KEYS : owns
    USERS ||--o{ USER_SESSIONS : has
    
    ARTICLES ||--o{ ARTICLE_METADATA : has
    ARTICLES ||--o{ ARTICLE_ENTITIES : contains
    ARTICLES ||--o{ ARTICLE_VIEWS : tracked_by
    ARTICLES ||--o{ ARTICLE_COMMENTS : receives
    
    GAMES ||--o{ ARTICLES : generates
    GAMES ||--|| TEAMS : home_team
    GAMES ||--|| TEAMS : away_team
    GAMES ||--o{ GAME_STATS : has
    
    TEAMS ||--o{ PLAYERS : employs
    PLAYERS ||--o{ PLAYER_STATS : has
    
    ARTICLE_GENERATION_REQUESTS ||--o{ ARTICLES : produces
```

**Key Data Entities**:
- **Users**: Authentication, profiles, and permissions
- **Articles**: Generated content with metadata and analytics
- **Games**: Sports events and statistics
- **Teams & Players**: Sports entities and their relationships
- **System Configuration**: Application settings and feature flags

## Integration Points

### External API Integrations

| Service | Purpose | Data Flow |
|---------|---------|-----------|
| ESPN API | Game data and scores | Inbound |
| NBA API | Basketball statistics | Inbound |
| OpenAI API | Content generation | Outbound |
| Webhooks | Event notifications | Outbound |
| CDN | Asset delivery | Bidirectional |

### Internal Service Communication

```mermaid
graph TB
    subgraph "Web Application"
        WEB_CLIENT[Client-side React]
        WEB_SERVER[Next.js Server]
    end
    
    subgraph "API Services"
        API_GATEWAY[API Gateway]
        AUTH_SERVICE[Auth Service]
        ARTICLE_SERVICE[Article Service]
        AI_SERVICE[AI Service]
    end
    
    subgraph "Background Services"
        TASK_QUEUE[Task Queue]
        WORKER_POOL[Worker Pool]
        SCHEDULER[Cron Scheduler]
    end
    
    WEB_CLIENT --> WEB_SERVER
    WEB_SERVER --> API_GATEWAY
    API_GATEWAY --> AUTH_SERVICE
    API_GATEWAY --> ARTICLE_SERVICE
    API_GATEWAY --> AI_SERVICE
    
    AI_SERVICE --> TASK_QUEUE
    TASK_QUEUE --> WORKER_POOL
    SCHEDULER --> TASK_QUEUE
```

## Future Architecture Considerations

### Planned Enhancements

1. **Microservices Migration**: Breaking down monolithic components
2. **Event-Driven Architecture**: Implementing event sourcing patterns
3. **Multi-Region Deployment**: Global availability and performance
4. **Advanced AI Pipeline**: Custom model training and deployment
5. **Real-time Collaboration**: Multi-user editing and collaboration features

### Scalability Roadmap

- **Phase 1**: Current architecture (1-10K users)
- **Phase 2**: Microservices and caching (10-100K users)
- **Phase 3**: Multi-region and edge computing (100K-1M users)
- **Phase 4**: Advanced ML pipeline and personalization (1M+ users)

## Related Documentation

- [Multi-Agent Design](./multi-agent-design.md)
- [Data Flow](./data-flow.md)
- [API Documentation](../api/)
- [Deployment Guide](../deployment/)
- [Development Setup](../development/getting-started.md) 