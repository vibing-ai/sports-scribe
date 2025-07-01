export interface Player {
  id: string;
  first_name: string;
  last_name: string;
  display_name: string;
  jersey_number: number;
  position: string;
  team_id: string;
  height: number; // in inches
  weight: number; // in pounds
  birth_date: Date;
  birth_place: string;
  college?: string;
  experience_years: number;
  salary?: number;
  contract_expiry?: Date;
  status: PlayerStatus;
  photo_url?: string;
}

export enum PlayerStatus {
  ACTIVE = 'active',
  INJURED = 'injured',
  SUSPENDED = 'suspended',
  INACTIVE = 'inactive',
  RETIRED = 'retired',
  FREE_AGENT = 'free_agent'
}

export interface PlayerStats {
  player_id: string;
  season: string;
  team_id: string;
  games_played: number;
  games_started: number;
  minutes_per_game?: number;
  
  // Universal stats
  points_per_game?: number;
  
  // Football specific
  passing_yards?: number;
  passing_touchdowns?: number;
  interceptions_thrown?: number;
  completion_percentage?: number;
  rushing_yards?: number;
  rushing_touchdowns?: number;
  receiving_yards?: number;
  receiving_touchdowns?: number;
  receptions?: number;
  tackles?: number;
  sacks?: number;
  interceptions_caught?: number;
  fumbles_forced?: number;
  fumbles_recovered?: number;
  
  // Basketball specific
  assists?: number;
  rebounds?: number;
  steals?: number;
  blocks?: number;
  field_goal_percentage?: number;
  three_point_percentage?: number;
  free_throw_percentage?: number;
  
  // Baseball specific
  batting_average?: number;
  home_runs?: number;
  rbis?: number;
  era?: number;
  wins?: number;
  saves?: number;
  strikeouts?: number;
}

export interface PlayerBio {
  player_id: string;
  hometown: string;
  high_school?: string;
  college_major?: string;
  draft_year?: number;
  draft_round?: number;
  draft_pick?: number;
  draft_team?: string;
  nickname?: string;
  fun_facts: string[];
  social_media: SocialMediaLinks;
}

export interface SocialMediaLinks {
  twitter?: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  linkedin?: string;
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
  description: string;
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

export interface PlayerAward {
  id: string;
  player_id: string;
  award_name: string;
  year: number;
  league: string;
  description?: string;
} 