import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import connectDB, { isDbConnected } from './config/db.js';
import resumeRoutes from './routes/resumeRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:3000',
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
        callback(null, true);
      } else {
        callback(null, allowedOrigins[0] || true);
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'HireMind API is running',
    version: '1.0.0',
    database: isDbConnected ? 'connected' : 'unavailable',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/resume', resumeRoutes);

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ success: false, message: 'File too large. Maximum size is 5MB.' });
    }
  }
  if (err.message === 'Only PDF files are allowed') {
    return res.status(400).json({ success: false, message: err.message });
  }
  console.error(err);
  res.status(500).json({ success: false, message: err.message || 'Internal server error' });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Health: http://localhost:${PORT}/api/health`);
  });
});


