describe('Get projects', () => {
  afterEach(() => {
      cy.deleteProject()
  })
  beforeEach(() => {
      cy.createProject()    
  })
  it('Should get projects', () => {
      let metodo = 'GET'
      let url = '/api/rest/projects/'
      cy.getRequest(metodo, url)
  })
 })


