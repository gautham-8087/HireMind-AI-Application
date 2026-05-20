import Analysis from '../models/Analysis.js';
import { isDbConnected } from '../config/db.js';

export const buildAnalysisResponse = (fileName, analysis, interviewData, record = null) => ({
  id: record?._id?.toString() || `session-${Date.now()}`,
  fileName: record?.fileName || fileName,
  atsScore: analysis.atsScore,
  missingSkills: analysis.missingSkills,
  suggestions: analysis.suggestions,
  strengths: analysis.strengths,
  weaknesses: analysis.weaknesses,
  skills: analysis.skills,
  interviewQuestions: interviewData.interviewQuestions,
  summary: analysis.summary,
  createdAt: record?.createdAt || new Date().toISOString(),
  savedToDb: Boolean(record),
});

export const saveAnalysis = async (payload) => {
  if (!isDbConnected) return null;
  return Analysis.create(payload);
};

export const updateInterviewQuestions = async (analysisId, questions) => {
  if (!isDbConnected || !analysisId || String(analysisId).startsWith('session-')) {
    return null;
  }
  return Analysis.findByIdAndUpdate(analysisId, { interviewQuestions: questions });
};
