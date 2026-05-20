import Groq from 'groq-sdk';

const getGroqClient = () => {
  if (!process.env.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY is not configured');
  }
  return new Groq({ apiKey: process.env.GROQ_API_KEY });
};

const ANALYSIS_PROMPT = `You are an expert ATS (Applicant Tracking System) resume analyzer and career coach.

Analyze the following resume text and respond with ONLY valid JSON (no markdown, no code fences) in this exact structure:

{
  "atsScore": <number 0-100>,
  "missingSkills": [<array of 5-10 industry-relevant skills missing from resume>],
  "suggestions": [<array of 5-8 specific actionable improvement suggestions>],
  "strengths": [<array of 4-6 resume strengths>],
  "weaknesses": [<array of 4-6 resume weaknesses>],
  "skills": [<array of all technical and soft skills detected in resume>],
  "summary": "<2-3 sentence overall assessment>"
}

Scoring criteria for ATS score:
- Keyword optimization (25%)
- Formatting and structure (25%)
- Skills alignment (25%)
- Experience presentation (25%)

Be specific, constructive, and industry-aware.`;

const INTERVIEW_PROMPT = `You are a senior technical interviewer.

Based on these skills from a candidate's resume, generate interview questions.

Skills: {SKILLS}

Respond with ONLY valid JSON (no markdown, no code fences) in this exact structure:

{
  "interviewQuestions": [
    {
      "question": "<question text>",
      "category": "<e.g. JavaScript, System Design, Behavioral>",
      "difficulty": "<Easy|Medium|Hard>"
    }
  ]
}

Generate exactly 10 diverse questions mixing technical depth and practical scenarios.`;

const parseJSONResponse = (content) => {
  const cleaned = content.replace(/```json\n?|\n?```/g, '').trim();
  return JSON.parse(cleaned);
};

export const analyzeResume = async (resumeText) => {
  const groq = getGroqClient();
  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: ANALYSIS_PROMPT },
      { role: 'user', content: `Resume text:\n\n${resumeText.slice(0, 12000)}` },
    ],
    temperature: 0.3,
    max_tokens: 4096,
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) throw new Error('Empty response from AI');

  return parseJSONResponse(content);
};

export const generateInterviewQuestions = async (skills) => {
  const skillsList = Array.isArray(skills) ? skills.join(', ') : skills;
  const groq = getGroqClient();

  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      {
        role: 'system',
        content: INTERVIEW_PROMPT.replace('{SKILLS}', skillsList),
      },
      { role: 'user', content: 'Generate the interview questions now.' },
    ],
    temperature: 0.5,
    max_tokens: 4096,
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) throw new Error('Empty response from AI');

  return parseJSONResponse(content);
};
