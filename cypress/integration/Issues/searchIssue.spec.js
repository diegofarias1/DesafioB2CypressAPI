///<reference types="Cypress"/>

const faker = require('faker')

describe('Tests Issues', () => {
  beforeEach(() => {
    cy.createProject()
  })
  afterEach(() => {
    cy.deleteProject()
  })
  describe('Issues', () => {
    let metodo = 'GET'
    let url = '/api/rest/issues?page_size=10&page=1'
    it('Buscar todas as Issues', () => {
      cy.SearchAllIssues(metodo, url)
        .then(response => {
          expect(response.status).to.equal(200)
        })
    })
    it('Buscar Issue no projeto', () => {
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
    it('Buscar Issue Projeto errado', () => {
      let idproject = 100
      cy.SearchIssuesProjects(idproject)
        .then(response => {
          expect(response.status).to.equal(404)
        })
    })
    it('Buscar Issue Especifica', () => {
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
    it('Buscar Issue com ID incorreto', () => {
      let idissue = 1
      cy.SearchIssuesEspecifica(idissue)
        .then(response => {
          expect(response.status).to.equal(404)
          expect(response.body.message).to.equal('Issue #1 not found')
        })
    })
  })
})

