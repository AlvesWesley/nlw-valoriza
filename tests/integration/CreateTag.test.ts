import chai, { expect } from 'chai'
import chaiHTTP from 'chai-http'

import { getApplication } from '../helpers/utils/app'
import { connectInDatabase, clearDatabase } from '../helpers/seeders/database'
import { seedUsers } from '../helpers/seeders/user'
import { tagsData } from '../helpers/data/tag'
import * as stubJwt from '../helpers/stubs/jwt'

chai.use(chaiHTTP)

describe('Create Tag', function () {
  const url = '/tags'

  before(async () => {
    await connectInDatabase()
  })

  beforeEach(async () => {
    await clearDatabase()
  })

  describe('resposta bem sucedida (201)', function () {
    it('espera registrar um user retornar um response com os dados da tag', async () => {
      const app = await getApplication()
      const [user] = await seedUsers()
      const [tag] = tagsData
      stubJwt.stubJwtVerify({ sub: user.id })
      const response = await chai
        .request(app)
        .post(url)
        .send(tag)
        .set('Authorization', 'Bearer FAKE_TOKEN')
      stubJwt.restoreJwt()

      expect(response.status).to.be.equal(201)
      expect(response.body).to.deep.include(tag)
    })
  })

  describe('resposta mal sucedida (401)', function () {
    it('espera retornar um response de erro por nao estar autenticado', async () => {
      const app = await getApplication()
      const [tag] = tagsData
      const response = await chai
        .request(app)
        .post(url)
        .send(tag)
        .set('Authorization', 'Bearer FAKE_TOKEN')

      expect(response.status).to.be.equal(401)
      expect(response.body).to.be.eql({
        error: 'Unauthenticated'
      })
    })
  })

  describe('resposta mal sucedida (403)', function () {
    it('espera retornar um response de erro por user nao ser admin', async () => {
      const app = await getApplication()
      const [, user] = await seedUsers()
      const [tag] = tagsData
      stubJwt.stubJwtVerify({ sub: user.id })
      const response = await chai
        .request(app)
        .post(url)
        .send(tag)
        .set('Authorization', 'Bearer FAKE_TOKEN')
      stubJwt.restoreJwt()

      expect(response.status).to.be.equal(403)
      expect(response.body).to.be.eql({
        error: 'Unauthorized'
      })
    })
  })
})
