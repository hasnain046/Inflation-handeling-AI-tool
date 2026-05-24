import { Router } from 'express'
import { authenticate, AuthRequest } from '../middleware/auth'
import { prisma } from '../utils/prisma'
import axios from 'axios'
import type { AxiosError } from 'axios'

export const forecastRouter = Router()
forecastRouter.use(authenticate)

forecastRouter.get('/current', async (req: AuthRequest, res, next) => {
  try {
    // Fetch latest forecast from ML service or DB
    const latest = await prisma.forecast.findFirst({
      where: { userId: req.user!.id },
      orderBy: { createdAt: 'desc' },
    })
    if (latest) return res.json({ success: true, data: latest })

    // Fallback: call ML service
    try {
      const { data } = await axios.get(`${process.env.ML_SERVICE_URL}/forecast/current`)
      res.json({ success: true, data: data.data })
    } catch {
      res.json({ success: true, data: getMockForecast('1m') })
    }
  } catch (err) {
    next(err)
  }
})

forecastRouter.get('/monthly', async (req: AuthRequest, res, next) => {
  try {
    const horizon = (req.query.horizon as string) || '6m'
    try {
      const { data } = await axios.get(`${process.env.ML_SERVICE_URL}/forecast/monthly?horizon=${horizon}`)
      res.json({ success: true, data: data.data })
    } catch {
      res.json({ success: true, data: getMockForecast(horizon as any) })
    }
  } catch (err) {
    next(err)
  }
})

forecastRouter.get('/compare', async (req: AuthRequest, res, next) => {
  try {
    try {
      const { data } = await axios.get(`${process.env.ML_SERVICE_URL}/forecast/compare`)
      res.json({ success: true, data: data.data })
    } catch {
      res.json({ success: true, data: getMockComparison() })
    }
  } catch (err) {
    next(err)
  }
})

forecastRouter.get('/explain', async (req: AuthRequest, res, next) => {
  try {
    try {
      const { data } = await axios.get(`${process.env.ML_SERVICE_URL}/forecast/explain`)
      res.json({ success: true, data: data.data })
    } catch {
      res.json({ success: true, data: getMockShap() })
    }
  } catch (err) {
    next(err)
  }
})

function getMockForecast(horizon: string) {
  return {
    model: 'XGBoost', horizon,
    predictions: Array.from({ length: 6 }, (_, i) => ({
      date: new Date(2024, i + 1, 1).toISOString().split('T')[0],
      value: parseFloat((314.2 + i * 0.9).toFixed(1)),
      lower: parseFloat((314.2 + i * 0.9 - 2.5).toFixed(1)),
      upper: parseFloat((314.2 + i * 0.9 + 2.5).toFixed(1)),
    })),
    mae: 0.42, rmse: 0.61, mape: 0.18, r2: 0.97,
    generatedAt: new Date().toISOString(),
  }
}

function getMockComparison() {
  return {
    models: [
      { name: 'XGBoost', mae: 0.42, rmse: 0.61, mape: 0.18, r2: 0.97, isBest: true },
      { name: 'Random Forest', mae: 0.58, rmse: 0.79, mape: 0.24, r2: 0.95, isBest: false },
      { name: 'LSTM', mae: 0.51, rmse: 0.72, mape: 0.21, r2: 0.96, isBest: false },
    ],
  }
}

function getMockShap() {
  return {
    prediction: 317.8, baseValue: 314.2,
    shapValues: [
      { feature: 'Oil Price', value: 78.4, impact: 0.42, direction: 'positive' },
      { feature: 'Sentiment Score', value: -0.34, impact: -0.31, direction: 'negative' },
      { feature: 'Interest Rate', value: 5.25, impact: -0.28, direction: 'negative' },
    ],
    summary: 'Inflation is predicted to rise primarily due to elevated oil prices and import cost pressures.',
  }
}
