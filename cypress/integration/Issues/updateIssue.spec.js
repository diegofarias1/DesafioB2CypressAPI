///<reference types="Cypress"/>

before(() => {
  cy.createProject()
})
after(() => {
  cy.deleteProject()
})
describe('Update issues testing', () => {
  it('Should update issue with especific id', () => {
    let summary = 'sumario'
    let description = 'descricao'
    let categoryname = 'backend'
    let projectname = 'Base10'
    let metodo = 'POST'
    let url = '/api/rest/issues/'
    cy.CriarIssueminimal(metodo, url, summary, description, categoryname, projectname)
      .then(response => {
        let issueid = response.body.issue.id
        let metodo = 'PATCH'
        let url = '/api/rest/issues/'
        let hadlername = 'Novo'
        let statusname = 'assigned'
        cy.updateIssue(issueid, metodo, url, hadlername, statusname)
          .then(response => {
            expect(response.status).to.equal(200)
            expect(response.body.issues[0].status.name).to.equal('assigned')
            expect(response.body.issues[0].history[1].old_value.name).to.equal("new")
            expect(response.body.issues[0].history[1].new_value.name).to.equal("assigned")
          })
      })
  })
  it('Should update issue with inexist id', () => {
    let issueid = 100
    let metodo = 'PATCH'
    let url = '/api/rest/issues/'
    let hadlername = 'Novo'
    let statusname = 'assigned'
    cy.updateIssue(issueid, metodo, url, hadlername, statusname)
      .then(response => {
        expect(response.status).to.equal(404)
        expect(response.body.message).to.equal('Issue #100 not found')
      })
  })
})