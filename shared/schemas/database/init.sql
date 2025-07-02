-- Sport Scribe Database Initialization Script
-- This script sets up the complete database schema for the Sport Scribe platform

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- Create custom types and enums
DO $$ BEGIN
    -- Article status enum
    CREATE TYPE article_status_enum AS ENUM ('draft', 'published', 'archived', 'scheduled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    -- Game status enum
    CREATE TYPE game_status_enum AS ENUM ('scheduled', 'pregame', 'in_progress', 'halftime', 'overtime', 'final', 'postponed', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    -- Player status enum
    CREATE TYPE player_status_enum AS ENUM ('active', 'injured', 'suspended', 'inactive', 'retired', 'free_agent');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    -- User role enum
    CREATE TYPE user_role_enum AS ENUM ('admin', 'editor', 'writer', 'viewer', 'api_user');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create schema for AI agents if not exists
CREATE SCHEMA IF NOT EXISTS agents;

-- Grant usage on schema to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA agents TO authenticated;

-- Create role-based accounts for better security
-- Note: Roles may already exist, so we use DROP IF EXISTS first
DROP ROLE IF EXISTS app_read_role;
DROP ROLE IF EXISTS app_write_role;
DROP ROLE IF EXISTS app_admin_role;

CREATE ROLE app_read_role;
CREATE ROLE app_write_role;
CREATE ROLE app_admin_role;

-- Grant specific permissions to roles instead of authenticated directly
GRANT SELECT ON ALL TABLES IN SCHEMA public TO app_read_role;
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO app_write_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_admin_role;

GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO app_write_role;
GRANT USAGE, SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA public TO app_admin_role;

GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO app_read_role;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO app_write_role;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO app_admin_role;

-- Grant roles to authenticated users based on their role
-- This will be managed through RLS policies and application logic

-- Create a function to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a function to generate secure random API keys
CREATE OR REPLACE FUNCTION generate_api_key()
RETURNS TEXT AS $$
DECLARE
    key_length INTEGER := 32;
    chars TEXT := 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    result TEXT := '';
    i INTEGER;
BEGIN
    FOR i IN 1..key_length LOOP
        result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
    END LOOP;
    RETURN 'sk_' || result;
END;
$$ LANGUAGE plpgsql;

-- Create a function to hash API keys
CREATE OR REPLACE FUNCTION hash_api_key(api_key TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN encode(digest(api_key, 'sha256'), 'hex');
END;
$$ LANGUAGE plpgsql;

-- Create system configuration table
CREATE TABLE IF NOT EXISTS system_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(255) NOT NULL UNIQUE,
    value JSONB NOT NULL,
    description TEXT,
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert default system configuration
INSERT INTO system_config (key, value, description, is_public) VALUES
('app_name', '"Sport Scribe"', 'Application name', true),
('app_version', '"1.0.0"', 'Application version', true),
(
    'app_description',
    '"AI-Powered Sports Journalism Platform"',
    'Application description',
    true
),
('max_article_length', '10000', 'Maximum article length in characters', false),
(
    'supported_sports',
    '["football", "basketball", "baseball", "soccer", "hockey"]',
    'List of supported sports',
    true
),
(
    'article_generation_enabled',
    'true',
    'Whether AI article generation is enabled',
    false
),
(
    'comment_moderation_enabled',
    'true',
    'Whether comment moderation is enabled',
    false
),
('rate_limit_requests_per_minute', '100', 'API rate limit per minute', false),
(
    'maintenance_mode',
    'false',
    'Whether the application is in maintenance mode',
    true
)
ON CONFLICT (key) DO NOTHING;

-- Create agents configuration table
CREATE TABLE IF NOT EXISTS agents.agent_configs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agent_type VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    configuration JSONB NOT NULL DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),

    UNIQUE (agent_type, name)
);

-- Insert default agent configurations
INSERT INTO agents.agent_configs (
    agent_type, name, description, configuration
) VALUES
(
    'data_collector',
    'ESPN Data Collector',
    'Collects game data from ESPN API',
    '{"api_endpoint": "https://api.espn.com", "rate_limit": 100, "timeout": 30}'
),
(
    'data_collector',
    'Sports Reference Collector',
    'Collects historical data from Sports Reference',
    '{"api_endpoint": "https://api.sports-reference.com", "rate_limit": 60, "timeout": 45}'
),
(
    'researcher',
    'Background Researcher',
    'Researches team and player backgrounds',
    '{"max_sources": 5, "research_depth": "medium", "fact_check_enabled": true}'
),
(
    'writer',
    'Article Writer',
    'Generates sports articles from game data',
    '{"tone": "professional", "max_length": 2000, "include_stats": true, "include_quotes": false}'
),
(
    'editor',
    'Content Editor',
    'Reviews and edits generated articles',
    '{"check_grammar": true, "check_facts": true, "improve_readability": true}'
),
(
    'fact_checker',
    'Fact Checker',
    'Verifies facts in articles',
    '{"sources_required": 2, "confidence_threshold": 0.8}'
),
(
    'seo_optimizer',
    'SEO Optimizer',
    'Optimizes articles for search engines',
    '{"keyword_density_target": 0.02, "meta_description_length": 160, "title_length_max": 60}'
)
ON CONFLICT (agent_type, name) DO NOTHING;

-- Create a function to get system configuration
CREATE OR REPLACE FUNCTION get_system_config(config_key TEXT)
RETURNS JSONB AS $$
DECLARE
    config_value JSONB;
BEGIN
    SELECT value INTO config_value
    FROM system_config
    WHERE key = config_key;

    RETURN config_value;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to update system configuration
CREATE OR REPLACE FUNCTION update_system_config(
    config_key TEXT, config_value JSONB
)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE system_config
    SET value = config_value, updated_at = NOW()
    WHERE key = config_key;

    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to check if user has permission
CREATE OR REPLACE FUNCTION user_has_permission(
    user_uuid UUID, resource_name TEXT, action_name TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
    has_permission BOOLEAN := false;
    user_role TEXT;
BEGIN
    -- Get user role
    SELECT role INTO user_role FROM user_profiles WHERE id = user_uuid;

    -- Admin has all permissions
    IF user_role = 'admin' THEN
        RETURN true;
    END IF;

    -- Check specific permissions
    SELECT EXISTS(
        SELECT 1 FROM user_permissions
        WHERE user_id = user_uuid
        AND resource = resource_name
        AND action_name = ANY(actions)
        AND is_active = true
        AND (expires_at IS NULL OR expires_at > NOW())
    ) INTO has_permission;

    RETURN has_permission;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create indexes on system tables
CREATE INDEX IF NOT EXISTS idx_system_config_key ON system_config (key);
CREATE INDEX IF NOT EXISTS idx_system_config_is_public ON system_config (
    is_public
);

CREATE INDEX IF NOT EXISTS idx_agent_configs_agent_type ON agents.agent_configs (
    agent_type
);
CREATE INDEX IF NOT EXISTS idx_agent_configs_is_active ON agents.agent_configs (
    is_active
);

-- Enable RLS on system tables
ALTER TABLE system_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents.agent_configs ENABLE ROW LEVEL SECURITY;

-- RLS policies for system config
CREATE POLICY "Public can read public config" ON system_config
FOR SELECT USING (is_public = true);

CREATE POLICY "Authenticated can read all config" ON system_config
FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admin can modify config" ON system_config
FOR ALL TO authenticated USING (
    EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- RLS policies for agent configs
CREATE POLICY "Authenticated can read agent configs" ON agents.agent_configs
FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admin can modify agent configs" ON agents.agent_configs
FOR ALL TO authenticated USING (
    EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- Add triggers for updated_at
CREATE TRIGGER update_system_config_updated_at
BEFORE UPDATE ON system_config
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agent_configs_updated_at
BEFORE UPDATE ON agents.agent_configs
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create materialized view for popular articles
CREATE MATERIALIZED VIEW IF NOT EXISTS popular_articles AS
SELECT
    a.id,
    a.title,
    a.sport,
    a.league,
    a.published_at,
    count(av.id) AS view_count,
    count(ac.id) AS comment_count
FROM articles AS a
LEFT JOIN article_views AS av ON a.id = av.article_id
LEFT JOIN
    article_comments AS ac
    ON a.id = ac.article_id AND ac.is_approved = true
WHERE a.status = 'published'
GROUP BY a.id, a.title, a.sport, a.league, a.published_at
ORDER BY view_count DESC, comment_count DESC;

-- Create index on materialized view
CREATE UNIQUE INDEX IF NOT EXISTS idx_popular_articles_id ON popular_articles (
    id
);
CREATE INDEX IF NOT EXISTS idx_popular_articles_sport ON popular_articles (
    sport
);
CREATE INDEX IF NOT EXISTS idx_popular_articles_view_count ON popular_articles (
    view_count DESC
);

-- Function to refresh popular articles materialized view
CREATE OR REPLACE FUNCTION refresh_popular_articles()
RETURNS VOID AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY popular_articles;
END;
$$ LANGUAGE plpgsql;

-- Create a function to log user activity
CREATE OR REPLACE FUNCTION log_user_activity(
    user_uuid UUID,
    action_name TEXT,
    resource_type_name TEXT DEFAULT null,
    resource_uuid UUID DEFAULT null,
    activity_details JSONB DEFAULT '{}'
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO user_activity_log (user_id, action, resource_type, resource_id, details)
    VALUES (user_uuid, action_name, resource_type_name, resource_uuid, activity_details);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create database statistics view
CREATE OR REPLACE VIEW database_stats AS
SELECT
    'articles' AS table_name,
    count(*) AS total_count,
    count(*) FILTER (WHERE status = 'published') AS published_count,
    count(*) FILTER (
        WHERE created_at > now() - INTERVAL '24 hours'
    ) AS created_today
FROM articles
UNION ALL
SELECT
    'games' AS table_name,
    count(*) AS total_count,
    count(*) FILTER (WHERE status = 'final') AS completed_count,
    count(*) FILTER (WHERE scheduled_at > now()) AS upcoming_count
FROM games
UNION ALL
SELECT
    'users' AS table_name,
    count(*) AS total_count,
    count(*) FILTER (WHERE is_active = true) AS active_count,
    count(*) FILTER (
        WHERE created_at > now() - INTERVAL '24 hours'
    ) AS created_today
FROM user_profiles;

-- Grant necessary permissions to roles
GRANT SELECT ON popular_articles TO app_read_role;
GRANT SELECT ON database_stats TO app_read_role;

-- Grant roles to authenticated users (this should be managed by application logic)
GRANT app_read_role TO authenticated;

COMMENT ON DATABASE postgres IS 'Sport Scribe - AI-Powered Sports Journalism Platform Database';
COMMENT ON SCHEMA public IS 'Main application schema containing articles, games, teams, and user data';
COMMENT ON SCHEMA agents IS 'AI agents configuration and management schema';
