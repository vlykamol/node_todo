const userDAO = require('../dao/user')


const createUser = async (req, res) => {
  const data = req.body
  try{
    const [user] = await userDAO.createUser(data);
    return res.status(201).json({user, message : 'user created successfully'})
  }catch(err){
    let errorMsg = err.code === 'ER_DUP_ENTRY' ? 'Email already exists' : err.message
    return res.status(500).json({error: 'user creation failed', message: errorMsg})
  }


  // userDAO.createUser(data).then(data => {
  //   const id = data[0]
  //   res.status(201).json({id, message : 'user created successfully'})
  // }).catch(err => {
  //   let errorMsg;
  //   if(err.code == 'ER_DUP_ENTRY') errorMsg = 'Email already exists';
  //   res.status(500).json({error: 'user creation failed', message: errorMsg})
  // })

}

const getUser = async (req, res) => {
  const {id} = req.params;

  try {
    const user = await userDAO.getUserById(id);
    if(!user) return res.status(404).json({error: 'user not found!', message: `No user exist with id ${id}`})
    return res.status(200).json({user, message: "successful retrive!"})
  } catch (err) {
    return res.status(500).json({error: 'failed to fetch user', message: err.message})
  }

  // userDAO.getUserById(id).then(data => {
  //   console.log('user', data);
  //   if(!data) return res.status(404).json({error: 'user not found!', message: ''})
  //   res.status(200).json({user : data, message: "successful retrive!"})
  // }).catch(err => {
  //   let errorMsg = '';
  //   console.log('err', err);
  //   res.status(404).json({error: 'user not found!', message: errorMsg})
    
  // })
}

module.exports = {
  createUser,
  getUser
}