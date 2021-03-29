///<reference types="Cypress"/>

const projetos = require('../../fixtures/Produtos/projectsList.json')
const faker = require('faker')

afterEach(() => {
  cy.deleteProject()
})
describe('Projetos', () => {
  it('Buscar Projetos cadastrados', () => {
    cy.buscarProjetos()
      .then(response => {
        expect(response.status).to.equal(200)
      })
  })
  it('BuscarProjetoCadastrado', () => {
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
  it('BuscarProjetoInexistente', () => {
    let idproject = 17
    cy.buscarProjetoCadastrado(idproject)
      .then(response => {
        expect(response.status).to.equal(404)
        expect(response.body.message).to.equal('Project #17 not found')
      })
  })
})
