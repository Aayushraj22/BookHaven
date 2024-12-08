import React, { useEffect, useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { useLocation, useNavigate } from 'react-router-dom'
import { fetchData, postData, readLocalStorage } from '../utility'

function PurchasePage() {
    const navigate = useNavigate()
    const {state} = useLocation()
    const [book, setBook] = useState(state?.book)
    const [purchaseWay, setPurchaseWay] = useState(state?.pType)
    const [showWarning, setShowWarning] = useState('')
    const [user, setUser] = useState({})
    const [qty, setQty] = useState(state?.book?.qty || 1)

    // const isLoggedIn = isUserAuthentic()

    const handleChangePurchaseWay = () => {
        setPurchaseWay(prev => prev === 'rent' ? 'buy' : 'rent')
    }

    // qty will increase by 1 but if parament passed tty decreases by 1
    function handleChangeQuantity (sign=false) {
        const newValue = qty + (-1)**(!!sign)
        if(newValue >= 1){
            setQty(newValue)
        }
    }

    const handleSubmitForm =(e) => {
        e.preventDefault()

        const form = new FormData(e.target)

        const formData = {}
        // Iterate over the FormData
        for(let [key, value] of form.entries()){
            formData[key] = value;
        }

        const purchase = {}

        // including book minor details
        purchase.bookId = book.id;
        // purchase.bookName = book.name;

        // including general details
        purchase.price = book?.price*qty;
        purchase.paid = Number(formData?.paid);
        purchase.pType = purchaseWay;
        purchase.qty = qty

        if(purchase.paid !== purchase.price) { 
            setShowWarning('Pay Right Amount')
            setTimeout(() => {
                setShowWarning('')
            }, 2000);
            return;
        }

        // autherised user ID
        purchase.userId = readLocalStorage('uid')

        // console.log('purchase obj: ',purchase)
        const endpoint = `books/${book?.id}/purchase`
        postData(endpoint, purchase, {withCredentials: true})
        .then(() => {
            navigate('/myBooks')
        }).catch(err => {
            console.log('while purchasing error happens, ',err)
        })

    }

    // console.log('purchasing user: ',user)

    useEffect(() => {
        const userId = readLocalStorage('uid')

        const endpoint = `users/${userId}`
        fetchData(endpoint)
        .then(data => {
            if(data) {
                setUser(data)
            }
        })

    }, [])
    
  return (
    <section className='bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600 min-h-dvh p-2 lg:p-7'>
        <header className='p-3 w-9/12 mx-auto rounded bg-blue-200 flex flex-col items-center text-slate-800'> 
            <p className='capitalize font-serif font-semibold text-base md:text-lg'>{book?.name}</p>
            <p className='capitalize font-semibold text-xs md:text-sm'>{book?.author}</p>
            <div className='text-sm w-full mt-2'>
                <span className='font-semibold text-sm md:text-sm'>{qty} Book </span>
                <Button 
                    width='w-6' 
                    height='h-6' 
                    bg='bg-slate-100 hover:bg-slate-900' 
                    color='text-slate-900 hover:text-sky-200' 
                    margin='ml-1' 
                    text='font-bold text-xs' 
                    clickMethod={() => handleChangeQuantity()}
                >
                    +
                </Button>
                <Button 
                    width='w-6' 
                    height='h-6' 
                    bg='bg-slate-100 hover:bg-slate-900' 
                    color='text-slate-900 hover:text-sky-200' 
                    margin='ml-1' 
                    text='font-bold text-xs' 
                    clickMethod={() => handleChangeQuantity(true)}
                >
                    -
                </Button>
            </div>
        </header>

        <div className='mx-auto w-9/12 mt-4 p-2 bg-pink-300 rounded-md text-xs md:text-sm '>
            <Button 
                text='capitalise' 
                color='text-pink-200 hover"text-pink-300' 
                bg='bg-pink-700 hover:bg-pink-600'
                margin='mr-2' 
                clickMethod={handleChangePurchaseWay}
            >
                {purchaseWay === 'rent' ? 'rent' : 'buy'} book
            </Button>
            <span>Total <span className='font-semibold'>$ {book?.price*qty}</span></span>
        </div>

        <form 
            className='w-9/12 mx-auto flex flex-col gap-4 mt-7'
            onSubmit={handleSubmitForm}
        >
            <Input name='name' border='border' pValue={user?.name} required />
            <Input name='email' type='email' pValue={user?.email} required />
            <Input name='address' />
            <Input name='phone no' type='tel' pValue={user?.phoneNo} required />
            <Input name='paid' type='Number' required />

            {showWarning ? <p className='bg-red-300 text-red-600 font-semibold font-mono capitalize text-xs p-2 rounded border-b-2 border-b-red-800'>{showWarning}</p> : ''}

            <div className='flex gap-2'>
                <Button 
                    bg='bg-blue-700' 
                    color='text-white' hover='hover:bg-blue-800 hover:text-white'
                >
                    submit
                </Button>
                <Button 
                    hover='hover:bg-red-700 hover:text-white' 
                    clickMethod={() => navigate(-1)}
                >
                    cancel
                </Button>
            </div>
        </form>
    </section>
  )
}

export default PurchasePage