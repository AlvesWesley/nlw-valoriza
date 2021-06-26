import { getCustomRepository } from 'typeorm'

import { Compliment } from '../entities/Compliment'
import { ComplimentRepository } from '../repositories/ComplimentRepository'
import { UserRepository } from '../repositories/UserRepository'
import { ServiceError } from '../utils/ServiceError'

interface ComplimentRequest {
  tagId: string
  userSenderId: string
  userReceiverId: string
  message: string
}

export class CreateComplimentService {
  private readonly complimentRepository =
    getCustomRepository(ComplimentRepository)

  private readonly userRepository = getCustomRepository(UserRepository)

  async execute(data: ComplimentRequest): Promise<Compliment> {
    const { tagId, userSenderId, userReceiverId, message } = data

    if (userSenderId === userReceiverId) {
      throw new ServiceError('Incorret User Receiver', 400)
    }

    const userReceiverExists = await this.userRepository.findOne(userReceiverId)

    if (!userReceiverExists) {
      throw new ServiceError('User Receiver does not exists!', 400)
    }

    const compliment = this.complimentRepository.create({
      tagId,
      userSenderId,
      userReceiverId,
      message
    })

    await this.complimentRepository.save(compliment)

    return compliment
  }
}
