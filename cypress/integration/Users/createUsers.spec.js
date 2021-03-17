describe('Create users sucess', () => {
  afterEach(() => {
      cy.deleteProject()
  })
  beforeEach(() => {
      cy.createProject()    
  })
  it('Should get issues',() => {
    let metodo = 'POST'
    let url = '/api/rest/users/'
    cy.createUsers(metodo, url)
    cy.get('@response')
    let res = cy.get('@response')
      expect(res.status).to.be.equal(201)
      console.log(res.body)
      expect(res.body.user.email).to.equal('diego@base.com.br')
      expect(res.body.user.email).to.match(/^[^\s@]+@[^\s@]+$/)
    
  })
})