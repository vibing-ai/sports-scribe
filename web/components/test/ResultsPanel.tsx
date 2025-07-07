import { useArticles } from '@/hooks/useArticles';
import { format } from 'date-fns';

type ResultsPanelProps = {
  result: string;
};

export const ResultsPanel = ({ result }: ResultsPanelProps) => {
  const { articles, loading } = useArticles();

  return (
    <div className="space-y-6">
      {/* Results Section */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold mb-3 text-gray-800">Test Results</h2>
        <div className="font-mono text-sm bg-gray-50 p-3 rounded overflow-x-auto whitespace-pre-wrap min-h-20">
          {result || 'Run a test to see results...'}
        </div>
      </div>

      {/* Articles List */}
      {articles.length > 0 && (
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-800">Latest Articles</h2>
            <span className="text-sm text-gray-500">
              {articles.length} article{articles.length !== 1 ? 's' : ''} found
            </span>
          </div>
          
          <div className="space-y-3">
            {articles.map((article) => (
              <div 
                key={article.id} 
                className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{article.title}</h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {article.summary || 'No summary available'}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                    {article.created_at ? format(new Date(article.created_at), 'MMM d, yyyy') : 'Unknown date'}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {article.tags?.map((tag: string) => (
                    <span 
                      key={tag} 
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}
    </div>
  );
};
