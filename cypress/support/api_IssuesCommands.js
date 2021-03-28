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
Cypress.Commands.add('SearchIssuesProjects', (idproject) => {
  let token = Cypress.config('token')
  cy.api({
    method: 'GET',
    url:'/api/rest/issues?project_id=' + idproject,
    headers: { "Authorization": token },
  })
})