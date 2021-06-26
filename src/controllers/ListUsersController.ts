import { Request, Response } from 'express'

import { ListUsersService } from '../services/ListUsersService'

export class ListUsersController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listUsersService = new ListUsersService()
    const users = await listUsersService.execute()

    return res.json(users)
  }
}
