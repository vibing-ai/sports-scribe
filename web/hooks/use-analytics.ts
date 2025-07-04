'use client'

import { useState, useEffect } from 'react'

export interface AnalyticsData {
  totalArticles: number
  totalViews: number
  articlesThisWeek: number
  topSports: Array<{ sport: string; percentage: number }>
  weeklyGrowth: number
  engagement: {
    averageTimeOnPage: string
    bounceRate: number
    returnVisitors: number
  }
  aiAgentStatus: {
    dataCollector: string
    researcher: string
    writer: string
    editor: string
  }
}

export function useAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/analytics')

      if (!response.ok) {
        throw new Error('Failed to fetch analytics')
      }

      const data = await response.json()
      setAnalytics(data.analytics)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const refreshAnalytics = () => {
    fetchAnalytics()
  }

  return {
    analytics,
    loading,
    error,
    refreshAnalytics,
  }
}
