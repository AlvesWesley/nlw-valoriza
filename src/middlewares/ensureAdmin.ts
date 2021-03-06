import { NextFunction, Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'

import { UserRepository } from '../repositories/UserRepository'

export async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const { userId } = req

  const userRepository = getCustomRepository(UserRepository)

  const user = await userRepository.findOneOrFail(userId)

  if (user.admin) {
    return next()
  }

  return res.status(403).json({ error: 'Unauthorized' })
}
