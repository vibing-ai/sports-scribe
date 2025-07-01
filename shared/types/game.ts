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
}

export interface PlayerGameStats {
  player_id: string;
  team_id: string;
  position: string;
  minutes_played?: number;
  points?: number;
  assists?: number;
  rebounds?: number;
  passing_yards?: number;
  rushing_yards?: number;
  touchdowns?: number;
  interceptions?: number;
  fumbles?: number;
  tackles?: number;
  sacks?: number;
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
  state: string;
  country: string;
  capacity: number;
  surface_type: string;
  is_dome: boolean;
  timezone: string;
} 