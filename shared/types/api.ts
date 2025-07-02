export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
  timestamp: string;
  request_id: string;
  pagination?: PaginationMetadata;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  field_errors?: FieldError[];
  stack_trace?: string;
}

export interface FieldError {
  field: string;
  message: string;
  code: string;
  value?: any;
}

export interface PaginationMetadata {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface ApiRequest {
  method: HttpMethod;
  endpoint: string;
  headers: Record<string, string>;
  query_params?: Record<string, any>;
  body?: any;
  timeout?: number;
  retry_config?: RetryConfig;
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS'
}

export interface RetryConfig {
  max_attempts: number;
  base_delay_ms: number;
  max_delay_ms: number;
  backoff_multiplier: number;
  retry_on_status: number[];
}

export interface WebhookPayload {
  id: string;
  event: WebhookEvent;
  data: any;
  timestamp: string;
  source: string;
  signature: string;
  version: string;
}

export enum WebhookEvent {
  ARTICLE_CREATED = 'article.created',
  ARTICLE_UPDATED = 'article.updated',
  ARTICLE_PUBLISHED = 'article.published',
  ARTICLE_DELETED = 'article.deleted',
  GAME_STARTED = 'game.started',
  GAME_FINISHED = 'game.finished',
  GAME_UPDATED = 'game.updated',
  PLAYER_INJURED = 'player.injured',
  TEAM_ROSTER_UPDATED = 'team.roster_updated',
  AGENT_TASK_COMPLETED = 'agent.task_completed',
  AGENT_ERROR = 'agent.error'
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  expires_at: Date;
  scope: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: Permission[];
  created_at: Date;
  last_login: Date;
  is_active: boolean;
  profile: UserProfile;
}

export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  WRITER = 'writer',
  VIEWER = 'viewer',
  API_USER = 'api_user'
}

export interface Permission {
  resource: string;
  actions: string[];
  conditions?: Record<string, any>;
}

export interface UserProfile {
  first_name: string;
  last_name: string;
  avatar_url?: string;
  bio?: string;
  timezone: string;
  language: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  email_notifications: boolean;
  push_notifications: boolean;
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  sports_interests: string[];
  teams_following: string[];
}

export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset_at: Date;
  retry_after?: number;
  bucket: string;
}

export interface HealthCheck {
  status: HealthStatus;
  timestamp: string;
  version: string;
  uptime: number;
  services: ServiceHealth[];
  metrics: HealthMetrics;
}

export enum HealthStatus {
  HEALTHY = 'healthy',
  DEGRADED = 'degraded',
  UNHEALTHY = 'unhealthy',
  CRITICAL = 'critical'
}

export interface ServiceHealth {
  name: string;
  status: HealthStatus;
  response_time_ms?: number;
  error_message?: string;
  last_checked: string;
}

export interface HealthMetrics {
  cpu_usage: number;
  memory_usage: number;
  disk_usage: number;
  active_connections: number;
  requests_per_minute: number;
  error_rate: number;
}

export interface SearchQuery {
  q?: string;
  filters?: SearchFilters;
  sort?: SortOptions;
  pagination?: PaginationQuery;
}

export interface SearchFilters {
  sport?: string[];
  league?: string[];
  team?: string[];
  player?: string[];
  date_range?: DateRange;
  status?: string[];
  tags?: string[];
}

export interface DateRange {
  start: Date;
  end: Date;
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  cursor?: string;
}
