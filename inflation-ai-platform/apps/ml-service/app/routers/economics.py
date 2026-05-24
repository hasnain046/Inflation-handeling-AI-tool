from fastapi import APIRouter
from app.services.data_ingestion import fetch_fred_series

router = APIRouter()

SERIES_MAP = {
    'unemployment': 'UNRATE',
    'cpi': 'CPIAUCSL',
    'fed_rate': 'FEDFUNDS',
    'oil': 'DCOILWTICO',
    'gdp': 'GDP',
}


@router.get("/indicators")
async def get_indicators():
    indicators = []
    for name, series_id in SERIES_MAP.items():
        data = fetch_fred_series(series_id, limit=2)
        if len(data) >= 2:
            change = round(data[0]['value'] - data[1]['value'], 3)
        elif data:
            change = 0.0
        else:
            continue
        indicators.append({
            'id': series_id,
            'name': name.replace('_', ' ').title(),
            'value': data[0]['value'] if data else 0,
            'unit': '%' if name in ['unemployment', 'fed_rate', 'gdp'] else 'index',
            'date': data[0]['date'] if data else '',
            'source': 'FRED',
            'change': change,
        })
    return {"success": True, "data": indicators}


@router.get("/cpi")
async def get_cpi_history(limit: int = 24):
    data = fetch_fred_series('CPIAUCSL', limit=limit)
    return {"success": True, "data": data}
