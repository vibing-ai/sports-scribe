export interface Agent {
  id: string;
  name: string;
  type: AgentType;
  description: string;
  capabilities: string[];
  status: AgentStatus;
  version: string;
  created_at: Date;
  last_active: Date;
  configuration: AgentConfiguration;
  performance_metrics: AgentMetrics;
}

export enum AgentType {
  DATA_COLLECTOR = 'data_collector',
  RESEARCHER = 'researcher',
  WRITER = 'writer',
  EDITOR = 'editor',
  FACT_CHECKER = 'fact_checker',
  SEO_OPTIMIZER = 'seo_optimizer'
}

export enum AgentStatus {
  ACTIVE = 'active',
  IDLE = 'idle',
  PROCESSING = 'processing',
  ERROR = 'error',
  MAINTENANCE = 'maintenance',
  OFFLINE = 'offline'
}

export interface AgentConfiguration {
  max_concurrent_tasks: number;
  timeout_minutes: number;
  retry_attempts: number;
  priority_level: number;
  data_sources: string[];
  output_format: string;
  quality_thresholds: QualityThresholds;
  custom_settings: Record<string, any>;
}

export interface QualityThresholds {
  min_word_count: number;
  max_word_count: number;
  readability_score: number;
  fact_accuracy_threshold: number;
  plagiarism_threshold: number;
}

export interface AgentMetrics {
  tasks_completed: number;
  success_rate: number;
  average_processing_time: number;
  error_count: number;
  last_error_at?: Date;
  uptime_percentage: number;
  quality_score: number;
}

export interface AgentTask {
  id: string;
  agent_id: string;
  type: TaskType;
  priority: TaskPriority;
  status: TaskStatus;
  input_data: any;
  output_data?: any;
  error_message?: string;
  created_at: Date;
  started_at?: Date;
  completed_at?: Date;
  estimated_duration: number;
  actual_duration?: number;
  dependencies: string[];
  metadata: TaskMetadata;
}

export enum TaskType {
  COLLECT_GAME_DATA = 'collect_game_data',
  RESEARCH_BACKGROUND = 'research_background',
  GENERATE_ARTICLE = 'generate_article',
  EDIT_CONTENT = 'edit_content',
  FACT_CHECK = 'fact_check',
  OPTIMIZE_SEO = 'optimize_seo',
  PUBLISH_ARTICLE = 'publish_article'
}

export enum TaskPriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  URGENT = 'urgent'
}

export enum TaskStatus {
  PENDING = 'pending',
  QUEUED = 'queued',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  RETRYING = 'retrying'
}

export interface TaskMetadata {
  game_id?: string;
  article_id?: string;
  sport?: string;
  league?: string;
  target_audience?: string;
  urgency_level?: number;
  source_reliability?: number;
  confidence_score?: number;
}

export interface AgentWorkflow {
  id: string;
  name: string;
  description: string;
  trigger: WorkflowTrigger;
  steps: WorkflowStep[];
  status: WorkflowStatus;
  created_at: Date;
  last_executed: Date;
  success_rate: number;
}

export interface WorkflowTrigger {
  type: TriggerType;
  condition: string;
  schedule?: string;
  event_pattern?: Record<string, any>;
}

export enum TriggerType {
  SCHEDULED = 'scheduled',
  EVENT_DRIVEN = 'event_driven',
  MANUAL = 'manual',
  API_CALL = 'api_call'
}

export interface WorkflowStep {
  id: string;
  agent_type: AgentType;
  task_type: TaskType;
  order: number;
  depends_on: string[];
  timeout_minutes: number;
  retry_on_failure: boolean;
  input_mapping: Record<string, string>;
  output_mapping: Record<string, string>;
}

export enum WorkflowStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  DISABLED = 'disabled',
  ERROR = 'error'
}

export interface AgentCommunication {
  id: string;
  from_agent_id: string;
  to_agent_id: string;
  message_type: MessageType;
  content: any;
  timestamp: Date;
  acknowledged: boolean;
  response_id?: string;
}

export enum MessageType {
  TASK_REQUEST = 'task_request',
  TASK_RESPONSE = 'task_response',
  DATA_SHARE = 'data_share',
  STATUS_UPDATE = 'status_update',
  ERROR_REPORT = 'error_report',
  HEARTBEAT = 'heartbeat'
} 