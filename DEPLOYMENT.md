# HireMind Deployment Guide

## Frontend — Vercel

1. Go to [vercel.com](https://vercel.com) and import [HireMind-AI-Application](https://github.com/gautham-8087/HireMind-AI-Application).
2. Set **Root Directory** to `frontend`.
3. Framework preset: **Vite**.
4. Environment variable:

   | Key | Value |
   |-----|-------|
   | `VITE_API_URL` | `https://YOUR-RENDER-APP.onrender.com/api` |

5. Deploy.

## Backend — Render

1. Go to [render.com](https://render.com) → **New Web Service**.
2. Connect the same GitHub repo.
3. Set **Root Directory** to `backend`.
4. Build command: `npm install`
5. Start command: `npm start`
6. Environment variables:

   | Key | Value |
   |-----|-------|
   | `GROQ_API_KEY` | Your Groq API key |
   | `MONGODB_URI` | MongoDB Atlas connection string |
   | `FRONTEND_URL` | Your Vercel URL |
   | `NODE_ENV` | `production` |

7. Deploy, then copy the Render URL into Vercel's `VITE_API_URL`.

## MongoDB Atlas (optional)

1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Add a database user and allow network access (`0.0.0.0/0` for cloud deploy).
3. Copy the connection string into `MONGODB_URI` on Render.

## Post-deploy checklist

- [ ] Health check: `GET https://your-api.onrender.com/api/health`
- [ ] Upload a PDF on the live site
- [ ] Confirm CORS: `FRONTEND_URL` matches Vercel domain exactly
