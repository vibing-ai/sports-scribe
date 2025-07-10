'use client'

import { useState } from 'react'
import { Button, Card, CardBody, CardHeader } from '@heroui/react'
import { createClient } from '@/lib/supabase/client'

interface TestResult {
  success: boolean;
  message?: string;
  data?: any;
  error?: string;
}

export default function TestDatabase() {
  const [result, setResult] = useState<TestResult | null>(null)
  const [loading, setLoading] = useState(false)

  const runTest = async () => {
    setLoading(true)
    
    try {
      const supabase = createClient()
      
      // Fetch all articles
      const { data: articles, error: articlesError } = await supabase
        .from('articles')
        .select('*')
      
      if (articlesError) throw articlesError
      
      console.log('📄 All articles:', articles)
      console.log('📄 Article fields:', articles.length > 0 ? Object.keys(articles[0]) : 'No articles')
      
      // Try different published queries
      const { data: publishedStatus, error: statusError } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
      
      const { data: publishedBool, error: boolError } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
      
      const testResult = {
        success: true,
        message: 'Database test completed!',
        data: {
          totalArticles: articles.length,
          publishedStatus: publishedStatus?.length || 0,
          publishedBool: publishedBool?.length || 0,
          sampleArticle: articles[0],
          statusError: statusError?.message,
          boolError: boolError?.message
        }
      }
      
      setResult(testResult)
    } catch (error: any) {
      console.error('Test failed:', error)
      setResult({ success: false, error: error.message })
    }
    
    setLoading(false)
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Database Connection Test</h1>

      <Card className="max-w-[600px] mb-4">
        <CardHeader>
          <h2 className="text-lg font-semibold">Supabase Connection Test</h2>
        </CardHeader>
        <CardBody>
          <Button
            color="primary"
            onClick={runTest}
            isLoading={loading}
            className="mb-4"
          >
            Test Database Connection
          </Button>

          {result && (
            <div className={`p-4 rounded ${result.success ? 'bg-green-100' : 'bg-red-100'}`}>
              <h3 className="font-semibold mb-2">
                {result.success ? '✅ Success!' : '❌ Error!'}
              </h3>
              <pre className="text-sm whitespace-pre-wrap">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  )
}
