/// <reference types="Cypress" />

Cypress.Commands.add('SearchAllIssues', (metodo, url) => {
  let token = Cypress.config('token')
  cy.api({
    method: metodo,
    url: url,
    headers: { "Authorization": token },
  })
})

Cypress.Commands.add('CriarIssueminimal', (metodo, url, summary, description, categoryname, projectname) => {
  let token = Cypress.config('token')
  cy.api({
    method: metodo,
    url: url,
    headers: { "Authorization": token },
    failOnStatusCode: false,
    body: {
      "summary": summary,
      "description": description,
      "category": { "name": categoryname },
      "project": { "name": projectname }
    }
  })
})
Cypress.Commands.add('SearchIssuesProjects', (idproject) => {
  let token = Cypress.config('token')
  cy.api({
    method: 'GET',
    url: '/api/rest/issues?project_id=' + idproject,
    headers: { "Authorization": token },
    failOnStatusCode: false,
  })
})
Cypress.Commands.add('SearchIssuesEspecifica', (idissue) => {
  let token = Cypress.config('token')
  cy.api({
    method: 'GET',
    url: '/api/rest/issues/' + idissue,
    headers: { "Authorization": token },
    failOnStatusCode: false,
  })
})
Cypress.Commands.add('CriarIssueComplete', (metodo, url, summary, description, categoryname, projectname, additional_information, projectid, categoryid, namehandler, viewstateid, viewstatename, priorityname, severityname, reproducibilityname, stickystatus, idcustomfield, namecustomfield, valuecustom, tagsname) => {
  let token = Cypress.config('token')
  cy.api({
    method: metodo,
    url: url,
    headers: { "Authorization": token },
    failOnStatusCode: false,
    body: {
      "summary": summary,
      "description": description,
      "additional_information": additional_information,
      "project": {
        "id": projectid,
        "name": projectname
      },
      "category": {
        "id": categoryid,
        "name": categoryname
      },
      "handler": {
        "name": namehandler
      },
      "view_state": {
        "id": viewstateid,
        "name": viewstatename
      },
      "priority": {
        "name": priorityname
      },
      "severity": {
        "name": severityname
      },
      "reproducibility": {
        "name": reproducibilityname
      },
      "sticky": stickystatus,
      "custom_fields": [
        {
          "field": {
            "id": idcustomfield,
            "name": namecustomfield
          },
          "value": valuecustom
        }
      ],
      "tags": [
        {
          "name": tagsname
        }
      ]
    }
  })
  })
Cypress.Commands.add('deleteIssueID', (issueid,metodo,url) => {
  let token = Cypress.config('token')
  cy.api({
    method: metodo,
    url: url + issueid,
    headers: { "Authorization": token },
    failOnStatusCode: false,
  })
})