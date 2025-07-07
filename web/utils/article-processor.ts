/**
 * Formats a date string into a human-readable format
 * @param dateString - ISO date string
 * @returns Formatted date string (e.g., "January 1, 2023")
 */
export function formatArticleDate(dateString: string): string {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
}

/**
 * Calculates reading time for content
 * @param content - The content to analyze
 * @param wordsPerMinute - Optional words per minute (default: 200)
 * @returns Estimated reading time in minutes
 */
export function calculateReadingTime(
  content: string, 
  wordsPerMinute: number = 200
): number {
  if (!content) return 0;
  
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
