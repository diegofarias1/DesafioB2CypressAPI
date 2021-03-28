///<reference types="Cypress"/>

const projetos = require('../../fixtures/Produtos/projectsList.json')
const faker = require('faker')

describe('Testes de Projetos', () => {
  afterEach(() => {
    cy.deleteProject()
  })
  describe('Projetos', () => {
    it('Criar Projetos Campos Obrigatorios', () => {
      let token = Cypress.config('token')
      cy.api({
        method: 'POST',
        url: '/api/rest/projects/',
        headers: { Authorization: token },
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
            "name": "public",
            "label": "public"
          }
        }
      }).then(response => {
        expect(response.status).to.equal(201)
        expect(response.body).to.have.property('project')
        console.log(response.body)
        expect(response.body.project.name).to.equal('Base10API')
      })
    })
    it('Criar Projeto com Visibilidade Private', () => {
      let metodo = 'POST'
      let url = '/api/rest/projects/'
      let statusid = '50'
      let statusname = 'private'
      let statuslabel = 'private'
      cy.CreateProjectSucess(metodo, url, statusid, statusname, statuslabel)
        .then(response => {
          expect(response.status).to.equal(201)
          expect(response.body.project.view_state.name).to.equal('private')
        })
    })
    it('Criar Projeto com Visibilidade Public', () => {
      let metodo = 'POST'
      let url = '/api/rest/projects/'
      let statusid = '10'
      let statusname = 'public'
      let statuslabel = 'public'
      cy.CreateProjectSucess(metodo, url, statusid, statusname, statuslabel)
        .then(response => {
          expect(response.status).to.equal(201)
          expect(response.body.project.view_state.name).to.equal('public')
        })
    })
    it('Buscar Projetos cadastrados', () => {
      cy.buscarProjetos()
        .then(response => {
          expect(response.status).to.equal(200)
        })
    })
    it('Deletar projeto', () => {
      cy.CreateProjectPadrao()
        .then(response => {
          let id = response.body.project.id
          cy.DeletarProjetos(id)
            .then(response => {
              expect(response.status).to.equal(200)
            })
        })
    })
    it('Atualizar Projeto', () => {
      cy.CreateProjectPadrao()
        .then(response => {
          let id = response.body.project.id
          console.log(response.body.project.id)
          cy.UpdateProject(id)
            .then(response => {
              expect(response.status).to.equal(200)
            })
        })
        
    })
    it('Criar Projetos SEM Campos Obrigatorios', () => {
      let token = Cypress.config('token')
      cy.api({
        method: 'POST',
        url: '/api/rest/projects/',
        headers: { Authorization: token },
        body: {
          "name": "",
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
            "name": "public",
            "label": "public"
          }
        }
      }).then(response => {
        expect(response.status).to.equal(200)
        console.log(response.body)
        expect(response.body).contain('Fatal error')
      })
    })
    it('Criar Projeto com estado "Desenvolvimento', () => {
      let metodo = 'POST'
      let url = '/api/rest/projects/'
      let statusid = '10'
      let statusname = 'developer'
      let statuslabel = 'developer'
      cy.CreateProjectSucess(metodo, url, statusid, statusname, statuslabel)
        .then(response => {
          expect(response.status).to.equal(201)
          expect(response.body.project.status.id).to.equal(10)
          expect(response.body.project.status.name).to.equal(`development`)
          expect(response.body.project.status.label).to.equal(`development`)
        })
    })
    it('Criar Projeto com estado "release"', () => {
      let metodo = 'POST'
      let url = '/api/rest/projects/'
      let statusid = '30'
      let statusname = 'release'
      let statuslabel = 'release'
      cy.CreateProjectESTADOSucess(metodo, url, statusid, statusname, statuslabel)
        .then(response => {
          expect(response.status).to.equal(201)
          expect(response.body.project.status.id).to.equal(30)
          expect(response.body.project.status.name).to.equal(`release`)
          expect(response.body.project.status.label).to.equal(`release`)
        })
    })
    it('Criar Projeto com estado "stable"', () => {
      let metodo = 'POST'
      let url = '/api/rest/projects/'
      let statusid = '50'
      let statusname = 'stable'
      let statuslabel = 'stable'
      cy.CreateProjectESTADOSucess(metodo, url, statusid, statusname, statuslabel)
        .then(response => {
          expect(response.status).to.equal(201)
          expect(response.body.project.status.id).to.equal(50)
          expect(response.body.project.status.name).to.equal(`stable`)
          expect(response.body.project.status.label).to.equal(`stable`)
        })
    })
    it('Criar Projeto com estado "obsoleto"', () => {
      let metodo = 'POST'
      let url = '/api/rest/projects/'
      let statusid = '70'
      let statusname = 'obsolete'
      let statuslabel = 'obsolete'
      cy.CreateProjectESTADOSucess(metodo, url, statusid, statusname, statuslabel)
        .then(response => {
          expect(response.status).to.equal(201)
          expect(response.body.project.status.id).to.equal(70)
          expect(response.body.project.status.name).to.equal(`obsolete`)
          expect(response.body.project.status.label).to.equal(`obsolete`)
        })
    })
    describe('DDT', () => {
      projetos.forEach(projeto => {
        it('Create Project DDT', () => {
          let expectedStatusCode = 201;
          let statusText = 'Created';
          const SubProjectTeste = {
            "name": projeto.name + "-" + faker.random.number(),
            "id": projeto.id,
            "name": projeto.name,
            "label": projeto.label,
            "description": projeto.description,
            "file_path": projeto.file_path,
            "id": projeto.id,
            "name": projeto.name,
            "label": projeto.label,
          }
          cy.POST_CadastrarProjectSucess(SubProjectTeste)
            .then(response => {
              expect(response.status).to.equal(expectedStatusCode)
              expect(response.statusText).to.equal(statusText)
              console.log(response)
            })
        })
      })
    })
  })
})