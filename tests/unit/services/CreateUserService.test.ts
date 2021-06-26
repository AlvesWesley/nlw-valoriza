import chai, { expect } from 'chai'
import chaiPromised from 'chai-as-promised'

import { CreateUserService } from '../../../src/services/CreateUserService'

import {
  connectInDatabase,
  clearDatabase
} from '../../helpers/seeders/database'
import { seedUsers } from '../../helpers/seeders/user'
import { usersData } from '../../helpers/data/user'

chai.use(chaiPromised)

describe('CreateUserService', function () {
  before(async () => {
    await connectInDatabase()
  })

  beforeEach(async () => {
    await clearDatabase()
  })

  describe('execute', function () {
    it('espera registrar e retornar um objeto de user', async () => {
      const createUserService = new CreateUserService()
      const { name, email, admin, password } = usersData[0]
      const user = { name, email, admin, password }
      const result = await createUserService.execute(user)

      expect(result).to.deep.include({ name, email, admin })
    })

    it('espera lancar erro por email incorreto', async () => {
      const createUserService = new CreateUserService()
      const { name, admin, password } = usersData[0]
      const user = { name, email: '', admin, password }
      const badFn = async () => createUserService.execute(user)

      expect(badFn()).to.rejectedWith(Error)
    })

    it('espera lancar erro por user ja existente', async () => {
      const createUserService = new CreateUserService()
      const [user] = await seedUsers()
      const badFn = async () => createUserService.execute(user)

      expect(badFn()).to.rejectedWith(Error)
    })
  })
})
