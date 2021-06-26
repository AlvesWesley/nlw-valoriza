import { createQueryBuilder } from 'typeorm'

import { Compliment } from '../../../src/entities/Compliment'

export const rawComplimentsData = [
  {
    id: '8b88eb58-79c6-4ceb-84e6-331c8ced6557',
    message: 'Muito obrigado!',
    createdAt: new Date(2021, 5, 26, 13, 41, 0)
  }
]

export interface SeedComplimentsOptions {
  tagId: string
  userSenderId: string
  userReceiverId: string
}

export async function seedCompliments(
  options: SeedComplimentsOptions
): Promise<Compliment[]> {
  const { tagId, userSenderId, userReceiverId } = options
  const data = rawComplimentsData.map(compliment => {
    return {
      ...compliment,
      tagId,
      userSenderId,
      userReceiverId
    }
  })

  const result = await createQueryBuilder()
    .insert()
    .into(Compliment)
    .values(data)
    .returning('*')
    .execute()

  return result.generatedMaps as Compliment[]
}
