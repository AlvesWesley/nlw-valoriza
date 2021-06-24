import { getCustomRepository } from 'typeorm'

import { Compliment } from '../entities/Compliment'
import { ComplimentRepository } from '../repositories/ComplimentRepository'
import { UserRepository } from '../repositories/UserRepository'

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
      throw new Error('Incorret User Receiver')
    }

    const userReceiverExists = await this.userRepository.findOne(userReceiverId)

    if (!userReceiverExists) {
      throw new Error('User Receiver does not exists!')
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
