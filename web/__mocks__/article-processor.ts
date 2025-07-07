// Mock implementation of article processor functions
export function formatArticleDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getReadingTime(content: string, wordsPerMinute = 200): number {
  if (!content) return 0;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export function processArticleContent({ excerpt, content }: { excerpt?: string; content: string }): string {
  return excerpt || content.slice(0, 150) + (content.length > 150 ? '...' : '');
}
