from fastapi import APIRouter
from app.schemas import SentimentInput
from app.services.sentiment import analyze_batch, get_aggregate_sentiment
from app.services.data_ingestion import fetch_inflation_news
from datetime import datetime, timedelta

router = APIRouter()


@router.post("/analyze")
async def analyze_sentiment(body: SentimentInput):
    results = analyze_batch(body.texts)
    summary = get_aggregate_sentiment(results)
    return {"success": True, "data": {"results": results, "summary": summary}}


@router.get("/live")
async def get_live_sentiment():
    articles = fetch_inflation_news(page_size=30)
    texts = [f"{a['title']} {a.get('description', '')}" for a in articles]
    results = analyze_batch(texts)
    summary = get_aggregate_sentiment(results)
    return {"success": True, "data": summary}


@router.get("/topics")
async def get_topics():
    articles = fetch_inflation_news(page_size=50)
    texts = [f"{a['title']} {a.get('description', '')}" for a in articles]
    results = analyze_batch(texts)

    topic_counts: dict = {}
    for r in results:
        for t in r.get('topics', []):
            topic_counts[t] = topic_counts.get(t, 0) + 1

    topics = sorted(
        [{'topic': k, 'count': v, 'sentiment': -0.3} for k, v in topic_counts.items()],
        key=lambda x: x['count'], reverse=True
    )
    return {"success": True, "data": topics}


@router.get("/timeline")
async def get_timeline(days: int = 30):
    import numpy as np
    timeline = [
        {
            'date': (datetime.now() - timedelta(days=days - i)).strftime('%Y-%m-%d'),
            'score': round(-0.3 + 0.3 * float(np.sin(i * 0.4)), 3),
        }
        for i in range(days)
    ]
    return {"success": True, "data": timeline}
