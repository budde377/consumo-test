export default {
  listCompanies (source, {first, after, filter}, context) {
    const {companies, totalCount, hasNextPage} = context.db.listCompanies({size: first, after, ...(filter || {})})
    return {
      edges: companies.map(node => ({node, cursor: node.id})),
      pageInfo: {totalCount, hasNextPage, hasPreviousPage: false}
    }
  }
}
