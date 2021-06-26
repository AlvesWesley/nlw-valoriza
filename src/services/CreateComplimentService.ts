import { getCustomRepository } from 'typeorm'

import { Compliment } from '../entities/Compliment'
import { ComplimentRepository } from '../repositories/ComplimentRepository'
import { UserRepository } from '../repositories/UserRepository'
import { ServiceError } from '../utils/ServiceError'
import { Mailer } from '../utils/Mailer'
import mailerConfig from '../config/mailer'

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
  private readonly mailer = new Mailer(mailerConfig)

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

    const userSender = await this.userRepository.findOneOrFail(userSenderId)

    await this.mailer.sendEmail({
      from: 'NLW Valoriza <nlw-valoriza@example.com>',
      to: `${userReceiverExists.name} <${userReceiverExists.email}>`,
      subject: 'Um novo elogio para você',
      content: `Olá ${userReceiverExists.name}! Você recebeu um elogio de ${userSender.name}. Acesse o NLW Valoriza e confira!`
    })

    return compliment
  }
}
