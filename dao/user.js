const db = require('../db/db')

const createUser = (data) => {
  const {first_name, last_name, email, password} = data;
  return db('users').insert({first_name, last_name, email, password})
}

module.exports = {
  createUser
}