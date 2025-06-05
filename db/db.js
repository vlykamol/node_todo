const knex = require('knex')
const dotenv = require('dotenv')
dotenv.config()

const environment = process.env.NODE_ENV

const knexfile = require('./knexfile')

module.exports = knex(knexfile[environment])