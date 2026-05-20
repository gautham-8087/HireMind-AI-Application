import Analysis from '../models/Analysis.js';
import { isDbConnected } from '../config/db.js';
import { extractTextFromPDF } from '../services/pdfService.js';
import { analyzeResume, generateInterviewQuestions } from '../services/groqService.js';
import {
  buildAnalysisResponse,
  saveAnalysis,
  updateInterviewQuestions,
} from '../utils/analysisStore.js';

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No PDF file uploaded' });
    }

    const resumeText = await extractTextFromPDF(req.file.buffer);

    res.json({
      success: true,
      data: {
        fileName: req.file.originalname,
        textLength: resumeText.length,
        preview: resumeText.slice(0, 500) + (resumeText.length > 500 ? '...' : ''),
        resumeText,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const extractText = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No PDF file uploaded' });
    }

    const resumeText = await extractTextFromPDF(req.file.buffer);

    res.json({
      success: true,
      data: { resumeText, fileName: req.file.originalname },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const analyzeResumeAI = async (req, res) => {
  try {
    const { resumeText, fileName } = req.body;

    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(400).json({
        success: false,
        message: 'Resume text is required and must be at least 50 characters',
      });
    }

    const analysis = await analyzeResume(resumeText);
    const interviewData = await generateInterviewQuestions(analysis.skills || []);

    const record = await saveAnalysis({
      fileName: fileName || 'resume.pdf',
      resumeText: resumeText.slice(0, 5000),
      atsScore: analysis.atsScore,
      missingSkills: analysis.missingSkills,
      suggestions: analysis.suggestions,
      strengths: analysis.strengths,
      weaknesses: analysis.weaknesses,
      skills: analysis.skills,
      interviewQuestions: interviewData.interviewQuestions,
      summary: analysis.summary,
    });

    res.json({
      success: true,
      data: buildAnalysisResponse(fileName || 'resume.pdf', analysis, interviewData, record),
    });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to analyze resume',
    });
  }
};

export const generateQuestions = async (req, res) => {
  try {
    const { skills, analysisId } = req.body;

    if (!skills || (Array.isArray(skills) && skills.length === 0)) {
      return res.status(400).json({
        success: false,
        message: 'Skills array is required',
      });
    }

    const result = await generateInterviewQuestions(skills);
    const questions = result.interviewQuestions;

    await updateInterviewQuestions(analysisId, questions);

    res.json({ success: true, data: { interviewQuestions: questions } });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate interview questions',
    });
  }
};

export const getHistory = async (req, res) => {
  try {
    if (!isDbConnected) {
      return res.json({ success: true, data: [], dbAvailable: false });
    }

    const limit = Math.min(parseInt(req.query.limit, 10) || 20, 50);
    const history = await Analysis.find()
      .select('-resumeText')
      .sort({ createdAt: -1 })
      .limit(limit);

    res.json({ success: true, data: history, dbAvailable: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAnalysisById = async (req, res) => {
  try {
    if (!isDbConnected) {
      return res.status(503).json({
        success: false,
        message: 'Database not available. Re-run analysis from Upload.',
      });
    }

    const analysis = await Analysis.findById(req.params.id).select('-resumeText');

    if (!analysis) {
      return res.status(404).json({ success: false, message: 'Analysis not found' });
    }

    res.json({ success: true, data: analysis });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const fullAnalysisPipeline = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No PDF file uploaded' });
    }

    const resumeText = await extractTextFromPDF(req.file.buffer);
    const analysis = await analyzeResume(resumeText);
    const interviewData = await generateInterviewQuestions(analysis.skills || []);

    const record = await saveAnalysis({
      fileName: req.file.originalname,
      resumeText: resumeText.slice(0, 5000),
      atsScore: analysis.atsScore,
      missingSkills: analysis.missingSkills,
      suggestions: analysis.suggestions,
      strengths: analysis.strengths,
      weaknesses: analysis.weaknesses,
      skills: analysis.skills,
      interviewQuestions: interviewData.interviewQuestions,
      summary: analysis.summary,
    });

    res.json({
      success: true,
      data: buildAnalysisResponse(req.file.originalname, analysis, interviewData, record),
    });
  } catch (error) {
    console.error('Pipeline error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to process resume',
    });
  }
};
