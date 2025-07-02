-- User profiles table (extends Supabase auth.users)
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    display_name VARCHAR(255),
    avatar_url TEXT,
    bio TEXT,
    timezone VARCHAR(50) DEFAULT 'America/New_York',
    language VARCHAR(10) DEFAULT 'en',
    role VARCHAR(50) DEFAULT 'viewer',
    is_active BOOLEAN DEFAULT true,
    email_notifications BOOLEAN DEFAULT true,
    push_notifications BOOLEAN DEFAULT true,
    theme VARCHAR(20) DEFAULT 'system',
    sports_interests TEXT [] DEFAULT '{}',
    teams_following UUID [] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    CONSTRAINT user_profiles_role_check CHECK (
        role IN ('admin', 'editor', 'writer', 'viewer', 'api_user')
    ),
    CONSTRAINT user_profiles_theme_check CHECK (
        theme IN ('light', 'dark', 'system')
    )
);

-- User permissions table
CREATE TABLE user_permissions (
    id UUID PRIMARY KEY DEFAULT UUID_GENERATE_V4(),
    user_id UUID NOT NULL REFERENCES user_profiles (id) ON DELETE CASCADE,
    resource VARCHAR(100) NOT NULL,
    actions TEXT [] NOT NULL DEFAULT '{}',
    conditions JSONB DEFAULT '{}',
    granted_by UUID REFERENCES user_profiles (id),
    granted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,

    UNIQUE (user_id, resource)
);

-- User sessions table (for tracking login sessions)
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT UUID_GENERATE_V4(),
    user_id UUID NOT NULL REFERENCES user_profiles (id) ON DELETE CASCADE,
    session_token VARCHAR(255) NOT NULL,
    ip_address INET,
    user_agent TEXT,
    location_country VARCHAR(100),
    location_city VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,

    UNIQUE (session_token)
);

