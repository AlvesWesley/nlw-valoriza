import chai, { expect } from 'chai'
import chaiHTTP from 'chai-http'

import { getApplication } from '../helpers/utils/app'
import { connectInDatabase, clearDatabase } from '../helpers/seeders/database'
import { defaultPassword, seedUsers } from '../helpers/seeders/user'
import * as stubJwt from '../helpers/stubs/jwt'

chai.use(chaiHTTP)

describe('Authenticate User', function () {
  const url = '/login'

  before(async () => {
    await connectInDatabase()
  })

  beforeEach(async () => {
    await clearDatabase()
  })

  describe('resposta bem sucedida (200)', function () {
    it('espera retornar um response com um token', async () => {
      const app = await getApplication()
      const [user] = await seedUsers()
      const data = { email: user.email, password: defaultPassword }
      stubJwt.stubJwtSign('FAKE_TOKEN')
      const response = await chai.request(app).post(url).send(data)
      stubJwt.restoreJwt()

      expect(response.status).to.be.equal(200)
      expect(response.body).to.be.eql({
        token: 'FAKE_TOKEN'
      })
    })
  })

  describe('resposta mal sucedida (401)', function () {
    it('espera retornar um response de erro por email/senha incorretos', async () => {
      const app = await getApplication()
      const data = { email: 'johndoe@example.com', password: 'wrong_password' }
      const response = await chai.request(app).post(url).send(data)

      expect(response.status).to.be.equal(401)
      expect(response.body).to.be.eql({
        error: 'Email/Password incorrect'
      })
    })
  })
})
