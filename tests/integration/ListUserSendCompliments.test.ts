import chai, { expect } from 'chai'
import chaiHTTP from 'chai-http'

import { getApplication } from '../helpers/utils/app'
import { connectInDatabase, clearDatabase } from '../helpers/seeders/database'
import { seedUsers } from '../helpers/seeders/user'
import { seedTags } from '../helpers/seeders/tag'
import { seedCompliments } from '../helpers/seeders/compliment'
import * as stubJwt from '../helpers/stubs/jwt'

chai.use(chaiHTTP)

describe('List User Send Compliements', function () {
  const url = '/users/compliments/send'

  before(async () => {
    await connectInDatabase()
  })

  beforeEach(async () => {
    await clearDatabase()
  })

  describe('resposta bem sucedida (200)', function () {
    it('espera retornar um response com um array de compliment', async () => {
      const app = await getApplication()
      const [userSender, userReceiver] = await seedUsers()
      const [tag] = await seedTags()
      const compliments = await seedCompliments({
        tagId: tag.id,
        userSenderId: userSender.id,
        userReceiverId: userReceiver.id
      })
      stubJwt.stubJwtVerify({ sub: userSender.id })
      const response = await chai
        .request(app)
        .get(url)
        .set('Authorization', 'Bearer FAKE_TOKEN')
      stubJwt.restoreJwt()

      expect(response.status).to.be.equal(200)
      expect(response.body).to.be.eql(
        compliments
          .filter(compliment => {
            return compliment.userSenderId === userSender.id
          })
          .map(compliment => {
            return {
              ...compliment,
              createdAt: compliment.createdAt.toISOString(),
              userSender: {
                ...userSender,
                createdAt: userSender.createdAt.toISOString(),
                updatedAt: userSender.updatedAt.toISOString()
              },
              userReceiver: {
                ...userReceiver,
                createdAt: userReceiver.createdAt.toISOString(),
                updatedAt: userReceiver.updatedAt.toISOString()
              },
              tag: {
                ...tag,
                createdAt: tag.createdAt.toISOString(),
                updatedAt: tag.updatedAt.toISOString()
              }
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
