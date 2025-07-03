// Football leagues available through API-Football
export const LEAGUES = {
  // European Leagues
  EPL: 'Premier League',
  LA_LIGA: 'La Liga',
  BUNDESLIGA: 'Bundesliga',
  SERIE_A: 'Serie A',
  LIGUE_1: 'Ligue 1',

  // International Competitions
  CHAMPIONS_LEAGUE: 'UEFA Champions League',
  EUROPA_LEAGUE: 'UEFA Europa League',
  WORLD_CUP: 'FIFA World Cup',
  EURO: 'UEFA European Championship',

  // Other Major Leagues
  MLS: 'Major League Soccer',
  LIGA_MX: 'Liga MX',
  BRASILEIRAO: 'Brasileirão',

  // Cup Competitions
  FA_CUP: 'FA Cup',
  COPA_DEL_REY: 'Copa del Rey',
  DFB_POKAL: 'DFB-Pokal',
  COPPA_ITALIA: 'Coppa Italia'
} as const;

export type League = typeof LEAGUES[keyof typeof LEAGUES];

// Football league configurations and metadata
export const LEAGUE_INFO = {
  [LEAGUES.EPL]: {
    sport: 'football',
    country: 'England',
    season_format: 'league_table',
    teams_count: 20,
    api_id: 39,
    season_start: 'August',
    season_end: 'May'
  },
  [LEAGUES.LA_LIGA]: {
    sport: 'football',
    country: 'Spain',
    season_format: 'league_table',
    teams_count: 20,
    api_id: 140,
    season_start: 'August',
    season_end: 'May'
  },
  [LEAGUES.BUNDESLIGA]: {
    sport: 'football',
    country: 'Germany',
    season_format: 'league_table',
    teams_count: 18,
    api_id: 78,
    season_start: 'August',
    season_end: 'May'
  },
  [LEAGUES.SERIE_A]: {
    sport: 'football',
    country: 'Italy',
    season_format: 'league_table',
    teams_count: 20,
    api_id: 135,
    season_start: 'August',
    season_end: 'May'
  },
  [LEAGUES.LIGUE_1]: {
    sport: 'football',
    country: 'France',
    season_format: 'league_table',
    teams_count: 20,
    api_id: 61,
    season_start: 'August',
    season_end: 'May'
  },
  [LEAGUES.CHAMPIONS_LEAGUE]: {
    sport: 'football',
    country: 'Europe',
    season_format: 'knockout',
    teams_count: 32,
    api_id: 2,
    season_start: 'September',
    season_end: 'June'
  },
  [LEAGUES.MLS]: {
    sport: 'football',
    country: 'USA/Canada',
    season_format: 'regular_playoffs',
    teams_count: 30,
    api_id: 253,
    season_start: 'February',
    season_end: 'November'
  }
};

// Season structures for football leagues
export const SEASON_STRUCTURES = {
  [LEAGUES.EPL]: {
    regular: { games: 38, rounds: 38 },
    offseason: { months: 3 }
  },
  [LEAGUES.LA_LIGA]: {
    regular: { games: 38, rounds: 38 },
    offseason: { months: 3 }
  },
  [LEAGUES.BUNDESLIGA]: {
    regular: { games: 34, rounds: 34 },
    offseason: { months: 3 }
  },
  [LEAGUES.SERIE_A]: {
    regular: { games: 38, rounds: 38 },
    offseason: { months: 3 }
  },
  [LEAGUES.LIGUE_1]: {
    regular: { games: 38, rounds: 38 },
    offseason: { months: 3 }
  },
  [LEAGUES.CHAMPIONS_LEAGUE]: {
    group_stage: { games: 6, teams: 32 },
    knockout: { rounds: 5 },
    offseason: { months: 3 }
  }
};

// Popular teams by football league
export const POPULAR_TEAMS = {
  [LEAGUES.EPL]: [
    'Manchester United', 'Manchester City', 'Liverpool',
    'Chelsea', 'Arsenal', 'Tottenham Hotspur'
  ],
  [LEAGUES.LA_LIGA]: [
    'Real Madrid', 'Barcelona', 'Atletico Madrid',
    'Sevilla', 'Real Sociedad', 'Valencia'
  ],
  [LEAGUES.BUNDESLIGA]: [
    'Bayern Munich', 'Borussia Dortmund', 'RB Leipzig',
    'Bayer Leverkusen', 'Eintracht Frankfurt', 'Borussia Mönchengladbach'
  ],
  [LEAGUES.SERIE_A]: [
    'Juventus', 'AC Milan', 'Inter Milan',
    'AS Roma', 'Napoli', 'Lazio'
  ],
  [LEAGUES.LIGUE_1]: [
    'Paris Saint-Germain', 'AS Monaco', 'Olympique Marseille',
    'Olympique Lyon', 'Nice', 'Lille'
  ],
  [LEAGUES.MLS]: [
    'LA Galaxy', 'Seattle Sounders', 'Atlanta United',
    'Portland Timbers', 'New York City FC', 'Inter Miami'
  ]
};

