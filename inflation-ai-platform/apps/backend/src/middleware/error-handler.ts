import { Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger'

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  logger.error(`${err.message} - ${req.method} ${req.path}`)
  res.status(500).json({ success: false, message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message })
}
