const db = require('../db/db')

const createUser = (data) => {
  const {first_name, last_name, email, password} = data;
  return db('users').insert({first_name, last_name, email, password})
}

const deleteUserById = (id) => {
  return db('users').where({id}).del()
}
 
const getUserById = (id) => {
  return db('users').where({id}).first();
}

const getAllUsers = () => {
  return db('users').select()
}

const getUserByEmail = (email) => {
  return db('users').where({email}).first()
}

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  deleteUserById,
  getUserByEmail
}