Cypress.Commands.add('POST_CadastrarSubProject', bodyJson =>{
  cy.request({
      method: 'POST',
      url: '/api/rest/projects/:project_id/subprojects',
      body: bodyJson,
      headers:{"Authorization": token  } 
       })
      })

