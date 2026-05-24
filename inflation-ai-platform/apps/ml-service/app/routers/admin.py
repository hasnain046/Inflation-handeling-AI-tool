from fastapi import APIRouter, BackgroundTasks
from app.services.forecasting import get_engine
import logging

router = APIRouter()
logger = logging.getLogger(__name__)


def _retrain_task(model_name: str):
    try:
        engine = get_engine()
        engine._train()
        logger.info(f"Model retraining complete: {model_name or 'all'}")
    except Exception as e:
        logger.error(f"Retraining failed: {e}")


@router.post("/retrain")
async def retrain_models(background_tasks: BackgroundTasks, model: str = None):
    background_tasks.add_task(_retrain_task, model)
    return {
        "success": True,
        "data": {
            "message": f"Retraining job queued for {model or 'all models'}",
            "status": "queued",
        }
    }


@router.get("/model-status")
async def get_model_status():
    engine = get_engine()
    return {
        "success": True,
        "data": {
            "is_trained": engine.is_trained,
            "best_model": engine.best_model_name,
            "available_models": list(engine.models.keys()),
            "metrics": engine.metrics,
        }
    }
