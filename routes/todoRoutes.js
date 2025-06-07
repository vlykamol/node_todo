const express = require('express')
const router = express.Router()

const todoController = require('../controllers/todo')
const { jwtAuth } = require('../middlewares/jwt')


router.post('/', jwtAuth, todoController.createTodo)
router.get('/:id', jwtAuth, todoController.getTodo)
router.get('/all/:user_id', jwtAuth, todoController.getAllTodos)

router.put('/:id', jwtAuth, todoController.updateTodo)
router.delete('/:id', jwtAuth, todoController.deleteTodo)


module.exports = router