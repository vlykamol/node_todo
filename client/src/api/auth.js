import axios from "axios"

const uri = `${import.meta.env.VITE_API_URI}/auth`


export const signup = (firstName, lastName, email, password) => {  
  return axios.post(uri + '/signup', {first_name: firstName, last_name: lastName, email, password})
}

export const login = (email, password) => {  
  return axios.post(uri + '/login', {email, password})
}

export const logout = () => {

}