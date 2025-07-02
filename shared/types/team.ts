export interface Team {
  id: string;
  name: string;
  full_name: string;
  abbreviation: string;
  city: string;
  state: string;
  conference: string;
  division: string;
  league: string;
  founded_year: number;
  colors: TeamColors;
  logo_url: string;
  venue_id: string;
  owner: string;
  head_coach: string;
  general_manager?: string;
  market_value?: number;
  website_url: string;
}

export interface TeamColors {
  primary: string;
  secondary: string;
  accent?: string;
}

export interface TeamStats {
  team_id: string;
  season: string;
  wins: number;
  losses: number;
  ties?: number;
  win_percentage: number;
  points_for: number;
  points_against: number;
  point_differential: number;

  // Football specific
  total_yards_per_game?: number;
  passing_yards_per_game?: number;
  rushing_yards_per_game?: number;
  turnovers?: number;
  turnover_differential?: number;

  // Basketball specific
  field_goal_percentage?: number;
  three_point_percentage?: number;
  free_throw_percentage?: number;
  rebounds_per_game?: number;
  assists_per_game?: number;

  // Baseball specific
  era?: number;
  batting_average?: number;
  home_runs?: number;
  errors?: number;
}

export interface TeamRoster {
  team_id: string;
  season: string;
  players: TeamPlayer[];
  coaching_staff: CoachingStaff[];
  updated_at: Date;
}

export interface TeamPlayer {
  player_id: string;
  jersey_number: number;
  position: string;
  depth_chart_order: number;
  is_starter: boolean;
  is_captain: boolean;
  joined_date: Date;
  salary?: number;
  contract_expiry?: Date;
}

export interface CoachingStaff {
  id: string;
  name: string;
  position: string;
  years_with_team: number;
  total_experience: number;
  bio?: string;
}

export interface TeamHistory {
  team_id: string;
  championships: Championship[];
  retired_numbers: RetiredNumber[];
  hall_of_famers: HallOfFamer[];
  notable_achievements: Achievement[];
}

export interface Championship {
  year: number;
  competition: string;
  opponent?: string;
  score?: string;
  venue?: string;
}

export interface RetiredNumber {
  number: number;
  player_name: string;
  years_played: string;
  position: string;
  retired_date: Date;
  reason: string;
}

export interface HallOfFamer {
  player_name: string;
  inducted_year: number;
  position: string;
  years_with_team: string;
  achievements: string[];
}

export interface Achievement {
  title: string;
  year: number;
  description: string;
  significance: string;
}

export interface TeamSchedule {
  team_id: string;
  season: string;
  games: ScheduledGame[];
}

export interface ScheduledGame {
  game_id: string;
  opponent_id: string;
  is_home: boolean;
  scheduled_at: Date;
  week?: number;
  game_type: GameType;
  broadcast_info?: BroadcastInfo;
}

export enum GameType {
  PRESEASON = 'preseason',
  REGULAR_SEASON = 'regular_season',
  PLAYOFFS = 'playoffs',
  CHAMPIONSHIP = 'championship',
  ALL_STAR = 'all_star'
}

export interface BroadcastInfo {
  tv_network?: string;
  radio_station?: string;
  streaming_platform?: string;
  announcers?: string[];
}
