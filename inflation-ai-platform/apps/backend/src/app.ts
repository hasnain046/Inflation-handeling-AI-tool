import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import swaggerUi from 'swagger-ui-express'
import { authRouter } from './routes/auth'
import { usersRouter } from './routes/users'
import { forecastRouter } from './routes/forecast'
import { sentimentRouter } from './routes/sentiment'
import { economicsRouter } from './routes/economics'
import { simulationRouter } from './routes/simulation'
import { reportsRouter } from './routes/reports'
import { alertsRouter } from './routes/alerts'
import { adminRouter } from './routes/admin'
import { errorHandler } from './middleware/error-handler'
import { swaggerSpec } from './utils/swagger'

const app = express()

// Security & middleware
app.use(helmet())
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }))
app.use(compression())
app.use(express.json({ limit: '10mb' }))
app.use(morgan('combined'))

// Rate limiting
app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, max: 200, message: 'Too many requests' }))

// Swagger docs
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Health check
app.get('/health', (_, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }))

// Routes
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/forecast', forecastRouter)
app.use('/api/sentiment', sentimentRouter)
app.use('/api/economics', economicsRouter)
app.use('/api/simulation', simulationRouter)
app.use('/api/reports', reportsRouter)
app.use('/api/alerts', alertsRouter)
app.use('/api/admin', adminRouter)

app.use(errorHandler)

export default app
