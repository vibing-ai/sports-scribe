# AI Backend Deployment

This document provides comprehensive deployment instructions for the Sport Scribe AI backend service, built with FastAPI and Python 3.11.

## Overview

The AI backend is a FastAPI-based microservice that:
- Handles AI content generation using OpenAI GPT models
- Manages agent workflows for sports article creation
- Provides REST API endpoints for the web platform
- Integrates with Supabase for data storage
- Uses containerized deployment with Docker

## Prerequisites

- Docker and Docker Compose installed
- Python 3.11+ (for local development)
- OpenAI API key
- Supabase project credentials
- Sports data API keys (optional)

## Environment Configuration

### Required Environment Variables

Create a `.env` file in the `ai-backend/` directory with the following variables:

```bash
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key
OPENAI_ORG_ID=your_openai_org_id

# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# FastAPI Configuration
FASTAPI_HOST=0.0.0.0
FASTAPI_PORT=8000
FASTAPI_RELOAD=true

# Chainlit Configuration
CHAINLIT_HOST=0.0.0.0
CHAINLIT_PORT=8001

# Sports Data APIs (optional)
RAPIDAPI_KEY=your_rapidapi_key_here
SPORTS_DATA_IO_KEY=your_sports_data_io_key
RAPID_API_KEY=your_rapid_api_key

# Logging Configuration
LOG_LEVEL=info
LOG_FORMAT=json

# Environment
DEBUG=true
ENVIRONMENT=development
```

## Deployment Methods

### 1. Docker Deployment (Recommended)

#### Production Deployment

```bash
# From project root
docker-compose up -d ai-backend
```

This will:
- Build the Docker image using `ai-backend/Dockerfile`
- Start the service on port 8000
- Enable health checks and auto-restart
- Use production configuration

#### Development Deployment

```bash
# From project root
docker-compose -f docker-compose.dev.yml up ai-backend
```

This enables:
- Hot reload for code changes
- Debug mode
- Volume mounting for live development

### 2. Local Development Setup

```bash
# Navigate to ai-backend directory
cd ai-backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
pip install -r requirements-dev.txt

# Set up environment
cp env.example .env
# Edit .env with your actual values

# Run the application
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### 3. Cloud Platform Deployment

#### Render.com (Recommended for AI Backend)

1. **Create a new Web Service**
   - Connect your GitHub repository
   - Set build command: `pip install -r requirements.txt`
   - Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

2. **Environment Variables**
   - Add all required environment variables from your `.env` file
   - Set `ENVIRONMENT=production`
   - Remove `DEBUG=true` for production

3. **Configuration**
   - Choose appropriate instance type (minimum 1GB RAM recommended)
   - Enable auto-deploy from main branch

#### Railway

1. **Deploy via CLI**
   ```bash
   npm install -g @railway/cli
   railway login
   railway init
   railway up
   ```

2. **Configure Environment**
   - Set environment variables in Railway dashboard
   - Connect to your database
   - Set up custom domain if needed

#### Docker on VPS

1. **Server Setup**
   ```bash
   # Install Docker
   curl -fsSL https://get.docker.com -o get-docker.sh
   sh get-docker.sh

   # Clone repository
   git clone https://github.com/vibing-ai/sport-scribe.git
   cd sport-scribe
   ```

2. **Deploy**
   ```bash
   # Copy and configure environment
   cp ai-backend/env.example ai-backend/.env
   # Edit .env with production values

   # Deploy
   docker-compose up -d ai-backend
   ```

## Configuration Management

### Health Checks

The service includes built-in health checks:
- Endpoint: `GET /health`
- Docker health check runs every 30 seconds
- Checks API responsiveness and basic functionality

### Logging

Configure logging in your `.env` file:
```bash
LOG_LEVEL=info          # debug, info, warning, error
LOG_FORMAT=json         # json or text
```

### Security Configuration

1. **API Keys Management**
   - Store sensitive keys in environment variables
   - Use different keys for development and production
   - Rotate API keys regularly

2. **Network Security**
   - Use HTTPS in production
   - Configure CORS properly
   - Limit API access to authorized domains

## Performance Optimization

### Scaling

1. **Horizontal Scaling**
   ```bash
   # Scale to 3 replicas
   docker-compose up -d --scale ai-backend=3
   ```

2. **Resource Allocation**
   - Minimum: 1GB RAM, 1 CPU core
   - Recommended: 2GB RAM, 2 CPU cores
   - For high traffic: 4GB RAM, 4 CPU cores

### Monitoring

1. **Application Monitoring**
   - Use FastAPI's built-in metrics
   - Monitor response times and error rates
   - Track OpenAI API usage and costs

2. **Infrastructure Monitoring**
   - Monitor CPU, memory, and disk usage
   - Set up alerts for service downtime
   - Track Docker container health

## Troubleshooting

### Common Issues

1. **Service Won't Start**
   ```bash
   # Check logs
   docker-compose logs ai-backend

   # Common causes:
   # - Missing environment variables
   # - Invalid API keys
   # - Port conflicts
   ```

2. **High Memory Usage**
   ```bash
   # Monitor memory usage
   docker stats ai-backend

   # Solutions:
   # - Increase container memory limits
   # - Optimize model loading
   # - Implement request queuing
   ```

3. **OpenAI API Errors**
   ```bash
   # Check API key validity
   curl -H "Authorization: Bearer $OPENAI_API_KEY" \
        https://api.openai.com/v1/models

   # Check rate limits and usage
   # Implement proper error handling and retries
   ```

### Debug Mode

Enable debug mode for detailed error information:
```bash
# In .env file
DEBUG=true
LOG_LEVEL=debug
```

## Backup and Recovery

### Application Backup

1. **Code Backup**
   - Keep code in version control (Git)
   - Tag releases for easy rollback
   - Backup configuration files

2. **Environment Backup**
   - Backup `.env` files securely
   - Document API keys and credentials
   - Keep deployment configurations

### Recovery Procedures

1. **Quick Recovery**
   ```bash
   # Stop current service
   docker-compose down ai-backend

   # Pull latest code
   git pull origin main

   # Restart service
   docker-compose up -d ai-backend
   ```

2. **Full Recovery**
   ```bash
   # Remove containers and volumes
   docker-compose down -v

   # Rebuild from scratch
   docker-compose build ai-backend
   docker-compose up -d ai-backend
   ```

## Maintenance

### Regular Tasks

1. **Weekly**
   - Monitor service health and performance
   - Check log files for errors
   - Review API usage and costs

2. **Monthly**
   - Update dependencies
   - Review and rotate API keys
   - Backup configuration files

3. **Quarterly**
   - Performance optimization review
   - Security audit
   - Disaster recovery testing

### Updates

1. **Code Updates**
   ```bash
   # Pull latest code
   git pull origin main

   # Rebuild and restart
   docker-compose build ai-backend
   docker-compose up -d ai-backend
   ```

2. **Dependency Updates**
   ```bash
   # Update requirements
   pip-compile requirements.in

   # Test in development first
   # Then deploy to production
   ```

## Support

For deployment issues:
1. Check the logs: `docker-compose logs ai-backend`
2. Review the [troubleshooting guide](../development/getting-started.md#troubleshooting)
3. Contact the development team with detailed error information

---

**Last Updated:** January 2025
**Version:** 1.0.0
