import { getCustomRepository } from 'typeorm'

import { Tag } from '../entities/Tag'
import { TagRepository } from '../repositories/TagRepository'

export class ListTagsService {
  private readonly tagRepository = getCustomRepository(TagRepository)

  async execute(): Promise<Tag[]> {
    const tags = await this.tagRepository.find()

    return tags.map(tag => {
      return { ...tag, customName: `#${tag.name}` }
    })
  }
}
