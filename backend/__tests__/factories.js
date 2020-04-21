const faker = require('faker');
const knex = require('../src/database/connection');
const factory = require('knex-factory')(knex);

factory.define('ong', 'ongs', {
  name: faker.company.companyName(),
  email: faker.internet.email(),
  whatsapp: faker.phone.phoneNumber('###########'),
  city: faker.address.city(),
  uf: faker.address.stateAbbr()
});

module.exports = factory;
