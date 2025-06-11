import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { changeState, createTodo, deleteTodo, getAlltodos } from '../api/todo';
import Modal from '../components/Model';
import TextInput from '../components/TextInput';

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function Homepage() {

  const { user } = useAuth()
  const [todos, setTodos] = useState([])
  const [showModal, setShowModal] = useState(false)

  const titleRef = useRef(null)
  const descriptionRef = useRef(null)

  const [date, setDate] = useState(() => {
    const now = new Date(Date.now());
    const day = now.getDay();
    const date = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    return {date, month, year, day}
  })

  const getTodos = async (userId) => {
    try {
      const response = await getAlltodos(userId);
      if(response.data.todos)
        setTodos(response.data.todos)
    } catch (err) {
      console.log('error while getting todos', err);
      setTodos([])
    }
  }

  const handleCreateTodo = async () => {
    const data = {
      title : titleRef.current.value,
      description : descriptionRef.current.value,
      user_id : user.id
    }
    try {
      const response = await createTodo(data)
      console.log('response after creating todo', response);

      getTodos(user.id)
    } catch (err) {
      console.log('error while creating todos', err);
    }
    setShowModal(false)

  }

  useEffect(() => {
    if(!user) return
    getTodos(user.id)
  },  [user])

  return (
    <div className='w-full h-screen' >
      <Header />
      <div className='bg-[#f7f5f4] w-full h-screen flex flex-col sm:flex-col sm:max-w-2xl sm:mx-auto sm:h-min rounded-md px-2 py-4 mt-8'>
        <div className='flex justify-between items-center h-min w-full'>
          { date && 
            <div className='font-bold text-xl'>{days[date.day]}, {date.date} {months[date.month]}</div>}
            <div>
              <button onClick={() => setShowModal(true)} className='bg-orange-500 flex justify-center gap-3 items-center w-full min-w-fit p-2 rounded-lg text-white text-center'><span className='block w-7 aspect-square border rounded-full font-bold'>+</span> New Task</button>
              {showModal && (<Modal onClose={() => setShowModal(false)}>
                <div className='flex flex-col gap-2'>
                <label>Title</label>
                <TextInput placeholder={'Add your Todo title'} ref={titleRef} />
                <label>
                  Description
                </label>
                <TextInput placeholder={'Add description here'} ref={descriptionRef} />

                <button onClick={handleCreateTodo} className='bg-orange-500 text-white p-2 mt-4 rounded-lg'>Create Todo</button>
                </div>
              </Modal>)}
            </div>
        </div>
        <div className='flex flex-col gap-4 mt-4'>
          {todos.filter(todo => !todo.completed).map((todo, key) => {
            return <Todo key={key} todo={todo} getTodos={getTodos} />
          })}
        </div>

        <div className='mt-4 text-xl font-semibold underline'>Completed Todos</div>
        <div className='flex flex-col gap-4 mt-4'>
          {todos.filter(todo => todo.completed).map((todo, key) => {
            return <Todo key={key} todo={todo} getTodos={getTodos} />
          })}
        </div>
      </div>
    </div>
  )
}

const Todo = ({todo, getTodos}) => {
  const {user} = useAuth()
  const handleDone = async () => {
    try {
      const response = await changeState(todo.id, todo.completed ? false : true)
      console.log('res', response);
    } catch (err) {
      console.log('error while changing state of todo', err);
    }
    getTodos(user.id)
  }

  const handleDelete = async () => {
    try {
      const response = await deleteTodo(todo.id)
      console.log('res', response); 
    } catch (err) {
      console.log('error while deleting todo', err);
    }
    getTodos(user.id) 

  }
  return (
    <div className='bg-orange-100 p-2 border-2'>
      <div className='flex justify-between gap-4'>
        <div className={`capitalize text-xl font-bold ${todo.completed ? 'line-through' : ''}`}>
          {todo.title}
        </div>
         
        <div className='flex gap-2'>
          <button onClick={handleDone} className='bg-green-500 text-white px-2 py-1 rounded-lg '>{!todo.completed ? `Done` : 'Un - Done'}</button>
          <button onClick={handleDelete} className='bg-red-500 text-white px-2 py-1 rounded-lg '>Delete</button>
        </div>
      </div>
      <div className='capitalize'>
      {todo.description}
      </div>
    </div>
  )
}


const Header = () => {
  const {user, logoutUser} = useAuth()

  return (
    <div className='bg-orange-400 text-white py-3 px-4 flex justify-between items-center'>
      <div>
        Todos
      </div>

      <div className='relative group/avatar'>
        <div className='w-6 aspect-square rounded-full bg-orange-100 flex items-center justify-center text-orange-950'>
          {user && user.first_name.split('')[0]}
        </div>

        <div className='absolute right-0 pt-2 hidden group-hover/avatar:block'>
          <div className='bg-orange-200 text-orange-800 p-2 rounded-lg'>

          <button onClick={logoutUser}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  )
}
