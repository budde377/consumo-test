import data from '../data/dump'

export default class Db {

  _data = data

  listCompanies ({after, size, name, speciality}) {
    const namePattern = name && new RegExp(name, 'i')
    const nameFilter = namePattern ? (company) => namePattern.exec(company.name) : () => true
    const specialitySet = speciality && speciality.length ? new Set(speciality) : null
    const specialityFilter = specialitySet ? (company) => specialitySet.has(company.speciality) : () => true
    const filter = company => nameFilter(company) && specialityFilter(company)
    const filteredData = this._data.filter(filter)
    const afterData = after ? filteredData.slice(filteredData.findIndex(({id}) => id === after) + 1) : filteredData
    const companies = afterData.slice(0, size)
    return {companies, hasNextPage: companies.length < afterData.length, totalCount: filteredData.length}
  }

}
