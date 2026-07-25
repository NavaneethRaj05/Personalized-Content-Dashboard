import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const SYSTEM_CONTEXT = `You are an intelligent news assistant built into a Personalized Content Dashboard. 
You help users understand news articles, find related content, and get quick insights about current events.
Keep your responses concise, friendly, and informative. When asked about specific articles, focus on the key facts.
If you don't have specific information, give a general helpful response. Never make up specific facts.`;

export async function POST(req: NextRequest) {
  try {
    const { message, context } = await req.json();

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      // Mock responses when no key configured
      const mockResponses = [
        "I'm your AI news assistant! To enable live AI responses, add your Gemini API key to the .env.local file. Get a free key at aistudio.google.com.",
        "This is a demonstration of the AI assistant feature. With a Gemini API key configured, I can answer questions about articles, summarize content, and help you navigate news topics.",
        "Configure the GEMINI_API_KEY environment variable to unlock my full capabilities!",
      ];
      return NextResponse.json({ 
        reply: mockResponses[Math.floor(Math.random() * mockResponses.length)] 
      });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `${SYSTEM_CONTEXT}

${context ? `Current article context: ${context}` : ''}

User message: ${message}

Provide a helpful, concise response (2-4 sentences max).`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('AI Chat error:', error);
    return NextResponse.json(
      { error: 'Failed to get AI response. Please try again.' },
      { status: 500 }
    );
  }
}
