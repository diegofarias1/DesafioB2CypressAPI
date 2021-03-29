///<reference types="Cypress"/>

const projetos = require('../../fixtures/Produtos/projectsList.json')
const faker = require('faker')

afterEach(() => {
  cy.deleteProject()
})
describe('Projetos', () => {
  it('Deletar projeto', () => {
    cy.CreateProjectPadrao()
      .then(response => {
        let id = response.body.project.id
        cy.DeletarProjetos(id)
          .then(response => {
            expect(response.status).to.equal(200)
          })
      })
  })
  it('Deletar Projeto Cadastrado', () => {
    let metodo = 'POST'
    let url = '/api/rest/projects/'
    cy.CreateProjectSucess(metodo, url)
      .then(response => {
        let idproject = response.body.project.id
        cy.deletarprojeto(idproject)
          .then(response => {
            expect(response.status).to.equal(200)
          })
      })
  })
  it('Deletar Projeto Inexistente', () => {
    let idproject = 100
    cy.deletarprojeto(idproject)
      .then(response => {
        expect(response.status).to.equal(403)
  })
})
})
