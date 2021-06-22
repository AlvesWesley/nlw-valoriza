import { getCustomRepository } from 'typeorm'

import { User } from '../entities/User'
import { UserRepository } from '../repositories/UserRepository'

export interface UserRequest {
  name: string
  email: string
  admin?: boolean
}

export class CreateUserService {
  private readonly userRepository = getCustomRepository(UserRepository)

  async execute(data: UserRequest): Promise<User> {
    const { name, email, admin } = data

    if (!email) throw new Error('Email incorrect')

    const userAlreadyExists = await this.userRepository.findOne({ email })

    if (userAlreadyExists) throw new Error('User already exists')

    const user = this.userRepository.create({ name, email, admin })

    await this.userRepository.save(user)

    return user
  }
}
