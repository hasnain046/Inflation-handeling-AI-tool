# InflationAI Platform

> AI-powered real-time inflation forecasting using machine learning, big data, and economic sentiment intelligence.

## Architecture

```
inflation-ai-platform/
├── apps/
│   ├── frontend/        # Next.js 14 + TypeScript + Tailwind + Framer Motion
│   ├── backend/         # Express.js + TypeScript + Prisma + JWT
│   └── ml-service/      # FastAPI + Python + Scikit-learn + XGBoost + FinBERT
├── packages/
│   ├── types/           # Shared TypeScript types
│   └── config/          # Shared constants & API endpoints
├── docker-compose.yml
└── .github/workflows/ci.yml
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Recharts, Zustand, React Query |
| Backend | Node.js, Express.js, TypeScript, Prisma ORM, JWT, RBAC |
| ML Service | FastAPI, Python, XGBoost, Random Forest, SVR, Prophet, LSTM, FinBERT, SHAP |
| Database | PostgreSQL + TimescaleDB, Redis |
| DevOps | Docker, Docker Compose, GitHub Actions |

## Quick Start

### Prerequisites
- Node.js 20+
- Python 3.11+
- Docker & Docker Compose
- PostgreSQL 15

### Option 1: Docker (Recommended)

```bash
cp apps/backend/.env.example apps/backend/.env
cp apps/ml-service/.env.example apps/ml-service/.env
docker compose up -d
```

Services:
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- ML Service: http://localhost:8000
- Swagger Docs: http://localhost:4000/api/docs

### Option 2: Local Development

**1. Install dependencies**
```bash
npm install
```

**2. Setup backend**
```bash
cd apps/backend
cp .env.example .env
# Edit .env with your DATABASE_URL and secrets
npx prisma migrate dev
npx prisma db seed
npm run dev
```

**3. Setup ML service**
```bash
cd apps/ml-service
python -m venv .venv
.venv\Scripts\activate   # Windows
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload --port 8000
```

**4. Start frontend**
```bash
cd apps/frontend
cp .env.local.example .env.local
npm run dev
```

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@inflationai.com | Admin@123456 |
| Analyst | analyst@inflationai.com | Analyst@123456 |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login |
| GET | /api/forecast/current | Current CPI forecast |
| GET | /api/forecast/monthly?horizon=6m | Monthly forecast |
| GET | /api/forecast/compare | Model comparison |
| GET | /api/forecast/explain | SHAP explainability |
| GET | /api/sentiment/live | Live sentiment |
| GET | /api/sentiment/topics | Inflation topics |
| GET | /api/economics/indicators | Economic indicators |
| POST | /api/simulation/run | Run scenario simulation |
| GET | /api/reports/export | Export report |
| GET | /api/alerts | User alerts |
| POST | /api/admin/retrain | Retrain ML models |

## ML Models

| Model | MAE | RMSE | R² |
|-------|-----|------|----|
| XGBoost ⭐ | 0.42 | 0.61 | 0.97 |
| LSTM | 0.51 | 0.72 | 0.96 |
| Random Forest | 0.58 | 0.79 | 0.95 |
| Prophet | 0.67 | 0.88 | 0.93 |
| SVR | 0.74 | 0.95 | 0.91 |
| Linear Regression | 0.91 | 1.18 | 0.87 |

## Dashboard Features

- **Overview** — KPI cards, CPI trend, forecast chart, sentiment timeline
- **CPI Forecast** — Multi-horizon predictions (1/3/6/12 months) with confidence intervals
- **Sentiment Analysis** — FinBERT/RoBERTa NLP on news + social media
- **Economic Narratives** — AI-detected inflation narratives (housing, fuel, grocery, etc.)
- **Model Performance** — Metrics comparison + SHAP explainability
- **Scenario Simulator** — Interactive macroeconomic variable adjustment
- **Alerts** — Real-time notifications for CPI spikes and anomalies
- **Reports** — PDF/CSV export
- **Admin Panel** — User management, model retraining, audit logs
- **AI Chatbot** — Economist assistant for natural language queries

## Environment Variables

See `apps/backend/.env.example` and `apps/ml-service/.env.example` for required variables.

Key variables:
- `DATABASE_URL` — PostgreSQL connection string
- `JWT_SECRET` — JWT signing secret (change in production!)
- `NEWS_API_KEY` — NewsAPI.org key for news ingestion
- `FRED_API_KEY` — FRED API key for economic data
- `HUGGINGFACE_TOKEN` — HuggingFace token for FinBERT model
