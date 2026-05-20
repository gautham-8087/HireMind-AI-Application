# Contributing to HireMind

Thank you for your interest in contributing!

## Development setup

```bash
# Backend
cd backend && npm install && cp .env.example .env
npm run dev

# Frontend (new terminal)
cd frontend && npm install && cp .env.example .env
npm run dev
```

## Commit guidelines

Use clear, focused commits:

- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation
- `style:` UI/CSS changes
- `chore:` tooling or maintenance

## Pull requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Keep changes focused and tested
4. Do not commit `.env` files or API keys
5. Open a PR against `main`

## Code style

- Match existing patterns in React components and Express routes
- Prefer small, readable functions
- Use Tailwind utility classes; avoid custom `@apply` with theme extensions
