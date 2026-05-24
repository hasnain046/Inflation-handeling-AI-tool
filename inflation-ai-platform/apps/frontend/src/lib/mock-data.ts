import type { DashboardKPIs, CPIRecord, ForecastResult, SentimentSummary, NarrativeTopic, EconomicIndicator, Alert, ModelComparison } from '@inflation-ai/types'

export const mockKPIs: DashboardKPIs = {
  currentCPI: 314.2,
  predictedCPI: 317.8,
  inflationRate: 3.7,
  forecastAccuracy: 94.2,
  sentimentScore: -0.34,
  riskLevel: 'MEDIUM',
  currencyStrengthIndex: 72.4,
  commodityShockIndex: 58.1,
}

export const mockCPIHistory: CPIRecord[] = Array.from({ length: 24 }, (_, i) => {
  const date = new Date(2022, i, 1)
  const base = 290 + i * 1.1 + Math.sin(i * 0.5) * 3
  return {
    date: date.toISOString().split('T')[0],
    value: parseFloat(base.toFixed(1)),
    yoy: parseFloat((3.2 + Math.sin(i * 0.3) * 1.5).toFixed(2)),
    mom: parseFloat((0.3 + Math.sin(i * 0.8) * 0.4).toFixed(2)),
  }
})

export const mockForecast: ForecastResult = {
  model: 'XGBoost',
  horizon: '6m',
  predictions: Array.from({ length: 6 }, (_, i) => ({
    date: new Date(2024, i + 1, 1).toISOString().split('T')[0],
    value: parseFloat((314.2 + i * 0.9 + Math.random() * 0.5).toFixed(1)),
    lower: parseFloat((314.2 + i * 0.9 - 2.5).toFixed(1)),
    upper: parseFloat((314.2 + i * 0.9 + 2.5).toFixed(1)),
  })),
  mae: 0.42,
  rmse: 0.61,
  mape: 0.18,
  r2: 0.97,
  generatedAt: new Date().toISOString(),
}

export const mockSentiment: SentimentSummary = {
  overall: -0.34,
  label: 'NEGATIVE',
  positive: 28,
  negative: 52,
  neutral: 20,
  topTopics: [
    { topic: 'Housing Costs', count: 1240, sentiment: -0.62 },
    { topic: 'Fuel Prices', count: 980, sentiment: -0.71 },
    { topic: 'Grocery Inflation', count: 870, sentiment: -0.58 },
    { topic: 'Wage Growth', count: 540, sentiment: 0.41 },
    { topic: 'Supply Chain', count: 430, sentiment: -0.44 },
  ],
  timeline: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(2024, 0, i + 1).toISOString().split('T')[0],
    score: parseFloat((-0.3 + Math.sin(i * 0.4) * 0.3).toFixed(2)),
  })),
}

export const mockNarratives: NarrativeTopic[] = [
  { id: '1', name: 'Housing Inflation', category: 'Real Estate', confidence: 0.89, trend: 'RISING', mentions: 12400, sentimentScore: -0.62, date: new Date().toISOString() },
  { id: '2', name: 'Fuel Price Surge', category: 'Energy', confidence: 0.84, trend: 'RISING', mentions: 9800, sentimentScore: -0.71, date: new Date().toISOString() },
  { id: '3', name: 'Grocery Inflation', category: 'Food', confidence: 0.91, trend: 'STABLE', mentions: 8700, sentimentScore: -0.58, date: new Date().toISOString() },
  { id: '4', name: 'Recession Fear', category: 'Macro', confidence: 0.67, trend: 'RISING', mentions: 6200, sentimentScore: -0.79, date: new Date().toISOString() },
  { id: '5', name: 'Wage Growth Pressure', category: 'Labor', confidence: 0.73, trend: 'STABLE', mentions: 5400, sentimentScore: 0.41, date: new Date().toISOString() },
  { id: '6', name: 'Supply Chain Concerns', category: 'Trade', confidence: 0.78, trend: 'FALLING', mentions: 4300, sentimentScore: -0.44, date: new Date().toISOString() },
]

export const mockIndicators: EconomicIndicator[] = [
  { id: '1', name: 'Unemployment Rate', value: 3.7, unit: '%', date: new Date().toISOString(), source: 'BLS', change: -0.1 },
  { id: '2', name: 'GDP Growth', value: 2.1, unit: '%', date: new Date().toISOString(), source: 'BEA', change: 0.3 },
  { id: '3', name: 'Fed Funds Rate', value: 5.25, unit: '%', date: new Date().toISOString(), source: 'FRED', change: 0 },
  { id: '4', name: 'Oil Price (WTI)', value: 78.4, unit: 'USD/bbl', date: new Date().toISOString(), source: 'EIA', change: 2.1 },
  { id: '5', name: 'USD/EUR', value: 1.085, unit: 'rate', date: new Date().toISOString(), source: 'Forex', change: -0.003 },
  { id: '6', name: 'Food Price Index', value: 118.3, unit: 'index', date: new Date().toISOString(), source: 'FAO', change: 1.2 },
]

export const mockAlerts: Alert[] = [
  { id: '1', type: 'INFLATION_SPIKE', severity: 'HIGH', message: 'CPI increased 0.4% MoM — above forecast of 0.2%', read: false, createdAt: new Date().toISOString() },
  { id: '2', type: 'SENTIMENT_ANOMALY', severity: 'MEDIUM', message: 'Negative sentiment spike detected in housing sector', read: false, createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: '3', type: 'ECONOMIC_SHOCK', severity: 'CRITICAL', message: 'Oil price surged 8% — commodity shock index elevated', read: true, createdAt: new Date(Date.now() - 7200000).toISOString() },
]

export const mockModelComparison: ModelComparison = {
  models: [
    { name: 'XGBoost', mae: 0.42, rmse: 0.61, mape: 0.18, r2: 0.97, isBest: true },
    { name: 'Random Forest', mae: 0.58, rmse: 0.79, mape: 0.24, r2: 0.95, isBest: false },
    { name: 'LSTM', mae: 0.51, rmse: 0.72, mape: 0.21, r2: 0.96, isBest: false },
    { name: 'Prophet', mae: 0.67, rmse: 0.88, mape: 0.29, r2: 0.93, isBest: false },
    { name: 'SVR', mae: 0.74, rmse: 0.95, mape: 0.32, r2: 0.91, isBest: false },
    { name: 'Linear Regression', mae: 0.91, rmse: 1.18, mape: 0.41, r2: 0.87, isBest: false },
  ],
}
