import { Router } from 'express'
import { authenticate, AuthRequest } from '../middleware/auth'
import { prisma } from '../utils/prisma'

export const alertsRouter = Router()
alertsRouter.use(authenticate)

alertsRouter.get('/', async (req: AuthRequest, res, next) => {
  try {
    const alerts = await prisma.alert.findMany({
      where: { userId: req.user!.id },
      orderBy: { createdAt: 'desc' },
      take: 50,
    })
    res.json({ success: true, data: alerts })
  } catch (err) {
    next(err)
  }
})

alertsRouter.patch('/:id/read', async (req: AuthRequest, res, next) => {
  try {
    const alert = await prisma.alert.update({
      where: { id: req.params.id, userId: req.user!.id },
      data: { read: true },
    })
    res.json({ success: true, data: alert })
  } catch (err) {
    next(err)
  }
})

alertsRouter.patch('/read-all', async (req: AuthRequest, res, next) => {
  try {
    await prisma.alert.updateMany({
      where: { userId: req.user!.id, read: false },
      data: { read: true },
    })
    res.json({ success: true, message: 'All alerts marked as read' })
  } catch (err) {
    next(err)
  }
})