// Classic rivalries in football
export const CLASSIC_RIVALRIES = {
  [LEAGUES.EPL]: [
    ['Manchester United', 'Manchester City'],
    ['Liverpool', 'Everton'],
    ['Arsenal', 'Tottenham Hotspur'],
    ['Chelsea', 'Arsenal'],
    ['Manchester United', 'Liverpool']
  ],
  [LEAGUES.LA_LIGA]: [
    ['Real Madrid', 'Barcelona'],
    ['Real Madrid', 'Atletico Madrid'],
    ['Barcelona', 'Espanyol'],
    ['Sevilla', 'Real Betis']
  ],
  [LEAGUES.BUNDESLIGA]: [
    ['Bayern Munich', 'Borussia Dortmund'],
    ['Bayern Munich', 'TSV 1860 Munich'],
    ['Borussia Dortmund', 'Schalke 04'],
    ['Hamburg', 'Werder Bremen']
  ],
  [LEAGUES.SERIE_A]: [
    ['Juventus', 'AC Milan'],
    ['AC Milan', 'Inter Milan'],
    ['AS Roma', 'Lazio'],
    ['Juventus', 'Inter Milan']
  ],
  [LEAGUES.LIGUE_1]: [
    ['Paris Saint-Germain', 'Olympique Marseille'],
    ['Olympique Lyon', 'Saint-Etienne'],
    ['AS Monaco', 'Nice']
  ]
};

// Football league awards and honors
export const LEAGUE_AWARDS = {
  [LEAGUES.EPL]: [
    'Player of the Season', 'Golden Boot', 'Golden Glove',
    'Young Player of the Season', 'Manager of the Season'
  ],
  [LEAGUES.LA_LIGA]: [
    'Pichichi Trophy', 'Zamora Trophy', 'Best Player',
    'Best Young Player', 'Best Coach'
  ],
  [LEAGUES.BUNDESLIGA]: [
    'Top Scorer', 'Player of the Season', 'Rookie of the Year',
    'Coach of the Year'
  ],
  [LEAGUES.SERIE_A]: [
    'Capocannoniere', 'Player of the Year', 'Young Player of the Year',
    'Coach of the Year'
  ],
  [LEAGUES.LIGUE_1]: [
    'Player of the Year', 'Top Scorer', 'Young Player of the Year',
    'Coach of the Year'
  ],
  [LEAGUES.CHAMPIONS_LEAGUE]: [
    'Top Scorer', 'Player of the Tournament', 'Goalkeeper of the Tournament'
  ]
};

// Supported football leagues list for validation
export const SUPPORTED_LEAGUES = Object.values(LEAGUES);

// Major football leagues (highest tier)
export const MAJOR_LEAGUES = [
  LEAGUES.EPL, LEAGUES.LA_LIGA, LEAGUES.BUNDESLIGA,
  LEAGUES.SERIE_A, LEAGUES.LIGUE_1, LEAGUES.CHAMPIONS_LEAGUE
];

// European domestic leagues
export const EUROPEAN_DOMESTIC_LEAGUES = [
  LEAGUES.EPL, LEAGUES.LA_LIGA, LEAGUES.BUNDESLIGA,
  LEAGUES.SERIE_A, LEAGUES.LIGUE_1
];

// International competitions
export const INTERNATIONAL_COMPETITIONS = [
  LEAGUES.WORLD_CUP, LEAGUES.EURO, LEAGUES.CHAMPIONS_LEAGUE,
  LEAGUES.EUROPA_LEAGUE
];

// Cup competitions
export const CUP_COMPETITIONS = [
  LEAGUES.FA_CUP, LEAGUES.COPA_DEL_REY, LEAGUES.DFB_POKAL,
  LEAGUES.COPPA_ITALIA, LEAGUES.CHAMPIONS_LEAGUE, LEAGUES.EUROPA_LEAGUE
];

// League competitions (domestic leagues)
export const LEAGUE_COMPETITIONS = [
  LEAGUES.EPL, LEAGUES.LA_LIGA, LEAGUES.BUNDESLIGA,
  LEAGUES.SERIE_A, LEAGUES.LIGUE_1, LEAGUES.MLS,
  LEAGUES.LIGA_MX, LEAGUES.BRASILEIRAO
];
