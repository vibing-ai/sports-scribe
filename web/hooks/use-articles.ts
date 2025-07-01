'use client'

import { useState, useEffect } from 'react'
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
        .eq('published', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      setArticles(data || [])
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
      return data
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to fetch article')
    }
  }

  const getArticlesBySport = async (sport: string) => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('sport', sport)
        .eq('published', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
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