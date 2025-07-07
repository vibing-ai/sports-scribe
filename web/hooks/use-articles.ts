'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

// Define the database article type from Supabase
type DatabaseArticle = {
  id: string;
  title: string;
  content: string;
  summary: string | null;
  author: string | null;
  sport: string;
  league: string;
  status: 'draft' | 'published' | 'archived' | 'scheduled' | null;
  tags: string[] | null;
  featured_image_url: string | null;
  created_at: string;
  updated_at: string | null;
  published_at: string | null;
  slug: string | null;
  meta_title: string | null;
  meta_description: string | null;
  is_featured: boolean | null;
  view_count: number | null;
  author_id: string | null;
  byline: string | null;
  game_id: string | null;
}

// Define our application's article type with required fields
export interface Article {
  id: string;
  title: string;
  content: string;
  summary: string;
  author: string | null;
  sport: string;
  league: string;
  status: 'draft' | 'published' | 'archived' | 'scheduled';
  tags: string[];
  featured_image_url: string;
  created_at: string;
  updated_at: string | null;
  published_at: string | null;
  slug: string;
  meta_title: string | null;
  meta_description: string | null;
  is_featured: boolean;
  view_count: number;
  author_id: string | null;
  byline: string | null;
  game_id: string | null;
}

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false })

      if (error) throw error
      
      if (!data) {
        setArticles([])
        return
      }
      
      // Map database articles to our Article type
      const formattedArticles: Article[] = data.map((article: any) => {
        // Ensure all required fields have values
        const mappedArticle: Article = {
          id: article.id,
          title: article.title || 'Untitled',
          content: article.content || '',
          summary: article.summary || '',
          author: article.author || null,
          sport: article.sport || 'general',
          league: article.league || '',
          status: (['draft', 'published', 'archived', 'scheduled'].includes(article.status) 
            ? article.status 
            : 'draft') as 'draft' | 'published' | 'archived' | 'scheduled',
          tags: Array.isArray(article.tags) ? article.tags : [],
          featured_image_url: article.featured_image_url || '',
          created_at: article.created_at || new Date().toISOString(),
          updated_at: article.updated_at || null,
          published_at: article.published_at || null,
          slug: article.slug || `article-${article.id}`,
          meta_title: article.meta_title || null,
          meta_description: article.meta_description || null,
          is_featured: Boolean(article.is_featured),
          view_count: typeof article.view_count === 'number' ? article.view_count : 0,
          author_id: article.author_id || null,
          byline: article.byline || null,
          game_id: article.game_id || null
        }
        return mappedArticle
      })
      
      setArticles(formattedArticles)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const getArticleById = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      
      if (!data) return null
      
      // Map database article to our Article type with proper type safety
      const article = data as any
      return {
        id: article.id,
        title: article.title || 'Untitled',
        content: article.content || '',
        summary: article.summary || '',
        author: article.author || null,
        sport: article.sport || 'general',
        league: article.league || '',
        status: (['draft', 'published', 'archived', 'scheduled'].includes(article.status) 
          ? article.status 
          : 'draft') as 'draft' | 'published' | 'archived' | 'scheduled',
        tags: Array.isArray(article.tags) ? article.tags : [],
        featured_image_url: article.featured_image_url || '',
        created_at: article.created_at || new Date().toISOString(),
        updated_at: article.updated_at || null,
        published_at: article.published_at || null,
        slug: article.slug || `article-${article.id}`,
        meta_title: article.meta_title || null,
        meta_description: article.meta_description || null,
        is_featured: Boolean(article.is_featured),
        view_count: typeof article.view_count === 'number' ? article.view_count : 0,
        author_id: article.author_id || null,
        byline: article.byline || null,
        game_id: article.game_id || null
      } as Article
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to fetch article')
    }
  }

  const getArticlesBySport = async (sport: string): Promise<Article[]> => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('sport', sport)
        .eq('status', 'published')
        .order('created_at', { ascending: false })

      if (error) throw error
      
      if (!data) return []
      
      // Map database articles to our Article type with proper type safety
      return data.map((article: any) => ({
        id: article.id,
        title: article.title || 'Untitled',
        content: article.content || '',
        summary: article.summary || '',
        author: article.author || null,
        sport: article.sport || 'general',
        league: article.league || '',
        status: (['draft', 'published', 'archived', 'scheduled'].includes(article.status) 
          ? article.status 
          : 'draft') as 'draft' | 'published' | 'archived' | 'scheduled',
        tags: Array.isArray(article.tags) ? article.tags : [],
        featured_image_url: article.featured_image_url || '',
        created_at: article.created_at || new Date().toISOString(),
        updated_at: article.updated_at || null,
        published_at: article.published_at || null,
        slug: article.slug || `article-${article.id}`,
        meta_title: article.meta_title || null,
        meta_description: article.meta_description || null,
        is_featured: Boolean(article.is_featured),
        view_count: typeof article.view_count === 'number' ? article.view_count : 0,
        author_id: article.author_id || null,
        byline: article.byline || null,
        game_id: article.game_id || null
      }))
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to fetch articles')
    }
  }

  return {
    articles,
    loading,
    error,
    fetchArticles,
    getArticleById,
    getArticlesBySport,
  }
} 