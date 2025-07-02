export interface SystemConfig {
  id: string;
  key: string;
  value: any;
  description?: string;
  is_public: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface AgentConfig {
  id: string;
  agent_type: string;
  name: string;
  description?: string;
  configuration: Record<string, any>;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface DatabaseStats {
  table_name: string;
  total_count: number;
  published_count?: number;
  created_today?: number;
  completed_count?: number;
  upcoming_count?: number;
  active_count?: number;
}

export interface PopularArticle {
  id: string;
  title: string;
  sport: string;
  league: string;
  published_at: Date;
  view_count: number;
  comment_count: number;
}