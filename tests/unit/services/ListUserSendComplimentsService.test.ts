import chai, { expect } from 'chai'
import chaiPromised from 'chai-as-promised'

import { ListUserSendComplimentsService } from '../../../src/services/ListUserSendComplimentsService'

import {
  connectInDatabase,
  clearDatabase
} from '../../helpers/seeders/database'
import { seedUsers } from '../../helpers/seeders/user'
import { seedTags } from '../../helpers/seeders/tag'
import { seedCompliments } from '../../helpers/seeders/compliment'

chai.use(chaiPromised)

describe('ListUserSendComplimentsService', function () {
  before(async () => {
    await connectInDatabase()
  })

  beforeEach(async () => {
    await clearDatabase()
  })

  describe('execute', function () {
    it('espera retornar um array de compliments', async () => {
      const listUserSendComplimentsService =
        new ListUserSendComplimentsService()
      const [userSender, userReceiver] = await seedUsers()
      const [tag] = await seedTags()
      const compliments = await seedCompliments({
        tagId: tag.id,
        userSenderId: userSender.id,
        userReceiverId: userReceiver.id
      })
      const result = await listUserSendComplimentsService.execute(userSender.id)

      expect(result).to.be.eql(
        compliments
          .filter(compliments => {
            return compliments.userSenderId === userSender.id
          })
          .map(compliments => {
            return {
              ...compliments,
              userSender,
              userReceiver,
              tag
            }
          })
      )
    })
  })
})
