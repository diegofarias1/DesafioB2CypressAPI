const { assert } = require("chai")
var chai = require('chai');
chai.use(require('chai-match'));


Cypress.Commands.add('windowAlert', () => {
    cy.on('window:alert', msg => {
        console.log(msg)
        expect(msg).to.be.contain('excedem o tamanho máximo de arquivo permitido')
        //taskPage.clickSaveNewTask()
    })
})
Cypress.Commands.add('getRequest', (metodo, url) => {
    let token = Cypress.config('token')
   cy.api({
     method: metodo, //or POST
     url: url,
     headers:{
      "Authorization": token   
        } 
    }).should('not.be.empty')
    .then(token => {
        return token
        }).as('response')
    cy.get('@response').then(res => {
    expect(res.status).to.be.equal(200)
    console.log(res.body)
    })
})
