///<reference types="Cypress"/>

afterEach(() => {
  cy.deleteProject()
})
describe('Create projects testing', () => {
  it('Should create project with required fields', () => {
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
  it('Should create project with visibility private', () => {
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
  it('Should create project with visibility public', () => {
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
  it('Should update project', () => {
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
  it('Should create project no required fields', () => {
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
  it('Should create project with a state "Desenvolvimento', () => {
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
  it('Should create project with a state "release"', () => {
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
  it('Should create project with a state "stable"', () => {
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
  it('Should create project with a state "obsoleto"', () => {
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
})