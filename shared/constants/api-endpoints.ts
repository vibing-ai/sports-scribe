// Base API configuration
export const API_CONFIG = {
  VERSION: 'v1',
  BASE_PATH: '/api',
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RATE_LIMIT: 100 // requests per minute
} as const;

// Article endpoints
export const ARTICLE_ENDPOINTS = {
  LIST: '/api/articles',
  CREATE: '/api/articles',
  GET: (id: string) => `/api/articles/${id}`,
  UPDATE: (id: string) => `/api/articles/${id}`,
  DELETE: (id: string) => `/api/articles/${id}`,
  GENERATE: '/api/articles/generate',
  POPULAR: '/api/articles/popular',
  RELATED: (id: string) => `/api/articles/${id}/related`,
  SEARCH: '/api/articles/search',
  BY_SPORT: (sport: string) => `/api/articles/sport/${sport}`,
  BY_LEAGUE: (league: string) => `/api/articles/league/${league}`,
  BY_AUTHOR: (author: string) => `/api/articles/author/${author}`,
  METADATA: (id: string) => `/api/articles/${id}/metadata`,
  COMMENTS: (id: string) => `/api/articles/${id}/comments`,
  VIEWS: (id: string) => `/api/articles/${id}/views`
} as const;

// Game endpoints
export const GAME_ENDPOINTS = {
  LIST: '/api/games',
  CREATE: '/api/games',
  GET: (id: string) => `/api/games/${id}`,
  UPDATE: (id: string) => `/api/games/${id}`,
  DELETE: (id: string) => `/api/games/${id}`,
  LIVE: '/api/games/live',
  UPCOMING: '/api/games/upcoming',
  RECENT: '/api/games/recent',
  BY_SPORT: (sport: string) => `/api/games/sport/${sport}`,
  BY_LEAGUE: (league: string) => `/api/games/league/${league}`,
  BY_TEAM: (teamId: string) => `/api/games/team/${teamId}`,
  BY_DATE: (date: string) => `/api/games/date/${date}`,
  STATS: (id: string) => `/api/games/${id}/stats`,
  MOMENTS: (id: string) => `/api/games/${id}/moments`,
  SCHEDULE: '/api/games/schedule'
} as const;

// Team endpoints
export const TEAM_ENDPOINTS = {
  LIST: '/api/teams',
  CREATE: '/api/teams',
  GET: (id: string) => `/api/teams/${id}`,
  UPDATE: (id: string) => `/api/teams/${id}`,
  DELETE: (id: string) => `/api/teams/${id}`,
  BY_SPORT: (sport: string) => `/api/teams/sport/${sport}`,
  BY_LEAGUE: (league: string) => `/api/teams/league/${league}`,
  ROSTER: (id: string) => `/api/teams/${id}/roster`,
  STATS: (id: string) => `/api/teams/${id}/stats`,
  SCHEDULE: (id: string) => `/api/teams/${id}/schedule`,
  STANDINGS: '/api/teams/standings'
} as const;

// Player endpoints
export const PLAYER_ENDPOINTS = {
  LIST: '/api/players',
  CREATE: '/api/players',
  GET: (id: string) => `/api/players/${id}`,
  UPDATE: (id: string) => `/api/players/${id}`,
  DELETE: (id: string) => `/api/players/${id}`,
  BY_TEAM: (teamId: string) => `/api/players/team/${teamId}`,
  BY_POSITION: (position: string) => `/api/players/position/${position}`,
  STATS: (id: string) => `/api/players/${id}/stats`,
  INJURIES: (id: string) => `/api/players/${id}/injuries`,
  SEARCH: '/api/players/search',
  TOP_PERFORMERS: '/api/players/top-performers'
} as const;

// User endpoints
export const USER_ENDPOINTS = {
  PROFILE: '/api/user/profile',
  UPDATE_PROFILE: '/api/user/profile',
  PREFERENCES: '/api/user/preferences',
  NOTIFICATIONS: '/api/user/notifications',
  ACTIVITY: '/api/user/activity',
  API_KEYS: '/api/user/api-keys',
  SESSIONS: '/api/user/sessions'
} as const;

// Authentication endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  REGISTER: '/api/auth/register',
  REFRESH: '/api/auth/refresh',
  FORGOT_PASSWORD: '/api/auth/forgot-password',
  RESET_PASSWORD: '/api/auth/reset-password',
  VERIFY_EMAIL: '/api/auth/verify-email',
  RESEND_VERIFICATION: '/api/auth/resend-verification'
} as const;

// Admin endpoints
export const ADMIN_ENDPOINTS = {
  DASHBOARD: '/api/admin/dashboard',
  USERS: '/api/admin/users',
  USER: (id: string) => `/api/admin/users/${id}`,
  ARTICLES: '/api/admin/articles',
  MODERATE_ARTICLE: (id: string) => `/api/admin/articles/${id}/moderate`,
  COMMENTS: '/api/admin/comments',
  MODERATE_COMMENT: (id: string) => `/api/admin/comments/${id}/moderate`,
  SYSTEM_CONFIG: '/api/admin/config',
  AGENTS: '/api/admin/agents',
  AGENT: (id: string) => `/api/admin/agents/${id}`,
  ANALYTICS: '/api/admin/analytics',
  LOGS: '/api/admin/logs'
} as const;

