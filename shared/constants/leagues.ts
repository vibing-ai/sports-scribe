// Professional sports leagues and their metadata
export const LEAGUES = {
  // Football
  NFL: 'NFL',
  NCAAF: 'NCAA Football',
  CFL: 'CFL',

  // Basketball
  NBA: 'NBA',
  WNBA: 'WNBA',
  NCAAB: 'NCAA Basketball',
  EUROLEAGUE: 'EuroLeague',

  // Baseball
  MLB: 'MLB',
  MILB: 'Minor League Baseball',
  NPB: 'NPB',

  // Soccer
  MLS: 'MLS',
  EPL: 'Premier League',
  LA_LIGA: 'La Liga',
  BUNDESLIGA: 'Bundesliga',
  SERIE_A: 'Serie A',
  LIGUE_1: 'Ligue 1',
  CHAMPIONS_LEAGUE: 'Champions League',
  EUROPA_LEAGUE: 'Europa League',
  WORLD_CUP: 'FIFA World Cup',

  // Hockey
  NHL: 'NHL',
  AHL: 'AHL',
  NCAAH: 'NCAA Hockey',
  KHL: 'KHL',

  // Tennis
  ATP: 'ATP Tour',
  WTA: 'WTA Tour',

  // Golf
  PGA: 'PGA Tour',
  EUROPEAN_TOUR: 'European Tour',
  LPGA: 'LPGA Tour',

  // Boxing/MMA
  UFC: 'UFC',
  BELLATOR: 'Bellator',
  ONE_FC: 'ONE Championship',

  // Motorsports
  F1: 'Formula 1',
  NASCAR: 'NASCAR',
  INDYCAR: 'IndyCar',
  MOTOGP: 'MotoGP'
} as const;

export type League = typeof LEAGUES[keyof typeof LEAGUES];

// League configurations and metadata
export const LEAGUE_INFO = {
  [LEAGUES.NFL]: {
    sport: 'football',
    country: 'USA',
    season_format: 'regular_playoffs',
    teams_count: 32,
    conference_structure: ['AFC', 'NFC'],
    divisions: ['North', 'South', 'East', 'West'],
    playoff_format: 'single_elimination',
    championship: 'Super Bowl'
  },
  [LEAGUES.NBA]: {
    sport: 'basketball',
    country: 'USA',
    season_format: 'regular_playoffs',
    teams_count: 30,
    conference_structure: ['Eastern', 'Western'],
    divisions: ['Atlantic', 'Central', 'Southeast', 'Northwest', 'Pacific', 'Southwest'],
    playoff_format: 'best_of_seven',
    championship: 'NBA Finals'
  },
  [LEAGUES.MLB]: {
    sport: 'baseball',
    country: 'USA',
    season_format: 'regular_playoffs',
    teams_count: 30,
    conference_structure: ['American League', 'National League'],
    divisions: ['East', 'Central', 'West'],
    playoff_format: 'best_of_series',
    championship: 'World Series'
  },
  [LEAGUES.EPL]: {
    sport: 'soccer',
    country: 'England',
    season_format: 'league_table',
    teams_count: 20,
    conference_structure: [],
    divisions: [],
    playoff_format: 'none',
    championship: 'Premier League Title'
  },
  [LEAGUES.NHL]: {
    sport: 'hockey',
    country: 'USA/Canada',
    season_format: 'regular_playoffs',
    teams_count: 32,
    conference_structure: ['Eastern', 'Western'],
    divisions: ['Atlantic', 'Metropolitan', 'Central', 'Pacific'],
    playoff_format: 'best_of_seven',
    championship: 'Stanley Cup'
  }
};

// Season structures by league
export const SEASON_STRUCTURES = {
  [LEAGUES.NFL]: {
    preseason: { weeks: 3, games_per_team: 3 },
    regular: { weeks: 18, games_per_team: 17 },
    playoffs: { rounds: 4, format: 'single_elimination' },
    offseason: { months: 6 }
  },
  [LEAGUES.NBA]: {
    preseason: { games: 4 },
    regular: { games: 82 },
    playoffs: { rounds: 4, format: 'best_of_seven' },
    offseason: { months: 4 }
  },
  [LEAGUES.MLB]: {
    spring_training: { weeks: 6 },
    regular: { games: 162 },
    playoffs: { rounds: 4, format: 'best_of_series' },
    offseason: { months: 4 }
  }
};

