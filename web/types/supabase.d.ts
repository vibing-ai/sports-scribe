/// <reference types="@supabase/supabase-js" />

declare module '@/utils/supabase/server' {
  import { SupabaseClient } from '@supabase/supabase-js'
  export function createClient(): SupabaseClient
}

declare module '@supabase/ssr' {
  import { SupabaseClient, CookieOptions } from '@supabase/supabase-js'
  
  export function createServerClient(
    supabaseUrl: string,
    supabaseKey: string,
    options: {
      cookies: {
        get: (name: string) => string | undefined
        set: (name: string, value: string, options: CookieOptions) => void
        remove: (name: string, options: CookieOptions) => void
      }
    }
  ): SupabaseClient
}