// AI Agent endpoints
export const AGENT_ENDPOINTS = {
  LIST: '/api/agents',
  STATUS: '/api/agents/status',
  AGENT: (id: string) => `/api/agents/${id}`,
  START: (id: string) => `/api/agents/${id}/start`,
  STOP: (id: string) => `/api/agents/${id}/stop`,
  RESTART: (id: string) => `/api/agents/${id}/restart`,
  TASKS: '/api/agents/tasks',
  TASK: (id: string) => `/api/agents/tasks/${id}`,
  WORKFLOWS: '/api/agents/workflows',
  WORKFLOW: (id: string) => `/api/agents/workflows/${id}`,
  EXECUTE_WORKFLOW: (id: string) => `/api/agents/workflows/${id}/execute`,
  METRICS: '/api/agents/metrics'
} as const;

// Analytics endpoints
export const ANALYTICS_ENDPOINTS = {
  OVERVIEW: '/api/analytics/overview',
  ARTICLES: '/api/analytics/articles',
  USERS: '/api/analytics/users',
  ENGAGEMENT: '/api/analytics/engagement',
  TRAFFIC: '/api/analytics/traffic',
  PERFORMANCE: '/api/analytics/performance',
  REAL_TIME: '/api/analytics/real-time'
} as const;

// Search endpoints
export const SEARCH_ENDPOINTS = {
  GLOBAL: '/api/search',
  ARTICLES: '/api/search/articles',
  GAMES: '/api/search/games',
  TEAMS: '/api/search/teams',
  PLAYERS: '/api/search/players',
  SUGGESTIONS: '/api/search/suggestions',
  TRENDING: '/api/search/trending'
} as const;

// Webhook endpoints
export const WEBHOOK_ENDPOINTS = {
  REGISTER: '/api/webhooks',
  LIST: '/api/webhooks',
  GET: (id: string) => `/api/webhooks/${id}`,
  UPDATE: (id: string) => `/api/webhooks/${id}`,
  DELETE: (id: string) => `/api/webhooks/${id}`,
  TEST: (id: string) => `/api/webhooks/${id}/test`,
  LOGS: (id: string) => `/api/webhooks/${id}/logs`,
  
  // Webhook events
  ARTICLE_GENERATED: '/api/webhooks/article-generated',
  GAME_FINISHED: '/api/webhooks/game-finished',
  PLAYER_INJURED: '/api/webhooks/player-injured'
} as const;

// External API endpoints (for data collection)
export const EXTERNAL_ENDPOINTS = {
  ESPN: {
    BASE: 'https://api.espn.com',
    SPORTS: '/sports',
    TEAMS: '/teams',
    GAMES: '/games',
    PLAYERS: '/players',
    STANDINGS: '/standings'
  },
  SPORTS_REFERENCE: {
    BASE: 'https://api.sports-reference.com',
    NFL: '/nfl',
    NBA: '/nba',
    MLB: '/mlb',
    NHL: '/nhl'
  },
  THE_SPORTS_DB: {
    BASE: 'https://www.thesportsdb.com/api/v1/json',
    LEAGUES: '/all_leagues.php',
    TEAMS: '/search_all_teams.php',
    PLAYERS: '/searchplayers.php'
  }
} as const;

// System endpoints
export const SYSTEM_ENDPOINTS = {
  HEALTH: '/api/health',
  STATUS: '/api/status',
  VERSION: '/api/version',
  METRICS: '/api/metrics',
  DOCS: '/api/docs',
  OPENAPI: '/api/openapi.json'
} as const;

// File upload endpoints
export const UPLOAD_ENDPOINTS = {
  IMAGES: '/api/upload/images',
  DOCUMENTS: '/api/upload/documents',
  AVATAR: '/api/upload/avatar',
  TEAM_LOGO: '/api/upload/team-logo',
  FEATURED_IMAGE: '/api/upload/featured-image'
} as const;

// Notification endpoints
export const NOTIFICATION_ENDPOINTS = {
  LIST: '/api/notifications',
  MARK_READ: (id: string) => `/api/notifications/${id}/read`,
  MARK_ALL_READ: '/api/notifications/read-all',
  DELETE: (id: string) => `/api/notifications/${id}`,
  PREFERENCES: '/api/notifications/preferences',
  SUBSCRIBE: '/api/notifications/subscribe',
  UNSUBSCRIBE: '/api/notifications/unsubscribe'
} as const;

// All endpoints combined for easy access
export const API_ENDPOINTS = {
  ...ARTICLE_ENDPOINTS,
  ...GAME_ENDPOINTS,
  ...TEAM_ENDPOINTS,
  ...PLAYER_ENDPOINTS,
  ...USER_ENDPOINTS,
  ...AUTH_ENDPOINTS,
  ...ADMIN_ENDPOINTS,
  ...AGENT_ENDPOINTS,
  ...ANALYTICS_ENDPOINTS,
  ...SEARCH_ENDPOINTS,
  ...WEBHOOK_ENDPOINTS,
  ...SYSTEM_ENDPOINTS,
  ...UPLOAD_ENDPOINTS,
  ...NOTIFICATION_ENDPOINTS
} as const;

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504
} as const;

// API error codes
export const API_ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTHENTICATION_REQUIRED: 'AUTHENTICATION_REQUIRED',
  INSUFFICIENT_PERMISSIONS: 'INSUFFICIENT_PERMISSIONS',
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  RESOURCE_CONFLICT: 'RESOURCE_CONFLICT',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  INVALID_API_KEY: 'INVALID_API_KEY',
  QUOTA_EXCEEDED: 'QUOTA_EXCEEDED'
} as const; 