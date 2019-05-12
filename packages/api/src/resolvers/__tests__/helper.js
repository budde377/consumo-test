import { execute } from 'graphql'
import loadTypeDefs from '../../typeDefs'
import { makeExecutableSchema } from 'graphql-tools'
import resolvers from '../'

async function loadSchema () {
  const typeDefs = await loadTypeDefs()
  return makeExecutableSchema({typeDefs, resolvers})
}

export class Runner {
  _schemaP
  _context

  constructor (context) {
    this._context = context
    this._schemaP = loadSchema()
  }

  async run (document, variableValues) {
    const schema = await this._schemaP
    return execute({
      schema, document, contextValue: this._context, variableValues
    })
  }
}
