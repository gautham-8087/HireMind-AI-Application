import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    resumeText: { type: String, required: true },
    atsScore: { type: Number, required: true },
    missingSkills: [{ type: String }],
    suggestions: [{ type: String }],
    strengths: [{ type: String }],
    weaknesses: [{ type: String }],
    skills: [{ type: String }],
    interviewQuestions: [
      {
        question: String,
        category: String,
        difficulty: String,
      },
    ],
    summary: { type: String },
  },
  { timestamps: true }
);

const Analysis = mongoose.model('Analysis', analysisSchema);

export default Analysis;
