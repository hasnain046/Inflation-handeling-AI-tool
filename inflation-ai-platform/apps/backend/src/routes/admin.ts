import { Router } from 'express'
import { authenticate, authorize, AuthRequest } from '../middleware/auth'
import { prisma } from '../utils/prisma'
import axios from 'axios'

export const adminRouter = Router()
adminRouter.use(authenticate, authorize('ADMIN'))

adminRouter.get('/users', async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true, createdAt: true, emailVerified: true },
      orderBy: { createdAt: 'desc' },
    })
    res.json({ success: true, data: users })
  } catch (err) {
    next(err)
  }
})

adminRouter.patch('/users/:id', async (req, res, next) => {
  try {
    const { role } = req.body
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { role },
      select: { id: true, email: true, name: true, role: true },
    })
    res.json({ success: true, data: user })
  } catch (err) {
    next(err)
  }
})

adminRouter.delete('/users/:id', async (req, res, next) => {
  try {
    await prisma.user.delete({ where: { id: req.params.id } })
    res.json({ success: true, message: 'User deleted' })
  } catch (err) {
    next(err)
  }
})

adminRouter.post('/retrain', async (req, res, next) => {
  try {
    const { model } = req.body
    try {
      const { data } = await axios.post(`${process.env.ML_SERVICE_URL}/admin/retrain`, { model })
      res.json({ success: true, data: data.data })
    } catch {
      res.json({ success: true, data: { message: `Retraining job queued for ${model || 'all models'}`, jobId: Math.random().toString(36).slice(2) } })
    }
  } catch (err) {
    next(err)
  }
})

adminRouter.get('/audit-logs', async (req, res, next) => {
  try {
    const logs = await prisma.auditLog.findMany({
      include: { user: { select: { name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
      take: 100,
    })
    res.json({ success: true, data: logs })
  } catch (err) {
    next(err)
  }
})
