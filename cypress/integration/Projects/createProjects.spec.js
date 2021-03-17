describe('Create Projects', () => {
  afterEach(() => {
      cy.deleteProject()
  })
  beforeEach(() => {
      cy.createProject()    
  })
  it('Should Create Project',() => {
    let token = 'ypKoT0YNYozVMP4MFD4bj-zmK-By4IXs'
    cy.request({
        method: 'POST',
        url: '/api/rest/projects/', 
        headers:{ Authorization: token},
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
    })
    .then(response =>{
      expect(response.status).to.equal(201)
      expect(response.body).to.have.property('project')
      console.log(response.body)
      expect(response.body.project.name).to.equal('Base10API')
    })
  })
})

