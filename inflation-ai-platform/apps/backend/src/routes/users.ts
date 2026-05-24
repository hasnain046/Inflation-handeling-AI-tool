import { Router } from 'express'
import { authenticate, AuthRequest } from '../middleware/auth'
import { prisma } from '../utils/prisma'
import { z } from 'zod'

export const usersRouter = Router()

usersRouter.use(authenticate)

usersRouter.get('/profile', async (req: AuthRequest, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: { id: true, email: true, name: true, role: true, avatar: true, createdAt: true },
    })
    if (!user) return res.status(404).json({ success: false, message: 'User not found' })
    res.json({ success: true, data: user })
  } catch (err) {
    next(err)
  }
})

usersRouter.patch('/update', async (req: AuthRequest, res, next) => {
  try {
    const schema = z.object({ name: z.string().min(2).optional(), avatar: z.string().url().optional() })
    const data = schema.parse(req.body)
    const user = await prisma.user.update({
      where: { id: req.user!.id },
      data,
      select: { id: true, email: true, name: true, role: true, avatar: true, createdAt: true },
    })
    res.json({ success: true, data: user })
  } catch (err) {
    next(err)
  }
})
