interface ArticleContent {
  excerpt?: string;
  content: string;
}

export function processArticleContent({ excerpt, content }: ArticleContent): string {
  // If excerpt is not provided, use the first 150 characters of content
  const safeExcerpt = excerpt || content.slice(0, 150);
  
  // Add ellipsis if the content is longer than the excerpt
  const shouldAddEllipsis = content.length > safeExcerpt.length;
  
  return shouldAddEllipsis 
    ? `${safeExcerpt.trim()}...` 
    : safeExcerpt.trim();
}

export function formatArticleDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
}

export function getReadingTime(content: string, wordsPerMinute = 200): number {
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
