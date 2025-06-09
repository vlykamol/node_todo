import React, { useEffect, useRef } from 'react'
import Header from '../components/authPage/Header'
import TextInput from '../components/TextInput'
import { EmailSVG, LockSVG } from '../assets/Icons'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {

  const { loginUser } = useAuth()

  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  useEffect(() => {
    emailRef.current.focus()
  }, [])

  const handleFormsubmit = (e) => {
    e.preventDefault()
    loginUser({email : emailRef.current.value, password : passwordRef.current.value})
  }
  
  
  return (
    <div className='w-full h-screen grid items-center'>

    <div className='bg-[#f7f5f4] w-full h-screen flex justify-center items-center sm:flex-col sm:max-w-2xl sm:mx-auto sm:h-min rounded-md px-2 py-4'>
          
      <div className='hidden sm:block w-full'>
      <Header />
      </div>

      <div className='bg-white rounded-2xl max-w-96 w-full sm:mx-auto grow p-4 my-4'>
        <h1 className='text-2xl font-bold'>Lets Start Organizing</h1>
        <h2 className='text-gray-400'>Please login or sign up to continue</h2>
        <form className='py-2' onSubmit={handleFormsubmit}>
          <div className='flex flex-col gap-2 py-2'>
          <TextInput icon={<EmailSVG className={'stroke-zinc-600 stroke-[1.5px]'}/>} placeholder={'Your Email'} ref={emailRef} type='email'/>
          <TextInput icon={<LockSVG className={'stroke-zinc-600 stroke-[1.5px]'}/>} placeholder={'Your Password'} ref={passwordRef} type='password' />
          </div>
          <button type='submit' className='w-full bg-orange-400 p-2 font-semibold text-white rounded-xl'>Login</button>
        </form>
        <div className='text-gray-400'>Don't have an Account? <Link className='text-gray-800' to={'/signup'}>Sign Up</Link></div>

      </div>

    </div>
    </div>
  )
}
