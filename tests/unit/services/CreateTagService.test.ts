import chai, { expect } from 'chai'
import chaiPromised from 'chai-as-promised'

import { CreateTagService } from '../../../src/services/CreateTagService'

import {
  connectInDatabase,
  clearDatabase
} from '../../helpers/seeders/database'
import { seedTags } from '../../helpers/seeders/tag'
import { tagsData } from '../../helpers/data/tag'

chai.use(chaiPromised)

describe('CreateTagService', function () {
  before(async () => {
    await connectInDatabase()
  })

  beforeEach(async () => {
    await clearDatabase()
  })

  describe('execute', function () {
    it('espera retornar um token do tipo string', async () => {
      const createTagService = new CreateTagService()
      const [tag] = tagsData
      const result = await createTagService.execute(tag)

      expect(result).to.deep.include(tag)
    })

    it('espera lancar erro por name ausente', async () => {
      const createTagService = new CreateTagService()
      const tag = {}
      const badFn = async () => createTagService.execute(tag)

      expect(badFn()).to.rejectedWith(Error)
    })

    it('espera lancar erro por tag ja existente', async () => {
      const createTagService = new CreateTagService()
      const [tag] = await seedTags()
      const badFn = async () => createTagService.execute({ name: tag.name })

      expect(badFn()).to.rejectedWith(Error)
    })
  })
})
