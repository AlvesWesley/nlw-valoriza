import { getCustomRepository } from 'typeorm'

import { Tag } from '../entities/Tag'
import { TagRepository } from '../repositories/TagRepository'
import { ServiceError } from '../utils/ServiceError'

export interface TagRequest {
  name?: string
}

export class CreateTagService {
  private readonly tagRepository = getCustomRepository(TagRepository)

  async execute(data: TagRequest): Promise<Tag> {
    const { name } = data

    if (!name) {
      throw new ServiceError('Incorrect name!', 500)
    }

    const tagAlreadyExists = await this.tagRepository.findOne({ name })

    if (tagAlreadyExists) {
      throw new ServiceError('Tag already exists!', 500)
    }

    const tag = this.tagRepository.create({ name })

    await this.tagRepository.save(tag)

    return tag
  }
}
