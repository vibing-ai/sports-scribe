import { useState, useEffect, useCallback } from 'react';
import { type User } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';
import { supabaseConfig } from '@/config/supabase';

const supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey);

type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated';

export const useSupabaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>('checking');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkUser = useCallback(async () => {
    try {
      setLoading(true);
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError) throw authError;
      
      setUser(user);
      setStatus(user ? 'authenticated' : 'unauthenticated');
      setError(null);
      return user;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Authentication error';
      setError(errorMessage);
      setStatus('unauthenticated');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const signInWithGitHub = useCallback(async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      
      if (error) throw error;
      
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Sign in failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setStatus('unauthenticated');
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Sign out failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial check
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      setStatus(currentUser ? 'authenticated' : 'unauthenticated');
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [checkUser]);

  return {
    user,
    status,
    loading,
    error,
    signInWithGitHub,
    signOut,
    checkUser,
  };
};
