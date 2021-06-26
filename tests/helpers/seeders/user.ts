import { createQueryBuilder } from 'typeorm'

import { User } from '../../../src/entities/User'

export const defaultPassword = 'hard@cor3'

export const rawUsersData = [
  {
    // Admin user
    id: '3163363e-bcea-42ae-afad-936173ccf64c',
    name: 'John Doe',
    email: 'johndoe@example.com',
    admin: true,
    password: '$2a$10$6JXfa9csKgd2.b8Z35c2BePDjdD.oKqM6O.5hyL12eyWp8456gJ9u', // hard@cor3
    createdAt: new Date(2021, 5, 26, 10, 35, 0),
    updatedAt: new Date(2021, 5, 26, 10, 35, 0)
  }
]

export async function seedUsers(): Promise<User[]> {
  const result = await createQueryBuilder()
    .insert()
    .into(User)
    .values(rawUsersData)
    .returning('*')
    .execute()

  return result.generatedMaps as User[]
}
