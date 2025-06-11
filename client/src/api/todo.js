import axios from "axios"
import Cookies from 'js-cookie'

const uri = `${import.meta.env.VITE_API_URI}/todo`
const accessToken = Cookies.get('accessToken')

const config = {
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
}


export const getAlltodos = (userId) => {
  return axios.get(uri + `/all/${userId}`, config)
}


export const createTodo = (data) => {
  return axios.post(uri, data, config)
}

export const changeState = (todoId, status) => {
  return axios.put(uri + `/${todoId}`, {update : status}, config)
}

export const deleteTodo = (todoId) => {
  return axios.delete(uri + `/${todoId}`, config)
}