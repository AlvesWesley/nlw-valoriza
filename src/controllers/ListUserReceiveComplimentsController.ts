import { Request, Response } from 'express'

import { ListUserReceiveComplimentsService } from '../services/ListUserReceiveComplimentsService'

export class ListUserReceiveComplimentsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { userId } = req
    const listUserReceiveComplimentsService =
      new ListUserReceiveComplimentsService()
    const compliments = await listUserReceiveComplimentsService.execute(userId)

    return res.json(compliments)
  }
}
