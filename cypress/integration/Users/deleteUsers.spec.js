/// <reference types="Cypress" />

afterEach(() => {
  cy.deleteUsers()
})
describe('Delete users testing', () => {
  it('Should delete user sucess', () => {
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
  it('Should delete user especific ID', () => {
    let id = 99
    cy.DeleteUsersCreated(id)
      .then(response => {
        expect(response.status).to.equal(204)
      })
  })
  it('Should delete user administrator ', () => {
    let id = 1
    cy.DeleteUsersCreated(id)
      .then(response => {
        expect(response.status).to.equal(400)
        expect(response.body.message).to.equal('Deleting last administrator not allowed')
      })
  })
})