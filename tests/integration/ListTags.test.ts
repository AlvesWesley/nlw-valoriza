import chai, { expect } from 'chai'
import chaiHTTP from 'chai-http'

import { getApplication } from '../helpers/utils/app'
import { connectInDatabase, clearDatabase } from '../helpers/seeders/database'
import { seedTags } from '../helpers/seeders/tag'
import * as stubJwt from '../helpers/stubs/jwt'

chai.use(chaiHTTP)

describe('List Tags', function () {
  const url = '/tags'

  before(async () => {
    await connectInDatabase()
  })

  beforeEach(async () => {
    await clearDatabase()
  })

  describe('resposta bem sucedida (200)', function () {
    it('espera retornar um response com um array de tag', async () => {
      const app = await getApplication()
      const tags = await seedTags()
      stubJwt.stubJwtVerify({ sub: '' })
      const response = await chai
        .request(app)
        .get(url)
        .set('Authorization', 'Bearer FAKE_TOKEN')
      stubJwt.restoreJwt()

      expect(response.status).to.be.equal(200)
      expect(response.body).to.be.eql(
        tags.map(tag => {
          return {
            ...tag,
            nameCustom: `#${tag.name}`,
            createdAt: tag.createdAt.toISOString(),
            updatedAt: tag.updatedAt.toISOString()
          }
        })
      )
    })
  })

  describe('resposta mal sucedida (401)', function () {
    it('espera retornar um response de erro por nao estar autenticado', async () => {
      const app = await getApplication()
      const response = await chai
        .request(app)
        .get(url)
        .set('Authorization', 'Bearer FAKE_TOKEN')

      expect(response.status).to.be.equal(401)
      expect(response.body).to.be.eql({
        error: 'Unauthenticated'
      })
    })
  })
})
