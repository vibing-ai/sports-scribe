// Sports categories - focused on Football only
export const SPORTS = {
  FOOTBALL: 'football'
} as const;

export type Sport = typeof SPORTS[keyof typeof SPORTS];

// Sports display names
export const SPORT_NAMES: Record<Sport, string> = {
  [SPORTS.FOOTBALL]: 'Football'
};

// Sports icons (using popular icon library names)
export const SPORT_ICONS: Record<Sport, string> = {
  [SPORTS.FOOTBALL]: 'american-football'
};

// Common seasons for Football
export const SPORT_SEASONS: Record<Sport, string[]> = {
  [SPORTS.FOOTBALL]: ['regular', 'preseason', 'playoffs', 'super-bowl']
};

// Game statuses
export const GAME_STATUS = {
  SCHEDULED: 'scheduled',
  PREGAME: 'pregame',
  IN_PROGRESS: 'in_progress',
  HALFTIME: 'halftime',
  OVERTIME: 'overtime',
  FINAL: 'final',
  POSTPONED: 'postponed',
  CANCELLED: 'cancelled'
} as const;

export type GameStatus = typeof GAME_STATUS[keyof typeof GAME_STATUS];

export const GAME_STATUS_NAMES: Record<GameStatus, string> = {
  [GAME_STATUS.SCHEDULED]: 'Scheduled',
  [GAME_STATUS.PREGAME]: 'Pre-Game',
  [GAME_STATUS.IN_PROGRESS]: 'In Progress',
  [GAME_STATUS.HALFTIME]: 'Halftime',
  [GAME_STATUS.OVERTIME]: 'Overtime',
  [GAME_STATUS.FINAL]: 'Final',
  [GAME_STATUS.POSTPONED]: 'Postponed',
  [GAME_STATUS.CANCELLED]: 'Cancelled'
};

// Player positions for Football
export const PLAYER_POSITIONS: Record<Sport, string[]> = {
  [SPORTS.FOOTBALL]: [
    'QB', 'RB', 'FB', 'WR', 'TE', 'C', 'G', 'T', 'OL',
    'DE', 'DT', 'NT', 'OLB', 'MLB', 'ILB', 'CB', 'S', 'FS', 'SS',
    'K', 'P', 'LS', 'KR', 'PR'
  ]
};

// Common statistics tracked for Football
export const SPORT_STATS: Record<Sport, string[]> = {
  [SPORTS.FOOTBALL]: [
    'passing_yards', 'passing_touchdowns', 'interceptions', 'rushing_yards',
    'rushing_touchdowns', 'receiving_yards', 'receiving_touchdowns', 'receptions',
    'tackles', 'sacks', 'fumbles', 'field_goals', 'extra_points'
  ]
};

// Popular search terms and tags for Football
export const SPORT_TAGS: Record<Sport, string[]> = {
  [SPORTS.FOOTBALL]: [
    'touchdown', 'quarterback', 'defense', 'offense', 'playoff', 'draft',
    'injury-report', 'trade', 'roster', 'coaching', 'statistics'
  ]
};

// Supported sports list for validation
export const SUPPORTED_SPORTS = Object.values(SPORTS);

// Weather conditions that affect Football
export const WEATHER_AFFECTED_SPORTS = [SPORTS.FOOTBALL];

// Indoor sports (none for our platform)
export const INDOOR_SPORTS: Sport[] = [];

// Team sports (Football is a team sport)
export const TEAM_SPORTS = [SPORTS.FOOTBALL];

// Individual sports (none for our platform)
export const INDIVIDUAL_SPORTS: Sport[] = [];
