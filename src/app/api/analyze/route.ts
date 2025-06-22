// This route accepts a job description and uses OpenAI to return a summary and 3 key skills.

import { NextRequest, NextResponse } from 'next/server';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(req: NextRequest) {
  const { jobDescription } = await req.json();

  if (!OPENAI_API_KEY) {
    return NextResponse.json(
      {
        error: 'Missing OpenAI API key',
        message: 'The system is missing a required configuration key.',
      },
      { status: 500 }
    );
  }

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `You are a career assistant helping users optimize their resumes. A user has provided this job description:

"${jobDescription}"

Give me:
1. A short 2–3 sentence summary of the job.
2. Three important skills they should highlight in their resume.
Format the answer as:
{
  "summary": "...",
  "skills": ["Skill 1", "Skill 2", "Skill 3"]
}
`,
          },
        ],
      }),
    });

    const data = await res.json();
    console.log('🔍 Raw OpenAI response:', data);

    // Check for quota error from OpenAI
    if (data.error?.code === 'insufficient_quota') {
      return NextResponse.json(
        {
          error: 'Quota Exceeded',
          message:
            "Our AI assistant is currently unavailable because we've run out of usage credits. We're working on getting it back online. Please try again later!",
        },
        { status: 429 } // 429 Too Many Requests
      );
    }

    const aiText = data.choices?.[0]?.message?.content;

    if (!aiText) {
      return NextResponse.json({ error: 'No AI response' }, { status: 500 });
    }

    // Try to parse as JSON (ideal case)
    try {
      const parsed = JSON.parse(aiText);
      return NextResponse.json(parsed);
    } catch (err) {
      // If AI returns plain text, return it as a summary
      return NextResponse.json({
        summary: aiText,
        skills: [],
      });
    }
  } catch (error) {
    console.error(' AI Error:', error);
    return NextResponse.json(
      {
        error: 'Unexpected server error',
        message:
          'Something went wrong while trying to analyze the job description. Please try again later.',
      },
      { status: 500 }
    );
  }
}
