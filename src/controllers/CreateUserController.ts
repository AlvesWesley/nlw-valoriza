import { Request, Response } from 'express'

import { CreateUserService } from '../services/CreateUserService'

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, admin, password } = req.body

    const createUserService = new CreateUserService()

    const user = await createUserService.execute({
      name,
      email,
      admin,
      password
    })

    const { id, createdAt, updatedAt } = user

    return res.status(201).json({
      id,
      name,
      email,
      admin,
      createdAt,
      updatedAt
    })
  }
}
