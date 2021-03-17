Cypress.Commands.add('createUsers', (metodo, url) => {
  let token = 'ypKoT0YNYozVMP4MFD4bj-zmK-By4IXs';
  cy.request({
    method: metodo, //or POST
    url: url,
    headers:{
     "Authorization": token},
     body: {
      "username": "diego",
      "password": "123456",
      "real_name": "Diego Farias",
      "email": "diego@base.com.br",
      "access_level": { "name": "updater" },
      "enabled": true,
      "protected": false
    } 
   }).should('not.be.empty')
   .then(token => {
       return token
       }).as('response')
 

})