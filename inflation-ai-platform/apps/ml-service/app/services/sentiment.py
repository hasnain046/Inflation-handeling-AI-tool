"""
NLP Sentiment Analysis using FinBERT/RoBERTa.
Falls back to rule-based scoring if transformers unavailable.
"""
from typing import List, Dict
import re


INFLATION_POSITIVE_KEYWORDS = [
    'price increase', 'inflation rise', 'cost surge', 'expensive', 'price hike',
    'fuel costs', 'rent increase', 'grocery prices', 'supply shortage', 'wage pressure'
]

INFLATION_NEGATIVE_KEYWORDS = [
    'price drop', 'deflation', 'cost reduction', 'cheaper', 'price cut',
    'rate cut', 'economic recovery', 'supply improvement', 'wage stagnation'
]

TOPIC_PATTERNS = {
    'Housing Inflation': ['rent', 'housing', 'mortgage', 'home price', 'real estate'],
    'Fuel Prices': ['oil', 'gas', 'fuel', 'energy', 'petrol', 'gasoline'],
    'Grocery Inflation': ['food', 'grocery', 'supermarket', 'produce', 'meat', 'dairy'],
    'Recession Fear': ['recession', 'downturn', 'economic slowdown', 'gdp decline'],
    'Wage Growth': ['wage', 'salary', 'pay rise', 'minimum wage', 'labor cost'],
    'Supply Chain': ['supply chain', 'shortage', 'logistics', 'shipping', 'inventory'],
}


def analyze_sentiment_rule_based(text: str) -> Dict:
    """Rule-based sentiment scoring as fallback."""
    text_lower = text.lower()
    pos_score = sum(1 for kw in INFLATION_POSITIVE_KEYWORDS if kw in text_lower)
    neg_score = sum(1 for kw in INFLATION_NEGATIVE_KEYWORDS if kw in text_lower)

    if pos_score > neg_score:
        score = min(0.9, 0.3 + pos_score * 0.15)
        label = 'NEGATIVE'  # Positive inflation keywords = bad for consumers
    elif neg_score > pos_score:
        score = max(-0.9, -0.3 - neg_score * 0.15)
        label = 'POSITIVE'
    else:
        score = 0.0
        label = 'NEUTRAL'

    topics = [topic for topic, patterns in TOPIC_PATTERNS.items()
              if any(p in text_lower for p in patterns)]

    return {'score': round(score, 3), 'label': label, 'topics': topics}


def analyze_batch(texts: List[str]) -> List[Dict]:
    """Analyze a batch of texts. Uses transformers if available."""
    try:
        from transformers import pipeline
        classifier = pipeline(
            'text-classification',
            model='ProsusAI/finbert',
            truncation=True,
            max_length=512,
        )
        results = []
        for text in texts:
            result = classifier(text[:512])[0]
            label_map = {'positive': 'POSITIVE', 'negative': 'NEGATIVE', 'neutral': 'NEUTRAL'}
            score = result['score'] if result['label'] == 'negative' else -result['score']
            topics = [t for t, patterns in TOPIC_PATTERNS.items()
                      if any(p in text.lower() for p in patterns)]
            results.append({
                'score': round(score, 3),
                'label': label_map.get(result['label'], 'NEUTRAL'),
                'topics': topics,
                'confidence': round(result['score'], 3),
            })
        return results
    except Exception:
        return [analyze_sentiment_rule_based(t) for t in texts]


def get_aggregate_sentiment(results: List[Dict]) -> Dict:
    if not results:
        return {'overall': 0.0, 'label': 'NEUTRAL', 'positive': 0, 'negative': 0, 'neutral': 0}

    scores = [r['score'] for r in results]
    overall = sum(scores) / len(scores)
    positive = sum(1 for r in results if r['label'] == 'POSITIVE')
    negative = sum(1 for r in results if r['label'] == 'NEGATIVE')
    neutral = len(results) - positive - negative

    label = 'POSITIVE' if overall > 0.1 else 'NEGATIVE' if overall < -0.1 else 'NEUTRAL'

    # Aggregate topics
    topic_counts: Dict[str, int] = {}
    for r in results:
        for t in r.get('topics', []):
            topic_counts[t] = topic_counts.get(t, 0) + 1

    top_topics = sorted(
        [{'topic': k, 'count': v, 'sentiment': overall} for k, v in topic_counts.items()],
        key=lambda x: x['count'], reverse=True
    )[:5]

    return {
        'overall': round(overall, 3),
        'label': label,
        'positive': round(positive / len(results) * 100),
        'negative': round(negative / len(results) * 100),
        'neutral': round(neutral / len(results) * 100),
        'top_topics': top_topics,
    }
