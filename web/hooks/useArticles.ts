import { useState, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import { supabaseConfig } from '@/config/supabase';
import type { Database } from '@/types/database.types';

type Article = Database['public']['Tables']['articles']['Row'] & {
  user_id?: string;
};

const supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey);

export const useArticles = (userId?: string) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdTestArticles, setCreatedTestArticles] = useState<string[]>([]);

  const mapArticleData = (data: any[]): Article[] => {
    return (data || []).map(article => ({
      ...article,
      status: article.status as Article['status'],
      tags: Array.isArray(article.tags) ? article.tags : [],
      seo_keywords: Array.isArray(article.seo_keywords) ? article.seo_keywords : [],
      reading_time_minutes: Number(article.reading_time_minutes) || 0,
      created_at: article.created_at || null,
      updated_at: article.updated_at || null,
      published_at: article.published_at || null,
      featured_image_url: article.featured_image_url || null,
      game_id: article.game_id || null,
      author_id: article.author_id || null,
      byline: article.byline || null,
      summary: article.summary || ''
    }));
  };

  const fetchArticles = useCallback(async (limit = 5) => {
    try {
      setLoading(true);
      setError(null);
      
      let query = supabase
        .from('articles')
        .select('*', { count: 'exact' })
        .limit(limit);
      
      if (userId) {
        query = query.eq('user_id', userId);
      }
      
      const { data, error: queryError, count } = await query;
      
      if (queryError) throw queryError;
      
      const mappedData = mapArticleData(data || []);
      setArticles(mappedData);
      
      return { data: mappedData, count: count || 0 };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch articles';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const createTestArticle = useCallback(async (userId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const timestamp = new Date().toISOString();
      const testArticle: Omit<Article, 'id' | 'created_at' | 'updated_at'> = {
        title: `Test Article ${timestamp}`,
        content: `This is a test article created at ${timestamp}`,
        status: 'draft',
        user_id: userId,
        author_id: userId,
        sport: 'basketball',
        league: 'nba',
        tags: ['test', 'automated'],
        seo_keywords: ['test', 'supabase', 'integration'],
        reading_time_minutes: 2,
        summary: 'This is an automatically generated test article',
        byline: 'Automated Test',
        published_at: null,
        featured_image_url: null,
        game_id: null
      };

      const { data, error: insertError } = await supabase
        .from('articles')
        .insert(testArticle)
        .select();

      if (insertError) throw insertError;
      
      const newArticle = data?.[0];
      if (!newArticle) throw new Error('No data returned after insert');

      setCreatedTestArticles(prev => [...prev, newArticle.id]);
      await fetchArticles();
      
      return { success: true, article: mapArticleData([newArticle])[0] };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create test article';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [fetchArticles]);

  const cleanupTestData = useCallback(async () => {
    if (createdTestArticles.length === 0) return { success: true };
    
    try {
      setLoading(true);
      const { error } = await supabase
        .from('articles')
        .delete()
        .in('id', createdTestArticles);
      
      if (error) throw error;
      
      setCreatedTestArticles([]);
      await fetchArticles();
      
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to clean up test data';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [createdTestArticles, fetchArticles]);

  const testDatabaseConnection = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Test 1: Basic query
      const { count } = await fetchArticles(1);
      
      // Test 2: RPC call
      const { data: versionData, error: rpcError } = await supabase
        .rpc('version');
      
      if (rpcError) throw rpcError;
      
      return { 
        success: true, 
        articleCount: count,
        databaseVersion: versionData || 'unknown'
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Database test failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [fetchArticles]);

  return {
    articles,
    loading,
    error,
    createdTestArticles,
    fetchArticles,
    createTestArticle,
    cleanupTestData,
    testDatabaseConnection,
  };
};
