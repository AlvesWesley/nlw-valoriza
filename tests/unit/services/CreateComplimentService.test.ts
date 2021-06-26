import chai, { expect } from 'chai'
import chaiPromised from 'chai-as-promised'

import { CreateComplimentService } from '../../../src/services/CreateComplimentService'

import {
  connectInDatabase,
  clearDatabase
} from '../../helpers/seeders/database'
import { seedUsers } from '../../helpers/seeders/user'
import { seedTags } from '../../helpers/seeders/tag'
import { complimentsData } from '../../helpers/data/compliment'

chai.use(chaiPromised)

describe('CreateComplimentService', function () {
  before(async () => {
    await connectInDatabase()
  })

  beforeEach(async () => {
    await clearDatabase()
  })

  describe('execute', function () {
    it('espera registrar e retornar um objeto de compliment', async () => {
      const createComplimentService = new CreateComplimentService()
      const [userSender, userReceiver] = await seedUsers()
      const [tag] = await seedTags()
      const [{ message }] = complimentsData
      const compliment = {
        message,
        userSenderId: userSender.id,
        userReceiverId: userReceiver.id,
        tagId: tag.id
      }
      const result = await createComplimentService.execute(compliment)

      expect(result).to.deep.include(compliment)
    })

    it('espera lancar erro por user sender igual ao user receiver', async () => {
      const createComplimentService = new CreateComplimentService()
      const [user] = await seedUsers()
      const [tag] = await seedTags()
      const [{ message }] = complimentsData
      const compliment = {
        message,
        userSenderId: user.id,
        userReceiverId: user.id,
        tagId: tag.id
      }
      const badFn = async () => createComplimentService.execute(compliment)

      expect(badFn()).to.rejectedWith(Error)
    })

    it('espera lancar erro por user receiver inexistente', async () => {
      const createComplimentService = new CreateComplimentService()
      const [user] = await seedUsers()
      const [tag] = await seedTags()
      const [{ message }] = complimentsData
      const compliment = {
        message,
        userSenderId: user.id,
        userReceiverId: '6d349d78-514e-4567-8c63-47d91d5e671e',
        tagId: tag.id
      }
      const badFn = async () => createComplimentService.execute(compliment)

      expect(badFn()).to.rejectedWith(Error)
    })
  })
})
