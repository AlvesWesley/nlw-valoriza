import { getCustomRepository } from 'typeorm'
import { classToPlain } from 'class-transformer'

import { User } from '../entities/User'
import { UserRepository } from '../repositories/UserRepository'
import { hash } from '../utils/hash'
import { ServiceError } from '../utils/ServiceError'

export interface UserRequest {
  name: string
  email: string
  admin?: boolean
  password: string
}

export class CreateUserService {
  private readonly userRepository = getCustomRepository(UserRepository)

  async execute(data: UserRequest): Promise<User> {
    const { name, email, admin = false, password } = data

    if (!email) throw new ServiceError('Email incorrect', 400)

    const userAlreadyExists = await this.userRepository.findOne({ email })

    if (userAlreadyExists) throw new ServiceError('User already exists', 400)

    const passwordHash = await hash(password)

    const user = this.userRepository.create({
      name,
      email,
      admin,
      password: passwordHash
    })

    await this.userRepository.save(user)

    return classToPlain(user) as User
  }
}
