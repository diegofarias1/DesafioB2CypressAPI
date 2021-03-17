describe('Test Issues', () => {
  afterEach(() => {
      cy.deleteProject()
  })
  beforeEach(() => {
      cy.createProject()    
  })
  it('Should get issues',() => {
    let metodo = 'GET'
    let url = '/api/rest/issues?page_size=10&page=1'
    cy.getRequest(metodo, url)
  })
})