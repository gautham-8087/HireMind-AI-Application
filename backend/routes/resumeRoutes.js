import express from 'express';
import upload from '../middleware/upload.js';
import {
  uploadResume,
  extractText,
  analyzeResumeAI,
  generateQuestions,
  getHistory,
  getAnalysisById,
  fullAnalysisPipeline,
} from '../controllers/resumeController.js';

const router = express.Router();

router.post('/upload', upload.single('resume'), uploadResume);
router.post('/extract', upload.single('resume'), extractText);
router.post('/analyze', analyzeResumeAI);
router.post('/analyze/full', upload.single('resume'), fullAnalysisPipeline);
router.post('/interview-questions', generateQuestions);
router.get('/history', getHistory);
router.get('/history/:id', getAnalysisById);

export default router;
