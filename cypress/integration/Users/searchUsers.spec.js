/// <reference types="Cypress" />

describe('Search users testing', () => {
  it('Should search user existed', () => {
    let metodo = 'GET'
    let url = '/api/rest/users/me'
    cy.SearchExitedUser(metodo, url)
      .then(response => {
        expect(response.status).to.equal(200)
        expect(response.body.id).to.equal(1)
        expect(response.body.email).to.equal('root@localhost')
      })
  })
  it('Should check user administrator state', () => {
    let metodo = 'GET'
    let url = '/api/rest/users/me'
    cy.SearchExitedUser(metodo, url)
      .then(response => {
        expect(response.status).to.equal(200)
        expect(response.body.access_level.label).to.equal('administrator')

      })
  })
})