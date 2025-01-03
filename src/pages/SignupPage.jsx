import React, { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import { postData, toastMsg } from '../utility'
import { FaFaceSmileBeam } from "react-icons/fa6";
import { TiArrowBackOutline } from "react-icons/ti";

function Signup() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const handleSignupUser = (e) => {
        e.preventDefault()

        // confirm user is connected to internet
        console.log('online status: ',navigator.onLine)
        if(!navigator.onLine){
            console.log('commes')
            toastMsg('No internet connection. Check your network settings.', 'error')
            return
        }

        const formData = new FormData(e.target)
        const userInputData = {}

        // Iterate over the form data
        for (const [key, value] of formData.entries()) {
            userInputData[key] = value
        }

        setLoading(true)

        // registering a new user
        const endpoint = `users/register`
        postData(endpoint, userInputData)
        .then((data) => {
            if(data instanceof Object) {
                toastMsg('Registration ✅')
                navigate('/login') 
            }
        })
        .finally(() => {
            setLoading(false)
        })

    }

  return (
    <section className='w-dvw h-dvh bg-slate-800 text-slate-200 py-4 flex justify-center items-center '>
        <form 
            className='w-3/4 md:w-2/5 drop-shadow-xl rounded border-t-2 border-t-slate-700 p-3 py-2 shadow-lg shadow-slate-600'
            onSubmit={handleSignupUser}
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
                <FaFaceSmileBeam size={60}  className={`${loading && 'animate-bounce'}`}/>
                <p className='text-2xl text-pretty font-semibold'>Sign Up</p>
            </div>

            <div className='flex flex-col gap-3 items-center p-3 '>
                <Input 
                    name={'name'} 
                    type={'text'} 
                    background='bg-slate-800'
                    color={'text-slate-300'}
                    border={'border border-slate-700'}
                    required={true}
                />
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
                    bg='bg-blue-900' hover='hover:bg-blue-800' 
                    color={'text-slate-300'}
                    margin={'mt-3'}
                >
                    {loading ? 'Registering...' : 'Signup'}
                </Button>
            </div>
            <p className='text-center text-sm'>
                Already Have Account ?
                <Link
                    to={'/login'}
                    state={{from: 'register'}} 
                    className='cursor-pointer text-sky-600 hover:text-sky-400 transition-all text-xs text-semibold'
                >
                     &ensp; SignIn
                </Link>
            </p>
        </form>
    </section>
  )
}

export default Signup