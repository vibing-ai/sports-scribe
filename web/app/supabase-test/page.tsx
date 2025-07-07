'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

type TestStatus = 'pending' | 'success' | 'error';

interface TestResult {
  test: string;
  status: TestStatus;
  message: string;
}

export default function SupabaseTestPage() {
  const [connectionStatus, setConnectionStatus] = useState('Connecting to Supabase...');
  const [testResults, setTestResults] = useState<TestResult[]>([]);

  useEffect(() => {
    const testSupabaseConnection = async () => {
      const results = [];
      
      try {
        // Test 1: Check if environment variables are set
        const envVarsTest: TestResult = {
          test: 'Environment Variables',
          status: 'pending',
          message: 'Checking environment variables...'
        };
        results.push(envVarsTest);
        setTestResults([...results]);

        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
          throw new Error('Missing Supabase environment variables');
        }
        
        const updatedEnvVarsTest: TestResult = {
          ...envVarsTest,
          status: 'success',
          message: 'Environment variables are set'
        };
        results[0] = updatedEnvVarsTest;
        setTestResults([...results]);

        // Test 2: Test Supabase connection
        const connectionTest: TestResult = {
          test: 'Database Connection',
          status: 'pending',
          message: 'Connecting to Supabase...'
        };
        results.push(connectionTest);
        setTestResults([...results]);

        const supabase = createClient();
        // Use a type-safe approach for the RPC call
        type NowFunction = () => Promise<{ data: string | null, error: any }>;
        const nowRpc = supabase.rpc as any as { now: NowFunction };
        const { data, error } = await nowRpc.now();
        
        if (error) throw error;
        if (!data) throw new Error('No data returned from RPC call');
        
        const updatedConnectionTest: TestResult = {
          ...connectionTest,
          status: 'success',
          message: `Connected to Supabase! Server time: ${data}`
        };
        results[1] = updatedConnectionTest;
        setTestResults([...results]);

        // Test 3: Test reading from articles table
        const readTest: TestResult = {
          test: 'Read Articles',
          status: 'pending',
          message: 'Reading from articles table...'
        };
        results.push(readTest);
        setTestResults([...results]);

        const { data: articles, error: readError } = await supabase
          .from('articles')
          .select('*')
          .limit(1);
        
        if (readError) throw readError;
        
        const updatedReadTest: TestResult = {
          ...readTest,
          status: 'success',
          message: `Successfully read ${articles?.length || 0} articles`
        };
        results[2] = updatedReadTest;
        setTestResults([...results]);
        
        setConnectionStatus('All tests completed successfully!');
      } catch (error) {
        const lastTest = results[results.length - 1];
        if (lastTest) {
          const updatedLastTest: TestResult = {
            ...lastTest,
            status: 'error',
            message: error instanceof Error ? error.message : 'Unknown error occurred'
          };
          results[results.length - 1] = updatedLastTest;
          setTestResults([...results]);
        }
        setConnectionStatus('Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
      }
    };

    testSupabaseConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Supabase Connection Test</h1>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900">Connection Status</h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {connectionStatus}
            </p>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900">Test Results</h2>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              {testResults.map((test, index) => (
                <div 
                  key={index}
                  className={`${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
                >
                  <dt className="text-sm font-medium text-gray-500">{test.test}</dt>
                  <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      test.status === 'success' 
                        ? 'bg-green-100 text-green-800' 
                        : test.status === 'error' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {test.status.toUpperCase()}
                    </span>
                    <span className="ml-2">{test.message}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
