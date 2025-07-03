# Database Setup and Deployment

This document provides comprehensive database setup and deployment instructions for the Sport Scribe project using Supabase.

## Overview

Sport Scribe uses Supabase as the primary database solution, providing:
- PostgreSQL database with real-time capabilities
- Built-in authentication and authorization
- Automatic API generation
- Row Level Security (RLS) policies
- Real-time subscriptions for live updates
- File storage for media assets

## Prerequisites

- Supabase account (sign up at [supabase.com](https://supabase.com))
- Basic knowledge of PostgreSQL
- Administrative access to create and configure projects

## Supabase Project Setup

### 1. Create a New Project

1. **Log in to Supabase Dashboard**
   - Go to [app.supabase.com](https://app.supabase.com)
   - Sign in with your account

2. **Create New Project**
   - Click "New Project"
   - Choose your organization
   - Enter project name: `sport-scribe`
   - Set a secure database password
   - Choose your region (closest to your users)
   - Click "Create new project"

3. **Wait for Setup**
   - Project creation takes 2-3 minutes
   - Note down the project URL and API keys

### 2. Database Configuration

#### Environment Variables

Add these to your environment files:

```bash
# For Next.js (.env.local)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# For AI Backend (.env)
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

#### Database Schema

The project uses a comprehensive sports journalism database schema with the following main table groups:

**Articles & Content:**
- **articles** - Sports articles and content with metadata
- **article_metadata** - Article analytics and metrics
- **article_entities** - Named entity recognition data
- **article_generation_requests** - AI generation tracking
- **article_views** - Article view tracking
- **article_comments** - User comments on articles

**Sports Data:**
- **games** - Game schedules, scores, and details
- **teams** - Team information and metadata
- **players** - Player profiles and information
- **venues** - Stadium and venue information
- **game_stats** - Team performance statistics
- **player_game_stats** - Individual player performance
- **game_moments** - Key events during games
- **player_injuries** - Injury tracking
- **team_season_stats** - Season-long team statistics

**User Management:**
- **user_profiles** - Extended user information
- **user_permissions** - Role-based access control
- **user_sessions** - Session management
- **user_activity_log** - User activity tracking
- **user_api_keys** - API key management
- **user_notifications** - Notification system

**System Configuration:**
- **system_config** - Application configuration
- **agent_configs** - AI agent configuration (in agents schema)

### 3. Database Schema Setup

#### Method 1: Using Supabase Dashboard

1. **Navigate to SQL Editor**
   - Go to your project dashboard
   - Click "SQL Editor" in the sidebar
   - Create a new query

2. **Execute Schema Files**

   The project includes comprehensive database schema files in the `shared/schemas/database/` directory:

   ```sql
   -- Run the complete initialization script
   \i shared/schemas/database/init.sql

   -- Then run individual schema files
   \i shared/schemas/database/users.sql
   \i shared/schemas/database/games.sql
   \i shared/schemas/database/articles.sql
   ```

   Or copy and paste the SQL content from these files into the Supabase SQL Editor:
   - `shared/schemas/database/init.sql` - System initialization and configuration
   - `shared/schemas/database/users.sql` - User management and permissions
   - `shared/schemas/database/games.sql` - Sports data (games, teams, players, venues)
   - `shared/schemas/database/articles.sql` - Articles and content management

3. **Create Indexes**
   ```sql
   -- Performance indexes
   CREATE INDEX idx_articles_status ON articles(status);
   CREATE INDEX idx_articles_published_at ON articles(published_at);
   CREATE INDEX idx_articles_category_id ON articles(category_id);
   CREATE INDEX idx_articles_author_id ON articles(author_id);
   CREATE INDEX idx_generation_logs_article_id ON generation_logs(article_id);
   ```

#### Method 2: Using Database Migrations

1. **Create Migration Files**
   ```bash
   # In your project root
   mkdir -p supabase/migrations
   ```

2. **Create Migration SQL**
   ```sql
   -- supabase/migrations/20240101000001_initial_schema.sql
   -- Add the same SQL as above
   ```

3. **Apply Migrations**
   ```bash
   # Install Supabase CLI
   npm install -g supabase-cli

   # Link to your project
   supabase link --project-ref your-project-id

   # Push migrations
   supabase db push
   ```

### 4. Row Level Security (RLS) Setup

#### Enable RLS on Tables

```sql
-- Enable RLS on all tables
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE generation_logs ENABLE ROW LEVEL SECURITY;
```

#### Create RLS Policies

```sql
-- Articles policies
CREATE POLICY "Articles are viewable by everyone" ON articles
  FOR SELECT USING (status = 'published');

CREATE POLICY "Users can insert their own articles" ON articles
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own articles" ON articles
  FOR UPDATE USING (auth.uid() = author_id);

-- Categories policies
CREATE POLICY "Categories are viewable by everyone" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Only admins can manage categories" ON categories
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Authors policies
CREATE POLICY "Authors are viewable by everyone" ON authors
  FOR SELECT USING (true);

CREATE POLICY "Users can manage their own author profile" ON authors
  FOR ALL USING (auth.uid() = user_id);

-- Sources policies (admin only)
CREATE POLICY "Only admins can manage sources" ON sources
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Generation logs policies
CREATE POLICY "Users can view their own generation logs" ON generation_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM articles
      WHERE articles.id = generation_logs.article_id
      AND articles.author_id = auth.uid()
    )
  );
```

### 5. Real-time Configuration

#### Enable Real-time

```sql
-- Enable real-time on tables
ALTER PUBLICATION supabase_realtime ADD TABLE articles;
ALTER PUBLICATION supabase_realtime ADD TABLE categories;
ALTER PUBLICATION supabase_realtime ADD TABLE authors;
```

#### Configure Real-time Policies

```sql
-- Allow real-time access for published articles
CREATE POLICY "Enable real-time for published articles" ON articles
  FOR SELECT USING (status = 'published')
  WITH CHECK (status = 'published');
```

## Authentication Setup

### 1. Enable Authentication Providers

1. **Navigate to Authentication**
   - Go to "Authentication" in the sidebar
   - Click "Settings"

2. **Configure Providers**
   - Enable Email/Password authentication
   - Configure OAuth providers (Google, GitHub, etc.)
   - Set up redirect URLs

### 2. Custom Claims

```sql
-- Function to add custom claims
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.authors (user_id, name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## Backup and Recovery

### 1. Automated Backups

Supabase provides automated backups:
- **Free tier**: 7-day backup retention
- **Pro tier**: 30-day backup retention
- **Team/Enterprise**: Custom retention periods

### 2. Manual Backups

```bash
# Using Supabase CLI
supabase db dump --local > backup.sql

# Using pg_dump (requires connection string)
pg_dump "postgresql://user:pass@host:port/db" > backup.sql
```

### 3. Point-in-Time Recovery

Available on Pro tier and above:
- Restore to any point within retention period
- Minimal downtime during recovery
- Automatic verification of restored data

## Performance Optimization

### 1. Database Optimization

```sql
-- Add performance indexes
CREATE INDEX CONCURRENTLY idx_articles_search
ON articles USING gin(to_tsvector('english', title || ' ' || content));

-- Add partial indexes
CREATE INDEX idx_articles_published
ON articles(published_at) WHERE status = 'published';

-- Add composite indexes
CREATE INDEX idx_articles_category_published
ON articles(category_id, published_at) WHERE status = 'published';
```

### 2. Query Optimization

```sql
-- Use proper query patterns
-- Good: Use indexed columns
SELECT * FROM articles WHERE status = 'published' ORDER BY published_at DESC;

-- Good: Use limits for pagination
SELECT * FROM articles WHERE status = 'published'
ORDER BY published_at DESC LIMIT 10 OFFSET 20;

-- Avoid: Full table scans
SELECT * FROM articles WHERE content LIKE '%keyword%';
```

### 3. Connection Pooling

```javascript
// Configure connection pooling in your app
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    db: {
      schema: 'public',
    },
    global: {
      headers: { 'x-my-custom-header': 'my-app-name' },
    },
  }
)
```

## Security Best Practices

### 1. Environment Variables

```bash
# Never commit these to version control
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 2. API Key Management

- **Anon Key**: Safe for client-side use
- **Service Role Key**: Server-side only, never expose
- **Rotate keys regularly** in production

### 3. Network Security

```sql
-- Restrict IP access (Enterprise feature)
-- Configure in Supabase dashboard under Settings > Network Restrictions
```

## Monitoring and Maintenance

### 1. Database Monitoring

- **Dashboard Metrics**: CPU, memory, disk usage
- **Query Performance**: Slow query logs
- **Connection Monitoring**: Active connections

### 2. Log Analysis

```sql
-- View slow queries
SELECT query, mean_exec_time, calls, total_exec_time
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;

-- View table sizes
SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### 3. Regular Maintenance

1. **Weekly Tasks**
   - Review slow query logs
   - Monitor storage usage
   - Check backup status

2. **Monthly Tasks**
   - Review and optimize indexes
   - Update table statistics
   - Security audit

3. **Quarterly Tasks**
   - Review RLS policies
   - Update documentation
   - Disaster recovery testing

## Troubleshooting

### Common Issues

1. **Connection Errors**
   ```bash
   # Check connection string
   psql "postgresql://user:pass@host:port/db"

   # Verify SSL requirements
   # Supabase requires SSL connections
   ```

2. **RLS Policy Issues**
   ```sql
   -- Debug RLS policies
   SELECT * FROM pg_policies WHERE tablename = 'articles';

   -- Test policies
   SET ROLE authenticated;
   SELECT * FROM articles;
   ```

3. **Performance Issues**
   ```sql
   -- Check for missing indexes
   SELECT * FROM pg_stat_user_tables WHERE seq_scan > 0;

   -- Analyze query performance
   EXPLAIN ANALYZE SELECT * FROM articles WHERE status = 'published';
   ```

### Debug Commands

```bash
# Check database connection
supabase status

# View database logs
supabase logs db

# Reset database (development only)
supabase db reset
```

## Migration Guide

### From Other Databases

1. **Export Data**
   ```bash
   # From PostgreSQL
   pg_dump source_db > data.sql

   # From MySQL
   mysqldump source_db > data.sql
   ```

2. **Import to Supabase**
   ```bash
   # Using Supabase CLI
   supabase db push --local data.sql

   # Using psql
   psql "connection_string" < data.sql
   ```

3. **Verify Migration**
   ```sql
   -- Check row counts
   SELECT count(*) FROM articles;

   -- Verify data integrity
   SELECT * FROM articles LIMIT 5;
   ```

## Support

For database issues:
1. Check the [Supabase documentation](https://supabase.com/docs)
2. Review the [troubleshooting guide](../development/getting-started.md#troubleshooting)
3. Contact support through the Supabase dashboard
4. Join the [Supabase Discord community](https://discord.supabase.com)

---

**Last Updated:** January 2025
**Version:** 1.0.0
