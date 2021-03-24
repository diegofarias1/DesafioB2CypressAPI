Cypress.Commands.add('deleteProject', () => {
  const dbName = 'bugtracker'
  const query = 'DELETE from mantis_project_table'
  cy.task('queryDatabase', { dbName, query }).as('Delete projects')
})
Cypress.Commands.add('createCategory', () => {
  const dbName = 'bugtracker'
  const query = 'INSERT INTO mantis_category_table (NAME) VALUES ("Category")'
  cy.task('queryDatabase', { dbName, query }).as('Category')
})
Cypress.Commands.add('createProject', () => {
  const dbName = 'bugtracker'
  const query = 'INSERT INTO mantis_project_table (NAME,STATUS,ENABLED,view_state,access_min,description,category_id,inherit_global) VALUES ("Base10",30,1,10,10,"teste2",1,1)'
  cy.task('queryDatabase', { dbName, query }).as('Create Project')
})
Cypress.Commands.add('deleteProject', () => {
  const dbName = 'bugtracker'
  const query = 'DELETE from mantis_project_table'
  cy.task('queryDatabase', { dbName, query }).as('Delete projects')
})
Cypress.Commands.add('deleteUsers', () => {
  const dbName = 'bugtracker'
  const query = "delete FROM mantis_user_table WHERE username <> 'administrator'"
  cy.task('queryDatabase', { dbName, query }).as('Delete Users')
})
