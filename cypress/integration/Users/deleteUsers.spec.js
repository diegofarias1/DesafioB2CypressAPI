/// <reference types="Cypress" />
const faker = require('faker')

afterEach(() => {
  cy.deleteUsers()
})
describe('Users', () => {
  it('Delete user', () => {
    let id = null
    let metodo = 'POST'
    let url = '/api/rest/users/'
    cy.createUsers(metodo, url,)
      .then(res => {
        id = res.body.user.id
        cy.DeleteUsersCreated(id)
          .then(response => {
            expect(response.status).to.equal(204)
          })
      })
  })
})

