import 'dotenv/config'
import app from './app'
import { logger } from './utils/logger'

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  logger.info(`🚀 Backend running on http://localhost:${PORT}`)
  logger.info(`📚 Swagger docs at http://localhost:${PORT}/api/docs`)
})
