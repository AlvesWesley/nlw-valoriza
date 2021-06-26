import chai, { expect } from 'chai'
import chaiPromised from 'chai-as-promised'

import { ListTagsService } from '../../../src/services/ListTagsService'

import {
  connectInDatabase,
  clearDatabase
} from '../../helpers/seeders/database'
import { seedTags } from '../../helpers/seeders/tag'

chai.use(chaiPromised)

describe('ListTagsService', function () {
  before(async () => {
    await connectInDatabase()
  })

  beforeEach(async () => {
    await clearDatabase()
  })

  describe('execute', function () {
    it('espera retornar um array de tag', async () => {
      const listTagsService = new ListTagsService()
      const tags = await seedTags()
      const result = await listTagsService.execute()

      expect(result).to.be.eql(
        tags.map(tag => {
          return {
            ...tag,
            nameCustom: `#${tag.name}`
          }
        })
      )
    })
  })
})
