# Sony Interior

A modern furniture e-commerce website with AI-powered chatbot assistant.

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Framer Motion, GSAP
- **CMS**: Sanity
- **Backend**: Python FastAPI
- **Database**: Neon Postgres with pgvector
- **AI**: Google Gemini via LiteLLM

## Getting Started

### Frontend

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Backend

```bash
cd backend
./setup.sh
# Edit .env and add your API keys
python run_migrations.py
./start.sh
```

Backend runs on [http://localhost:8000](http://localhost:8000)

## Documentation

- See `implementation-guide.md` for detailed phase-by-phase instructions
- See `backend/README.md` for backend setup
- See `backend/database/README.md` for database schema

## Features

- Modern furniture showcase with responsive design
- Sanity CMS integration for product management
- AI chatbot with RAG (Retrieval-Augmented Generation)
- Vector similarity search for intelligent product recommendations
- Contact forms with validation
- Product galleries and filtering