// Popular teams by league
export const POPULAR_TEAMS = {
  [LEAGUES.NFL]: [
    'Dallas Cowboys', 'New England Patriots', 'Pittsburgh Steelers',
    'Green Bay Packers', 'San Francisco 49ers', 'Kansas City Chiefs'
  ],
  [LEAGUES.NBA]: [
    'Los Angeles Lakers', 'Golden State Warriors', 'Boston Celtics',
    'Chicago Bulls', 'Miami Heat', 'Brooklyn Nets'
  ],
  [LEAGUES.MLB]: [
    'New York Yankees', 'Los Angeles Dodgers', 'Boston Red Sox',
    'Chicago Cubs', 'San Francisco Giants', 'St. Louis Cardinals'
  ],
  [LEAGUES.EPL]: [
    'Manchester United', 'Manchester City', 'Liverpool',
    'Chelsea', 'Arsenal', 'Tottenham Hotspur'
  ],
  [LEAGUES.NHL]: [
    'Toronto Maple Leafs', 'Montreal Canadiens', 'Boston Bruins',
    'New York Rangers', 'Chicago Blackhawks', 'Detroit Red Wings'
  ]
};

// Rivalry matchups by league
export const CLASSIC_RIVALRIES = {
  [LEAGUES.NFL]: [
    ['Dallas Cowboys', 'Washington Commanders'],
    ['Green Bay Packers', 'Chicago Bears'],
    ['Pittsburgh Steelers', 'Baltimore Ravens'],
    ['New England Patriots', 'New York Jets']
  ],
  [LEAGUES.NBA]: [
    ['Los Angeles Lakers', 'Boston Celtics'],
    ['Chicago Bulls', 'Detroit Pistons'],
    ['Miami Heat', 'New York Knicks']
  ],
  [LEAGUES.MLB]: [
    ['New York Yankees', 'Boston Red Sox'],
    ['Los Angeles Dodgers', 'San Francisco Giants'],
    ['Chicago Cubs', 'St. Louis Cardinals']
  ],
  [LEAGUES.EPL]: [
    ['Manchester United', 'Manchester City'],
    ['Liverpool', 'Everton'],
    ['Arsenal', 'Tottenham Hotspur']
  ],
  [LEAGUES.NHL]: [
    ['Montreal Canadiens', 'Toronto Maple Leafs'],
    ['Boston Bruins', 'New York Rangers'],
    ['Chicago Blackhawks', 'Detroit Red Wings']
  ]
};

// League-specific awards and honors
export const LEAGUE_AWARDS = {
  [LEAGUES.NFL]: [
    'MVP', 'Offensive Player of the Year', 'Defensive Player of the Year',
    'Rookie of the Year', 'Coach of the Year', 'Comeback Player of the Year'
  ],
  [LEAGUES.NBA]: [
    'MVP', 'Finals MVP', 'Defensive Player of the Year', 'Sixth Man of the Year',
    'Rookie of the Year', 'Most Improved Player', 'Coach of the Year'
  ],
  [LEAGUES.MLB]: [
    'MVP', 'Cy Young Award', 'Rookie of the Year', 'Gold Glove',
    'Silver Slugger', 'Reliever of the Year', 'Manager of the Year'
  ],
  [LEAGUES.EPL]: [
    'Player of the Season', 'Golden Boot', 'Golden Glove',
    'Young Player of the Season', 'Manager of the Season'
  ],
  [LEAGUES.NHL]: [
    'Hart Trophy (MVP)', 'Vezina Trophy', 'Norris Trophy',
    'Calder Trophy', 'Selke Trophy', 'Lady Byng Trophy'
  ]
};

// Supported leagues list for validation
export const SUPPORTED_LEAGUES = Object.values(LEAGUES);

// Major leagues (highest tier)
export const MAJOR_LEAGUES = [
  LEAGUES.NFL, LEAGUES.NBA, LEAGUES.MLB, LEAGUES.EPL, LEAGUES.NHL,
  LEAGUES.LA_LIGA, LEAGUES.BUNDESLIGA, LEAGUES.SERIE_A, LEAGUES.F1, LEAGUES.UFC
];

// North American leagues
export const NORTH_AMERICAN_LEAGUES = [
  LEAGUES.NFL, LEAGUES.NBA, LEAGUES.MLB, LEAGUES.NHL, LEAGUES.MLS,
  LEAGUES.NCAAF, LEAGUES.NCAAB, LEAGUES.NASCAR, LEAGUES.INDYCAR
];

// European leagues
export const EUROPEAN_LEAGUES = [
  LEAGUES.EPL, LEAGUES.LA_LIGA, LEAGUES.BUNDESLIGA, LEAGUES.SERIE_A,
  LEAGUES.LIGUE_1, LEAGUES.CHAMPIONS_LEAGUE, LEAGUES.EUROPA_LEAGUE, LEAGUES.F1
];

// International competitions
export const INTERNATIONAL_COMPETITIONS = [
  LEAGUES.WORLD_CUP, LEAGUES.CHAMPIONS_LEAGUE, LEAGUES.EUROPA_LEAGUE,
  LEAGUES.F1, LEAGUES.ATP, LEAGUES.WTA, LEAGUES.PGA, LEAGUES.MOTOGP
];
