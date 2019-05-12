import { promises as fs } from 'fs'
import path from 'path'

export default async function () {
  return (await fs.readFile(path.join(__dirname, '..', 'graphql', 'schema.graphql'))).toString('utf-8')
}
