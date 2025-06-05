const userDAO = require('../dao/user')


const createUser = async (req, res) => {
  // try{
  //   const user = await userDAO.createUser(req.body);
  //   console.log('on creating user', user);
  //   res.status(201).json({user, message : 'user created successfully'})
  // }catch(err){
  //   res.status(500).json({error: 'user creation failed', message: err.message})
  // }

  userDAO.createUser(req.body).then(data => {
    const id = data[0]
    res.status(201).json({id, message : 'user created successfully'})
  }).catch(err => {
    let errorMsg;
    if(err.code == 'ER_DUP_ENTRY') errorMsg = 'Email already exists';
    res.status(500).json({error: 'user creation failed', message: errorMsg})
  })

}

module.exports = {
  createUser
}