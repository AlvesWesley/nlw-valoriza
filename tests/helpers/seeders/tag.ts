import { createQueryBuilder } from 'typeorm'

import { Tag } from '../../../src/entities/Tag'

const rawTagsData = [
  {
    id: '23a9964f-da95-4da7-89f2-b51f7b483a40',
    name: 'inspiração',
    createdAt: new Date(2021, 5, 26, 11, 50, 0),
    updatedAt: new Date(2021, 5, 26, 11, 50, 0)
  }
]

export async function seedTags(): Promise<Tag[]> {
  const result = await createQueryBuilder()
    .insert()
    .into(Tag)
    .values(rawTagsData)
    .returning('*')
    .execute()

  return result.generatedMaps as Tag[]
}
