'use client'

import { useState } from 'react'
import { Button, Card, CardBody, CardHeader } from '@heroui/react'
import { testDatabaseConnection } from '@/lib/supabase/test-connection'

export default function TestDatabase() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const runTest = async () => {
    setLoading(true)
    const testResult = await testDatabaseConnection()
    setResult(testResult)
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
              <pre className="text-sm">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  )
}
