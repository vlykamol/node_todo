const jwt = require('jsonwebtoken')
require('../helpers/loadEnv')

module.exports = {
  jwtAuth : (req, res, next) => {
    
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) return res.status(404).json({error: 'auth token null', message : 'please login again'})

    try {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    } catch(err) {
      return res.status(500).json({error: 'Authorization failed', message: 'user don\'t have access'})
    }

    next()
  }
}