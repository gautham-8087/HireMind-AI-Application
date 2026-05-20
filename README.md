# HireMind — AI Resume Analyzer & Interview Assistant

Full-stack web app that analyzes PDF resumes, provides ATS scoring, skill gap analysis, improvement suggestions, and generates personalized interview questions.

![Tech Stack](https://img.shields.io/badge/React-Vite-61DAFB?style=flat&logo=react)
![Node](https://img.shields.io/badge/Node-Express-339933?style=flat&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Optional-47A248?style=flat&logo=mongodb)

## Features

- Drag-and-drop PDF resume upload
- ATS compatibility score (0–100)
- Missing skills detection
- AI improvement suggestions
- Strengths & weaknesses analysis
- Technical interview question generation
- Analysis history (with MongoDB)
- Dark / light mode
- Responsive UI

## Project Structure

```
├── backend/     # Express API, PDF extraction, AI analysis
├── frontend/    # React + Vite + Tailwind CSS
└── README.md
```

## Quick Start

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Add GROQ_API_KEY and MONGODB_URI to .env
npm run dev
```

Runs at `http://localhost:5000`

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Runs at `http://localhost:5173`

## Environment Variables

**Backend** (`backend/.env`):

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default 5000) |
| `MONGODB_URI` | MongoDB connection string (optional for local demo) |
| `GROQ_API_KEY` | [Groq API](https://console.groq.com) key |
| `FRONTEND_URL` | Frontend URL for CORS |

**Frontend** (`frontend/.env`):

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API URL e.g. `http://localhost:5000/api` |

## Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for step-by-step Vercel + Render setup.

| Service | Platform | Root directory |
|---------|----------|----------------|
| Frontend | [Vercel](https://vercel.com) | `frontend` |
| Backend | [Render](https://render.com) | `backend` |

Set environment variables in each platform dashboard. Never commit `.env` files.

## API Endpoints

- `GET /api/health` — Health check
- `POST /api/resume/analyze/full` — Upload PDF + full analysis
- `GET /api/resume/history` — Analysis history

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for release notes.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

MIT
