import { Request, Response } from 'express'

import { CreateComplimentService } from '../services/CreateComplimentService'

export class CreateComplimentController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { tagId, userReceiverId, message } = req.body
    const { userId: userSenderId } = req

    const createComplimentService = new CreateComplimentService()

    const compliment = await createComplimentService.execute({
      tagId,
      userSenderId,
      userReceiverId,
      message
    })

    return res.status(201).json(compliment)
  }
}
