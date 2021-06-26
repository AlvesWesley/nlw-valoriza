import { getCustomRepository } from 'typeorm'

import { UserRepository } from '../repositories/UserRepository'
import { compare } from '../utils/hash'
import { sign } from '../utils/jwt'
import { ServiceError } from '../utils/ServiceError'

const secret = process.env.SECRET || ''

export interface AuthenticateRequest {
  email: string
  password: string
}

export class AuthenticateUserService {
  private readonly userRepository = getCustomRepository(UserRepository)

  async execute(data: AuthenticateRequest): Promise<string> {
    const { email, password } = data

    const user = await this.userRepository.findOne({ email })

    if (!user) {
      throw new ServiceError('Email/Password incorrect', 401)
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new ServiceError('Email/Password incorrect', 401)
    }

    const token = sign({ email: user.email }, secret, {
      subject: user.id,
      expiresIn: '24h'
    })

    return token
  }
}
