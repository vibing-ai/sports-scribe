# Web Platform Deployment

This document provides comprehensive deployment instructions for the Sport Scribe web platform, built with Next.js 14 and React.

## Overview

The web platform is a Next.js application that:
- Provides the main user interface for Sport Scribe
- Integrates with the AI backend for content generation
- Uses Supabase for authentication and data storage
- Implements responsive design with Tailwind CSS
- Supports both development and production deployments

## Prerequisites

- Node.js 18+ and npm/yarn
- Docker and Docker Compose (for containerized deployment)
- Supabase project credentials
- AI backend service running

## Environment Configuration

### Required Environment Variables

Create a `.env.local` file in the `web/` directory with the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Next.js Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Sport Scribe

# AI Backend Integration
NEXT_PUBLIC_API_URL=http://localhost:8000
API_URL=http://ai-backend:8000  # For Docker internal communication

# Development
NODE_ENV=development
```

### Production Environment Variables

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Next.js Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_APP_NAME=Sport Scribe

# AI Backend Integration
NEXT_PUBLIC_API_URL=https://your-api-domain.com
API_URL=https://your-api-domain.com

# Production
NODE_ENV=production
```

## Deployment Methods

### 1. Docker Deployment (Recommended)

#### Production Deployment

```bash
# From project root
docker-compose up -d web
```

This will:
- Build the Docker image using `web/Dockerfile`
- Start the service on port 3000
- Enable health checks and auto-restart
- Use production configuration

#### Development Deployment

```bash
# From project root
docker-compose -f docker-compose.dev.yml up web
```

This enables:
- Hot reload for code changes
- Development mode
- Volume mounting for live development

### 2. Local Development Setup

```bash
# Navigate to web directory
cd web

# Install dependencies
npm install

# Set up environment
cp env.local.example .env.local
# Edit .env.local with your actual values

# Run development server
npm run dev
```

The application will be available at `http://localhost:3000`.

### 3. Cloud Platform Deployment

#### Vercel (Recommended for Next.js)

1. **Deploy via Vercel CLI**
   ```bash
   npm install -g vercel
   vercel login
   vercel --prod
   ```

2. **Deploy via GitHub Integration**
   - Connect your GitHub repository to Vercel
   - Configure environment variables in Vercel dashboard
   - Enable auto-deploy from main branch

3. **Environment Variables in Vercel**
   - Add all required environment variables from your `.env.local`
   - Set `NODE_ENV=production`
   - Configure custom domain if needed

#### Netlify

1. **Deploy via Netlify CLI**
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify deploy --prod --dir=.next
   ```

2. **Build Configuration**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node.js version: 18

3. **Environment Variables**
   - Add all required environment variables in Netlify dashboard
   - Configure redirects for SPA routing

#### Railway

1. **Deploy via CLI**
   ```bash
   npm install -g @railway/cli
   railway login
   railway init
   railway up
   ```

2. **Configure Build**
   - Build command: `npm run build`
   - Start command: `npm start`
   - Add environment variables in Railway dashboard

### 4. Static Export (Optional)

For static hosting providers:

```bash
# Build static export
npm run build
npm run export

# Deploy the 'out' directory to any static hosting service
```

## Configuration Management

### Build Configuration

The `next.config.js` file handles build configuration:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // For Docker deployment
  images: {
    unoptimized: true // For static exports
  }
}

module.exports = nextConfig
```

### Performance Optimization

1. **Image Optimization**
   - Use Next.js Image component
   - Configure image domains in `next.config.js`
   - Enable WebP format for better compression

2. **Bundle Analysis**
   ```bash
   npm run analyze
   ```

3. **Caching Strategy**
   - Configure proper cache headers
   - Use SWR for data fetching
   - Implement service worker for offline support

## Monitoring and Analytics

### Health Checks

The application includes health check endpoints:
- Endpoint: `GET /api/health`
- Docker health check runs every 30 seconds
- Checks API connectivity and basic functionality

### Performance Monitoring

1. **Next.js Analytics**
   ```bash
   # Enable in next.config.js
   const nextConfig = {
     experimental: {
       instrumentationHook: true,
     },
   }
   ```

