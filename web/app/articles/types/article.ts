export interface Article {
  id: string
  title: string
  subtitle?: string
  content: string
  summary?: string
  created_at: string
  updated_at: string
  status: string
  teams?: string[]
  league?: string
  reading_time?: number
  author?: string
  featured_image?: string
}
