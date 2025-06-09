import { createContext, useContext, useEffect, useState } from "react";
import { login, signup } from "../api/auth";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext)
}


const AuthProvider = ({children}) => {

  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(() => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(localStorage.getItem('user')) : null
  })

  const navigate = useNavigate()

  useEffect(() => {
    if(!user){
      navigate('/login')
      return
    }
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  const signupUser = async (data) => {
    const {firstName, lastName, email, password} = data;
    setLoading(true)
    try {
      const data = await signup(firstName, lastName, email, password)
      if(data.data.user) navigate('/login')
    } catch (err) {
      console.log('error while sign up', err.response.data);
    }
    setLoading(false)
  }

  const loginUser = async (data) => {
    const {email, password} = data;
    setLoading(true)
    try {
      const user = await login(email, password);
      if(user.data.accessToken){
        Cookies.set('accessToken', user.data.accessToken, {expires : 1});
        setUser(user.data.user)
      }
      navigate('/')
    } catch (err) {
      console.log('error while login', err);
    }
    setLoading(false)
  }

  const logoutUser = () => {
    setLoading(true)
    localStorage.clear()
    Cookies.remove('accessToken')
    setUser(null)
    setLoading(false)
  }


  const value = {
    user,
    loading,
    signupUser, 
    loginUser,
    logoutUser
  }

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider