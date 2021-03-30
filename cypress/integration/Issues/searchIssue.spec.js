///<reference types="Cypress"/>

before(() => {
  cy.createProject()
})
after(() => {
  cy.deleteProject()
})
describe('Search issues testing', () => {
  let metodo = 'GET'
  let url = '/api/rest/issues?page_size=10&page=1'
  it('Buscar todas as Issues', () => {
    cy.SearchAllIssues(metodo, url)
      .then(response => {
        expect(response.status).to.equal(200)
      })
  })
  it('Should search a issue in project', () => {
    let summary = 'sumario'
    let description = 'descricao'
    let categoryname = 'backend'
    let projectname = 'Base10'
    let metodo = 'POST'
    let url = '/api/rest/issues/'
    cy.CriarIssueminimal(metodo, url, summary, description, categoryname, projectname)
      .then(response => {
        let idproject = response.body.issue.project.id
        cy.SearchIssuesProjects(idproject)
          .then(response => {
            expect(response.status).to.equal(200)
            expect(response.body.issues[0].project.name).to.equal('Base10')
          })
      })
  })
  it('Should search a issue in incorrect project', () => {
    let idproject = 100
    cy.SearchIssuesProjects(idproject)
      .then(response => {
        expect(response.status).to.equal(404)
      })
  })
  it('Should search a issue with especific ID', () => {
    let summary = 'sumario'
    let description = 'descricao'
    let categoryname = 'backend'
    let projectname = 'Base10'
    let metodo = 'POST'
    let url = '/api/rest/issues/'
    cy.CriarIssueminimal(metodo, url, summary, description, categoryname, projectname)
      .then(response => {
        let idissue = response.body.issue.id
        cy.SearchIssuesEspecifica(idissue)
          .then(response => {
            expect(response.status).to.equal(200)
            expect(response.body.issues[0].project.name).to.equal('Base10')
            expect(response.body.issues[0].id).to.equal(idissue)
          })
      })
  })
  it('Should search a issue with incorrect ID', () => {
    let idissue = 1
    cy.SearchIssuesEspecifica(idissue)
      .then(response => {
        expect(response.status).to.equal(404)
        expect(response.body.message).to.equal('Issue #1 not found')
      })
  })
})

