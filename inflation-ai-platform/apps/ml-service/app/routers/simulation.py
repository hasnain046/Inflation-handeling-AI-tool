from fastapi import APIRouter
from app.schemas import SimulationInput, SimulationResult

router = APIRouter()


@router.post("/run", response_model=dict)
async def run_simulation(body: SimulationInput):
    oil_impact = (body.oil_price - 78.4) * 0.008
    rate_impact = (body.interest_rate - 5.25) * -0.15
    fx_impact = (body.exchange_rate - 1.085) * -2.1
    gdp_impact = (body.gdp_growth - 2.1) * -0.12
    unemployment_impact = (body.unemployment - 3.7) * -0.18
    import_impact = (body.import_cost - 100) * 0.005

    total_impact = oil_impact + rate_impact + fx_impact + gdp_impact + unemployment_impact + import_impact

    result = {
        "predicted_cpi": round(314.2 + total_impact * 10, 1),
        "inflation_impact": round(total_impact, 4),
        "confidence": 0.87,
        "breakdown": [
            {"factor": "Oil Price", "impact": round(oil_impact, 4)},
            {"factor": "Interest Rate", "impact": round(rate_impact, 4)},
            {"factor": "Exchange Rate", "impact": round(fx_impact, 4)},
            {"factor": "GDP Growth", "impact": round(gdp_impact, 4)},
            {"factor": "Unemployment", "impact": round(unemployment_impact, 4)},
            {"factor": "Import Cost", "impact": round(import_impact, 4)},
        ],
    }
    return {"success": True, "data": result}
