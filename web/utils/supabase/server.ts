import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

type CookieOptions = {
  name: string
  value: string
  expires?: Date | number
  maxAge?: number
  domain?: string
  path?: string
  secure?: boolean
  httpOnly?: boolean
  sameSite?: 'lax' | 'strict' | 'none' | boolean
}

// Create a type for the cookie store
interface CookieStore {
  get: (name: string) => { value: string } | undefined
  set: (options: CookieOptions) => void
}

export function createClient() {
  // Get the cookie store
  const cookieStore = cookies() as unknown as CookieStore

  // Create a synchronous version of the cookie store
  const syncCookieStore = {
    get: (name: string) => {
      return cookieStore.get(name)?.value
    },
    set: (name: string, value: string, options: Omit<CookieOptions, 'name' | 'value'>) => {
      try {
        cookieStore.set({ name, value, ...options })
      } catch (error) {
        console.error('Error setting cookie:', error)
      }
    },
    remove: (name: string, options: Omit<CookieOptions, 'name' | 'value'>) => {
      try {
        cookieStore.set({
          name,
          value: '',
          ...options,
          expires: new Date(0)
        })
      } catch (error) {
        console.error('Error removing cookie:', error)
      }
    }
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return syncCookieStore.get(name) || ''
        },
        set(name: string, value: string, options: Omit<CookieOptions, 'name' | 'value'>) {
          syncCookieStore.set(name, value, options)
          return Promise.resolve()
        },
        remove(name: string, options: Omit<CookieOptions, 'name' | 'value'>) {
          syncCookieStore.remove(name, options)
          return Promise.resolve()
        },
      },
    }
  )
}
