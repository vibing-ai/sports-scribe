export interface Game {
  id: string;
  sport: string;
  league: string;
  season: string;
  week?: number;
  home_team_id: string;
  away_team_id: string;
  home_score: number;
  away_score: number;
  status: GameStatus;
  scheduled_at: Date;
  started_at?: Date;
  finished_at?: Date;
  venue_id: string;
  weather?: WeatherConditions;
  attendance?: number;
}

export enum GameStatus {
  SCHEDULED = 'scheduled',
  PREGAME = 'pregame',
  IN_PROGRESS = 'in_progress',
  HALFTIME = 'halftime',
  OVERTIME = 'overtime',
  FINAL = 'final',
  POSTPONED = 'postponed',
  CANCELLED = 'cancelled'
}

export interface GameStats {
  game_id: string;
  team_stats: TeamGameStats[];
  player_stats: PlayerGameStats[];
  key_moments: GameMoment[];
}

export interface TeamGameStats {
  id: string;
  game_id: string;
  team_id: string;
  is_home: boolean;
  points: number;
  turnovers: number;
  penalties: number;
  time_of_possession?: string;
  total_yards?: number;
  passing_yards?: number;
  rushing_yards?: number;
  third_down_conversions?: string;
  red_zone_efficiency?: string;
  created_at: Date;
}

export interface PlayerGameStats {
  id: string;
  game_id: string;
  player_id: string;
  team_id: string;
  position?: string;
  minutes_played?: number;
  
  // Universal stats
  points: number;
  
  // Football specific
  passing_yards: number;
  passing_touchdowns: number;
  interceptions_thrown: number;
  completion_percentage?: number;
  rushing_yards: number;
  rushing_touchdowns: number;
  receiving_yards: number;
  receiving_touchdowns: number;
  receptions: number;
  tackles: number;
  sacks: number;
  interceptions_caught: number;
  fumbles_forced: number;
  fumbles_recovered: number;
  
  // Basketball specific
  assists: number;
  rebounds: number;
  steals: number;
  blocks: number;
  field_goal_percentage?: number;
  three_point_percentage?: number;
  free_throw_percentage?: number;
  
  // Baseball specific
  batting_average?: number;
  home_runs: number;
  rbis: number;
  era?: number;
  wins: number;
  saves: number;
  strikeouts: number;
  
  created_at: Date;
}

export interface GameMoment {
  id: string;
  game_id: string;
  type: MomentType;
  quarter_period: number;
  time_remaining: string;
  description: string;
  players_involved: string[];
  significance_score: number;
}

export enum MomentType {
  TOUCHDOWN = 'touchdown',
  FIELD_GOAL = 'field_goal',
  INTERCEPTION = 'interception',
  FUMBLE = 'fumble',
  SACK = 'sack',
  PENALTY = 'penalty',
  INJURY = 'injury',
  SUBSTITUTION = 'substitution',
  TIMEOUT = 'timeout'
}

export interface WeatherConditions {
  temperature: number;
  humidity: number;
  wind_speed: number;
  wind_direction: string;
  precipitation: number;
  conditions: string;
}

export interface Venue {
  id: string;
  name: string;
  city: string;
  state?: string;
  country: string;
  capacity?: number;
  surface_type?: string;
  is_dome: boolean;
  timezone: string;
  latitude?: number;
  longitude?: number;
  created_at: Date;
  updated_at: Date;
}

export interface TeamSeasonStats {
  id: string;
  team_id: string;
  season: string;
  wins: number;
  losses: number;
  ties: number;
  win_percentage?: number;
  points_for: number;
  points_against: number;
  point_differential: number;
  
  // Football specific
  total_yards_per_game?: number;
  passing_yards_per_game?: number;
  rushing_yards_per_game?: number;
  turnovers: number;
  turnover_differential: number;
  
  // Basketball specific
  field_goal_percentage?: number;
  three_point_percentage?: number;
  free_throw_percentage?: number;
  rebounds_per_game?: number;
  assists_per_game?: number;
  
  // Baseball specific
  era?: number;
  batting_average?: number;
  home_runs: number;
  errors: number;
  
  created_at: Date;
  updated_at: Date;
}

export interface PlayerInjury {
  id: string;
  player_id: string;
  injury_type: string;
  body_part: string;
  severity: InjurySeverity;
  occurred_at: Date;
  expected_return?: Date;
  status: InjuryStatus;
  description?: string;
  created_at: Date;
  updated_at: Date;
}

export enum InjurySeverity {
  MINOR = 'minor',
  MODERATE = 'moderate',
  MAJOR = 'major',
  CAREER_THREATENING = 'career_threatening'
}

export enum InjuryStatus {
  ACTIVE = 'active',
  RECOVERING = 'recovering',
  QUESTIONABLE = 'questionable',
  CLEARED = 'cleared'
}