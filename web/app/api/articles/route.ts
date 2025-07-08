import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'

// GET /api/articles - List all articles
export async function GET(request: NextRequest) {
  try {
    // TODO: Fetch articles from Supabase
    const articles = [
      {
        id: '1',
        title: 'Sample Sports Article',
        content: 'This is a placeholder article...',
        sport: 'football',
        createdAt: new Date().toISOString(),
      },
    ]

    return NextResponse.json({ articles })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 })
  }
}

// POST /api/articles - Create new article
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // TODO: Validate input and save to Supabase
    const newArticle = {
      id: randomUUID(),
      ...body,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({ article: newArticle }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 })
  }
}
