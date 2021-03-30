///<reference types="Cypress"/>

describe('Delete Issues testing', () => {
  before(() => {
    cy.createProject()
  })
  after(() => {
    cy.deleteProject()
  })
  it('Should delete Issue with especific ID', () => {
    let summary = 'sumario'
    let description = 'descricao'
    let categoryname = 'backend'
    let projectname = 'Base10'
    let metodo = 'POST'
    let url = '/api/rest/issues/'
    cy.CriarIssueminimal(metodo, url, summary, description, categoryname, projectname)
      .then(response => {
        let idissue = response.body.issue.id
        let metodo = 'DELETE'
        let url = '/api/rest/issues/'
        cy.deleteIssueID(idissue, metodo, url)
          .then(response => {
            expect(response.status).to.equal(204)
          })
      })
  })
  it('Should delete issue with incorrect ID', () => {
    let summary = 'sumario'
    let description = 'descricao'
    let categoryname = 'backend'
    let projectname = 'Base10'
    let metodo = 'POST'
    let url = '/api/rest/issues/'
    cy.CriarIssueminimal(metodo, url, summary, description, categoryname, projectname)
      .then(response => {
        let idissue = 101
        let metodo = 'DELETE'
        let url = '/api/rest/issues/'
        cy.deleteIssueID(idissue, metodo, url)
          .then(response => {
            expect(response.status).to.equal(404)
            expect(response.body.message).to.equal("Issue #101 not found")
          })
      })
  })
})