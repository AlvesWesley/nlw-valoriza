import chai, { expect } from 'chai'
import chaiPromised from 'chai-as-promised'

import { ListUsersService } from '../../../src/services/ListUsersService'

import {
  connectInDatabase,
  clearDatabase
} from '../../helpers/seeders/database'
import { seedUsers } from '../../helpers/seeders/user'

chai.use(chaiPromised)

describe('ListUsersService', function () {
  before(async () => {
    await connectInDatabase()
  })

  beforeEach(async () => {
    await clearDatabase()
  })

  describe('execute', function () {
    it('espera retornar um array de user', async () => {
      const listUsersService = new ListUsersService()
      const users = await seedUsers()
      const result = await listUsersService.execute()

      expect(result).to.be.eql(
        users.map(user => {
          const { id, name, email, admin, createdAt, updatedAt } = user
          return {
            id,
            name,
            email,
            admin,
            createdAt,
            updatedAt
          }
        })
      )
    })
  })
})
