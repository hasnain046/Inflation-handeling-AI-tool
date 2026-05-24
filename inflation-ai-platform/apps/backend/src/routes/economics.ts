import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import { prisma } from '../utils/prisma'

export const economicsRouter = Router()
economicsRouter.use(authenticate)

economicsRouter.get('/indicators', async (req, res, next) => {
  try {
    const indicators = await prisma.economicIndicator.findMany({
      orderBy: { date: 'desc' },
      distinct: ['name'],
    })
    res.json({ success: true, data: indicators.length ? indicators : getMockIndicators() })
  } catch (err) {
    next(err)
  }
})

economicsRouter.get('/cpi', async (req, res, next) => {
  try {
    const records = await prisma.cPIRecord.findMany({
      orderBy: { date: 'desc' },
      take: 24,
    })
    res.json({ success: true, data: records.length ? records : getMockCPI() })
  } catch (err) {
    next(err)
  }
})

function getMockIndicators() {
  return [
    { id: '1', name: 'Unemployment Rate', value: 3.7, unit: '%', date: new Date(), source: 'BLS', change: -0.1 },
    { id: '2', name: 'GDP Growth', value: 2.1, unit: '%', date: new Date(), source: 'BEA', change: 0.3 },
    { id: '3', name: 'Fed Funds Rate', value: 5.25, unit: '%', date: new Date(), source: 'FRED', change: 0 },
    { id: '4', name: 'Oil Price (WTI)', value: 78.4, unit: 'USD/bbl', date: new Date(), source: 'EIA', change: 2.1 },
  ]
}

function getMockCPI() {
  return Array.from({ length: 24 }, (_, i) => ({
    id: String(i),
    date: new Date(2022, i, 1),
    value: parseFloat((290 + i * 1.1).toFixed(1)),
    yoy: parseFloat((3.2 + Math.sin(i * 0.3) * 1.5).toFixed(2)),
    mom: parseFloat((0.3 + Math.sin(i * 0.8) * 0.4).toFixed(2)),
    source: 'BLS',
  }))
}
