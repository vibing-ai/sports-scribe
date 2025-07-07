'use client'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { Button } from '@heroui/react'

// Create a typed Supabase client
const supabase = createClient()

// Define the database article type from Supabase
type DatabaseArticle = {
  id: string;
  title: string;
  content: string;
  summary: string | null;
  author: string | null;
  sport: string;
  league: string;
  status: 'draft' | 'published' | 'archived' | 'scheduled';
  tags: string[] | null;
  featured_image_url: string | null;
  created_at: string | null;
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
type Article = Omit<DatabaseArticle, 'slug' | 'is_featured' | 'view_count' | 'tags' | 'summary' | 'featured_image_url' | 'author' | 'meta_title' | 'meta_description'> & {
  slug: string;
  is_featured: boolean;
  view_count: number;
  tags: string[];
  summary: string;
  featured_image_url: string;
  author: string | null;
  meta_title: string | null;
  meta_description: string | null;
}

export default function TestDatabase() {
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch articles
  const fetchArticles = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      
      // Map the database articles to our application's Article type
      const formattedArticles: Article[] = (data || []).map(article => ({
        ...article,
        slug: article.slug || `article-${article.id}`,
        is_featured: article.is_featured ?? false,
        view_count: article.view_count ?? 0,
        tags: article.tags ?? [],
        status: article.status ?? 'draft',
        featured_image_url: article.featured_image_url ?? '',
        summary: article.summary ?? '',
        author: article.author ?? null,
        meta_title: article.meta_title,
        meta_description: article.meta_description
      }))
      
      setArticles(formattedArticles)
    } catch (error) {
      console.error('Error fetching articles:', error)
      setError('Failed to fetch articles')
    } finally {
      setIsLoading(false)
    }
  }

  // Add a test article
  const handleAddArticle = async () => {
    try {
      setIsLoading(true)
      const testArticle: Omit<DatabaseArticle, 'id' | 'created_at' | 'updated_at' | 'published_at'> = {
        title: 'Test Article ' + new Date().toISOString(),
        content: 'This is a test article content.',
        summary: 'This is a test article summary.',
        sport: 'Basketball',
        league: 'NBA',
        status: 'draft',
        tags: ['test', 'basketball'],
        featured_image_url: 'https://example.com/image.jpg',
        slug: 'test-article-' + Date.now(),
        is_featured: false,
        view_count: 0,
        meta_title: 'Test Article',
        meta_description: 'A test article for development purposes',
        author: 'Test Author',
        author_id: null,
        byline: 'Test Author',
        game_id: null
      }

      const { error: insertError } = await supabase
        .from('articles')
        .insert([testArticle])
      
      if (insertError) throw insertError
      
      // Refresh the articles list
      await fetchArticles()
    } catch (error) {
      console.error('Error adding article:', error)
      setError('Failed to add article')
    } finally {
      setIsLoading(false)
    }
  }

  // Delete an article
  const handleDeleteArticle = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return
    
    try {
      setIsLoading(true)
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      // Refresh the articles list
      await fetchArticles()
    } catch (error) {
      console.error('Error deleting article:', error)
      setError('Failed to delete article')
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch articles on component mount
  useEffect(() => {
    fetchArticles()
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Database Test</h1>
      
      <div className="mb-6">
        <Button 
          onPress={handleAddArticle}
          color="primary"
          variant="solid"
          isLoading={isLoading}
          className="mb-4"
        >
          Add Test Article
        </Button>
        
        {error && (
          <div className="text-red-500 mb-4">
            {error}
          </div>
        )}
        
        <div className="space-y-4">
          {articles.map((article) => (
            <div key={article.id} className="border p-4 rounded-lg">
              <h3 className="text-lg font-semibold">{article.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {article.summary}
              </p>
              <div className="mt-2 flex gap-2">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {article.status}
                </span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  {article.sport}
                </span>
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                  {article.league}
                </span>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {article.created_at && new Date(article.created_at).toLocaleString()}
                </span>
                <Button
                  onPress={() => article.id && handleDeleteArticle(article.id)}
                  size="sm"
                  color="danger"
                  variant="light"
                  isLoading={isLoading}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
          
          {articles.length === 0 && !isLoading && (
            <p className="text-gray-500">No articles found. Add one to get started!</p>
          )}
          
          {isLoading && articles.length === 0 && (
            <p>Loading articles...</p>
          )}
        </div>
      </div>
    </div>
  )
}
