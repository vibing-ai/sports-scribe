export interface ArticleData {
  title: string
  content: string
  sport: string
  author: string
  tags?: string[]
  metadata?: Record<string, any>
}

export class ArticleProcessor {
  static validateArticle(data: ArticleData): boolean {
    return !!(
      data.title &&
      data.content &&
      data.sport &&
      data.author &&
      data.title.length > 10 &&
      data.content.length > 100
    )
  }

  static extractExcerpt(content: string, maxLength: number = 150): string {
    if (!content) return ''
    
    const sentences = content.split('.')
    let excerpt = sentences[0] || ''
    
    for (let i = 1; i < sentences.length; i++) {
      const next = excerpt + '.' + sentences[i]
      if (next.length > maxLength) break
      excerpt = next
    }
    
    const trimmedExcerpt = excerpt.trim()
    return trimmedExcerpt + (trimmedExcerpt.length < content.length ? '...' : '')
  }

  static categorizeByKeywords(content: string): string[] {
    const keywords = {
      breaking: ['breaking', 'urgent', 'just in', 'developing'],
      analysis: ['analysis', 'breakdown', 'insight', 'perspective'],
      stats: ['statistics', 'numbers', 'data', 'metrics'],
      injury: ['injury', 'injured', 'hurt', 'medical'],
      trade: ['trade', 'traded', 'deal', 'transaction'],
      playoff: ['playoff', 'championship', 'finals', 'postseason'],
    }

    const categories: string[] = []
    const contentLower = content.toLowerCase()

    for (const [category, terms] of Object.entries(keywords)) {
      if (terms.some(term => contentLower.includes(term))) {
        categories.push(category)
      }
    }

    return categories
  }

  static formatForDisplay(data: ArticleData) {
    return {
      ...data,
      excerpt: this.extractExcerpt(data.content),
      categories: this.categorizeByKeywords(data.content),
      readTime: Math.ceil(data.content.split(' ').length / 200), // Assuming 200 WPM
    }
  }
} 