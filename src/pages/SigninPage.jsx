import React from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import Button from '../components/Button'
import axios from 'axios'

function Signin() {
    const navigate = useNavigate()

    const handleSigninUser = (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const userInputData = {}

        // Iterate over the form data
        for (const [key, value] of formData.entries()) {
            userInputData[key] = value
        }

        // registering a new user
        axios.post(`${import.meta.env.VITE_DOMAIN_NAME}/users/login`, userInputData, {
            withCredentials: true
        }).
        then((response) => {
            console.log('user signin success')
            console.log('sign in data: ',response.data)
            localStorage.setItem('uid', response.data.uid)
            navigate('/')
        })

        // console.log('form data: ',userInputData)
    }
  return (
    <section className='w-dvw h-dvh bg-slate-900 text-slate-200 py-4 flex justify-center items-center '>
        <form 
            className='w-10/12 h-4/6 bg-slate-950 rounded border-r-2 border-r-slate-700 p-3'
            onSubmit={handleSigninUser}
        >
            
                <p className='text-2xl text-pretty font-semibold'>Sign In</p>
                <div className='flex flex-col gap-3 items-center mt-4 p-3'>
                    <Input name={'email'} type={'email'} />
                    <Input name={'password'} type={'password'}/>
                    <Button 
                        bg='bg-blue-950' hover='hover:bg-blue-900'
                        color={'text-slate-500'} 
                        margin={'mt-3'}
                    >
                        SignIn
                    </Button>
                </div>
                <div className='flex justify-center items-center py-4 gap-3'>
                    No Account ?
                    <Button 
                        type='button'
                        bg='bg-stone-900' 
                        hover={'hover:bg-stone-800'}  
                        color={'text-stone-600'}
                        clickMethod={() => {navigate('/register')}} 
                    >
                        Create an Account
                    </Button>
                </div>
        </form>


    </section>
  )
}

export default Signin