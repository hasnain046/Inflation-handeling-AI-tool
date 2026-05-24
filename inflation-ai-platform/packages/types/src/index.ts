// User & Auth Types
export type UserRole = 'ADMIN' | 'ANALYST' | 'RESEARCHER' | 'GUEST';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

// Forecast Types
export interface ForecastPoint {
  date: string;
  value: number;
  lower: number;
  upper: number;
}

export interface ForecastResult {
  model: string;
  horizon: '1m' | '3m' | '6m' | '12m';
  predictions: ForecastPoint[];
  mae: number;
  rmse: number;
  mape: number;
  r2: number;
  generatedAt: string;
}

export interface ModelComparison {
  models: Array<{
    name: string;
    mae: number;
    rmse: number;
    mape: number;
    r2: number;
    isBest: boolean;
  }>;
}

// CPI & Economic Types
export interface CPIRecord {
  date: string;
  value: number;
  yoy: number;
  mom: number;
  category?: string;
}

export interface EconomicIndicator {
  id: string;
  name: string;
  value: number;
  unit: string;
  date: string;
  source: string;
  change: number;
}

// Sentiment Types
export type SentimentLabel = 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';

export interface SentimentRecord {
  id: string;
  source: string;
  score: number;
  label: SentimentLabel;
  text?: string;
  topics: string[];
  date: string;
}

export interface SentimentSummary {
  overall: number;
  label: SentimentLabel;
  positive: number;
  negative: number;
  neutral: number;
  topTopics: Array<{ topic: string; count: number; sentiment: number }>;
  timeline: Array<{ date: string; score: number }>;
}

// Narrative Types
export interface NarrativeTopic {
  id: string;
  name: string;
  category: string;
  confidence: number;
  trend: 'RISING' | 'FALLING' | 'STABLE';
  mentions: number;
  sentimentScore: number;
  date: string;
}

// Simulation Types
export interface SimulationInput {
  oilPrice: number;
  interestRate: number;
  exchangeRate: number;
  gdpGrowth: number;
  unemployment: number;
  importCost: number;
}

export interface SimulationResult {
  predictedCPI: number;
  inflationImpact: number;
  confidence: number;
  breakdown: Array<{ factor: string; impact: number }>;
}

// Alert Types
export type AlertType = 'INFLATION_SPIKE' | 'SENTIMENT_ANOMALY' | 'CPI_THRESHOLD' | 'ECONOMIC_SHOCK';
export type AlertSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface Alert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  message: string;
  read: boolean;
  createdAt: string;
}

// SHAP / Explainability
export interface ShapValue {
  feature: string;
  value: number;
  impact: number;
  direction: 'positive' | 'negative';
}

export interface ExplainabilityResult {
  prediction: number;
  baseValue: number;
  shapValues: ShapValue[];
  summary: string;
}

// KPI Dashboard
export interface DashboardKPIs {
  currentCPI: number;
  predictedCPI: number;
  inflationRate: number;
  forecastAccuracy: number;
  sentimentScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  currencyStrengthIndex: number;
  commodityShockIndex: number;
}

// API Response wrapper
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
