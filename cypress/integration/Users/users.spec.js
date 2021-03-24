/// <reference types="Cypress" />
const faker = require('faker')

describe('Testes MantisBugTracker', () => {
  after(() => {
    cy.deleteUsers()
  })
  describe('Gerenciar', () => {
    describe('Users', () => {
      it('Create Users Name Duplicated', () => {
        let metodo = 'POST'
        let url = '/api/rest/users/'
        cy.createUsersNameDuplicated(metodo, url)
          .then(response => {
            expect(response.status).to.equal(400)
            expect(response.body.message).to.equal("Username 'administrator' already used.")
          })
      })
      it('Create Users Email Duplicated', () => {
        let metodo = 'POST'
        let url = '/api/rest/users/'
        cy.createUsersEmailDuplicated(metodo, url)
          .then(response => {
            expect(response.status).to.equal(400)
            expect(response.body.message).to.equal("Email 'root@localhost' already used.")
          })
      })
      it('Create User sucessfull', () => {
        let metodo = 'POST'
        let url = '/api/rest/users/'
        cy.createUsers(metodo, url)
          .then(response => {
            expect(response.status).to.equal(201)
            expect(response.body.user.email).to.contains('diego')
          })
      })
      it('Search User Existed', () => {
        let metodo = 'GET'
        let url = '/api/rest/users/me'
        cy.SearchExitedUser(metodo, url)
          .then(response => {
            expect(response.status).to.equal(200)
            expect(response.body.id).to.equal(1)
            expect(response.body.email).to.equal('root@localhost')
          })
      })
      it('Criar usuario sem o nome preenchido', () => {
        let metodo = 'POST'
        let url = '/api/rest/users/'
        cy.createUserWithNoNameRequired(metodo, url)
          .then(response => {
            expect(response.status).to.equal(400)
            expect(response.body.message).to.equal("Invalid username ''")
          })
      })
      it('Should Create User Regex', () => {
        let metodo = 'POST'
        let url = '/api/rest/users/'
        cy.createUsers(metodo, url)
          .then(response => {
            expect(response.status).to.equal(201)
            expect(response.body.user.email).to.match(/^[^\s@]+@[^\s@]+$/)
            expect(response.body.user.email).to.contains('diego')
          })
      })
      it('CreateUserPerfilVisualziador', () => {
        let metodo = 'POST'
        let url = '/api/rest/users/'
        let acess_level = { "name": "viewer" }
        cy.createUsersPerfil(metodo, url, acess_level)
          .then(response => {
            expect(response.status).to.equal(201)
            expect(response.body.user.access_level.name).to.equal('viewer')
          })
      })
      it('CreateUserPerfilRelator', () => {
        let metodo = 'POST'
        let url = '/api/rest/users/'
        let acess_level = { "name": "reporter" }
        cy.createUsersPerfil(metodo, url, acess_level)
          .then(response => {
            expect(response.status).to.equal(201)
            expect(response.body.user.access_level.name).to.equal('reporter')
          })
        })
        it('CreateUserPerfilAtualizador', () => {
          let metodo = 'POST'
          let url = '/api/rest/users/'
          let acess_level = { "name": "updater" }
          cy.createUsersPerfil(metodo, url, acess_level)
            .then(response => {
              expect(response.status).to.equal(201)
              expect(response.body.user.access_level.name).to.equal('updater')
            })
        })
        it('CreateUserPerfilGerente', () => {
          let metodo = 'POST'
          let url = '/api/rest/users/'
          let acess_level = { "name": "manager" }
          cy.createUsersPerfil(metodo, url, acess_level)
            .then(response => {
              expect(response.status).to.equal(201)
              expect(response.body.user.access_level.name).to.equal('manager')
            })
        })
        it('Create User Reuse Json Body', () => {
          let token = Cypress.config('token')
          let header = {"Authorization":token}
          let metodo = 'POST'
          let url = '/api/rest/users/'
          let username = "teste" + faker.random.number()
          let password = '123456'
          let real_name = 'diego'
          let email = "email" + faker.random.number() +"@base.com.br"
          let acess_level = 'manager'
          let enabled = true
          let protecteduser = false
          cy.createUserReuseJsonBody(metodo, url, username, password, real_name, email, acess_level, enabled, protecteduser,header)
            .then(response => {
              expect(response.status).to.equal(201)
              expect(response.body.user.email).contain('email')
            })
        })   
    })
  })
})