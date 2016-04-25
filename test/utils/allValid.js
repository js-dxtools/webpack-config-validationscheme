import Joi from 'Joi'

/**
 * For all supplied configs (array of objects), check that they are valid given a schema.
 */
export default (configs, schema) => {
  configs.forEach((validConfig, n) => {
    it(`valid #${n} should be valid`, () => {
      Joi.assert(validConfig, schema)
    })
  })
}
