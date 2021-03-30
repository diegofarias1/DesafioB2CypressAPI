///<reference types="Cypress"/>

afterEach(() => {
  cy.deleteProject()
})
describe('Search projects testing', () => {
  it('Should serach all projects created json in command', () => {
    cy.buscarProjetos()
      .then(response => {
        expect(response.status).to.equal(200)
      })
  })
  it('Should search all projects created', () => {
    let metodo = 'POST'
    let url = '/api/rest/projects/'
    cy.CreateProjectSucess(metodo, url)
      .then(response => {
        let idproject = response.body.project.id
        cy.buscarProjetoCadastrado(idproject)
          .then(response => {
            expect(response.status).to.equal(200)
            expect(response.body.projects[0].name).to.equal('Base10API')
          })
      })
  })
  it('Should search project non-exist ', () => {
    let idproject = 17
    cy.buscarProjetoCadastrado(idproject)
      .then(response => {
        expect(response.status).to.equal(404)
        expect(response.body.message).to.equal('Project #17 not found')
      })
  })
  it('Should update created project', () => {
    let token = Cypress.config('token')
    cy.api({
      method: 'POST',
      url: '/api/rest/projects/',
      headers: { Authorization: token },
      body: {
        "name": "Base10API",
        "status": {
          "id": 10,
          "name": "development",
          "label": "development"
        },
        "description": "Mantis.  Report problems with the actual bug tracker here. (Do not remove this account)",
        "enabled": true,
        "file_path": "/tmp/",
        "view_state": {
          "id": 10,
          "name": "public",
          "label": "public"
        }
      }
    })
      .then(response => {
        let projectid = response.body.project.id
        let metodo = 'PATCH'
        let url = '/api/rest/projects/'
        let nameproject = 'NovoProjeto'
        cy.atualizarprojeto(projectid, metodo, url, nameproject)
      }).then(response => {
        expect(response.body.project.name).to.equal('NovoProjeto')
      })
  })
  it('Should update invalid project', () => {
    let projectid = 1
    let metodo = 'PATCH'
    let url = '/api/rest/projects/'
    let nameproject = 'NovoProjeto'
    cy.atualizarprojeto(projectid, metodo, url, nameproject)
      .then(response => {
        expect(response.body.message).to.equal('Project #1 not found')
      })
  })
})