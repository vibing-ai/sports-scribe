-- Articles table
CREATE TABLE articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    summary TEXT,
    author VARCHAR(255) NOT NULL,
    sport VARCHAR(100) NOT NULL,
    league VARCHAR(100) NOT NULL,
    game_id UUID REFERENCES games(id),
    status VARCHAR(50) NOT NULL DEFAULT 'draft',
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    tags TEXT[] DEFAULT '{}',
    featured_image_url TEXT,
    reading_time_minutes INTEGER,
    seo_keywords TEXT[] DEFAULT '{}',
    byline TEXT,
    
    CONSTRAINT articles_status_check CHECK (status IN ('draft', 'published', 'archived', 'scheduled'))
);

-- Article metadata table
CREATE TABLE article_metadata (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
    word_count INTEGER,
    readability_score DECIMAL(5,2),
    sentiment_score DECIMAL(5,2),
    topics TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Article entities table (for named entity recognition)
CREATE TABLE article_entities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    mentions INTEGER DEFAULT 1,
    confidence DECIMAL(5,2),
    
    CONSTRAINT article_entities_type_check CHECK (type IN ('player', 'team', 'coach', 'venue', 'league', 'season'))
);

-- Article generation requests table
CREATE TABLE article_generation_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    game_id UUID NOT NULL REFERENCES games(id),
    focus_type VARCHAR(50) NOT NULL,
    target_length INTEGER,
    include_stats BOOLEAN DEFAULT false,
    include_quotes BOOLEAN DEFAULT false,
    tone VARCHAR(50),
    status VARCHAR(50) DEFAULT 'pending',
    article_id UUID REFERENCES articles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    error_message TEXT,
    
    CONSTRAINT generation_focus_check CHECK (focus_type IN ('game_recap', 'player_spotlight', 'team_analysis', 'season_preview', 'trade_news')),
    CONSTRAINT generation_tone_check CHECK (tone IN ('professional', 'casual', 'analytical', 'dramatic')),
    CONSTRAINT generation_status_check CHECK (status IN ('pending', 'in_progress', 'completed', 'failed'))
);

-- Article views tracking
CREATE TABLE article_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id),
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    session_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Article comments table
CREATE TABLE article_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    parent_comment_id UUID REFERENCES article_comments(id),
    content TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT false,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_articles_sport_league ON articles(sport, league);
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX idx_articles_game_id ON articles(game_id);
CREATE INDEX idx_articles_tags ON articles USING GIN(tags);
CREATE INDEX idx_articles_created_at ON articles(created_at DESC);

CREATE INDEX idx_article_entities_article_id ON article_entities(article_id);
CREATE INDEX idx_article_entities_type ON article_entities(type);
CREATE INDEX idx_article_entities_name ON article_entities(name);

CREATE INDEX idx_article_views_article_id ON article_views(article_id);
CREATE INDEX idx_article_views_created_at ON article_views(created_at DESC);

CREATE INDEX idx_article_comments_article_id ON article_comments(article_id);
CREATE INDEX idx_article_comments_user_id ON article_comments(user_id);
CREATE INDEX idx_article_comments_created_at ON article_comments(created_at DESC);

-- Row Level Security policies
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_generation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_comments ENABLE ROW LEVEL SECURITY;

-- Public read access for published articles
CREATE POLICY "Public can read published articles" ON articles
    FOR SELECT USING (status = 'published');

-- Authenticated users can read all articles
CREATE POLICY "Authenticated users can read all articles" ON articles
    FOR SELECT TO authenticated USING (true);

-- Only authenticated users can create articles
CREATE POLICY "Authenticated users can create articles" ON articles
    FOR INSERT TO authenticated WITH CHECK (true);

-- Users can update their own articles or admins can update any
CREATE POLICY "Users can update own articles" ON articles
    FOR UPDATE TO authenticated USING (
        auth.uid() = (SELECT user_id FROM user_profiles WHERE user_profiles.id = auth.uid() AND role IN ('admin', 'editor'))
        OR author = (SELECT name FROM user_profiles WHERE user_profiles.id = auth.uid())
    );

-- Article metadata follows article permissions
CREATE POLICY "Article metadata follows article permissions" ON article_metadata
    FOR ALL TO authenticated USING (
        article_id IN (SELECT id FROM articles WHERE 
            status = 'published' OR 
            auth.uid() IS NOT NULL
        )
    );

-- Comments policy
CREATE POLICY "Anyone can read approved comments" ON article_comments
    FOR SELECT USING (is_approved = true AND is_deleted = false);

CREATE POLICY "Authenticated users can create comments" ON article_comments
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Users can update own comments" ON article_comments
    FOR UPDATE TO authenticated USING (user_id = auth.uid());

-- Triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_articles_updated_at 
    BEFORE UPDATE ON articles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_article_metadata_updated_at 
    BEFORE UPDATE ON article_metadata 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_article_comments_updated_at 
    BEFORE UPDATE ON article_comments 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 