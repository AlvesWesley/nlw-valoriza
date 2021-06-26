import { Request, Response } from 'express'

export function notFound(req: Request, res: Response): Response {
  return res.status(404).json({ error: 'Resource not found' })
}