2. **Web Vitals**
   - Monitor Core Web Vitals
   - Use built-in Next.js analytics
   - Configure Google Analytics or similar

### Error Tracking

1. **Sentry Integration**
   ```bash
   npm install @sentry/nextjs
   ```

2. **Error Boundaries**
   - Implement React Error Boundaries
   - Log errors to external services
   - Provide user-friendly error messages

## Security Configuration

### Content Security Policy

Add CSP headers in `next.config.js`:

```javascript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline';"
          }
        ]
      }
    ]
  }
}
```

### Authentication Security

1. **Supabase Auth**
   - Configure proper redirect URLs
   - Use secure session management
   - Implement proper RBAC

2. **API Security**
   - Validate API requests
   - Use HTTPS in production
   - Implement rate limiting

## Scaling and Performance

### Horizontal Scaling

1. **Docker Scaling**
   ```bash
   # Scale to 3 replicas
   docker-compose up -d --scale web=3
   ```

2. **Load Balancing**
   - Configure nginx or similar
   - Use sticky sessions if needed
   - Implement health checks

### Performance Optimization

1. **Code Splitting**
   - Use dynamic imports
   - Implement route-based splitting
   - Optimize bundle sizes

2. **CDN Configuration**
   - Use Vercel Edge Network
   - Configure Cloudflare or similar
   - Optimize static asset delivery

## Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Check build logs
   npm run build --verbose

   # Common causes:
   # - Missing environment variables
   # - TypeScript errors
   # - Dependency conflicts
   ```

2. **Runtime Errors**
   ```bash
   # Check application logs
   docker-compose logs web

   # Common causes:
   # - API connection issues
   # - Missing environment variables
   # - CORS configuration
   ```

3. **Performance Issues**
   ```bash
   # Analyze bundle size
   npm run analyze

   # Check for:
   # - Large dependencies
   # - Unused code
   # - Inefficient rendering
   ```

### Debug Mode

Enable debug mode for detailed error information:

```bash
# In .env.local
NODE_ENV=development
DEBUG=true
```

## Backup and Recovery

### Application Backup

1. **Code Backup**
   - Keep code in version control (Git)
   - Tag releases for easy rollback
   - Backup configuration files

2. **Build Artifacts**
   - Backup successful builds
   - Store Docker images in registry
   - Keep deployment configurations

### Recovery Procedures

1. **Quick Recovery**
   ```bash
   # Stop current service
   docker-compose down web

   # Pull latest code
   git pull origin main

   # Restart service
   docker-compose up -d web
   ```

2. **Rollback to Previous Version**
   ```bash
   # Checkout previous version
   git checkout v1.0.0

   # Rebuild and restart
   docker-compose build web
   docker-compose up -d web
   ```

## Maintenance

### Regular Tasks

1. **Daily**
   - Monitor application health
   - Check error logs
   - Review performance metrics

2. **Weekly**
   - Update dependencies
   - Review security alerts
   - Backup configuration files

3. **Monthly**
   - Performance optimization review
   - Security audit
   - Disaster recovery testing

### Updates

1. **Code Updates**
   ```bash
   # Pull latest code
   git pull origin main

   # Rebuild and restart
   docker-compose build web
   docker-compose up -d web
   ```

2. **Dependency Updates**
   ```bash
   # Update dependencies
   npm update

   # Audit for vulnerabilities
   npm audit fix

   # Test thoroughly before deployment
   ```

## Environment-Specific Configurations

### Development

```bash
# .env.local
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Staging

```bash
# .env.local
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://staging.your-domain.com
NEXT_PUBLIC_API_URL=https://staging-api.your-domain.com
```

### Production

```bash
# .env.local
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_API_URL=https://api.your-domain.com
```

## Support

For deployment issues:
1. Check the logs: `docker-compose logs web`
2. Review the [troubleshooting guide](../development/getting-started.md#troubleshooting)
3. Test the build locally: `npm run build`
4. Contact the development team with detailed error information

---

**Last Updated:** January 2025
**Version:** 1.0.0
