import { getCustomRepository } from 'typeorm'
import { classToPlain } from 'class-transformer'

import { User } from '../entities/User'
import { UserRepository } from '../repositories/UserRepository'

export class ListUserService {
  private readonly userRepository = getCustomRepository(UserRepository)

  async execute(): Promise<User[]> {
    const users = await this.userRepository.find()

    return classToPlain(users) as User[]
  }
}
