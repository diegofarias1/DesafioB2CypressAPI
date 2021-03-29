Cypress.Commands.add('SearchAllFilters', (metodo, url) => {
  let token = Cypress.config('token')
  cy.api({
    method: metodo,
    url: url,
    headers: {
      "Authorization": token
    },
  })
})