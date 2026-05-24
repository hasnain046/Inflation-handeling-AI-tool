import { Router } from 'express'
import { authenticate, AuthRequest } from '../middleware/auth'
import { prisma } from '../utils/prisma'

export const reportsRouter = Router()
reportsRouter.use(authenticate)

reportsRouter.get('/list', async (req: AuthRequest, res, next) => {
  try {
    const reports = await prisma.report.findMany({
      where: { userId: req.user!.id },
      orderBy: { createdAt: 'desc' },
    })
    res.json({ success: true, data: reports })
  } catch (err) {
    next(err)
  }
})

reportsRouter.get('/export', async (req: AuthRequest, res, next) => {
  try {
    const type = req.query.type as string || 'pdf'
    // In production: generate actual PDF/CSV using puppeteer or similar
    res.json({ success: true, data: { message: `${type.toUpperCase()} report generation queued`, jobId: Math.random().toString(36).slice(2) } })
  } catch (err) {
    next(err)
  }
})
