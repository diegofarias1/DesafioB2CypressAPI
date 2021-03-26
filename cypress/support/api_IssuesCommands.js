/// <reference types="Cypress" />

Cypress.Commands.add('SearchAllIssues', (metodo, url) => {
  let token = Cypress.config('token')
  cy.api({
    method: metodo,
    url: url,
    headers: { "Authorization": token },
  })
})

Cypress.Commands.add('CriarIssueminimal', (metodo, url, summary, description, categoryname, projectname) => {
  let token = Cypress.config('token')
  cy.api({
    method: metodo,
    url: url,
    headers: { "Authorization": token },
    failOnStatusCode: false,
    body: {
      "summary": summary,
      "description": description,
      "category": { "name": categoryname },
      "project": { "name": projectname }
    }
  })
})