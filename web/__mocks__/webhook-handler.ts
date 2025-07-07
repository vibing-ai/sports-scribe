import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    
    // Validate required fields
    if (!payload.data?.title || !payload.data?.content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // Map the payload to match the database schema
    const articleData = {
      title: payload.data.title,
      content: payload.data.content,
      summary: payload.data.summary || null,
      status: payload.data.status || 'draft',
      author_id: payload.data.author_id || null,
      sport: payload.data.sport || null,
      league: payload.data.league || null,
      tags: payload.data.tags || null,
      seo_keywords: payload.data.seo_keywords || null,
      reading_time_minutes: payload.data.reading_time_minutes || null,
      featured_image_url: payload.data.featured_image_url || null,
      game_id: payload.data.game_id || null,
      byline: payload.data.byline || null,
      user_id: payload.data.user_id || '00000000-0000-0000-0000-000000000000', // Default user ID
    };

    const { data, error } = await supabase
      .from('articles')
      .insert(articleData)
      .select();

    if (error) {
      console.error('Error inserting article:', error);
      return NextResponse.json(
        { error: 'Failed to create article', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error in webhook handler:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
