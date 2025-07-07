'use client';

import { useState } from 'react';
import { AuthSection } from '@/components/test/AuthSection';
import { TestControls } from '@/components/test/TestControls';
import { ResultsPanel } from '@/components/test/ResultsPanel';
import { useArticles } from '@/hooks/useArticles';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import type { Article } from '@/types/database.types';

export default function SupabaseTestPage() {
  const [result, setResult] = useState('');
  const { user, loading: authLoading } = useSupabaseAuth();
  const { articles, loading: articlesLoading } = useArticles(user?.id);

  const handleTestComplete = () => {
    // Additional logic after test completion if needed
  };

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-4xl">
      <AuthSection />
      
      <TestControls 
        onResult={setResult}
        onTestComplete={handleTestComplete}
      />
      
      <ResultsPanel result={result} />
      
      {(authLoading || articlesLoading) && (
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900">Latest Articles</h2>
        <span className="text-sm text-gray-500">{articles.length} articles found</span>
      </div>
      <div className="space-y-3">
        {articles.map((article: Article) => (
          <div key={article.id} className="p-4 border rounded-lg bg-white hover:shadow-sm transition-shadow">
            <h3 className="font-medium text-gray-900">{article.title}</h3>
            <div className="flex flex-wrap gap-2 mt-1 mb-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {article.status || 'no status'}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(article.created_at || '').toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">
              {article.summary || 'No summary available'}
            </p>
          </div>
        ))}
      </div>
      
      {/* Debug Info */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h2 className="font-semibold text-blue-800 mb-3">Connection Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="w-32 text-gray-600">Environment:</span>
              <span className="font-mono px-2 py-1 bg-white rounded text-sm border">
                {process.env.NODE_ENV}
              </span>
            </div>
            <div className="flex items-start">
              <span className="w-32 text-gray-600 pt-1">Supabase URL:</span>
              <span className={`px-2 py-1 rounded text-sm truncate max-w-xs ${process.env.NEXT_PUBLIC_SUPABASE_URL ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                {process.env.NEXT_PUBLIC_SUPABASE_URL || 'Not configured'}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start">
              <span className="w-32 text-gray-600 pt-1">Anon Key:</span>
              <span className={`px-2 py-1 rounded text-sm font-mono truncate max-w-xs ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY 
                  ? `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 8)}...${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length - 4)}` 
                  : 'Not configured'}
              </span>
            </div>
            <div className="flex items-center">
              <span className="w-32 text-gray-600">User ID:</span>
              <span className="font-mono text-sm text-gray-700 truncate max-w-xs">
                {user?.id || 'Not signed in'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
