// TODO: Generate this file using: npm run generate:types
// This file contains TypeScript types for your Supabase database schema

export interface Database {
  public: {
    Tables: {
      articles: {
        Row: {
          id: string
          title: string
          content: string
          sport: string
          author: string
          created_at: string
          updated_at: string
          published: boolean
          views: number
        }
        Insert: {
          id?: string
          title: string
          content: string
          sport: string
          author?: string
          created_at?: string
          updated_at?: string
          published?: boolean
          views?: number
        }
        Update: {
          id?: string
          title?: string
          content?: string
          sport?: string
          author?: string
          created_at?: string
          updated_at?: string
          published?: boolean
          views?: number
        }
      }
      games: {
        Row: {
          id: string
          home_team: string
          away_team: string
          sport: string
          game_date: string
          status: string
          score_home: number | null
          score_away: number | null
          created_at: string
        }
        Insert: {
          id?: string
          home_team: string
          away_team: string
          sport: string
          game_date: string
          status?: string
          score_home?: number | null
          score_away?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          home_team?: string
          away_team?: string
          sport?: string
          game_date?: string
          status?: string
          score_home?: number | null
          score_away?: number | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 