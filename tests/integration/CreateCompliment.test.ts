import chai, { expect } from 'chai'
import chaiHTTP from 'chai-http'

import { getApplication } from '../helpers/utils/app'
import { connectInDatabase, clearDatabase } from '../helpers/seeders/database'
import { seedUsers } from '../helpers/seeders/user'
import { seedTags } from '../helpers/seeders/tag'
import * as stubJwt from '../helpers/stubs/jwt'
import * as stubMailer from '../helpers/stubs/mailer'

chai.use(chaiHTTP)

describe('Create Compliment', function () {
  const url = '/compliments'

  before(async () => {
    await connectInDatabase()
    stubMailer.stubSendEmail(true)
  })

  beforeEach(async () => {
    await clearDatabase()
  })

  after(() => {
    stubMailer.restoreMailer()
  })

  describe('resposta bem sucedida (201)', function () {
    it('espera registrar um user retornar um response com os dados do compliment', async () => {
      const app = await getApplication()
      const [userSender, userReceiver] = await seedUsers()
      const [tag] = await seedTags()
      const compliment = {
        message: 'Obrigado',
        userSenderId: userSender.id,
        userReceiverId: userReceiver.id,
        tagId: tag.id
      }
      stubJwt.stubJwtVerify({ sub: userSender.id })
      const response = await chai
        .request(app)
        .post(url)
        .send(compliment)
        .set('Authorization', 'Bearer FAKE_TOKEN')
      stubJwt.restoreJwt()

      expect(response.status).to.be.equal(201)
      expect(response.body).to.deep.include(compliment)
    })
  })

  describe('resposta mal sucedida (401)', function () {
    it('espera retornar um response de erro por nao estar autenticado', async () => {
      const app = await getApplication()
      const compliment = {
        message: 'Obrigado',
        userSenderId: '45b3d6ab-7327-4332-9e6c-8497367a176a',
        userReceiverId: '6e29947c-31e2-4530-ab9b-e1a2e52bd0a9',
        tagId: 'a0677868-a9a7-4137-bfcd-08e1ce408d56'
      }
      const response = await chai
        .request(app)
        .post(url)
        .send(compliment)
        .set('Authorization', 'Bearer FAKE_TOKEN')

      expect(response.status).to.be.equal(401)
      expect(response.body).to.be.eql({
        error: 'Unauthenticated'
      })
    })
  })
})
