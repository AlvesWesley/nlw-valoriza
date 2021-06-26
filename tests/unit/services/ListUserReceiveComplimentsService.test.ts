import chai, { expect } from 'chai'
import chaiPromised from 'chai-as-promised'

import { ListUserReceiveComplimentsService } from '../../../src/services/ListUserReceiveComplimentsService'

import {
  connectInDatabase,
  clearDatabase
} from '../../helpers/seeders/database'
import { seedUsers } from '../../helpers/seeders/user'
import { seedTags } from '../../helpers/seeders/tag'
import { seedCompliments } from '../../helpers/seeders/compliment'

chai.use(chaiPromised)

describe('ListUserReceiveComplimentsService', function () {
  before(async () => {
    await connectInDatabase()
  })

  beforeEach(async () => {
    await clearDatabase()
  })

  describe('execute', function () {
    it('espera retornar um array de compliments', async () => {
      const listUserReceiveComplimentsService =
        new ListUserReceiveComplimentsService()
      const [userSender, userReceiver] = await seedUsers()
      const [tag] = await seedTags()
      const compliments = await seedCompliments({
        tagId: tag.id,
        userSenderId: userSender.id,
        userReceiverId: userReceiver.id
      })
      const result = await listUserReceiveComplimentsService.execute(
        userReceiver.id
      )

      expect(result).to.be.eql(
        compliments
          .filter(compliments => {
            return compliments.userReceiverId === userReceiver.id
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
