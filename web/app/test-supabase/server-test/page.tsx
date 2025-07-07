import { createClient } from '@/utils/supabase/server'

export default async function SupabaseServerTest() {
  const supabase = createClient()
  
  // Test fetching articles
  const { data: articles, error: articlesError } = await supabase
    .from('articles')
    .select('*')
    .limit(5)
    .order('created_at', { ascending: false })

  // Test fetching a single article if available
  let singleArticle = null
  let singleArticleError = null
  
  if (articles && articles.length > 0) {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', articles[0].id)
      .single()
    
    singleArticle = data
    singleArticleError = error
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Supabase Server Test</h1>
      
      <div className="mb-8 p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Connection Test</h2>
        {!articlesError ? (
          <p className="text-green-600">✅ Successfully connected to Supabase</p>
        ) : (
          <p className="text-red-600">❌ Connection failed: {articlesError.message}</p>
        )}
      </div>

      <div className="mb-8 p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Articles Table Test</h2>
        {articlesError ? (
          <p className="text-red-600">❌ Error fetching articles: {articlesError.message}</p>
        ) : (
          <div>
            <p className="text-green-600">✅ Successfully queried articles table</p>
            <p className="mt-2">Found {articles?.length || 0} articles</p>
            
            {articles && articles.length > 0 && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">Sample Article:</h3>
                <div className="p-4 bg-gray-50 rounded">
                  <h4 className="font-semibold">{articles[0].title}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {articles[0].summary || 'No summary available'}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Created: {new Date(articles[0].created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Single Article Query Test</h2>
        {singleArticleError ? (
          <p className="text-red-600">❌ Error fetching single article: {singleArticleError.message}</p>
        ) : singleArticle ? (
          <div>
            <p className="text-green-600">✅ Successfully queried single article</p>
            <div className="mt-4 p-4 bg-gray-50 rounded">
              <h3 className="font-semibold">{singleArticle.title}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {singleArticle.summary || 'No summary available'}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                ID: {singleArticle.id}<br />
                Status: {singleArticle.status || 'N/A'}<br />
                Created: {new Date(singleArticle.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        ) : (
          <p>No articles found to test single article query</p>
        )}
      </div>
    </div>
  )
}
