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
  word_count: number;
  readability_score: number;
  sentiment_score: number;
  topics: string[];
  entities: ArticleEntity[];
}

export interface ArticleEntity {
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

export interface ArticleGenerationRequest {
  game_id: string;
  focus_type: ArticleFocus;
  target_length: number;
  include_stats: boolean;
  include_quotes: boolean;
  tone: ArticleTone;
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