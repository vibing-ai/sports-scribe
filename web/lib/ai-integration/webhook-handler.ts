import { createServerSupabaseClient } from '../supabase/server'

export interface WebhookPayload {
  type: 'article.generated'
  data: {
    title: string
    content: string
    sport: string
    author: string
    metadata?: Record<string, any>
  }
}

export async function handleWebhook(payload: WebhookPayload) {
  const supabase = createServerSupabaseClient()

  if (payload.type === 'article.generated') {
    try {
      const { data, error } = await supabase
        .from('articles')
        .insert({
          title: payload.data.title,
          content: payload.data.content,
          sport: payload.data.sport,
          author: payload.data.author,
          published: true,
        })
        .select()
        .single()

      if (error) {
        throw error
      }

      // TODO: Trigger real-time notifications
      // TODO: Update cache
      // TODO: Send notifications to subscribers

      return { success: true, article: data }
    } catch (error) {
      console.error('Failed to save AI-generated article:', error)
      throw error
    }
  }

  throw new Error(`Unknown webhook type: ${payload.type}`)
}
