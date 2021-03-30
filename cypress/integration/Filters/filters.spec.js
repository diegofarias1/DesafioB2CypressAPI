///<reference types="Cypress"/>

  describe('Filters Tests', () => {
    it('Should search all filters', () => {
      let metodo = 'GET'
      let url = '/api/rest/filters'
      cy.SearchAllFilters(metodo, url)
        .then(response => {
          expect(response.status).to.equal(200)
        })
    })
  })