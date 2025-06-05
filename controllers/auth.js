const userDAO = require('../dao/user')
require('../helpers/loadEnv')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS)




const hashPassword = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, saltRounds)
}

const signup = async (req, res) => {
  const data = {...req.body}
  try{
    const encryptedPassword = await hashPassword(data.password)
    console.log('encrypted password', encryptedPassword);
    data.password = encryptedPassword;
    const [user] = await userDAO.createUser(data);
    return res.status(201).json({user, message : 'user created successfully'})
  } catch(err) {
    let errorMsg = err.code === 'ER_DUP_ENTRY' ? 'Email already exists' : err.message
    return res.status(500).json({error: 'user creation failed', message: errorMsg})
  }
}

const login = async (req, res) => {
  const {email, password} = {...req.body}

  try{
    const user = await userDAO.getUserByEmail(email);
    if(!user) return res.status(404).json({error: 'user not found', message: `No user exist with email ${email}`})
    
    const isTrue = await bcrypt.compare(password, user.password);
    if(!isTrue) return res.status(400).json({error: "wrong password", message:"please check your password"})

    const accessToken = jwt.sign({user: user.email}, process.env.ACCESS_TOKEN_SECRET);

    return res.status(200).json({accessToken, message: 'user login successful'})
    
  } catch(err) {
    return res.status(500).json({error: 'failed to fetch user', message: err.message})
  }

}

module.exports = {
  login, signup
}