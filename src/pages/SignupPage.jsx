import React from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Signup() {
    const navigate = useNavigate()

    const handleSignupUser = (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const userInputData = {}

        // Iterate over the form data
        for (const [key, value] of formData.entries()) {
            userInputData[key] = value
        }

        // registering a new user
        axios.post(`${import.meta.env.VITE_DOMAIN_NAME}/users/register`, userInputData).
        then(() => {
            console.log('user register success')
            navigate('/login')
        })

        // console.log('form data: ',userInputData)
    }
  return (
    <section className='w-dvw h-dvh bg-slate-900 text-slate-200 py-4 flex justify-center items-center '>
        <form 
            className='w-10/12 h-4/6 bg-slate-950 grid grid-cols-1 rounded p-3 border-r-2 border-r-slate-700'
            onSubmit={handleSignupUser}
        >
            <p className='text-2xl text-pretty font-semibold '>Create Account</p>
            <div className='flex flex-col gap-3 items-center '>
                <Input name={'name'} type={'text'} />
                <Input name={'email'} type={'email'} />
                <Input name={'password'} type={'password'} />
                <Button 
                    bg='bg-blue-950' hover='hover:bg-blue-900' margin={'mt-3'}
                    color={'text-slate-500'}
                >
                    SignUp
                </Button>
            </div>
            <div className='flex justify-center items-center gap-3 '>
                Already Have Account ?
                <Button 
                    type='button'
                    bg='bg-stone-900' 
                    hover={'hover:bg-stone-800'}
                    color={'text-stone-600'} 
                    clickMethod={() => {navigate('/login')}} 
                >
                    SignIn
                </Button>
            </div>
        </form>
    </section>
  )
}

export default Signup