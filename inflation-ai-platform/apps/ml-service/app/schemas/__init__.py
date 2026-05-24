from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class ForecastPoint(BaseModel):
    date: str
    value: float
    lower: float
    upper: float


class ForecastResponse(BaseModel):
    model: str
    horizon: str
    predictions: List[ForecastPoint]
    mae: float
    rmse: float
    mape: float
    r2: float
    generated_at: str


class SimulationInput(BaseModel):
    oil_price: float = 78.4
    interest_rate: float = 5.25
    exchange_rate: float = 1.085
    gdp_growth: float = 2.1
    unemployment: float = 3.7
    import_cost: float = 100.0


class SimulationResult(BaseModel):
    predicted_cpi: float
    inflation_impact: float
    confidence: float
    breakdown: List[dict]


class SentimentInput(BaseModel):
    texts: List[str]
    source: Optional[str] = "news"


class ShapResult(BaseModel):
    prediction: float
    base_value: float
    shap_values: List[dict]
    summary: str
