/// <reference types="Cypress" />
const faker = require('faker')

afterEach(() => {
  cy.deleteUsers()
})
describe('Users', () => {
  it('Search User Existed', () => {
    let metodo = 'GET'
    let url = '/api/rest/users/me'
    cy.SearchExitedUser(metodo, url)
      .then(response => {
        expect(response.status).to.equal(200)
        expect(response.body.id).to.equal(1)
        expect(response.body.email).to.equal('root@localhost')
      })
  })
})

