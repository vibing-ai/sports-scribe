import { Card, CardBody, Chip, Button } from '@heroui/react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { formatArticleDate } from '@/utils/article-processor'

// Re-export the Article type for consistency
export type { Article } from '../types/article'

type ArticlePageProps = {
  params: {
    id: string
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const supabase = createClient()

  const { data: article, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !article) {
    notFound()
  }

  // Date formatting is now handled by formatArticleDate utility function

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Back button */}
      <Link href="/articles" className="block mb-6">
        <Button variant="light" className="mb-6">
          ← Back to Articles
        </Button>
      </Link>

      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>

          {article.subtitle && (
            <p className="text-xl text-gray-600 mb-6">{article.subtitle}</p>
          )}

          <div className="flex flex-wrap gap-2 mb-4">
            {article.teams?.map((team: string) => (
              <Chip key={team} color="primary">
                {team}
              </Chip>
            ))}
            {article.league && (
              <Chip color="secondary">{article.league}</Chip>
            )}
          </div>

          <div className="text-gray-500 text-sm">
            Published {formatArticleDate(article.created_at)}
            {article.reading_time && ` · ${article.reading_time} min read`}
            {article.author && ` · By ${article.author}`}
          </div>
        </header>

        {article.featured_image && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <Image 
              src={article.featured_image} 
              alt={article.title}
              width={1200}
              height={630}
              className="w-full h-auto max-h-96 object-cover"
              priority
            />
          </div>
        )}

        <Card>
          <CardBody>
            <div className="prose prose-lg max-w-none">
              {article.content?.split('\n').map((paragraph: string, index: number) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </CardBody>
        </Card>

        <footer className="mt-12 pt-6 border-t border-gray-200">
          <Link href="/articles">
            <Button variant="light">
              ← Back to All Articles
            </Button>
          </Link>
        </footer>
      </article>
    </div>
  )
}