import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const { title, description } = await req.json();

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      // Fallback mock summary when no key is set
      return NextResponse.json({
        summary: `This article discusses "${title}". ${description ? description.substring(0, 120) + '...' : 'No additional details available.'} This is a mock AI summary since no Gemini API key is configured.`,
        keyPoints: [
          'Configure your GEMINI_API_KEY in .env.local for live summaries.',
          'Get a free key at aistudio.google.com',
          'This mock response demonstrates the AI summarization feature.',
        ],
      });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are an expert news analyst. Analyze the following article and provide:
1. A concise 2-3 sentence summary
2. 3 key bullet points

Article Title: ${title}
Article Content: ${description || 'No description provided.'}

Respond ONLY with valid JSON in this exact format:
{
  "summary": "Your 2-3 sentence summary here",
  "keyPoints": ["point 1", "point 2", "point 3"]
}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Invalid AI response format');

    const parsed = JSON.parse(jsonMatch[0]);
    return NextResponse.json(parsed);
  } catch (error) {
    console.error('AI Summarize error:', error);
    return NextResponse.json(
      { error: 'Failed to generate summary. Please try again.' },
      { status: 500 }
    );
  }
}
