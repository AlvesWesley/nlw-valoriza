import { getCustomRepository } from 'typeorm'

import { Compliment } from '../entities/Compliment'
import { ComplimentRepository } from '../repositories/ComplimentRepository'

export class ListUserReceiveComplimentsService {
  private readonly complimentRepository =
    getCustomRepository(ComplimentRepository)

  async execute(userReceiverId: string): Promise<Compliment[]> {
    const compliments = await this.complimentRepository.find({
      where: { userReceiverId },
      relations: ['userSender', 'userReceiver', 'tag']
    })

    return compliments
  }
}
