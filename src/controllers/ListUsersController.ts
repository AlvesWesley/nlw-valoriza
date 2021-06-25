import { Request, Response } from 'express'

import { ListUserService } from '../services/ListUsersService'

export class ListUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listUserService = new ListUserService()
    const users = await listUserService.execute()

    return res.json(users)
  }
}
