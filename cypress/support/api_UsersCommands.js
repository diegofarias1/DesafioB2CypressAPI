/// <reference types="Cypress" />
const faker = require('faker')

Cypress.Commands.add('createUsers', (metodo, url) => {
  let token = Cypress.config('token')
  cy.api({
    method: metodo, //or POST
    url: url,
    headers:{
     "Authorization": token},
     body: {
      "username": "diego" + faker.random.number(),
      "password": "123456",
      "real_name": "Diego Farias",
      "email": "diego" + faker.random.number() +"@base.com.br",
      "access_level": { "name": "updater" },
      "enabled": true,
      "protected": false
    } 
   })
})