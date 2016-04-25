import configs from '../test/passing-configs'
import Joi from 'joi'
import schema from './'

describe('.', () => {
  configs.forEach(({ config, name }) => {
    it(`validates ${name}`, () => {
      Joi.assert(config, schema)
    })
  })
})
