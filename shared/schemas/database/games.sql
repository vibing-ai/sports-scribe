-- Venues table
CREATE TABLE venues (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    country VARCHAR(100) NOT NULL DEFAULT 'USA',
    capacity INTEGER,
    surface_type VARCHAR(50),
    is_dome BOOLEAN DEFAULT false,
    timezone VARCHAR(50) NOT NULL DEFAULT 'America/New_York',
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Teams table
CREATE TABLE teams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    abbreviation VARCHAR(10) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    conference VARCHAR(100),
    division VARCHAR(100),
    league VARCHAR(100) NOT NULL,
    founded_year INTEGER,
    primary_color VARCHAR(7),
    secondary_color VARCHAR(7),
    accent_color VARCHAR(7),
    logo_url TEXT,
    venue_id UUID REFERENCES venues (id),
    owner VARCHAR(255),
    head_coach VARCHAR(255),
    general_manager VARCHAR(255),
    market_value BIGINT,
    website_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Games table
CREATE TABLE games (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sport VARCHAR(50) NOT NULL,
    league VARCHAR(100) NOT NULL,
    season VARCHAR(20) NOT NULL,
    week INTEGER,
    home_team_id UUID NOT NULL REFERENCES teams (id),
    away_team_id UUID NOT NULL REFERENCES teams (id),
    home_score INTEGER DEFAULT 0,
    away_score INTEGER DEFAULT 0,
    status VARCHAR(50) NOT NULL DEFAULT 'scheduled',
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    started_at TIMESTAMP WITH TIME ZONE,
    finished_at TIMESTAMP WITH TIME ZONE,
    venue_id UUID NOT NULL REFERENCES venues (id),
    attendance INTEGER,
    weather_temperature INTEGER,
    weather_humidity INTEGER,
    weather_wind_speed INTEGER,
    weather_wind_direction VARCHAR(10),
    weather_precipitation DECIMAL(4, 2),
    weather_conditions VARCHAR(100),
    broadcast_tv VARCHAR(255),
    broadcast_radio VARCHAR(255),
    broadcast_streaming VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),

    CONSTRAINT games_status_check CHECK (
        status IN (
            'scheduled',
            'pregame',
            'in_progress',
            'halftime',
            'overtime',
            'final',
            'postponed',
            'cancelled'
        )
    ),
    CONSTRAINT games_different_teams CHECK (home_team_id != away_team_id)
);

-- Players table
CREATE TABLE players (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    jersey_number INTEGER,
    position VARCHAR(50),
    team_id UUID REFERENCES teams (id),
    height INTEGER, -- in inches
    weight INTEGER, -- in pounds
    birth_date DATE,
    birth_place VARCHAR(255),
    college VARCHAR(255),
    experience_years INTEGER DEFAULT 0,
    salary BIGINT,
    contract_expiry DATE,
    status VARCHAR(50) DEFAULT 'active',
    photo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),

    CONSTRAINT players_status_check CHECK (
        status IN (
            'active',
            'injured',
            'suspended',
            'inactive',
            'retired',
            'free_agent'
        )
    )
);

-- Game stats table
CREATE TABLE game_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    game_id UUID NOT NULL REFERENCES games (id) ON DELETE CASCADE,
    team_id UUID NOT NULL REFERENCES teams (id),
    is_home BOOLEAN NOT NULL,
    points INTEGER DEFAULT 0,
    turnovers INTEGER DEFAULT 0,
    penalties INTEGER DEFAULT 0,
    time_of_possession VARCHAR(10),
    total_yards INTEGER,
    passing_yards INTEGER,
    rushing_yards INTEGER,
    third_down_conversions VARCHAR(10),
    red_zone_efficiency VARCHAR(10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),

    UNIQUE (game_id, team_id)
);

-- Player game stats table
CREATE TABLE player_game_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    game_id UUID NOT NULL REFERENCES games (id) ON DELETE CASCADE,
    player_id UUID NOT NULL REFERENCES players (id),
    team_id UUID NOT NULL REFERENCES teams (id),
    position VARCHAR(50),
    minutes_played INTEGER,

    -- Universal stats
    points INTEGER DEFAULT 0,

    -- Football specific
    passing_yards INTEGER DEFAULT 0,
    passing_touchdowns INTEGER DEFAULT 0,
    interceptions_thrown INTEGER DEFAULT 0,
    completion_percentage DECIMAL(5, 2),
    rushing_yards INTEGER DEFAULT 0,
    rushing_touchdowns INTEGER DEFAULT 0,
    receiving_yards INTEGER DEFAULT 0,
    receiving_touchdowns INTEGER DEFAULT 0,
    receptions INTEGER DEFAULT 0,
    tackles INTEGER DEFAULT 0,
    sacks INTEGER DEFAULT 0,
    interceptions_caught INTEGER DEFAULT 0,
    fumbles_forced INTEGER DEFAULT 0,
    fumbles_recovered INTEGER DEFAULT 0,

    -- Basketball specific
    assists INTEGER DEFAULT 0,
    rebounds INTEGER DEFAULT 0,
    steals INTEGER DEFAULT 0,
    blocks INTEGER DEFAULT 0,
    field_goal_percentage DECIMAL(5, 2),
    three_point_percentage DECIMAL(5, 2),
    free_throw_percentage DECIMAL(5, 2),

    -- Baseball specific
    batting_average DECIMAL(4, 3),
    home_runs INTEGER DEFAULT 0,
    rbis INTEGER DEFAULT 0,
    era DECIMAL(5, 2),
    wins INTEGER DEFAULT 0,
    saves INTEGER DEFAULT 0,
    strikeouts INTEGER DEFAULT 0,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),

    UNIQUE (game_id, player_id)
);

