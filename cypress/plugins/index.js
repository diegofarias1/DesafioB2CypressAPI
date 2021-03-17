/// <reference types="cypress" />
/**
 * @type {Cypress.PluginConfig}
 */
const mysql = require('mysql')
// the connection strings for different databases could
// come from a config file, or from environment variables
const connections = {
  bugtracker: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bugtracker'
  }
}

// querying the database from Node
function queryDB (connectionInfo, query) {
  const connection = mysql.createConnection(connectionInfo)

  connection.connect()

  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        return reject(error)
      }

      connection.end()

      return resolve(results)
    })
  })
}
module.exports = (on, config) => {
  on('task', {
    // destructure the argument into the individual fields
    queryDatabase ({ dbName, query }) {
      const connectionInfo = connections[dbName]

      if (!connectionInfo) {
        throw new Error(`Do not have DB connection under name ${dbName}`)
      }
      return queryDB(connectionInfo, query)

    },
  })
  const fs = require('fs-extra')
  const path = require('path')
  function getConfigurationByFile (file) {
    // caminho da pasta onde estão presentes os arquivos JSON dos ambientes
    const pathToConfigFile = path.resolve('config', `${file}.json`)
  
    return fs.readJson(pathToConfigFile)
  }
  const file = config.env.configFile || 'qa'
  return getConfigurationByFile(file)
}




//module.exports = (on, config) => {
  // aceita um valor de "configFile" ou usa "development" por padrão
//  const file = config.env.configFile || 'qa'
  //
//}


// querying the database from Node
/*function queryDB (connectionInfo, query) {
  const connection = mysql.createConnection(connectionInfo)

  connection.connect()

  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        return reject(error)
      }

      connection.end()

      return resolve(results)
    })
  })
}
module.exports = (on, config) => {
  on('task', {
    // destructure the argument into the individual fields
    queryDatabase ({ dbName, query }) {
      const connectionInfo = connections[dbName]

      if (!connectionInfo) {
        throw new Error(`Do not have DB connection under name ${dbName}`)
      }

      return queryDB(connectionInfo, query)
    }


  })
  //Cypress.config('taskTimeout', 30000)
  
};


// in plugins/index.js
// we require some code in our app that
// is responsible for seeding our database
// in plugins/index.js
// we require some code in our app that
// is responsible for seeding our database
// cypress/plugins/index.ts

*/
