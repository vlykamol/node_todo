const express = require('express')

const router = express.Router()


const userController = require('../controllers/user')


router.post('/', userController.createUser)

router.get('/', (req, res) => {
  res.send('users routs')
})

module.exports = router