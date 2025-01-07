import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import Button from '../components/Button'
import { postData, setLocalStorage, toastMsg } from '../utility'
import { FaFaceSmile } from "react-icons/fa6";
import { TiArrowBackOutline } from "react-icons/ti";

function Signin() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const location =  useLocation()

    const previousPath = location.state?.from || undefined

    const handleSigninUser = (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const userInputData = {}

        // Iterate over the form data
        for (const [key, value] of formData.entries()) {
            userInputData[key] = value
        }

        setLoading(true)

        // registering a new user
        const endpoint = `users/login`
        postData(endpoint, userInputData, {withCredentials: true})
        .then(data => {
            if(data instanceof Object){
                setLocalStorage('uid', data.uid)
                toastMsg('User Signed-In', 'success')
                navigate(previousPath === 'register' ? `/` : -1)
            }
        }).finally(() => {
            setLoading(false)
        })
    }

  return (
    <section className='w-dvw h-dvh bg-slate-800 text-slate-200 py-4 flex flex-col justify-center items-center'>
        <form 
            className='w-3/4 md:w-2/5  drop-shadow-xl rounded border-t-2 border-t-slate-700 p-3 py-2 shadow-lg shadow-slate-600'
            onSubmit={handleSigninUser}
        >
            <div className='w-full'>
                <Link 
                    to='/'
                    title='Back to Home'  
                >
                    <TiArrowBackOutline size={20}
                    className=' w-8 h-8 text-slate-200 hover:text-red-500 transition-all'
                    />
                </Link>
            </div>
            <div className='w-full flex flex-col items-center p-2 py-3'>
                <FaFaceSmile size={60}  className={`${loading && 'animate-bounce'}`}/>
                <p className='text-2xl text-pretty font-semibold'>Sign In</p>
            </div>
            <div className='flex flex-col gap-3 items-center mt-4 p-3'>
                <Input 
                    name={'email'} 
                    type={'email'} 
                    background='bg-slate-800' 
                    color={'text-slate-300'} 
                    border={'border border-slate-700'}
                    required={true}
                />
                <Input 
                    name={'password'} 
                    type={'password'} 
                    background='bg-slate-800' 
                    color={'text-slate-300'} 
                    border={'border border-slate-700'}
                    required={true}
                />
                <Button 
                    bg='bg-blue-900' 
                    hover='hover:bg-blue-800'
                    color={'text-slate-300'} 
                    margin={'mt-3'}
                >
                    {loading ? 'Signing...' : 'SignIn'}
                </Button>
            </div>
            <p className='text-center text-sm'>
                Don't have an Account ?
                <Link 
                    to='/register'
                    className='cursor-pointer text-sky-600 hover:text-sky-400 text-xs text-semibold transition-all'
                >
                    &ensp; Register Now
                </Link>
            </p>
        </form>


    </section>
  )
}

export default Signin