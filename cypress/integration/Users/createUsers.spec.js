/// <reference types="Cypress" />
const faker = require('faker')

after(() => {
  cy.deleteUsers()
})
describe('Create users testing', () => {
  it('Should create user name duplicated', () => {
    let metodo = 'POST'
    let url = '/api/rest/users/'
    cy.createUsersNameDuplicated(metodo, url)
      .then(response => {
        expect(response.status).to.equal(400)
        expect(response.body.message).to.equal("Username 'administrator' already used.")
      })
  })
  it('Should create user email duplicated', () => {
    let metodo = 'POST'
    let url = '/api/rest/users/'
    cy.createUsersEmailDuplicated(metodo, url)
      .then(response => {
        expect(response.status).to.equal(400)
        expect(response.body.message).to.equal("Email 'root@localhost' already used.")
      })
  })
  it('Should create user sucess', () => {
    let metodo = 'POST'
    let url = '/api/rest/users/'
    cy.createUsers(metodo, url)
      .then(response => {
        expect(response.status).to.equal(201)
        expect(response.body.user.email).to.contains('diego')
      })
  })
  it('Should create user without name', () => {
    let metodo = 'POST'
    let url = '/api/rest/users/'
    cy.createUserWithNoNameRequired(metodo, url)
      .then(response => {
        expect(response.status).to.equal(400)
        expect(response.body.message).to.equal("Invalid username ''")
      })
  })
  it('Should create user using "Regex"', () => {
    let metodo = 'POST'
    let url = '/api/rest/users/'
    cy.createUsers(metodo, url)
      .then(response => {
        expect(response.status).to.equal(201)
        expect(response.body.user.email).to.match(/^[^\s@]+@[^\s@]+$/)
        expect(response.body.user.email).to.contains('diego')
      })
  })
  it('Should create perfil user "Visualziador"', () => {
    let metodo = 'POST'
    let url = '/api/rest/users/'
    let acess_level = { "name": "viewer" }
    cy.createUsersPerfil(metodo, url, acess_level)
      .then(response => {
        expect(response.status).to.equal(201)
        expect(response.body.user.access_level.name).to.equal('viewer')
      })
  })
  it('Should create perfil user "Relator"', () => {
    let metodo = 'POST'
    let url = '/api/rest/users/'
    let acess_level = { "name": "reporter" }
    cy.createUsersPerfil(metodo, url, acess_level)
      .then(response => {
        expect(response.status).to.equal(201)
        expect(response.body.user.access_level.name).to.equal('reporter')
      })
  })
  it('Should create perfil user "Atualizador"', () => {
    let metodo = 'POST'
    let url = '/api/rest/users/'
    let acess_level = { "name": "updater" }
    cy.createUsersPerfil(metodo, url, acess_level)
      .then(response => {
        expect(response.status).to.equal(201)
        expect(response.body.user.access_level.name).to.equal('updater')
      })
  })
  it('Should create perfil user "Gerente"', () => {
    let metodo = 'POST'
    let url = '/api/rest/users/'
    let acess_level = { "name": "manager" }
    cy.createUsersPerfil(metodo, url, acess_level)
      .then(response => {
        expect(response.status).to.equal(201)
        expect(response.body.user.access_level.name).to.equal('manager')
      })
  })
  it('Should create user reuse JsonBody', () => {
    let token = Cypress.config('token')
    let header = { "Authorization": token }
    let metodo = 'POST'
    let url = '/api/rest/users/'
    let username = "teste" + faker.random.number()
    let password = '123456'
    let real_name = 'diego'
    let email = "email" + faker.random.number() + "@base.com.br"
    let acess_level = 'manager'
    let enabled = true
    let protecteduser = false
    cy.createUserReuseJsonBody(metodo, url, username, password, real_name, email, acess_level, enabled, protecteduser, header)
      .then(response => {
        expect(response.status).to.equal(201)
        expect(response.body.user.email).contain('email')
      })
  })
  it('Should create new user sucess', () => {
    let username = "vtest12"
    let password = "p@ssw0rd"
    let real_name = "Victor Test12"
    let email = "victor12@example2.com"
    let access_level = { "name": "updater" }
    let enabled = true
    let protecteduser = false
    cy.CreateUsers(username, password, real_name, email, access_level, enabled, protecteduser)
      .then(response => {
        expect(response.status).to.equal(201)
      })
  })
  it('Should create perfil user protected', () => {
    let username = "Name"
    let password = "p@ssw0rd"
    let real_name = "Name"
    let email = "email" + faker.random.number() + "@base.com.br"
    let access_level = { "name": "updater" }
    let enabled = false
    let protecteduser = true
    cy.CreateUsers(username, password, real_name, email, access_level, enabled, protecteduser)
      .then(response => {
        expect(response.status).to.equal(201)
      })
  })
})

