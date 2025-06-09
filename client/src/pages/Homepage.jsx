import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Homepage() {
  const [date, setDate] = useState(() => {
    const now = new Date(Date.now());
    const day = now.getDay();
    const date = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    return {date, month, year, day}
  })

  return (
    <div className='w-full h-screen' >
      <Header />
      <div className='bg-[#f7f5f4] w-full h-screen flex justify-center items-center sm:flex-col sm:max-w-2xl sm:mx-auto sm:h-min rounded-md px-2 py-4'>
        todos
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
