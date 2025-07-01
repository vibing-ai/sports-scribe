'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function useSupabase() {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getInitialSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
        
        if (event === 'SIGNED_IN') {
          router.refresh()
        }
        
        if (event === 'SIGNED_OUT') {
          router.refresh()
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [router, supabase.auth])

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw error
    }
    router.push('/')
  }

  return {
    supabase,
    user,
    loading,
    signOut,
  }
} 