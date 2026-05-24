<div align="center">

# 🧠 InflationAI Platform

### AI-Powered Inflation Intelligence & Forecasting System

[![Next.js](https://img.shields.io/badge/Next.js-14.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109-green?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?style=for-the-badge&logo=postgresql)](https://postgresql.org)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker)](https://docker.com)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

**Real-time CPI forecasting · NLP Sentiment Analysis · Scenario Simulation · Multi-Model AI**

[🚀 Live Demo](https://inflation-handeling-ai-tool.vercel.app) · [📦 GitHub Repo](https://github.com/hasnain046/Inflation-handeling-AI-tool) · [📚 API Docs](http://localhost:4000/api/docs)

</div>

---

## 📸 Screenshots

| Dashboard Overview | CPI Forecast | Sentiment Analysis |
|---|---|---|
| ![Dashboard](https://via.placeholder.com/300x180/050510/6366f1?text=Dashboard) | ![Forecast](https://via.placeholder.com/300x180/050510/22c55e?text=Forecast) | ![Sentiment](https://via.placeholder.com/300x180/050510/f59e0b?text=Sentiment) |

| Scenario Simulator | Admin Panel | Reports |
|---|---|---|
| ![Simulator](https://via.placeholder.com/300x180/050510/ef4444?text=Simulator) | ![Admin](https://via.placeholder.com/300x180/050510/8b5cf6?text=Admin) | ![Reports](https://via.placeholder.com/300x180/050510/06b6d4?text=Reports) |

---

## 🌟 What Is This Project?

**InflationAI Platform** is a full-stack, production-grade web application that uses **Artificial Intelligence and Machine Learning** to analyze, predict, and visualize inflation trends. It combines real-time economic data, NLP-based news sentiment, and multiple ML models to give analysts, researchers, and economists a powerful tool to understand and forecast inflation.

Think of it as a **Bloomberg Terminal for Inflation** — but powered by AI and open source.

---

## ✨ Key Features

### 📊 Real-Time Dashboard
- Live KPI cards: Current CPI, Predicted CPI, Inflation Rate, Forecast Accuracy
- Currency Strength Index, Commodity Shock Index, Sentiment Score, Risk Level
- Interactive charts: CPI History, Forecast with confidence intervals, Model Comparison
- Economic Indicators panel (GDP, Unemployment, Interest Rate, etc.)

### 🔮 AI Inflation Forecasting
- Multi-horizon predictions: **1 month, 3 months, 6 months, 12 months**
- Confidence interval bands (upper/lower bounds)
- Model accuracy metrics: **MAE, RMSE, MAPE, R²**
- Side-by-side model comparison table
- SHAP explainability — understand *why* the model made a prediction

### 🤖 Multi-Model ML Engine (Python/FastAPI)
| Model | Type | Use Case |
|---|---|---|
| **XGBoost** | Gradient Boosting | Primary forecasting (best accuracy) |
| **Random Forest** | Ensemble | Robust baseline predictions |
| **LSTM** | Deep Learning (RNN) | Sequential time-series patterns |
| **Prophet** | Time Series | Seasonality & trend decomposition |
| **TensorFlow/Keras** | Neural Network | Complex non-linear patterns |

### 💬 NLP Sentiment Analysis
- Analyzes **news articles and social media** for inflation-related sentiment
- Powered by **HuggingFace Transformers** (BERT-based models)
- Pie chart: Positive / Negative / Neutral breakdown
- Top inflation topics with mention counts and sentiment scores
- Sentiment timeline chart over time

### 🎮 Scenario Simulator
- Adjust 6 macroeconomic variables with interactive sliders:
  - 🛢️ Oil Price (WTI) — $40 to $150
  - 📈 Fed Funds Interest Rate — 0% to 10%
  - 💱 USD/EUR Exchange Rate
  - 📉 GDP Growth Rate
  - 👷 Unemployment Rate
  - 📦 Import Cost Index
- Instant CPI prediction with inflation impact score
- Factor Impact Breakdown bar chart (color-coded: red = inflationary, green = deflationary)

### 🔔 Smart Alerts System
- Alert types: `INFLATION_SPIKE`, `SENTIMENT_ANOMALY`, `CPI_THRESHOLD`, `ECONOMIC_SHOCK`
- Severity levels: `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`
- Per-user alert management with read/unread status

### 📋 Reports
- Generate and download inflation analysis reports
- Report metadata stored in database per user

### 🛡️ Admin Panel
- User management (Add, Edit, Role assignment)
- Roles: `ADMIN`, `ANALYST`, `RESEARCHER`, `GUEST`
- Retrain ML models on demand
- Manage data sources and API keys
- Full audit log tracking (who did what, when, from which IP)

### 🔐 Authentication & Security
- JWT-based auth with **access token (15min) + refresh token (7 days)**
- Email verification on registration
- Password reset via email (SMTP)
- Role-based access control (RBAC)
- Rate limiting: 200 requests per 15 minutes
- Helmet.js security headers
- CORS protection

---

## 🏗️ Project Architecture

```
inflation-ai-platform/          ← Monorepo Root (npm workspaces)
├── apps/
│   ├── frontend/               ← Next.js 14 (React, TypeScript, Tailwind)
│   ├── backend/                ← Node.js + Express + Prisma (TypeScript)
│   └── ml-service/             ← Python FastAPI + ML Models
├── packages/
│   ├── types/                  ← Shared TypeScript types
│   └── config/                 ← Shared configuration
└── docker-compose.yml          ← Full stack orchestration
```

### System Architecture Diagram

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Next.js 14    │────▶│  Express Backend  │────▶│  FastAPI ML     │
│   (Port 3000)   │     │   (Port 4000)     │     │  (Port 8000)    │
│                 │     │                   │     │                 │
│  React + Zustand│     │  JWT Auth + RBAC  │     │  XGBoost/LSTM   │
│  TanStack Query │     │  Prisma ORM       │     │  Prophet/TF     │
│  Recharts       │     │  Swagger Docs     │     │  HuggingFace    │
│  Framer Motion  │     │  Rate Limiting    │     │  SHAP           │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                                  │                        │
                    ┌─────────────┴──────────┐             │
                    ▼                        ▼             ▼
             ┌────────────┐          ┌─────────────┐  ┌──────────┐
             │ PostgreSQL │          │    Redis     │  │  FRED /  │
             │ TimescaleDB│          │   (Cache)    │  │ News API │
             │ (Port 5432)│          │ (Port 6379)  │  └──────────┘
             └────────────┘          └─────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| Next.js | 14.1.0 | React framework with App Router |
| TypeScript | 5.3 | Type safety |
| Tailwind CSS | 3.4 | Utility-first styling |
| Framer Motion | 11.0 | Animations |
| Recharts | 2.10 | Charts & data visualization |
| Zustand | 4.4 | Global state management |
| TanStack Query | 5.17 | Server state & caching |
| React Hook Form | 7.49 | Form handling |
| Zod | 3.22 | Schema validation |
| Radix UI | Latest | Accessible UI primitives |
| Lucide React | 0.309 | Icons |
| Axios | 1.6 | HTTP client |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js + Express | Latest | REST API server |
| TypeScript | 5.3 | Type safety |
| Prisma | Latest | ORM + database migrations |
| PostgreSQL + TimescaleDB | 15 | Primary database |
| Redis | 7 | Caching & sessions |
| JWT | Latest | Authentication tokens |
| Swagger UI | Latest | API documentation |
| Helmet | Latest | Security headers |
| Morgan | Latest | HTTP request logging |
| Winston | Latest | Application logging |
| Nodemailer | Latest | Email (SMTP) |

### ML Service
| Technology | Version | Purpose |
|---|---|---|
| Python | 3.11+ | Runtime |
| FastAPI | 0.109 | ML API server |
| XGBoost | 2.0.3 | Primary forecasting model |
| Prophet | 1.1.5 | Time series forecasting |
| TensorFlow | 2.15 | Deep learning |
| PyTorch | 2.1.2 | Neural networks |
| HuggingFace Transformers | 4.37 | NLP sentiment analysis |
| scikit-learn | 1.4 | ML utilities |
| SHAP | 0.44 | Model explainability |
| Pandas + NumPy | Latest | Data processing |
| APScheduler | 3.10 | Background job scheduling |
| SQLAlchemy + Alembic | Latest | DB access & migrations |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have these installed:
- [Node.js](https://nodejs.org) v18+
- [Python](https://python.org) 3.11+
- [Docker Desktop](https://docker.com/products/docker-desktop)
- [Git](https://git-scm.com)

### 1. Clone the Repository

```bash
git clone https://github.com/hasnain046/Inflation-handeling-AI-tool.git
cd Inflation-handeling-AI-tool/inflation-ai-platform
```

### 2. Install Dependencies

```bash
# Install all Node.js dependencies (frontend + backend)
npm install
```

```bash
# Install Python dependencies for ML service
cd apps/ml-service
pip install -r requirements.txt
cd ../..
```

### 3. Environment Setup

**Backend** — copy and configure:
```bash
cp apps/backend/.env.example apps/backend/.env
```

Edit `apps/backend/.env`:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/inflation_ai"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your-super-secret-jwt-key"
JWT_REFRESH_SECRET="your-refresh-secret"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"
PORT=4000
NODE_ENV="development"
FRONTEND_URL="http://localhost:3000"
ML_SERVICE_URL="http://localhost:8000"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
NEWS_API_KEY="your-news-api-key"
FRED_API_KEY="your-fred-api-key"
```

**Frontend** — create `.env.local`:
```bash
# apps/frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

**ML Service** — copy and configure:
```bash
cp apps/ml-service/.env.example apps/ml-service/.env
```

Edit `apps/ml-service/.env`:
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/inflation_ai
REDIS_URL=redis://localhost:6379
ML_SERVICE_PORT=8000
NEWS_API_KEY=your-news-api-key
FRED_API_KEY=your-fred-api-key
HUGGINGFACE_TOKEN=your-hf-token
MODEL_PATH=./data/models
```

### 4. Start Database & Redis

```bash
# Start PostgreSQL + Redis with Docker
docker-compose up postgres redis -d
```

### 5. Run Database Migrations

```bash
cd apps/backend
npx prisma migrate dev
npx prisma db seed
cd ../..
```

### 6. Start All Services

**Option A — All at once (recommended):**
```bash
npm run dev
```

**Option B — Individual services:**
```bash
# Terminal 1: Frontend
npm run dev:frontend

# Terminal 2: Backend
npm run dev:backend

# Terminal 3: ML Service
cd apps/ml-service
uvicorn main:app --reload --port 8000
```

### 7. Open in Browser

| Service | URL |
|---|---|
| 🌐 Frontend | http://localhost:3000 |
| ⚙️ Backend API | http://localhost:4000 |
| 📚 Swagger Docs | http://localhost:4000/api/docs |
| 🤖 ML Service | http://localhost:8000 |
| 🏥 Health Check | http://localhost:4000/health |

---

## 🐳 Docker — Full Stack

Run everything with a single command:

```bash
docker-compose up --build
```

This starts: PostgreSQL, Redis, Backend, ML Service, and Frontend — all networked together.

---

## 🔑 Demo Login Credentials

> ⚠️ These are fake demo credentials. Update them after deployment.

| Role | Email | Password |
|---|---|---|
| **Admin** | admin@inflationai.com | Admin@123456 |
| **Analyst** | analyst@inflationai.com | Analyst@123 |
| **Researcher** | researcher@inflationai.com | Research@123 |
| **Guest** | guest@inflationai.com | Guest@1234 |

---

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register       → Register new user
POST   /api/auth/login          → Login (returns JWT)
POST   /api/auth/refresh        → Refresh access token
POST   /api/auth/logout         → Logout
POST   /api/auth/forgot-password → Send reset email
POST   /api/auth/reset-password  → Reset password
```

### Forecasting
```
GET    /api/forecast/current    → Latest CPI forecast
GET    /api/forecast/monthly    → Monthly forecast (?horizon=1m|3m|6m|12m)
GET    /api/forecast/compare    → Compare all ML models
GET    /api/forecast/explain    → SHAP explainability values
```

### Sentiment
```
GET    /api/sentiment/current   → Current sentiment score
GET    /api/sentiment/timeline  → Historical sentiment data
GET    /api/sentiment/topics    → Top inflation topics
```

### Economics
```
GET    /api/economics/indicators → All economic indicators
GET    /api/economics/cpi        → CPI historical records
```

### Simulation
```
POST   /api/simulation/run      → Run scenario simulation
GET    /api/simulation/history  → Past simulations
```

### Reports & Alerts
```
GET    /api/reports             → User's reports
POST   /api/reports             → Generate new report
GET    /api/alerts              → User's alerts
PATCH  /api/alerts/:id/read     → Mark alert as read
```

### Admin (ADMIN role only)
```
GET    /api/admin/users         → All users
POST   /api/admin/users         → Create user
PATCH  /api/admin/users/:id     → Update user role
GET    /api/admin/audit-logs    → System audit logs
POST   /api/admin/retrain       → Trigger model retraining
```

Full interactive docs at: **http://localhost:4000/api/docs**

---

## 📁 Folder Structure

```
inflation-ai-platform/
├── apps/
│   ├── frontend/
│   │   └── src/
│   │       ├── app/
│   │       │   ├── (auth)/          ← Login, Register, Forgot Password
│   │       │   ├── (dashboard)/     ← All dashboard pages
│   │       │   │   └── dashboard/
│   │       │   │       ├── page.tsx         ← Overview
│   │       │   │       ├── forecast/        ← CPI Forecast
│   │       │   │       ├── sentiment/       ← Sentiment Analysis
│   │       │   │       ├── simulation/      ← Scenario Simulator
│   │       │   │       ├── models/          ← ML Models
│   │       │   │       ├── narratives/      ← Narrative Topics
│   │       │   │       ├── alerts/          ← Smart Alerts
│   │       │   │       ├── reports/         ← Reports
│   │       │   │       ├── settings/        ← User Settings
│   │       │   │       └── admin/           ← Admin Panel
│   │       │   └── page.tsx         ← Landing Page
│   │       ├── components/          ← Reusable UI components
│   │       ├── hooks/               ← Custom React hooks
│   │       ├── lib/                 ← Utilities & mock data
│   │       ├── store/               ← Zustand state stores
│   │       └── types/               ← Frontend TypeScript types
│   │
│   ├── backend/
│   │   └── src/
│   │       ├── controllers/         ← Business logic
│   │       ├── middleware/          ← Auth, error handling
│   │       ├── models/              ← Data models
│   │       ├── routes/              ← API route handlers
│   │       ├── services/            ← External service integrations
│   │       └── utils/               ← Prisma, Swagger, Logger
│   │
│   └── ml-service/
│       └── app/
│           ├── models/              ← Trained ML model files
│           ├── routers/             ← FastAPI route handlers
│           ├── schemas/             ← Pydantic data schemas
│           └── services/            ← ML logic + scheduler
│
└── packages/
    ├── types/                       ← Shared TypeScript interfaces
    └── config/                      ← Shared app configuration
```

---

## 🗄️ Database Schema

The platform uses **PostgreSQL with TimescaleDB** extension. Key tables:

| Table | Description |
|---|---|
| `User` | Platform users with roles (ADMIN, ANALYST, RESEARCHER, GUEST) |
| `Forecast` | Saved AI forecast results per user with accuracy metrics |
| `EconomicIndicator` | GDP, unemployment, interest rates, etc. |
| `CPIRecord` | Historical CPI data (YoY, MoM) from BLS |
| `SentimentRecord` | NLP sentiment scores from news/social media |
| `NarrativeTopic` | Trending inflation topics with sentiment |
| `Alert` | User alerts (INFLATION_SPIKE, CPI_THRESHOLD, etc.) |
| `Report` | Generated analysis reports |
| `AuditLog` | Full audit trail of all user actions |

---

## ☁️ Deployment

### Vercel (Frontend — Recommended)

The frontend is configured for Vercel deployment via `vercel.json`:

```json
{
  "buildCommand": "npm run build --workspace=apps/frontend",
  "framework": "nextjs",
  "outputDirectory": "apps/frontend/.next"
}
```

```bash
# Deploy to Vercel
npx vercel --prod
```

**Live URL:** https://inflation-handeling-ai-tool.vercel.app

### Backend & ML Service

Deploy using Docker on any cloud provider:

```bash
# AWS / GCP / DigitalOcean
docker-compose -f docker-compose.yml up -d
```

Recommended platforms:
- **Backend**: Railway, Render, AWS ECS, Fly.io
- **ML Service**: AWS EC2 (GPU), Google Cloud Run, Hugging Face Spaces
- **Database**: Supabase, Neon, AWS RDS
- **Redis**: Upstash, Redis Cloud

---

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start frontend + backend together
npm run dev:frontend     # Frontend only (port 3000)
npm run dev:backend      # Backend only (port 4000)

# Production Build
npm run build            # Build frontend + backend

# Linting
npm run lint             # Lint frontend code

# Database
npx prisma migrate dev   # Run migrations
npx prisma studio        # Open Prisma Studio (DB GUI)
npx prisma db seed       # Seed sample data

# ML Service
uvicorn main:app --reload --port 8000
```

---

## 🌍 External APIs Used

| API | Purpose | Get Key |
|---|---|---|
| **FRED API** (Federal Reserve) | Official US economic data, CPI records | [fred.stlouisfed.org](https://fred.stlouisfed.org/docs/api/api_key.html) |
| **NewsAPI** | Real-time news articles for sentiment analysis | [newsapi.org](https://newsapi.org) |
| **HuggingFace** | Pre-trained NLP transformer models | [huggingface.co](https://huggingface.co/settings/tokens) |

---

## 🔒 Security Features

- ✅ JWT Authentication (access + refresh tokens)
- ✅ Password hashing with bcrypt
- ✅ Rate limiting (200 req/15min per IP)
- ✅ Helmet.js security headers
- ✅ CORS whitelist
- ✅ Role-based access control (RBAC)
- ✅ Input validation with Zod
- ✅ SQL injection prevention via Prisma ORM
- ✅ Audit logging for all sensitive actions
- ✅ Email verification on signup
- ✅ Secure password reset flow

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Hasnain**
- GitHub: [@hasnain046](https://github.com/hasnain046)
- Project: [Inflation-handeling-AI-tool](https://github.com/hasnain046/Inflation-handeling-AI-tool)

---

<div align="center">

**⭐ Star this repo if you found it useful!**

Built with ❤️ using Next.js, FastAPI, and AI/ML

</div>
