import { createClient } from '@/lib/supabase/client'
import { ArticleContent } from '@/components/articles/article-content'
import { Button } from '@heroui/react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface ArticlePageProps {
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
    .eq('status', 'published')
    .single()

  if (error || !article) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <Link href="/articles">
        <Button variant="light" className="mb-6">
          ← Back to Articles
        </Button>
      </Link>

      <ArticleContent
        title={article.title}
        content={article.content}
        sport={article.sport}
        createdAt={article.created_at}
        author={article.author_type === 'ai' ? 'AI Sports Writer' : article.author_agent || 'Unknown'}
      />
    </div>
  )
}
