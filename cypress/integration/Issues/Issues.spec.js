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
    it('Criar Issue com campos obrigatorios', () => {
      let summary = 'sumario'
      let description = 'descricao'
      let categoryname = 'backend'
      let projectname = 'Base10'
      let metodo = 'POST'
      let url = '/api/rest/issues/'
      cy.CriarIssueminimal(metodo, url, summary, description, categoryname, projectname)
        .then(response => {
          expect(response.status).to.equal(201)
          expect(response.body.issue.summary).to.equal('sumario')
          expect(response.body.issue.description).to.equal('descricao')
          expect(response.body.issue.project.name).to.equal('Base10')
        })
    })
    it('Criar Issue com categoria inexistente', () => {
      let summary = 'sumario'
      let description = 'descricao'
      let categoryname = 'inexistente'
      let projectname = 'Base10'
      let metodo = 'POST'
      let url = '/api/rest/issues/'
      cy.CriarIssueminimal(metodo, url, summary, description, categoryname, projectname)
        .then(response => {
          expect(response.status).to.equal(200)
          expect(response.body).contains('Fatal error')
        })
    })
    it('Criar Issue sem projeto definido', () => {
      let summary = 'sumario'
      let description = 'descricao'
      let categoryname = 'inexistente'
      let projectname = ''
      let metodo = 'POST'
      let url = '/api/rest/issues/'
      cy.CriarIssueminimal(metodo, url, summary, description, categoryname, projectname)
        .then(response => {
          expect(response.status).to.equal(400)
          expect(response.body.message).contains('Project not specified')
          expect(response.body.localized).contains('A necessary field \"project\" was empty. Please recheck your inputs.')
        })
    })
    it('Validar obrigatoriedade do campo summary', () => {
      let summary = ''
      let description = 'descricao'
      let categoryname = 'inexistente'
      let projectname = 'Base10'
      let metodo = 'POST'
      let url = '/api/rest/issues/'
      cy.CriarIssueminimal(metodo, url, summary, description, categoryname, projectname)
        .then(response => {
          expect(response.status).to.equal(400)
          expect(response.body.message).contains('Summary not specified')
        })
    })
    it('Validar obrigatoriedade do campo description', () => {
      let summary = 'sumario'
      let description = ''
      let categoryname = 'inexistente'
      let projectname = 'Base10'
      let metodo = 'POST'
      let url = '/api/rest/issues/'
      cy.CriarIssueminimal(metodo, url, summary, description, categoryname, projectname)
        .then(response => {
          expect(response.status).to.equal(400)
          expect(response.body.message).contains('Description not specified')
        })
    })
    it.only('Procurar Issue no projeto', () => {
      let summary = 'sumario'
      let description = 'descricao'
      let categoryname = 'backend'
      let projectname = 'Base10'
      let metodo = 'POST'
      let url = '/api/rest/issues/'
      cy.CriarIssueminimal(metodo, url, summary, description, categoryname, projectname)
        .then(response => {
          let idproject = response.body.issue.project.id
          console.log(idproject)
          cy.SearchIssuesProjects(idproject)
          .then(response => {
          expect(response.status).to.equal(200)
          expect(response.body.issues[0].project.name).to.equal('Base10') 
          })
        })
    })
  })
})