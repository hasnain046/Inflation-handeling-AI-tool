export const API_ENDPOINTS = {
  auth: {
    register: '/auth/register',
    login: '/auth/login',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    verifyEmail: '/auth/verify-email',
  },
  users: {
    profile: '/users/profile',
    update: '/users/update',
  },
  forecast: {
    current: '/forecast/current',
    monthly: '/forecast/monthly',
    compare: '/forecast/compare',
    explain: '/forecast/explain',
  },
  sentiment: {
    live: '/sentiment/live',
    topics: '/sentiment/topics',
    timeline: '/sentiment/timeline',
  },
  economics: {
    indicators: '/economics/indicators',
    cpi: '/economics/cpi',
  },
  simulation: {
    run: '/simulation/run',
  },
  reports: {
    export: '/reports/export',
    list: '/reports/list',
  },
  alerts: {
    list: '/alerts',
    markRead: '/alerts/:id/read',
    settings: '/alerts/settings',
  },
  admin: {
    retrain: '/admin/retrain',
    users: '/admin/users',
    auditLogs: '/admin/audit-logs',
    dataSources: '/admin/data-sources',
  },
} as const;

export const RISK_LEVELS = {
  LOW: { label: 'Low', color: '#22c55e', threshold: 3 },
  MEDIUM: { label: 'Medium', color: '#f59e0b', threshold: 5 },
  HIGH: { label: 'High', color: '#f97316', threshold: 7 },
  CRITICAL: { label: 'Critical', color: '#ef4444', threshold: 10 },
} as const;

export const ML_MODELS = [
  'Linear Regression',
  'Random Forest',
  'XGBoost',
  'SVR',
  'Prophet',
  'LSTM',
] as const;

export const FORECAST_HORIZONS = ['1m', '3m', '6m', '12m'] as const;
