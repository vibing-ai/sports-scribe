// Sports categories and metadata
export const SPORTS = {
  FOOTBALL: 'football',
  BASKETBALL: 'basketball',
  BASEBALL: 'baseball',
  SOCCER: 'soccer',
  HOCKEY: 'hockey',
  TENNIS: 'tennis',
  GOLF: 'golf',
  BOXING: 'boxing',
  MMA: 'mma',
  MOTORSPORTS: 'motorsports'
} as const;

export type Sport = typeof SPORTS[keyof typeof SPORTS];

// Sports display names
export const SPORT_NAMES: Record<Sport, string> = {
  [SPORTS.FOOTBALL]: 'Football',
  [SPORTS.BASKETBALL]: 'Basketball',
  [SPORTS.BASEBALL]: 'Baseball',
  [SPORTS.SOCCER]: 'Soccer',
  [SPORTS.HOCKEY]: 'Hockey',
  [SPORTS.TENNIS]: 'Tennis',
  [SPORTS.GOLF]: 'Golf',
  [SPORTS.BOXING]: 'Boxing',
  [SPORTS.MMA]: 'Mixed Martial Arts',
  [SPORTS.MOTORSPORTS]: 'Motorsports'
};

// Sports icons (using popular icon library names)
export const SPORT_ICONS: Record<Sport, string> = {
  [SPORTS.FOOTBALL]: 'american-football',
  [SPORTS.BASKETBALL]: 'basketball',
  [SPORTS.BASEBALL]: 'baseball',
  [SPORTS.SOCCER]: 'soccer-ball',
  [SPORTS.HOCKEY]: 'hockey-puck',
  [SPORTS.TENNIS]: 'tennis-ball',
  [SPORTS.GOLF]: 'golf-ball',
  [SPORTS.BOXING]: 'boxing-glove',
  [SPORTS.MMA]: 'martial-arts',
  [SPORTS.MOTORSPORTS]: 'racing-car'
};

