import { NextRequest, NextResponse } from 'next/server'

// GET /api/articles/[id] - Get single article
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    // TODO: Fetch article from Supabase by ID
    const article = {
      id,
      title: `Article ${id}`,
      content: 'This is a placeholder article content...',
      sport: 'football',
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({ article })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch article' },
      { status: 500 }
    )
  }
}

// PUT /api/articles/[id] - Update article
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    
    // TODO: Update article in Supabase
    const updatedArticle = {
      id,
      ...body,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({ article: updatedArticle })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update article' },
      { status: 500 }
    )
  }
}

// DELETE /api/articles/[id] - Delete article
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    // TODO: Delete article from Supabase
    return NextResponse.json({ message: `Article ${id} deleted` })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete article' },
      { status: 500 }
    )
  }
} 