-- Game moments/events table
CREATE TABLE game_moments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    game_id UUID NOT NULL REFERENCES games (id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    quarter_period INTEGER NOT NULL,
    time_remaining VARCHAR(10),
    description TEXT NOT NULL,
    players_involved UUID [] DEFAULT '{}',
    significance_score INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),

    CONSTRAINT moments_type_check CHECK (
        type IN (
            'touchdown',
            'field_goal',
            'interception',
            'fumble',
            'sack',
            'penalty',
            'injury',
            'substitution',
            'timeout'
        )
    )
);

-- Player injuries table
CREATE TABLE player_injuries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID NOT NULL REFERENCES players (id),
    injury_type VARCHAR(100) NOT NULL,
    body_part VARCHAR(100) NOT NULL,
    severity VARCHAR(50) NOT NULL,
    occurred_at TIMESTAMP WITH TIME ZONE NOT NULL,
    expected_return DATE,
    status VARCHAR(50) DEFAULT 'active',
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),

    CONSTRAINT injury_severity_check CHECK (
        severity IN ('minor', 'moderate', 'major', 'career_threatening')
    ),
    CONSTRAINT injury_status_check CHECK (
        status IN ('active', 'recovering', 'questionable', 'cleared')
    )
);

-- Team season stats table
CREATE TABLE team_season_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    team_id UUID NOT NULL REFERENCES teams (id),
    season VARCHAR(20) NOT NULL,
    wins INTEGER DEFAULT 0,
    losses INTEGER DEFAULT 0,
    ties INTEGER DEFAULT 0,
    win_percentage DECIMAL(5, 3),
    points_for INTEGER DEFAULT 0,
    points_against INTEGER DEFAULT 0,
    point_differential INTEGER DEFAULT 0,

    -- Football specific
    total_yards_per_game DECIMAL(6, 1),
    passing_yards_per_game DECIMAL(6, 1),
    rushing_yards_per_game DECIMAL(6, 1),
    turnovers INTEGER DEFAULT 0,
    turnover_differential INTEGER DEFAULT 0,

    -- Basketball specific
    field_goal_percentage DECIMAL(5, 2),
    three_point_percentage DECIMAL(5, 2),
    free_throw_percentage DECIMAL(5, 2),
    rebounds_per_game DECIMAL(5, 1),
    assists_per_game DECIMAL(5, 1),

    -- Baseball specific
    era DECIMAL(5, 2),
    batting_average DECIMAL(4, 3),
    home_runs INTEGER DEFAULT 0,
    errors INTEGER DEFAULT 0,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),

    UNIQUE (team_id, season)
);

-- Indexes for performance
CREATE INDEX idx_games_sport_league ON games (sport, league);
CREATE INDEX idx_games_season ON games (season);
CREATE INDEX idx_games_scheduled_at ON games (scheduled_at);
CREATE INDEX idx_games_status ON games (status);
CREATE INDEX idx_games_teams ON games (home_team_id, away_team_id);

CREATE INDEX idx_teams_league ON teams (league);
CREATE INDEX idx_teams_conference_division ON teams (conference, division);

CREATE INDEX idx_players_team_id ON players (team_id);
CREATE INDEX idx_players_position ON players (position);
CREATE INDEX idx_players_status ON players (status);

CREATE INDEX idx_game_stats_game_id ON game_stats (game_id);
CREATE INDEX idx_player_game_stats_game_id ON player_game_stats (game_id);
CREATE INDEX idx_player_game_stats_player_id ON player_game_stats (player_id);

CREATE INDEX idx_game_moments_game_id ON game_moments (game_id);
CREATE INDEX idx_game_moments_type ON game_moments (type);

CREATE INDEX idx_player_injuries_player_id ON player_injuries (player_id);
CREATE INDEX idx_player_injuries_status ON player_injuries (status);

-- Row Level Security
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_game_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_moments ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_injuries ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_season_stats ENABLE ROW LEVEL SECURITY;

-- Public read access for most data
CREATE POLICY "Public can read venues" ON venues FOR SELECT USING (true);
CREATE POLICY "Public can read teams" ON teams FOR SELECT USING (true);
CREATE POLICY "Public can read games" ON games FOR SELECT USING (true);
CREATE POLICY "Public can read players" ON players FOR SELECT USING (true);
CREATE POLICY "Public can read game stats" ON game_stats FOR SELECT USING (
    true
);
CREATE POLICY "Public can read player game stats" ON player_game_stats FOR SELECT USING (
    true
);
CREATE POLICY "Public can read game moments" ON game_moments FOR SELECT USING (
    true
);
CREATE POLICY "Public can read team season stats" ON team_season_stats FOR SELECT USING (
    true
);

-- Sensitive data like injuries require authentication
CREATE POLICY "Authenticated can read injuries" ON player_injuries FOR SELECT TO authenticated USING (
    true
);

-- Only authenticated users can modify data
CREATE POLICY "Authenticated can insert venues" ON venues FOR INSERT TO authenticated WITH CHECK (
    true
);
CREATE POLICY "Authenticated can update venues" ON venues FOR UPDATE TO authenticated USING (
    true
);

-- Triggers for updated_at
CREATE TRIGGER update_teams_updated_at
BEFORE UPDATE ON teams
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_games_updated_at
BEFORE UPDATE ON games
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_players_updated_at
BEFORE UPDATE ON players
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_player_injuries_updated_at
BEFORE UPDATE ON player_injuries
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_team_season_stats_updated_at
BEFORE UPDATE ON team_season_stats
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
