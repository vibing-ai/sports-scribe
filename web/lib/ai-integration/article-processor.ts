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

  // Handle invalid dates
  if (isNaN(dateObj.getTime())) {
    throw new Error('Invalid date provided');
  }

  return new Intl.DateTimeFormat('en-US', {
export function getReadingTime(content: string, wordsPerMinute = 200): number {
  // Validate inputs
  if (!content || typeof content !== 'string') {
    return 0;
  }

  if (wordsPerMinute <= 0) {
    throw new Error('Words per minute must be a positive number');
  }

  // More accurate word counting: handle punctuation and multiple spaces
  const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length;

  if (wordCount === 0) {
    return 0;
  }

  return Math.ceil(wordCount / wordsPerMinute);
}
}

export function getReadingTime(content: string, wordsPerMinute = 200): number {
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
