const { factory } = require('factory-girl');
const faker = require('faker');
const { User } = require('../../backend/models');


factory.define('User', User, {
    name: faker.name.findName(),
    email: faker.internet.email(),
    departament: faker.name.findName(),
    role: 'user',
    password: faker.internet.password()
})

module.exports = factory;