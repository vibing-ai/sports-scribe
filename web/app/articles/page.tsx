import { createClient } from '@/lib/supabase/client'
import { ArticleCard } from '@/components/articles/article-card'
import { Card, CardBody } from '@heroui/react'

export default async function ArticlesPage() {
  const supabase = createClient()

  const { data: articles, error } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Card>
            <CardBody>
              <p className="text-red-500">Error loading articles: {error.message}</p>
            </CardBody>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Latest Sports Articles</h1>
      
      {articles && articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              id={article.id}
              title={article.title}
              excerpt={article.summary || article.content.substring(0, 150) + '...'}
              sport={article.sport}
              createdAt={article.created_at}
              author={article.author_type === 'ai' ? 'AI Sports Writer' : article.author_agent || 'Unknown'}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Card>
            <CardBody>
              <p className="text-gray-500">No published articles found.</p>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  )
}