// Common seasons for each sport
export const SPORT_SEASONS: Record<Sport, string[]> = {
  [SPORTS.FOOTBALL]: ['regular', 'preseason', 'playoffs', 'super-bowl'],
  [SPORTS.BASKETBALL]: ['regular', 'preseason', 'playoffs', 'finals'],
  [SPORTS.BASEBALL]: ['spring-training', 'regular', 'playoffs', 'world-series'],
  [SPORTS.SOCCER]: ['regular', 'playoffs', 'cup', 'international'],
  [SPORTS.HOCKEY]: ['preseason', 'regular', 'playoffs', 'stanley-cup'],
  [SPORTS.TENNIS]: ['atp-tour', 'wta-tour', 'grand-slam', 'davis-cup'],
  [SPORTS.GOLF]: ['pga-tour', 'european-tour', 'majors', 'ryder-cup'],
  [SPORTS.BOXING]: ['championship', 'title-fight', 'exhibition'],
  [SPORTS.MMA]: ['championship', 'title-fight', 'fight-night'],
  [SPORTS.MOTORSPORTS]: ['formula-1', 'nascar', 'indycar', 'motogp']
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

// Player positions by sport
export const PLAYER_POSITIONS: Record<Sport, string[]> = {
  [SPORTS.FOOTBALL]: [
    'QB', 'RB', 'FB', 'WR', 'TE', 'C', 'G', 'T', 'OL',
    'DE', 'DT', 'NT', 'OLB', 'MLB', 'ILB', 'CB', 'S', 'FS', 'SS',
    'K', 'P', 'LS', 'KR', 'PR'
  ],
  [SPORTS.BASKETBALL]: [
    'PG', 'SG', 'SF', 'PF', 'C', 'G', 'F'
  ],
  [SPORTS.BASEBALL]: [
    'P', 'C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'DH',
    'SP', 'RP', 'CP', 'IF', 'OF', 'UT'
  ],
  [SPORTS.SOCCER]: [
    'GK', 'CB', 'LB', 'RB', 'LWB', 'RWB', 'CDM', 'CM', 'CAM',
    'LM', 'RM', 'LW', 'RW', 'CF', 'ST'
  ],
  [SPORTS.HOCKEY]: [
    'G', 'D', 'LD', 'RD', 'C', 'LW', 'RW', 'F'
  ],
  [SPORTS.TENNIS]: ['Singles', 'Doubles'],
  [SPORTS.GOLF]: ['Professional'],
  [SPORTS.BOXING]: [
    'Heavyweight', 'Cruiserweight', 'Light Heavyweight', 'Super Middleweight',
    'Middleweight', 'Super Welterweight', 'Welterweight', 'Super Lightweight',
    'Lightweight', 'Super Featherweight', 'Featherweight', 'Super Bantamweight',
    'Bantamweight', 'Super Flyweight', 'Flyweight', 'Light Flyweight'
  ],
  [SPORTS.MMA]: [
    'Heavyweight', 'Light Heavyweight', 'Middleweight', 'Welterweight',
    'Lightweight', 'Featherweight', 'Bantamweight', 'Flyweight'
  ],
  [SPORTS.MOTORSPORTS]: ['Driver', 'Co-Driver']
};

// Common statistics tracked by sport
export const SPORT_STATS: Record<Sport, string[]> = {
  [SPORTS.FOOTBALL]: [
    'passing_yards', 'passing_touchdowns', 'interceptions', 'rushing_yards',
    'rushing_touchdowns', 'receiving_yards', 'receiving_touchdowns', 'receptions',
    'tackles', 'sacks', 'fumbles', 'field_goals', 'extra_points'
  ],
  [SPORTS.BASKETBALL]: [
    'points', 'rebounds', 'assists', 'steals', 'blocks', 'turnovers',
    'field_goals_made', 'field_goals_attempted', 'three_pointers_made',
    'three_pointers_attempted', 'free_throws_made', 'free_throws_attempted',
    'minutes_played'
  ],
  [SPORTS.BASEBALL]: [
    'batting_average', 'home_runs', 'rbis', 'runs', 'hits', 'doubles',
    'triples', 'stolen_bases', 'strikeouts', 'walks', 'era', 'wins',
    'losses', 'saves', 'innings_pitched'
  ],
  [SPORTS.SOCCER]: [
    'goals', 'assists', 'shots', 'shots_on_target', 'passes', 'pass_accuracy',
    'tackles', 'interceptions', 'clearances', 'crosses', 'corners',
    'yellow_cards', 'red_cards', 'minutes_played'
  ],
  [SPORTS.HOCKEY]: [
    'goals', 'assists', 'points', 'plus_minus', 'penalty_minutes', 'shots',
    'hits', 'blocked_shots', 'faceoff_wins', 'time_on_ice', 'saves',
    'goals_against_average', 'save_percentage'
  ],
  [SPORTS.TENNIS]: [
    'aces', 'double_faults', 'first_serve_percentage', 'break_points_saved',
    'winners', 'unforced_errors', 'net_points_won'
  ],
  [SPORTS.GOLF]: [
    'strokes', 'par', 'birdies', 'eagles', 'bogeys', 'double_bogeys',
    'fairways_hit', 'greens_in_regulation', 'putts'
  ],
  [SPORTS.BOXING]: [
    'punches_thrown', 'punches_landed', 'power_punches', 'jabs',
    'knockdowns', 'rounds_won'
  ],
  [SPORTS.MMA]: [
    'significant_strikes', 'takedowns', 'submission_attempts',
    'knockdowns', 'control_time'
  ],
  [SPORTS.MOTORSPORTS]: [
    'lap_time', 'best_lap', 'pit_stops', 'position', 'laps_completed',
    'fastest_lap', 'grid_position'
  ]
};

// Popular search terms and tags by sport
export const SPORT_TAGS: Record<Sport, string[]> = {
  [SPORTS.FOOTBALL]: [
    'touchdown', 'quarterback', 'defense', 'offense', 'playoff', 'draft',
    'injury-report', 'trade', 'roster', 'coaching', 'statistics'
  ],
  [SPORTS.BASKETBALL]: [
    'dunk', 'three-pointer', 'playoffs', 'draft', 'trade', 'mvp',
    'rookie', 'all-star', 'championship', 'coaching'
  ],
  [SPORTS.BASEBALL]: [
    'home-run', 'strikeout', 'world-series', 'playoffs', 'trade-deadline',
    'rookie', 'mvp', 'cy-young', 'hall-of-fame', 'spring-training'
  ],
  [SPORTS.SOCCER]: [
    'goal', 'penalty', 'world-cup', 'champions-league', 'transfer',
    'international', 'premier-league', 'la-liga', 'bundesliga'
  ],
  [SPORTS.HOCKEY]: [
    'goal', 'assist', 'stanley-cup', 'playoffs', 'trade', 'draft',
    'power-play', 'penalty-kill', 'goaltender', 'hat-trick'
  ],
  [SPORTS.TENNIS]: [
    'grand-slam', 'wimbledon', 'us-open', 'french-open', 'australian-open',
    'atp', 'wta', 'ranking', 'serve', 'volley'
  ],
  [SPORTS.GOLF]: [
    'major', 'masters', 'pga-championship', 'us-open', 'british-open',
    'birdie', 'eagle', 'hole-in-one', 'leaderboard', 'cut'
  ],
  [SPORTS.BOXING]: [
    'knockout', 'title-fight', 'championship', 'heavyweight', 'undisputed',
    'pay-per-view', 'training-camp', 'weigh-in'
  ],
  [SPORTS.MMA]: [
    'knockout', 'submission', 'title-fight', 'ufc', 'championship',
    'octagon', 'training-camp', 'weight-cut', 'ground-game'
  ],
  [SPORTS.MOTORSPORTS]: [
    'pole-position', 'fastest-lap', 'pit-stop', 'championship', 'qualifying',
    'podium', 'crash', 'safety-car', 'formula-1', 'nascar'
  ]
};

// Supported sports list for validation
export const SUPPORTED_SPORTS = Object.values(SPORTS);

// Weather conditions that affect outdoor sports
export const WEATHER_AFFECTED_SPORTS = [
  SPORTS.FOOTBALL,
  SPORTS.BASEBALL,
  SPORTS.SOCCER,
  SPORTS.GOLF,
  SPORTS.TENNIS,
  SPORTS.MOTORSPORTS
];

// Indoor sports
export const INDOOR_SPORTS = [
  SPORTS.BASKETBALL,
  SPORTS.HOCKEY,
  SPORTS.BOXING,
  SPORTS.MMA
];

// Team sports vs individual sports
export const TEAM_SPORTS = [
  SPORTS.FOOTBALL,
  SPORTS.BASKETBALL,
  SPORTS.BASEBALL,
  SPORTS.SOCCER,
  SPORTS.HOCKEY
];

export const INDIVIDUAL_SPORTS = [
  SPORTS.TENNIS,
  SPORTS.GOLF,
  SPORTS.BOXING,
  SPORTS.MMA,
  SPORTS.MOTORSPORTS
]; 