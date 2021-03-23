Cypress.Commands.add('POST_CadastrarSubProject', bodyJson =>{
  cy.api({
      method: 'POST',
      url: '/api/rest/projects/:project_id/subprojects',
      body: bodyJson,
      headers:{"Authorization": token  } 
       })
      })
Cypress.Commands.add('POST_CadastrarProjectSucess', bodyJson =>{
  let token = Cypress.config('token')
        cy.api({
            method: 'POST',
            url: '/api/rest/projects/',
            body: bodyJson,
            headers:{"Authorization": token  } 
             })
            })
