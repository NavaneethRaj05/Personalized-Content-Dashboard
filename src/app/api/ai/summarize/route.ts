import { Groq } from 'groq-sdk';
import { NextRequest, NextResponse } from 'next/server';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
});

export async function POST(req: NextRequest) {
  try {
    const { title, description } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({
        summary: `This article discusses "${title}". ${description ? description.substring(0, 120) + '...' : 'No additional details available.'} (Mock summary: Groq API key missing)`,
        keyPoints: [
          'Configure your GROQ_API_KEY in .env.local',
          'This mock response demonstrates the AI summarization UI.',
        ],
      });
    }

    const prompt = `You are an expert news analyst. Analyze the following article and provide:
1. A concise 2-3 sentence summary
2. 3 key bullet points

Article Title: ${title}
Article Content: ${description || 'No description provided.'}

Respond ONLY with valid JSON in this exact format, with no markdown formatting or backticks:
{
  "summary": "Your 2-3 sentence summary here",
  "keyPoints": ["point 1", "point 2", "point 3"]
}`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.1-8b-instant',
      temperature: 0.1,
      response_format: { type: 'json_object' },
    });

    const text = completion.choices[0]?.message?.content || '{}';
    const parsed = JSON.parse(text);
    
    // Ensure the structure is correct
    if (!parsed.summary || !Array.isArray(parsed.keyPoints)) {
       throw new Error('Invalid AI response format');
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error('Groq AI Summarize error:', error);
    return NextResponse.json(
      { error: 'Failed to generate summary. Please try again.' },
      { status: 500 }
    );
  }
}
