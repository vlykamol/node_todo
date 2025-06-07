const db = require('../db/db')

const createTodo = (data) => {
  const {title, description, user_id} = data;
  return db('todos').insert({title, description, user_id});
  
}

const getTodoById = (id) => {
  return db('todos').where({id}).first();
}

const deleteTodoById = (id) => {
  return db('todos').where({id}).del()
}

const updateTodobyId = (id, update) => {
  return db('todos').where({id}).update({completed : update})
}

const getAllTodosbyUserId = (userId) => {
  return db('todos').select().where({user_id: userId});
}


module.exports = {
  createTodo, deleteTodoById, updateTodobyId, getAllTodosbyUserId, getTodoById
}