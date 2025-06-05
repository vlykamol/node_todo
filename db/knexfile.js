
require('../helpers/loadEnv')


/**
 * @type { Object.<string, import("knex").Knex.Config> }
*/

module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: "root",
      password: "admin",
      database: "node_todo",
    },
    pool:{
      min: 2,
      max: 10,
    }, 
    migrations:{
      tableName: 'knex_migrations'
    }
  }
};
