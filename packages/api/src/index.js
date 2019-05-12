import { ApolloServer } from 'apollo-server'
import resolvers from './resolvers'
import Db from './db'
import typeDefs from './typeDefs'

async function run () {
  const db = new Db()
  const server = new ApolloServer({
    introspection: true,
    typeDefs: await typeDefs(),
    resolvers,
    context: {db}
  })
  const {url} = await server.listen()
  console.log(`🚀 Server ready at ${url}`)
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
