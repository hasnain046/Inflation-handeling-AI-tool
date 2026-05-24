import { Router } from 'express'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../utils/prisma'
import { signAccessToken, signRefreshToken } from '../utils/jwt'

export const authRouter = Router()

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['ANALYST', 'RESEARCHER', 'GUEST']).default('ANALYST'),
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name: { type: string }
 *               email: { type: string }
 *               password: { type: string }
 *               role: { type: string, enum: [ANALYST, RESEARCHER, GUEST] }
 */
authRouter.post('/register', async (req, res, next) => {
  try {
    const data = registerSchema.parse(req.body)
    const exists = await prisma.user.findUnique({ where: { email: data.email } })
    if (exists) return res.status(409).json({ success: false, message: 'Email already registered' })

    const hashed = await bcrypt.hash(data.password, 12)
    const user = await prisma.user.create({
      data: { ...data, password: hashed },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    })

    const accessToken = signAccessToken({ id: user.id, email: user.email, role: user.role })
    const refreshToken = signRefreshToken({ id: user.id })

    res.status(201).json({ success: true, data: { user, accessToken, refreshToken } })
  } catch (err) {
    next(err)
  }
})

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     security: []
 */
authRouter.post('/login', async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body)
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }

    const accessToken = signAccessToken({ id: user.id, email: user.email, role: user.role })
    const refreshToken = signRefreshToken({ id: user.id })

    const { password: _, ...safeUser } = user
    res.json({ success: true, data: { user: safeUser, accessToken, refreshToken } })
  } catch (err) {
    next(err)
  }
})

authRouter.post('/refresh', async (req, res, next) => {
  try {
    const { refreshToken } = req.body
    if (!refreshToken) return res.status(401).json({ success: false, message: 'No refresh token' })

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as { id: string }
    const user = await prisma.user.findUnique({ where: { id: decoded.id } })
    if (!user) return res.status(401).json({ success: false, message: 'User not found' })

    const accessToken = signAccessToken({ id: user.id, email: user.email, role: user.role })
    res.json({ success: true, data: { accessToken } })
  } catch {
    res.status(401).json({ success: false, message: 'Invalid refresh token' })
  }
})

authRouter.post('/forgot-password', async (req, res, next) => {
  try {
    const { email } = z.object({ email: z.string().email() }).parse(req.body)
    const user = await prisma.user.findUnique({ where: { email } })
    if (user) {
      const token = signAccessToken({ id: user.id })
      await prisma.user.update({
        where: { id: user.id },
        data: { resetToken: token, resetTokenExp: new Date(Date.now() + 3600000) },
      })
      // TODO: Send email with reset link
    }
    res.json({ success: true, message: 'If that email exists, a reset link has been sent.' })
  } catch (err) {
    next(err)
  }
})
