/*
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
    it('Procurar Issue no projeto', () => {
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
    it('Procurar Issue Projeto errado', () => {
      let idproject = 100
      cy.SearchIssuesProjects(idproject)
        .then(response => {
          expect(response.status).to.equal(404)
        })
    })
    it('Procurar Issue Especifica', () => {
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
    it('Procurar Issue com ID incorreto', () => {
      let idissue = 1
      cy.SearchIssuesEspecifica(idissue)
        .then(response => {
          expect(response.status).to.equal(404)
          expect(response.body.message).to.equal('Issue #1 not found')
        })
    })
    it('Criar Issue com todos os campos', () => {
      let metodo = 'POST'
      let url = '/api/rest/issues/'
      let summary = 'TesteSumario'
      let description = 'TesteDescricao'
      let categoryname = 'frontend'
      let projectname = 'Base10'
      let additional_information = 'Teste'
      let namehandler = "vboctor"
      let viewstatename = 'base2'
      let priorityname = 'normal'
      let severityname = 'trivial'
      let reproducibilityname = 'always'
      let stickystatus = false
      let namecustomfield = 'the city'
      let valuecustom = 'seatle'
      let tagsname = 'mantis'

      cy.CriarIssueminimal(metodo, url, summary, description, categoryname, projectname, additional_information, namehandler, viewstatename, priorityname, severityname, reproducibilityname, stickystatus, namecustomfield, valuecustom, tagsname)
        .then(response => {
          expect(response.status).to.equal(201)
          expect(response.body.issue.summary).to.equal('TesteSumario')
          expect(response.body.issue.description).to.equal('TesteDescricao')
          expect(response.body.issue.project.name).to.equal('Base10')
          expect(response.body.issue.category.name).to.equal('Frontend')
        })
    })
    it('Criar issue para projeto inexistente', () => {
      let metodo = 'POST'
      let url = '/api/rest/issues/'
      let summary = 'TesteSumario'
      let description = 'TesteDescricao'
      let categoryname = 'frontend'
      let projectname = 'Base1'
      let additional_information = 'Teste'
      let namehandler = "vboctor"
      let viewstatename = 'base2'
      let priorityname = 'normal'
      let severityname = 'trivial'
      let reproducibilityname = 'always'
      let stickystatus = false
      let namecustomfield = 'the city'
      let valuecustom = 'seatle'
      let tagsname = 'mantis'

      cy.CriarIssueminimal(metodo, url, summary, description, categoryname, projectname, additional_information, namehandler, viewstatename, priorityname, severityname, reproducibilityname, stickystatus, namecustomfield, valuecustom, tagsname)
        .then(response => {
          expect(response.status).to.equal(400)
          expect(response.body.message).to.equal('Project not specified')
          expect(response.body.localized).to.equal('A necessary field \"project\" was empty. Please recheck your inputs.')
        })
    })
  })
})

*/