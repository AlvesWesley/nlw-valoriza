import { getCustomRepository } from 'typeorm'

import { Tag } from '../entities/Tag'
import { TagRepository } from '../repositories/TagRepository'

export interface TagRequest {
  name: string
}

export class CreateTagService {
  private readonly tagRepository = getCustomRepository(TagRepository)

  async execute(data: TagRequest): Promise<Tag> {
    const { name } = data

    if (!name) {
      throw new Error('Incorrect name!')
    }

    const tagAlreadyExists = await this.tagRepository.findOne({ name })

    if (tagAlreadyExists) {
      throw new Error('Tag already exists!')
    }

    const tag = this.tagRepository.create({ name })

    await this.tagRepository.save(tag)

    return tag
  }
}
