"""
Data ingestion service — fetches from FRED, News API, and other sources.
"""
import os
import requests
from datetime import datetime, timedelta
from typing import List, Dict, Optional
import logging

logger = logging.getLogger(__name__)

FRED_BASE = "https://api.stlouisfed.org/fred/series/observations"
NEWS_BASE = "https://newsapi.org/v2/everything"


def fetch_fred_series(series_id: str, limit: int = 24) -> List[Dict]:
    """Fetch economic time series from FRED API."""
    api_key = os.getenv('FRED_API_KEY')
    if not api_key:
        return _mock_fred_data(series_id, limit)

    try:
        params = {
            'series_id': series_id,
            'api_key': api_key,
            'file_type': 'json',
            'sort_order': 'desc',
            'limit': limit,
        }
        resp = requests.get(FRED_BASE, params=params, timeout=10)
        resp.raise_for_status()
        observations = resp.json().get('observations', [])
        return [{'date': o['date'], 'value': float(o['value'])} for o in observations if o['value'] != '.']
    except Exception as e:
        logger.warning(f"FRED API error for {series_id}: {e}")
        return _mock_fred_data(series_id, limit)


def fetch_inflation_news(query: str = "inflation CPI prices", page_size: int = 20) -> List[Dict]:
    """Fetch inflation-related news articles."""
    api_key = os.getenv('NEWS_API_KEY')
    if not api_key:
        return _mock_news_data()

    try:
        params = {
            'q': query,
            'apiKey': api_key,
            'language': 'en',
            'sortBy': 'publishedAt',
            'pageSize': page_size,
            'from': (datetime.now() - timedelta(days=7)).strftime('%Y-%m-%d'),
        }
        resp = requests.get(NEWS_BASE, params=params, timeout=10)
        resp.raise_for_status()
        articles = resp.json().get('articles', [])
        return [{'title': a['title'], 'description': a.get('description', ''), 'source': a['source']['name'], 'publishedAt': a['publishedAt']} for a in articles]
    except Exception as e:
        logger.warning(f"News API error: {e}")
        return _mock_news_data()


def _mock_fred_data(series_id: str, limit: int) -> List[Dict]:
    import numpy as np
    base_values = {'CPIAUCSL': 314.2, 'UNRATE': 3.7, 'GDP': 27000, 'FEDFUNDS': 5.25, 'DCOILWTICO': 78.4}
    base = base_values.get(series_id, 100)
    return [
        {'date': (datetime.now() - timedelta(days=30 * i)).strftime('%Y-%m-%d'),
         'value': round(base + np.random.normal(0, base * 0.01), 2)}
        for i in range(limit)
    ]


def _mock_news_data() -> List[Dict]:
    return [
        {'title': 'CPI rises 0.4% in December, above expectations', 'description': 'Consumer prices increased more than expected last month, driven by housing and energy costs.', 'source': 'Reuters', 'publishedAt': datetime.now().isoformat()},
        {'title': 'Fed signals rate cuts may be delayed amid sticky inflation', 'description': 'Federal Reserve officials indicated they need more evidence inflation is cooling before cutting rates.', 'source': 'Bloomberg', 'publishedAt': datetime.now().isoformat()},
        {'title': 'Oil prices surge on Middle East tensions', 'description': 'Crude oil prices jumped 3% as geopolitical tensions raised supply concerns.', 'source': 'WSJ', 'publishedAt': datetime.now().isoformat()},
    ]
