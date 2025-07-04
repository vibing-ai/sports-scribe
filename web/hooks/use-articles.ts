'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'

export interface Article {
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

interface ArticleFilters {
  sport?: string
  league?: string
  dateRange?: { start: Date; end: Date }
}

// Constants for validation
const VALID_SPORTS = ['football', 'basketball', 'baseball', 'soccer', 'hockey']
const VALID_LEAGUES = ['nfl', 'nba', 'mlb', 'mls', 'nhl', 'premier-league']

// Validation utilities
const validateFilters = (filters: ArticleFilters): boolean => {
  if (filters.sport && !VALID_SPORTS.includes(filters.sport)) {
    return false
  }
  if (filters.league && !VALID_LEAGUES.includes(filters.league)) {
    return false
  }
  if (filters.dateRange && filters.dateRange.start > filters.dateRange.end) {
    return false
  }
  return true
}

// Error handling utilities
const handleFetchError = (error: Error, setError: (error: string) => void) => {
  console.error('Failed to fetch articles:', error)

  if (error.message.includes('network')) {
    setError('Network error. Please check your connection.')
  } else if (error.message.includes('unauthorized')) {
    setError('Authentication required. Please log in.')
  } else if (error.message.includes('timeout')) {
    setError('Request timed out. Please try again.')
  } else {
    setError('Failed to fetch articles. Please try again.')
  }
}

// Data processing utilities
const processArticleData = (rawData: any[]): Article[] => {
  return rawData
    .filter((article) => article.status === 'published')
    .map((article) => ({
      ...article,
      publishedAt: new Date(article.published_at),
      tags: article.tags || [],
    }))
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
}

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  const fetchArticles = useCallback(
    async (filters: ArticleFilters = {}) => {
      if (!validateFilters(filters)) {
        setError('Invalid filters provided')
        return
      }

      try {
        setLoading(true)
        setError(null)

        let query = supabase
          .from('articles')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false })

        // Apply filters if provided
        if (filters.sport) {
          query = query.eq('sport', filters.sport)
        }
        if (filters.league) {
          query = query.eq('league', filters.league)
        }
        if (filters.dateRange) {
          query = query
            .gte('created_at', filters.dateRange.start.toISOString())
            .lte('created_at', filters.dateRange.end.toISOString())
        }

        const { data, error } = await query

        if (error) throw error

        const processedArticles = processArticleData(data || [])
        setArticles(processedArticles)
      } catch (err) {
        handleFetchError(err instanceof Error ? err : new Error('Unknown error'), setError)
      } finally {
        setLoading(false)
      }
    },
    [supabase]
  )

  const getArticleById = useCallback(
    async (id: string) => {
      if (!id) {
        throw new Error('Article ID is required')
      }

      try {
        const { data, error } = await supabase.from('articles').select('*').eq('id', id).single()

        if (error) throw error
        return data
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch article'
        throw new Error(errorMessage)
      }
    },
    [supabase]
  )

  const getArticlesBySport = useCallback(
    async (sport: string) => {
      if (!sport || !VALID_SPORTS.includes(sport)) {
        throw new Error('Valid sport is required')
      }

      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('sport', sport)
          .eq('published', true)
          .order('created_at', { ascending: false })

        if (error) throw error
        return processArticleData(data || [])
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch articles'
        throw new Error(errorMessage)
      }
    },
    [supabase]
  )

  useEffect(() => {
    fetchArticles()
  }, [fetchArticles])

  return {
    articles,
    loading,
    error,
    fetchArticles,
    getArticleById,
    getArticlesBySport,
  }
}
