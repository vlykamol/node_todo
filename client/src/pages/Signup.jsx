import { useRef } from 'react'
import TextInput from '../components/TextInput'
import Header from '../components/authPage/Header'
import { Link } from 'react-router-dom'

export default function Signup() {

  const firstNameRef = useRef(null)
  const lastNameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)


  return (
    <div className='w-full h-screen grid items-center'>

    <div className='bg-[#f7f5f4] w-full h-screen flex justify-center items-center sm:flex-col sm:max-w-2xl sm:mx-auto sm:h-min rounded-md px-2 py-4'>
      
      <div className='hidden sm:block w-full'>
      <Header />
      </div>

      <div className='bg-white rounded-2xl max-w-96 w-full sm:mx-auto grow p-4 my-4'>
        <h1 className='text-2xl font-bold'>Lets Start Organizing</h1>
        <h2 className='text-gray-400'>Please login or sign up to continue</h2>
        <form className='py-2' action="">
          <div className='flex flex-col gap-2 py-2'>
          
          <TextInput placeholder={'First Name'} ref={firstNameRef} />
          <TextInput placeholder={'Last Name'} ref={lastNameRef} />
          <TextInput placeholder={'Your Email'} ref={emailRef} />
          <TextInput placeholder={'Password'} ref={passwordRef} />
          </div>
          <button className='w-full bg-orange-400 p-2 font-semibold text-white rounded-xl'>Sign Up</button>
        </form>

        <div className='text-gray-400'>Already Have An Account? <Link className='text-gray-800' to={'/login'}>Login</Link></div>

      </div>

    </div>
    </div>
  )
}

