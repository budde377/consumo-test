#!/usr/bin/env node
const fs = require('fs').promises
const faker = require('faker')

const specialities = [
  'EXCAVATION',
  'PLUMBING',
  'ELECTRICAL'
]

function generateCompany () {
  return {
    id: faker.random.uuid(),
    name: faker.company.companyName(),
    speciality: specialities[Math.floor(Math.random() * specialities.length)],
    city: faker.address.city(),

  }
}

function* generateCompanies (n) {
  for (let i = 0; i < n; i++) {
    yield generateCompany()
  }
}

async function writeCompanies (n) {
  await fs.writeFile('./dump.json', JSON.stringify(Array.from(generateCompanies(n))))
}

writeCompanies(10000).catch(err => {
  console.error(err)
  process.exit(1)
})
