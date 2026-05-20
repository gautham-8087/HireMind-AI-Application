import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 120000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      (error.code === 'ECONNABORTED' ? 'Request timed out. Please try again.' : null) ||
      (error.message === 'Network Error' ? 'Cannot reach server. Is the backend running?' : null) ||
      error.message ||
      'Something went wrong';
    error.friendlyMessage = message;
    return Promise.reject(error);
  }
);

export const healthCheck = () => api.get('/health');

export const uploadResume = (file) => {
  const formData = new FormData();
  formData.append('resume', file);
  return api.post('/resume/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const extractResumeText = (file) => {
  const formData = new FormData();
  formData.append('resume', file);
  return api.post('/resume/extract', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const analyzeResume = (resumeText, fileName) =>
  api.post('/resume/analyze', { resumeText, fileName });

export const fullAnalysis = (file) => {
  const formData = new FormData();
  formData.append('resume', file);
  return api.post('/resume/analyze/full', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 120000,
  });
};

export const generateInterviewQuestions = (skills, analysisId) =>
  api.post('/resume/interview-questions', { skills, analysisId });

export const getHistory = (limit = 20) =>
  api.get('/resume/history', { params: { limit } });

export const getAnalysisById = (id) => api.get(`/resume/history/${id}`);

export default api;
