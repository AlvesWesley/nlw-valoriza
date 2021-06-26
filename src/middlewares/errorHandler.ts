import { Request, Response, NextFunction } from 'express'

import { ServiceError } from '../utils/ServiceError'

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): Response {
  if (err instanceof ServiceError) {
    return res.status(err.statusCode).json({ error: err.message })
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  })
}
