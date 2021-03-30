Cypress.Commands.add('POST_CadastrarSubProject', bodyJson => {
  cy.api({
    method: 'POST',
    url: '/api/rest/projects/:project_id/subprojects',
    body: bodyJson,
    headers: { "Authorization": token }
  })
})
Cypress.Commands.add('CadastrarProjectSucess', bodyJson => {
  let token = Cypress.config('token')
  cy.api({
    method: 'POST',
    url: '/api/rest/projects/',
    body: bodyJson,
    headers: { "Authorization": token }
  })
})
Cypress.Commands.add('CreateProjectSucess', (metodo, url, statusid, statusname, statuslabel) => {
  let token = Cypress.config('token')
  cy.api({
    method: metodo,
    url: url,
    headers: { "Authorization": token },
    body: {
      "id": 1,
      "name": "Base10API",
      "status": {
        "id": 10,
        "name": "development",
        "label": "development"
      },
      "description": "Mantis.  Report problems with the actual bug tracker here. (Do not remove this account)",
      "enabled": true,
      "file_path": "/tmp/",
      "view_state": { "id": statusid, "name": statusname, "label": statuslabel }
    }
  })
})
Cypress.Commands.add('buscarProjetos', () => {
  let token = Cypress.config('token')
  cy.api({
    method: 'GET',
    url: '/api/rest/projects/',
    headers: { "Authorization": token }
  })
})
Cypress.Commands.add('DeletarProjetos', (id) => {
  let token = Cypress.config('token')
  cy.api({
    method: 'DELETE',
    url: '/api/rest/projects/' + id,
    headers: { "Authorization": token }
  })
})
Cypress.Commands.add('CreateProjectPadrao', () => {
  let token = Cypress.config('token')
  cy.api({
    method: 'POST',
    url: '/api/rest/projects/',
    headers: { "Authorization": token },
    body: {
      "id": 1,
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
        "name": 'private',
        "label": 'private'
      }
    }
  })
})
Cypress.Commands.add('UpdateProject', (id) => {
  let token = Cypress.config('token')
  cy.api({
    method: 'PATCH',
    url: '/api/rest/projects/' + id,
    body: {
      "name": "projetonovo",
      "enabled": false
    },
    headers: { "Authorization": token },
  })
})
Cypress.Commands.add('POST_CadastrarProjectSucess', bodyJson => {
  let token = Cypress.config('token')
  cy.api({
    method: 'POST',
    url: '/api/rest/projects/',
    body: bodyJson,
    headers: { "Authorization": token }
  })
})
Cypress.Commands.add('CreateProjectESTADOSucess', (metodo, url, statusid, statusname, statuslabel) => {
  let token = Cypress.config('token')
  cy.api({
    method: metodo,
    url: url,
    headers: { "Authorization": token },
    body: {
      "id": 1,
      "name": "Base10API",
      "status": { "id": statusid, "name": statusname, "label": statuslabel }
    },
    "description": "Mantis.  Report problems with the actual bug tracker here. (Do not remove this account)",
    "enabled": true,
    "file_path": "/tmp/",
    "view_state": {
      "id": 10,
      "name": "public",
      "label": "public"
    }
  })
})
Cypress.Commands.add('buscarProjetoCadastrado', (projectid) => {
  let token = Cypress.config('token')
  cy.api({
    method: 'GET',
    url: '/api/rest/projects/' + projectid,
    headers: { "Authorization": token },
    failOnStatusCode: false
  })
})
Cypress.Commands.add('deletarprojeto', (projectid) => {
  let token = Cypress.config('token')
  cy.api({
    method: 'DELETE',
    url: '/api/rest/projects/' + projectid,
    headers: { "Authorization": token },
    failOnStatusCode: false
  })
})
Cypress.Commands.add('atualizarprojeto', (projectid,metodo,url,nameproject) => {
  let token = Cypress.config('token')
  cy.api({
    method: metodo,
    url: url + projectid,
    headers: { "Authorization": token },
    body:
    { "name": nameproject},
    failOnStatusCode: false
  })
})