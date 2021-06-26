import chai, { expect } from 'chai'
import chaiPromised from 'chai-as-promised'

import { AuthenticateUserService } from '../../../src/services/AuthenticateUserService'

import {
  connectInDatabase,
  clearDatabase
} from '../../helpers/seeders/database'
import { seedUsers, defaultPassword } from '../../helpers/seeders/user'
import { usersData } from '../../helpers/data/user'
import * as jwtStub from '../../helpers/stubs/jwt'

chai.use(chaiPromised)

describe('AuthenticateUserService', function () {
  before(async () => {
    await connectInDatabase()
  })

  beforeEach(async () => {
    await clearDatabase()
  })

  describe('execute', function () {
    it('espera retornar um token do tipo string', async () => {
      const authenticateUserService = new AuthenticateUserService()
      const [user] = await seedUsers()
      jwtStub.stubJwtSign('FAKE_TOKEN')
      const result = await authenticateUserService.execute({
        email: user.email,
        password: defaultPassword
      })
      jwtStub.restoreJwt()

      expect(result).to.be.equal('FAKE_TOKEN')
    })

    it('espera lancar erro por user nao encontrado', async () => {
      const authenticateUserService = new AuthenticateUserService()
      const [user] = usersData
      const badFn = async () =>
        authenticateUserService.execute({
          email: user.email,
          password: user.password
        })

      expect(badFn()).to.rejectedWith(Error)
    })

    it('espera lancar erro por password incorreta', async () => {
      const authenticateUserService = new AuthenticateUserService()
      const [user] = await seedUsers()
      const badFn = async () =>
        authenticateUserService.execute({
          email: user.email,
          password: defaultPassword
        })

      expect(badFn()).to.rejectedWith(Error)
    })
  })
})
