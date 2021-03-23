/// <reference types="Cypress" />

describe('Create users sucess', () => {
  afterEach(() => {
      cy.deleteProject()
  })
  beforeEach(() => {
      cy.createProject()    
  })
  
  it('Should Create User',() => {
    let metodo = 'POST'
    let url = '/api/rest/users/'
    cy.createUsers(metodo, url)
    .then(response => {
      expect(response.status).to.equal(201)
      console.log(response.body)
      expect(response.body.user.email).to.match(/^[^\s@]+@[^\s@]+$/)
    
  })
      })
})