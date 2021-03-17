/// <reference types="Cypress" />


Cypress.Commands.add('POST_generateTokenAdministrator', () =>{
    cy.request({
        method: 'POST',
        url: '/login',
        body: {
            "email": "fulano@qa.com",
            "password": "teste"
          }
    })
    .then(response =>{
        expect(response.status).to.eql(200)
        localStorage.setItem('token', response.body.authorization)
        expect(localStorage.getItem('token')).not.null
        cy.log(localStorage.getItem('token'))
    })      
})
Cypress.Commands.add('POST_CadastrarProjectSucess', bodyJson =>{
    let token = 'ypKoT0YNYozVMP4MFD4bj-zmK-By4IXs'
    cy.request({
        method: 'POST',
        url: '/api/rest/projects/',
        body: bodyJson,
        headers:{"Authorization": token  } 
         })
        })