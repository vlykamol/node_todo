const express = require('express')

const router = express.Router()


const userController = require('../controllers/user')
const { jwtAuth } = require('../middlewares/jwt')


router.post('/', userController.createUser)

router.get('/all', jwtAuth, userController.getAllUsers)
router.get('/:id', jwtAuth, userController.getUser)


module.exports = router