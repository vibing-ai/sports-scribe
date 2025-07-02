export interface Article {
  id: string;
  title: string;
  content: string;
  summary: string;
  author: string;
  sport: string;
  league: string;
  game_id?: string;
  status: ArticleStatus;
  published_at?: Date;
  created_at: Date;
  updated_at: Date;
  tags: string[];
  featured_image_url?: string;
  reading_time_minutes: number;
  seo_keywords: string[];
  byline?: string;
}

export enum ArticleStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
  SCHEDULED = 'scheduled'
}

export interface ArticleMetadata {
  id: string;
  article_id: string;
  word_count: number;
  readability_score: number;
  sentiment_score: number;
  topics: string[];
  created_at: Date;
  updated_at: Date;
}

export interface ArticleEntity {
  id: string;
  article_id: string;
  name: string;
  type: EntityType;
  mentions: number;
  confidence: number;
}

export enum EntityType {
  PLAYER = 'player',
  TEAM = 'team',
  COACH = 'coach',
  VENUE = 'venue',
  LEAGUE = 'league',
  SEASON = 'season'
}

export interface ArticleView {
  id: string;
  article_id: string;
  user_id?: string;
  ip_address?: string;
  user_agent?: string;
  referrer?: string;
  session_id?: string;
  created_at: Date;
}

export interface ArticleComment {
  id: string;
  article_id: string;
  user_id?: string;
  parent_comment_id?: string;
  content: string;
  is_approved: boolean;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface ArticleGenerationRequest {
  id: string;
  game_id: string;
  focus_type: ArticleFocus;
  target_length: number;
  include_stats: boolean;
  include_quotes: boolean;
  tone: ArticleTone;
  status: GenerationStatus;
  article_id?: string;
  created_at: Date;
  completed_at?: Date;
  error_message?: string;
}

export enum ArticleFocus {
  GAME_RECAP = 'game_recap',
  PLAYER_SPOTLIGHT = 'player_spotlight',
  TEAM_ANALYSIS = 'team_analysis',
  SEASON_PREVIEW = 'season_preview',
  TRADE_NEWS = 'trade_news'
}

export enum ArticleTone {
  PROFESSIONAL = 'professional',
  CASUAL = 'casual',
  ANALYTICAL = 'analytical',
  DRAMATIC = 'dramatic'
}

export enum GenerationStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed'
}
