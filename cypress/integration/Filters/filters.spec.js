///<reference types="Cypress"/>

const faker = require('faker')

describe('Tests Issues', () => {
  beforeEach(() => {
    cy.createProject()
  })
  afterEach(() => {
    cy.deleteProject()
  })
  describe('Filters Tests', () => {
    it('SearchAllFilters', () => {
      let metodo = 'GET'
      let url = '/api/rest/filters'
      cy.SearchAllFilters(metodo, url)
        .then(response => {
          expect(response.status).to.equal(200)
        })
    })
  })
})
