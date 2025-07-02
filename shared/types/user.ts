export interface UserProfile {
  id: string;
  first_name?: string;
  last_name?: string;
  display_name?: string;
  avatar_url?: string;
  bio?: string;
  timezone: string;
  language: string;
  role: UserRole;
  is_active: boolean;
  email_notifications: boolean;
  push_notifications: boolean;
  theme: UserTheme;
  sports_interests: string[];
  teams_following: string[];
  created_at: Date;
  updated_at: Date;
}

export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  WRITER = 'writer',
  VIEWER = 'viewer',
  API_USER = 'api_user'
}

export enum UserTheme {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system'
}

export interface UserSession {
  id: string;
  user_id: string;
  session_token: string;
  ip_address?: string;
  user_agent?: string;
  location_country?: string;
  location_city?: string;
  is_active: boolean;
  created_at: Date;
  last_activity: Date;
  expires_at?: Date;
}

export interface UserActivityLog {
  id: string;
  user_id?: string;
  action: string;
  resource_type?: string;
  resource_id?: string;
  details: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
  created_at: Date;
}

export interface UserApiKey {
  id: string;
  user_id: string;
  name: string;
  key_hash: string;
  key_prefix: string;
  scopes: string[];
  rate_limit_per_minute: number;
  is_active: boolean;
  last_used_at?: Date;
  created_at: Date;
  expires_at?: Date;
}

export interface UserNotification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  data: Record<string, any>;
  is_read: boolean;
  is_sent: boolean;
  sent_at?: Date;
  created_at: Date;
}

export enum NotificationType {
  ARTICLE_PUBLISHED = 'article_published',
  GAME_ALERT = 'game_alert',
  TEAM_UPDATE = 'team_update',
  SYSTEM_ANNOUNCEMENT = 'system_announcement',
  COMMENT_REPLY = 'comment_reply'
}

export interface UserNotificationPreferences {
  id: string;
  user_id: string;
  notification_type: NotificationType;
  email_enabled: boolean;
  push_enabled: boolean;
  in_app_enabled: boolean;
  frequency: NotificationFrequency;
}

export enum NotificationFrequency {
  IMMEDIATE = 'immediate',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  NEVER = 'never'
}

export interface UserPermission {
  id: string;
  user_id: string;
  resource: string;
  actions: string[];
  conditions: Record<string, any>;
  granted_by?: string;
  granted_at: Date;
  expires_at?: Date;
  is_active: boolean;
}