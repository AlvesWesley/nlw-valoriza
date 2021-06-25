import { Request, Response, NextFunction } from 'express'

import { verify } from '../utils/jwt'

const secret = process.env.SECRET || ''

export interface Payload {
  sub: string
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  const { authorization = '' } = req.headers
  const [, token] = authorization.split(' ')

  if (!token) return res.status(401).end()

  try {
    const decode = verify(token, secret) as Payload

    req.userId = decode.sub

    return next()
  } catch {
    return res.status(401).json()
  }
}
