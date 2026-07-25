import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const category = searchParams.get('category') || 'general';
    const query = searchParams.get('query') || '';
    const page = searchParams.get('page') || '1';

    let url = `https://newsapi.org/v2/top-headlines?country=us&page=${page}&pageSize=10&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`;
    
    if (query) {
      url = `https://newsapi.org/v2/everything?q=${query}&page=${page}&pageSize=10&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`;
    } else if (category) {
      url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&pageSize=10&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      console.error('News API error response:', data);
      throw new Error(data.message || 'Failed to fetch news');
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('News API proxy error:', error);
    return NextResponse.json(
      { articles: [] },
      { status: 500 }
    );
  }
}
