import { Groq } from 'groq-sdk';
import { NextRequest, NextResponse } from 'next/server';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
});

const SYSTEM_CONTEXT = `You are an intelligent news assistant built into a Personalized Content Dashboard. 
You help users understand news articles, find related content, and get quick insights about current events shown in their feed.
CRITICAL INSTRUCTION: You MUST ONLY answer questions related to the dashboard content, news articles, or topics currently relevant to the news. 
If the user asks a question completely unrelated to news, dashboard content, or current events (for example, coding questions, general trivia, math, personal advice, etc.), you MUST politely decline and remind them: "I am a News and Dashboard Assistant. I can only answer questions related to your news feed and dashboard content. Please ask me about current events or articles!"
Keep your responses concise, friendly, and informative.`;

export async function POST(req: NextRequest) {
  try {
    const { message, context } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ 
        reply: "Groq API key not configured. Please add GROQ_API_KEY to your environment variables." 
      });
    }

    const prompt = `${context ? `Current article context: ${context}\n\n` : ''}User message: ${message}`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_CONTEXT },
        { role: 'user', content: prompt }
      ],
      model: 'llama3-8b-8192', // Fast, default Groq model
      temperature: 0.5,
      max_tokens: 500,
    });

    const reply = completion.choices[0]?.message?.content || "I couldn't generate a response.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Groq AI Chat error:', error);
    return NextResponse.json(
      { error: 'Failed to get AI response. Please try again.' },
      { status: 500 }
    );
  }
}
