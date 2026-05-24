from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.routers import forecast, sentiment, simulation, admin, economics
from app.services.scheduler import start_scheduler


@asynccontextmanager
async def lifespan(app: FastAPI):
    start_scheduler()
    yield


app = FastAPI(
    title="InflationAI ML Service",
    description="Machine learning microservice for inflation forecasting",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:4000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(forecast.router, prefix="/forecast", tags=["Forecast"])
app.include_router(sentiment.router, prefix="/sentiment", tags=["Sentiment"])
app.include_router(simulation.router, prefix="/simulation", tags=["Simulation"])
app.include_router(economics.router, prefix="/economics", tags=["Economics"])
app.include_router(admin.router, prefix="/admin", tags=["Admin"])


@app.get("/health")
async def health():
    return {"status": "ok", "service": "ml-service"}
