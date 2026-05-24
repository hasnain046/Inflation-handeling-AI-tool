from fastapi import APIRouter
from app.services.forecasting import get_engine, FEATURE_COLS
from app.schemas import ForecastResponse
from datetime import datetime

router = APIRouter()


@router.get("/current")
async def get_current_forecast():
    engine = get_engine()
    default_inputs = {
        'oil_price': 78.4, 'interest_rate': 5.25, 'unemployment': 3.7,
        'gdp_growth': 2.1, 'exchange_rate': 1.085, 'sentiment_score': -0.34, 'food_index': 118.3
    }
    predictions = engine.predict(default_inputs, horizon_months=1)
    metrics = engine.metrics.get(engine.best_model_name, {})
    return {
        "success": True,
        "data": {
            "model": engine.best_model_name,
            "horizon": "1m",
            "predictions": predictions,
            **metrics,
            "generated_at": datetime.now().isoformat(),
        }
    }


@router.get("/monthly")
async def get_monthly_forecast(horizon: str = "6m", model: str = None):
    engine = get_engine()
    horizon_map = {"1m": 1, "3m": 3, "6m": 6, "12m": 12}
    months = horizon_map.get(horizon, 6)

    default_inputs = {
        'oil_price': 78.4, 'interest_rate': 5.25, 'unemployment': 3.7,
        'gdp_growth': 2.1, 'exchange_rate': 1.085, 'sentiment_score': -0.34, 'food_index': 118.3
    }
    predictions = engine.predict(default_inputs, horizon_months=months, model_name=model)
    metrics = engine.metrics.get(model or engine.best_model_name, {})

    return {
        "success": True,
        "data": {
            "model": model or engine.best_model_name,
            "horizon": horizon,
            "predictions": predictions,
            **metrics,
            "generated_at": datetime.now().isoformat(),
        }
    }


@router.get("/compare")
async def compare_models():
    engine = get_engine()
    return {"success": True, "data": {"models": engine.get_metrics()}}


@router.get("/explain")
async def explain_forecast():
    engine = get_engine()
    default_inputs = {
        'oil_price': 78.4, 'interest_rate': 5.25, 'unemployment': 3.7,
        'gdp_growth': 2.1, 'exchange_rate': 1.085, 'sentiment_score': -0.34, 'food_index': 118.3
    }
    result = engine.get_shap_values(default_inputs)
    return {"success": True, "data": result}
