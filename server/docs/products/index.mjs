import getAll from './getAll.mjs'
import schema from './_model.mjs'

export default {
  paths: {
    '/products': {
      ...getAll,
    },
  },
  schema: {
    ...schema,
  },
}
