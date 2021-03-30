/// <reference types="Cypress" />

const projetos = require('../../fixtures/Produtos/projectsList.json')
const faker = require('faker')

describe('Create project DDT', () => {
  after(() => {
    cy.deleteProject()
  })
  projetos.forEach(projeto => {
    it('Should create a projects using DDT ' + projeto.name, () => {
      let expectedStatusCode = 201;
      let statusText = 'Created';
      const SubProjectTeste = {
        "name": projeto.name + "-" + faker.random.number(),
        "id": projeto.id,
        "name": projeto.name,
        "label": projeto.label,
        "description": projeto.description,
        "file_path": projeto.file_path,
        "id": projeto.id,
        "name": projeto.name,
        "label": projeto.label,
      }
      cy.POST_CadastrarProjectSucess(SubProjectTeste)
        .then(response => {
          expect(response.status).to.equal(expectedStatusCode)
          expect(response.statusText).to.equal(statusText)
          console.log(response)
        })
    })
  })
})