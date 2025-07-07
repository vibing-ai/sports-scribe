export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      api_keys: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          key_hash: string
          last_used_at: string | null
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          key_hash: string
          last_used_at?: string | null
          name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          key_hash?: string
          last_used_at?: string | null
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      article_comments: {
        Row: {
          article_id: string
          content: string
          created_at: string | null
          id: string
          is_approved: boolean | null
          is_deleted: boolean | null
          parent_comment_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          article_id: string
          content: string
          created_at?: string | null
          id?: string
          is_approved?: boolean | null
          is_deleted?: boolean | null
          parent_comment_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          article_id?: string
          content?: string
          created_at?: string | null
          id?: string
          is_approved?: boolean | null
          is_deleted?: boolean | null
          parent_comment_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "article_comments_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "article_comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "article_comments"
            referencedColumns: ["id"]
          },
        ]
      }
      article_metadata: {
        Row: {
          article_id: string
          created_at: string | null
          id: string
          readability_score: number | null
          sentiment_score: number | null
          topics: string[] | null
          updated_at: string | null
          word_count: number | null
        }
        Insert: {
          article_id: string
          created_at?: string | null
          id?: string
          readability_score?: number | null
          sentiment_score?: number | null
          topics?: string[] | null
          updated_at?: string | null
          word_count?: number | null
        }
        Update: {
          article_id?: string
          created_at?: string | null
          id?: string
          readability_score?: number | null
          sentiment_score?: number | null
          topics?: string[] | null
          updated_at?: string | null
          word_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "article_metadata_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
      articles: {
        Row: {
          author_id: string | null
          byline: string | null
          content: string
          created_at: string | null
          featured_image_url: string | null
          game_id: string | null
          id: string
          league: string
          published_at: string | null
          reading_time_minutes: number | null
          seo_keywords: string[] | null
          sport: string
          status: Database["public"]["Enums"]["article_status_enum"] | null
          summary: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          byline?: string | null
          content: string
          created_at?: string | null
          featured_image_url?: string | null
          game_id?: string | null
          id?: string
          league: string
          published_at?: string | null
          reading_time_minutes?: number | null
          seo_keywords?: string[] | null
          sport: string
          status?: Database["public"]["Enums"]["article_status_enum"] | null
          summary?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          byline?: string | null
          content?: string
          created_at?: string | null
          featured_image_url?: string | null
          game_id?: string | null
          id?: string
          league?: string
          published_at?: string | null
          reading_time_minutes?: number | null
          seo_keywords?: string[] | null
          sport?: string
          status?: Database["public"]["Enums"]["article_status_enum"] | null
          summary?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "articles_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      games: {
        Row: {
          away_score: number | null
          away_team_id: string
          created_at: string | null
          game_data: Json | null
          game_time: string
          home_score: number | null
          home_team_id: string
          id: string
          season: string | null
          status: Database["public"]["Enums"]["game_status_enum"] | null
          updated_at: string | null
          venue_id: string | null
          week: number | null
        }
        Insert: {
          away_score?: number | null
          away_team_id: string
          created_at?: string | null
          game_data?: Json | null
          game_time: string
          home_score?: number | null
          home_team_id: string
          id?: string
          season?: string | null
          status?: Database["public"]["Enums"]["game_status_enum"] | null
          updated_at?: string | null
          venue_id?: string | null
          week?: number | null
        }
        Update: {
          away_score?: number | null
          away_team_id?: string
          created_at?: string | null
          game_data?: Json | null
          game_time?: string
          home_score?: number | null
          home_team_id?: string
          id?: string
          season?: string | null
          status?: Database["public"]["Enums"]["game_status_enum"] | null
          updated_at?: string | null
          venue_id?: string | null
          week?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "games_away_team_id_fkey"
            columns: ["away_team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "games_home_team_id_fkey"
            columns: ["home_team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      players: {
        Row: {
          birth_date: string | null
          created_at: string | null
          first_name: string
          headshot_url: string | null
          height: string | null
          id: string
          last_name: string
          nationality: string | null
          number: number | null
          position: string | null
          status: Database["public"]["Enums"]["player_status_enum"] | null
          team_id: string | null
          updated_at: string | null
          weight: number | null
        }
        Insert: {
          birth_date?: string | null
          created_at?: string | null
          first_name: string
          headshot_url?: string | null
          height?: string | null
          id?: string
          last_name: string
          nationality?: string | null
          number?: number | null
          position?: string | null
          status?: Database["public"]["Enums"]["player_status_enum"] | null
          team_id?: string | null
          updated_at?: string | null
          weight?: number | null
        }
        Update: {
          birth_date?: string | null
          created_at?: string | null
          first_name?: string
          headshot_url?: string | null
          height?: string | null
          id?: string
          last_name?: string
          nationality?: string | null
          number?: number | null
          position?: string | null
          status?: Database["public"]["Enums"]["player_status_enum"] | null
          team_id?: string | null
          updated_at?: string | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "players_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      system_config: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_public: boolean | null
          key: string
          updated_at: string | null
          value: Json
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          key: string
          updated_at?: string | null
          value: Json
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          key?: string
          updated_at?: string | null
          value?: Json
        }
        Relationships: []
      }
      teams: {
        Row: {
          abbreviation: string | null
          created_at: string | null
          founded_year: number | null
          home_venue_id: string | null
          id: string
          league: string
          logo_url: string | null
          name: string
          sport: string
          updated_at: string | null
        }
        Insert: {
          abbreviation?: string | null
          created_at?: string | null
          founded_year?: number | null
          home_venue_id?: string | null
          id?: string
          league: string
          logo_url?: string | null
          name: string
          sport: string
          updated_at?: string | null
        }
        Update: {
          abbreviation?: string | null
          created_at?: string | null
          founded_year?: number | null
          home_venue_id?: string | null
          id?: string
          league?: string
          logo_url?: string | null
          name?: string
          sport?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["user_role_enum"] | null
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          role?: Database["public"]["Enums"]["user_role_enum"] | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role_enum"] | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      article_status_enum: "draft" | "published" | "archived" | "scheduled"
      game_status_enum:
        | "scheduled"
        | "pregame"
        | "in_progress"
        | "halftime"
        | "overtime"
        | "final"
        | "postponed"
        | "cancelled"
      player_status_enum:
        | "active"
        | "injured"
        | "suspended"
        | "inactive"
        | "retired"
        | "free_agent"
      user_role_enum: "admin" | "editor" | "writer" | "viewer" | "api_user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      article_status_enum: ["draft", "published", "archived", "scheduled"],
      game_status_enum: [
        "scheduled",
        "pregame",
        "in_progress",
        "halftime",
        "overtime",
        "final",
        "postponed",
        "cancelled",
      ],
      player_status_enum: [
        "active",
        "injured",
        "suspended",
        "inactive",
        "retired",
        "free_agent",
      ],
      user_role_enum: ["admin", "editor", "writer", "viewer", "api_user"],
    },
  },
} as const
