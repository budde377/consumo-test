import { Runner } from './helper'
import Db from '../../db'
import gql from 'graphql-tag'

function companyMapper ({name, city, speciality, id}) {
  return {
    node: {
      name, city, speciality, id,
      logo: {
        width: 512,
        height: 512,
        url: `https://api.adorable.io/avatars/512/${encodeURIComponent(id)}.png`
      }
    }, cursor: id
  }
}

describe('Query', () => {
  const QUERY = gql`
    query ($size: Int $after: Cursor $filter: CompanyFilter){
      listCompanies(first: $size after: $after filter: $filter) {
        edges {
          cursor
          node {
            id
            name
            city
            speciality
            logo { width height url }
          }
        }
        pageInfo { hasNextPage hasPreviousPage totalCount }
      }
    }
  `
  let runner, db
  beforeAll(() => {
    db = new Db()
    runner = new Runner({db})
  })

  it('should retrieve companies', async () => {
    expect(await runner.run(QUERY)).toEqual({
      data: {
        listCompanies: {
          edges: db.listCompanies({size: 10}).companies.map(companyMapper),
          pageInfo: {hasNextPage: true, hasPreviousPage: false, totalCount: 10000}
        }
      }
    })
  })
  it('should retrieve 11 companies', async () => {
    expect(await runner.run(QUERY, {size: 11})).toEqual({
      data: {
        listCompanies: {
          edges: db.listCompanies({size: 11}).companies.map(companyMapper),
          pageInfo: {hasNextPage: true, hasPreviousPage: false, totalCount: 10000}
        }
      }
    })
  })
  it('should paginate', async () => {
    const {companies} = db.listCompanies({size: 100})
    expect(await runner.run(QUERY, {size: 10, after: companies[9].id})).toEqual({
      data: {
        listCompanies: {
          edges: companies.slice(10, 20).map(companyMapper),
          pageInfo: {hasNextPage: true, hasPreviousPage: false, totalCount: 10000}
        }
      }
    })
  })
  it('should update nextPage', async () => {
    const {companies} = db.listCompanies({size: 10000})
    expect(await runner.run(QUERY, {size: 10, after: companies[companies.length - 2].id})).toEqual({
      data: {
        listCompanies: {
          edges: companies.slice(10000 - 1).map(companyMapper),
          pageInfo: {hasNextPage: false, hasPreviousPage: false, totalCount: 10000}
        }
      }
    })
  })
  it('should filter on name', async () => {
    const {companies} = db.listCompanies({size: 10})
    const res = await runner.run(QUERY, {filter: {name: companies[0].name}})
    expect(res.data.listCompanies.pageInfo.totalCount).toBeLessThan(10000)
    expect(res.data.listCompanies.pageInfo.hasNextPage).toBeFalsy()
    expect(res.data.listCompanies.edges.map(edge => edge.cursor)).toContain(companies[0].id)
  })
  it('should filter on specialty', async () => {
    const {companies} = db.listCompanies({size: 1})
    const res = await runner.run(QUERY, {size: 5000, filter: {speciality: companies[0].speciality}})
    expect(res.data.listCompanies.pageInfo.totalCount).toBeLessThan(10000)
    expect(res.data.listCompanies.pageInfo.hasNextPage).toBeFalsy()
    expect(res.data.listCompanies.edges.map(edge => edge.cursor)).toContain(companies[0].id)
  })
  it('should filter on more specialities', async () => {
    const {companies} = db.listCompanies({size: 1})
    const res = await runner.run(QUERY, {size: 10, filter: {speciality: ['EXCAVATION', 'ELECTRICAL']}})
    expect(res.data.listCompanies.pageInfo.totalCount).toBeLessThan(10000)
  })
})
