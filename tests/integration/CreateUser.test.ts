import chai, { expect } from 'chai'
import chaiHTTP from 'chai-http'

import { getApplication } from '../helpers/utils/app'
import { connectInDatabase, clearDatabase } from '../helpers/seeders/database'
import { seedUsers } from '../helpers/seeders/user'
import { usersData } from '../helpers/data/user'
import * as stubJwt from '../helpers/stubs/jwt'

chai.use(chaiHTTP)

describe('Create User', function () {
  const url = '/users'

  before(async () => {
    await connectInDatabase()
  })

  beforeEach(async () => {
    await clearDatabase()
  })

  describe('resposta bem sucedida (201)', function () {
    it('espera registrar um user retornar um response com os dados do user', async () => {
      const app = await getApplication()
      const [user] = await seedUsers()
      const { name, email, admin, password } = usersData[0]
      stubJwt.stubJwtVerify({ sub: user.id })
      const response = await chai
        .request(app)
        .post(url)
        .send({ name, email, admin, password })
        .set('Authorization', 'Bearer FAKE_TOKEN')
      stubJwt.restoreJwt()

      expect(response.status).to.be.equal(201)
      expect(response.body).to.deep.include({ name, email, admin })
    })
  })

  describe('resposta mal sucedida (401)', function () {
    it('espera retornar um response de erro por nao estar autenticado', async () => {
      const app = await getApplication()
      const [data] = usersData
      const response = await chai
        .request(app)
        .post(url)
        .send(data)
        .set('Authorization', 'Bearer FAKE_TOKEN')

      expect(response.status).to.be.equal(401)
      expect(response.body).to.be.eql({
        error: 'Unauthenticated'
      })
    })
  })
})
