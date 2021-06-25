import { getCustomRepository } from 'typeorm'

import { Compliment } from '../entities/Compliment'
import { ComplimentRepository } from '../repositories/ComplimentRepository'

export class ListUserSendComplimentsService {
  private readonly complimentRepository =
    getCustomRepository(ComplimentRepository)

  async execute(userSenderId: string): Promise<Compliment[]> {
    const compliments = await this.complimentRepository.find({
      where: { userSenderId },
      relations: ['userSender', 'userReceiver', 'tag']
    })

    return compliments
  }
}
