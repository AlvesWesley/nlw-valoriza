import chai, { expect } from 'chai'
import chaiHTTP from 'chai-http'

import { getApplication } from '../helpers/utils/app'
import { connectInDatabase, clearDatabase } from '../helpers/seeders/database'
import { seedUsers } from '../helpers/seeders/user'
import * as stubJwt from '../helpers/stubs/jwt'

chai.use(chaiHTTP)

describe('List Users', function () {
  const url = '/users'

  before(async () => {
    await connectInDatabase()
  })

  beforeEach(async () => {
    await clearDatabase()
  })

  describe('resposta bem sucedida (200)', function () {
    it('espera retornar um response com um array de user', async () => {
      const app = await getApplication()
      const users = await seedUsers()
      stubJwt.stubJwtVerify({ sub: users[0].id })
      const response = await chai
        .request(app)
        .get(url)
        .set('Authorization', 'Bearer FAKE_TOKEN')
      stubJwt.restoreJwt()

      expect(response.status).to.be.equal(200)
      expect(response.body).to.be.eql(
        users.map(user => {
          const { id, name, email, admin, createdAt, updatedAt } = user
          return {
            id,
            name,
            email,
            admin,
            createdAt: createdAt.toISOString(),
            updatedAt: updatedAt.toISOString()
          }
        })
      )
    })
  })
})