-- User activity log
CREATE TABLE user_activity_log (
    id UUID PRIMARY KEY DEFAULT UUID_GENERATE_V4(),
    user_id UUID REFERENCES user_profiles (id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(100),
    resource_id UUID,
    details JSONB DEFAULT '{}',
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User API keys table
CREATE TABLE user_api_keys (
    id UUID PRIMARY KEY DEFAULT UUID_GENERATE_V4(),
    user_id UUID NOT NULL REFERENCES user_profiles (id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    key_hash VARCHAR(255) NOT NULL UNIQUE,
    key_prefix VARCHAR(20) NOT NULL,
    scopes TEXT [] DEFAULT '{}',
    rate_limit_per_minute INTEGER DEFAULT 60,
    is_active BOOLEAN DEFAULT true,
    last_used_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE
);

-- User notifications table
CREATE TABLE user_notifications (
    id UUID PRIMARY KEY DEFAULT UUID_GENERATE_V4(),
    user_id UUID NOT NULL REFERENCES user_profiles (id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    data JSONB DEFAULT '{}',
    is_read BOOLEAN DEFAULT false,
    is_sent BOOLEAN DEFAULT false,
    sent_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    CONSTRAINT notification_type_check CHECK (
        type IN (
            'article_published',
            'game_alert',
            'team_update',
            'system_announcement',
            'comment_reply'
        )
    )
);

-- User preferences table
CREATE TABLE user_notification_preferences (
    id UUID PRIMARY KEY DEFAULT UUID_GENERATE_V4(),
    user_id UUID NOT NULL REFERENCES user_profiles (id) ON DELETE CASCADE,
    notification_type VARCHAR(50) NOT NULL,
    email_enabled BOOLEAN DEFAULT true,
    push_enabled BOOLEAN DEFAULT true,
    in_app_enabled BOOLEAN DEFAULT true,
    frequency VARCHAR(20) DEFAULT 'immediate',

    UNIQUE (user_id, notification_type),
    CONSTRAINT frequency_check CHECK (
        frequency IN ('immediate', 'daily', 'weekly', 'never')
    )
);

-- Indexes for performance
CREATE INDEX idx_user_profiles_role ON user_profiles (role);
CREATE INDEX idx_user_profiles_is_active ON user_profiles (is_active);
CREATE INDEX idx_user_profiles_sports_interests ON user_profiles USING gin (
    sports_interests
);
CREATE INDEX idx_user_profiles_teams_following ON user_profiles USING gin (
    teams_following
);

CREATE INDEX idx_user_permissions_user_id ON user_permissions (user_id);
CREATE INDEX idx_user_permissions_resource ON user_permissions (resource);
CREATE INDEX idx_user_permissions_is_active ON user_permissions (is_active);

CREATE INDEX idx_user_sessions_user_id ON user_sessions (user_id);
CREATE INDEX idx_user_sessions_is_active ON user_sessions (is_active);
CREATE INDEX idx_user_sessions_last_activity ON user_sessions (
    last_activity DESC
);

CREATE INDEX idx_user_activity_log_user_id ON user_activity_log (user_id);
CREATE INDEX idx_user_activity_log_action ON user_activity_log (action);
CREATE INDEX idx_user_activity_log_created_at ON user_activity_log (
    created_at DESC
);

CREATE INDEX idx_user_api_keys_user_id ON user_api_keys (user_id);
CREATE INDEX idx_user_api_keys_is_active ON user_api_keys (is_active);
CREATE INDEX idx_user_api_keys_key_hash ON user_api_keys (key_hash);

CREATE INDEX idx_user_notifications_user_id ON user_notifications (user_id);
CREATE INDEX idx_user_notifications_is_read ON user_notifications (is_read);
CREATE INDEX idx_user_notifications_type ON user_notifications (type);
CREATE INDEX idx_user_notifications_created_at ON user_notifications (
    created_at DESC
);

-- Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_notification_preferences ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can read and update their own profile
CREATE POLICY "Users can view own profile" ON user_profiles
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
FOR UPDATE USING (auth.uid() = id);

-- Public read access for basic profile info (for article authors, etc.)
CREATE POLICY "Public can view basic profile info" ON user_profiles
FOR SELECT USING (
    -- Only show basic info for article authors
    id IN (
        SELECT DISTINCT author_id FROM articles
        WHERE status = 'published'
    )
);

-- Admin can view all profiles
CREATE POLICY "Admin can view all profiles" ON user_profiles
FOR SELECT TO authenticated USING (
    EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- Users can only see their own permissions
CREATE POLICY "Users can view own permissions" ON user_permissions
FOR SELECT USING (user_id = auth.uid());

-- Users can only see their own sessions
CREATE POLICY "Users can view own sessions" ON user_sessions
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update own sessions" ON user_sessions
FOR UPDATE USING (user_id = auth.uid());

-- Users can view their own activity
CREATE POLICY "Users can view own activity" ON user_activity_log
FOR SELECT USING (user_id = auth.uid());

-- Users can manage their own API keys
CREATE POLICY "Users can manage own API keys" ON user_api_keys
FOR ALL USING (user_id = auth.uid());

-- Users can manage their own notifications
CREATE POLICY "Users can view own notifications" ON user_notifications
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications" ON user_notifications
FOR UPDATE USING (user_id = auth.uid());

-- Users can manage their own notification preferences
CREATE POLICY "Users can manage own notification preferences" ON user_notification_preferences
FOR ALL USING (user_id = auth.uid());

-- Functions for user management
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_profiles (id, first_name, last_name, display_name)
    VALUES (
        NEW.id,
        NEW.raw_user_meta_data->>'first_name',
        NEW.raw_user_meta_data->>'last_name',
        COALESCE(
            NEW.raw_user_meta_data->>'display_name',
            CONCAT(NEW.raw_user_meta_data->>'first_name', ' ', NEW.raw_user_meta_data->>'last_name'),
            NEW.email
        )
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create user profile when user signs up
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to update last activity
CREATE OR REPLACE FUNCTION update_user_last_activity()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE user_sessions
    SET last_activity = NOW()
    WHERE user_id = NEW.user_id AND is_active = true;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for activity logging
CREATE TRIGGER log_user_activity
AFTER INSERT ON user_activity_log
FOR EACH ROW EXECUTE FUNCTION update_user_last_activity();

-- Triggers for updated_at timestamps
CREATE TRIGGER update_user_profiles_updated_at
BEFORE UPDATE ON user_profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to clean up expired sessions
CREATE OR REPLACE FUNCTION cleanup_expired_sessions()
RETURNS VOID AS $$
BEGIN
    UPDATE user_sessions
    SET is_active = false
    WHERE expires_at < NOW() AND is_active = true;

    DELETE FROM user_sessions
    WHERE expires_at < NOW() - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql;

-- Function to get user permissions
CREATE OR REPLACE FUNCTION get_user_permissions(user_uuid UUID)
RETURNS TABLE (resource VARCHAR, actions TEXT []) AS $$
BEGIN
    RETURN QUERY
    SELECT up.resource, up.actions
    FROM user_permissions up
    WHERE up.user_id = user_uuid
    AND up.is_active = true
    AND (up.expires_at IS NULL OR up.expires_at > NOW());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
