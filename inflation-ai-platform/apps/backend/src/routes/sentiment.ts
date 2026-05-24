import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import { prisma } from '../utils/prisma'

export const sentimentRouter = Router()
sentimentRouter.use(authenticate)

sentimentRouter.get('/live', async (req, res, next) => {
  try {
    const records = await prisma.sentimentRecord.findMany({
      orderBy: { date: 'desc' },
      take: 50,
    })
    res.json({ success: true, data: records.length ? records : getMockSentiment() })
  } catch (err) {
    next(err)
  }
})

sentimentRouter.get('/topics', async (req, res, next) => {
  try {
    res.json({ success: true, data: getMockTopics() })
  } catch (err) {
    next(err)
  }
})

sentimentRouter.get('/timeline', async (req, res, next) => {
  try {
    const days = parseInt(req.query.days as string) || 30
    const records = await prisma.sentimentRecord.findMany({
      where: { date: { gte: new Date(Date.now() - days * 86400000) } },
      orderBy: { date: 'asc' },
    })
    res.json({ success: true, data: records.length ? records : getMockTimeline(days) })
  } catch (err) {
    next(err)
  }
})

function getMockSentiment() {
  return { overall: -0.34, label: 'NEGATIVE', positive: 28, negative: 52, neutral: 20 }
}

function getMockTopics() {
  return [
    { topic: 'Housing Costs', count: 1240, sentiment: -0.62 },
    { topic: 'Fuel Prices', count: 980, sentiment: -0.71 },
    { topic: 'Grocery Inflation', count: 870, sentiment: -0.58 },
  ]
}

function getMockTimeline(days: number) {
  return Array.from({ length: days }, (_, i) => ({
    date: new Date(Date.now() - (days - i) * 86400000).toISOString().split('T')[0],
    score: parseFloat((-0.3 + Math.sin(i * 0.4) * 0.3).toFixed(2)),
  }))
}
