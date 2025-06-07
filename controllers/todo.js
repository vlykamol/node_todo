const todoDAO = require('../dao/todo')

const createTodo = async (req, res) => {
  const data = {
    title : req.body.title,
    description : req.body.description,
    user_id : req.body.user_id
  }
  console.log(data);
  
  try {
    const [todo_id] = await todoDAO.createTodo(data);

    const todo = await todoDAO.getTodoById(todo_id)

    return res.status(201).json({todo, message : 'Todo created successfully'})
  } catch (err) {
    return res.status(500).json({error: 'Todo creation failed', message: err.message})
  }
}

const deleteTodo = async (req, res) => {
  const {id} = req.params
  if(isNaN(id)) return res.status(400).json({error: 'Invalid todo id', message: 'please provide valid id'})

  try {
    const deleted_rows = await todoDAO.deleteTodoById(id);
    if(deleted_rows === 0) return res.status(200).json({message : 'todo not found'})
    return res.status(200).json({deleted_rows, message : 'todo deleted successfully'})
  } catch (err) {
    return res.status(500).json({error: 'failed to delete todo', message: err.message})
  }
}

const updateTodo = async (req, res) => {
  const {id} = req.params

  if(isNaN(id)) return res.status(400).json({error: 'Invalid todo id', message: 'please provide valid id'})

  const update = req.body.update
  
  try {
    const updated_rows = await todoDAO.updateTodobyId(id, update);
    if(updated_rows === 0) return res.status(200).json({message : 'todo not found'})
    const todo = await todoDAO.getTodoById(id)
    return res.status(200).json({todo, message : 'todo updated successfully'})
  } catch (err) {    
     return res.status(500).json({error: 'failed to update todo', message: err.message})
  }
}

const getAllTodos = async (req, res) => {
  const {user_id} = req.params;
  
  try {
    const todos = await todoDAO.getAllTodosbyUserId(user_id);
    console.log('todos', todos);
    if(!todos || todos.length === 0) return res.status(404).json({error: 'No Todos found!', message: `Todo table is empty`})
    return res.status(200).json({todos, message:'todos fetched successfully'})
  } catch (err) {
    return res.status(500).json({error: 'failed to fetch todos', message: err.message})
  }
}

const getTodo = async (req, res) => {
  const {id} = req.params;
  
  try {
    const todo = await todoDAO.getTodoById(id)
    return res.status(201).json({todo, message : 'Todo fatched successfully'})
  } catch (err) {
    return res.status(500).json({error: 'Todo fetch failed', message: err.message})
  }
}

module.exports = {
  createTodo, deleteTodo, updateTodo, getAllTodos, getTodo
}