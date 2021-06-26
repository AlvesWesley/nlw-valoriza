import { Request, Response } from 'express'

import { ListUserSendComplimentsService } from '../services/ListUserSendComplimentsService'

export class ListUserSendComplimentsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { userId } = req
    const listUserSendComplimentsService = new ListUserSendComplimentsService()
    const compliments = await listUserSendComplimentsService.execute(userId)

    return res.json(compliments)
  }
}
