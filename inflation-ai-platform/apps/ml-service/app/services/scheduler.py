"""
APScheduler-based cron jobs for automated data ingestion.
"""
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
import logging

logger = logging.getLogger(__name__)
scheduler = BackgroundScheduler()


def ingest_economic_data():
    """Fetch latest economic indicators from FRED."""
    try:
        from app.services.data_ingestion import fetch_fred_series
        series = ['CPIAUCSL', 'UNRATE', 'FEDFUNDS', 'DCOILWTICO']
        for s in series:
            data = fetch_fred_series(s, limit=1)
            logger.info(f"Ingested {s}: {data[0] if data else 'no data'}")
    except Exception as e:
        logger.error(f"Economic data ingestion failed: {e}")


def ingest_news_sentiment():
    """Fetch and analyze news sentiment."""
    try:
        from app.services.data_ingestion import fetch_inflation_news
        from app.services.sentiment import analyze_batch, get_aggregate_sentiment
        articles = fetch_inflation_news()
        texts = [f"{a['title']} {a.get('description', '')}" for a in articles]
        results = analyze_batch(texts)
        summary = get_aggregate_sentiment(results)
        logger.info(f"Sentiment ingested: {summary['overall']:.3f} ({summary['label']})")
    except Exception as e:
        logger.error(f"Sentiment ingestion failed: {e}")


def start_scheduler():
    if not scheduler.running:
        scheduler.add_job(ingest_economic_data, CronTrigger(hour='*/6'), id='economic_data', replace_existing=True)
        scheduler.add_job(ingest_news_sentiment, CronTrigger(minute='*/30'), id='news_sentiment', replace_existing=True)
        scheduler.start()
        logger.info("Scheduler started")
