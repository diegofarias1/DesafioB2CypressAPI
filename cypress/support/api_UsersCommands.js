/// <reference types="Cypress" />
const faker = require('faker')

Cypress.Commands.add('createUsers', (metodo, url) => {
  let token = Cypress.config('token')
  cy.api({
    method: metodo, //or POST
    url: url,
    headers: {
      "Authorization": token
    },
    body: {
      "username": "diego" + faker.random.number(),
      "password": "123456",
      "real_name": "Diego Farias",
      "email": "diego" + faker.random.number() + "@base.com.br",
      "access_level": { "name": "updater" },
      "enabled": true,
      "protected": false
    }
  })
})
Cypress.Commands.add('createUsersNameDuplicated', (metodo, url) => {
  let token = Cypress.config('token')
  cy.api({
    method: metodo, //or POST
    url: url,
    headers: {
      "Authorization": token
    },
    failOnStatusCode: false,
    body: {
      "username": "administrator",
      "password": "123456",
      "real_name": "Diego Farias",
      "email": "teste" + faker.random.number() + "@base.com.br",
      "access_level": { "name": "updater" },
      "enabled": true,
      "protected": false
    }
  })
})
Cypress.Commands.add('createUsersEmailDuplicated', (metodo, url) => {
  let token = Cypress.config('token')
  cy.api({
    method: metodo, //or POST
    url: url,
    headers: {
      "Authorization": token
    },
    failOnStatusCode: false,
    body: {
      "username": "usuario" + faker.random.number(),
      "password": "123456",
      "real_name": "Diego Farias",
      "email": "root@localhost",
      "access_level": { "name": "updater" },
      "enabled": true,
      "protected": false
    }
  })
})
Cypress.Commands.add('SearchExitedUser', (metodo, url) => {
  let token = Cypress.config('token')
  cy.api({
    method: metodo,
    url: url,
    headers: {
      "Authorization": token
    },
  })
})
Cypress.Commands.add('createUserWithNoNameRequired', (metodo, url) => {
  let token = Cypress.config('token')
  cy.api({
    method: metodo, //or POST
    url: url,
    headers: {
      "Authorization": token
    },
    failOnStatusCode: false,
    body: {
      "username": "",
      "password": "123456",
      "real_name": "Teste",
      "email": "email" + faker.random.number() + "@base.com.br",
      "access_level": { "name": "updater" },
      "enabled": true,
      "protected": false
    }
  })
})
Cypress.Commands.add('createUsersPerfil', (metodo, url, acess_level,) => {
  let token = Cypress.config('token')
  cy.api({
    method: metodo, //or POST
    url: url,
    headers: {
      "Authorization": token
    },
    body: {
      "username": "diego" + faker.random.number(),
      "password": "123456",
      "real_name": "Diego Farias",
      "email": "diego" + faker.random.number() + "@base.com.br",
      "access_level": acess_level,
      "enabled": true,
      "protected": false
    }
  })
})
Cypress.Commands.add('createUserReuseJsonBody', (metodo, url, username, password, real_name, email, acess_level, enabled, protecteduser, header) => {
  cy.api({
    method: metodo,
    url: url,
    headers: header,
    body: {
      "username": username,
      "password": password,
      "real_name": real_name,
      "email": email,
      "access_level": { "name": acess_level },
      "enabled": enabled,
      "protected": protecteduser
    }
  })
})
Cypress.Commands.add('DeleteUsersCreated', (id) => {
  let token = Cypress.config('token')
  cy.api({
    method: 'DELETE',
    url: '/api/rest/users/' + id,
    headers: {
      "Authorization": token
    },
  })
})