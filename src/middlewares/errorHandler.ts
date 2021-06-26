import { Request, Response, NextFunction } from 'express'

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): Response {
  if (err instanceof Error) {
    return res.status(500).json({ error: err.message })
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  })
}
