///<reference types="Cypress"/>

describe('Testing create issues', () => {
  before(() => {
    cy.createProject()
  })
  after(() => {
    cy.deleteProject()
  })
  it('Should create issues with required fields', () => {
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
  it('Should create issues with category no exists', () => {
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
  it('Should create issue no project defined', () => {
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
  it('Should create issue and validated field summary', () => {
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
  it('Should create issue and validated field description', () => {
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
  it('Should create issue all fields registred', () => {
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
  it('Should create issue project no exist', () => {
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