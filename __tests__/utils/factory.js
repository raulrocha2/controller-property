const { factory } = require('factory-girl');
const faker = require('faker');
const { User, Local } = require('../../backend/models');


factory.define('User', User, {
    name: faker.name.findName(),
    email: faker.internet.email(),
    departament: faker.name.findName(),
    role: 'user',
    password: faker.internet.password()
})

factory.define('Local', Local, {
    contract: faker.name.findName(),
    cust_of_center: faker.datatype.number(),
    city: faker.address.city(),
    state: faker.address.city(),
    country: faker.address.country(),
    is_active: true
})

module.exports = factory;