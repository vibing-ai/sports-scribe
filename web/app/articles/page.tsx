import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import type { Article } from './types/article'

export default async function ArticlesPage() {
  const supabase = createClient()

  const { data: articles, error } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="max-w-md mx-auto p-6 bg-red-50 dark:bg-red-900/20 rounded-xl">
          <h2 className="text-lg font-medium text-red-800 dark:text-red-200">
            Error loading articles
          </h2>
          <p className="mt-2 text-sm text-red-700 dark:text-red-300">
            {error.message}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-4">
          Latest Football News
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Stay updated with the latest insights, analysis, and stories from the world of football.
        </p>
      </div>

      {articles?.length === 0 ? (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              No articles found
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Check back later for new content.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles?.map((article: Article) => (
            <article 
              key={article.id}
              className="group relative flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-gray-800/50 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700/50 hover:border-transparent dark:hover:border-transparent hover:-translate-y-1"
            >
              <Link href={`/articles/${article.id}`} className="block h-full">
                <div className="aspect-video relative overflow-hidden bg-gray-100 dark:bg-gray-700">
                  {article.featured_image ? (
                    <Image
                      src={article.featured_image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800">
                      <span className="text-4xl">⚽</span>
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      {article.league && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                          {article.league}
                        </span>
                      )}
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDistanceToNow(new Date(article.created_at), { addSuffix: true })}
                      </span>
                    </div>
                    
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {article.title}
                    </h2>
                    
                    {article.subtitle && (
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                        {article.subtitle}
                      </p>
                    )}
                    
                    <p className="text-gray-700 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                      {article.summary || (article.content ? article.content.substring(0, 180) + '...' : '')}
                    </p>
                  </div>
                  
                  {article.teams && article.teams.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700/50">
                      <div className="flex flex-wrap gap-2">
                        {article.teams.map((team: string) => (
                          <span 
                            key={team}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                          >
                            {team}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}