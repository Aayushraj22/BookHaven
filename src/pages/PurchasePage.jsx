import React, { useEffect, useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { loggedInUserId } from '../utility'

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

    function handleChangeQuantity (type) {
        if(type === 'inc'){
            // some logic happens to check in the db for availability
            setQty(qty + 1)
        } else {
            // never becomes 0
            if(qty !== 1){
                setQty(prev => prev - 1)
            }
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
        purchase.price = book.price;
        purchase.paid = '$'+formData.paid;
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
        purchase.userId = loggedInUserId()

        console.log('purchase obj: ',purchase)

        axios.post(`${import.meta.env.VITE_DOMAIN_NAME}/books/${book?.id}/purchase`, purchase, {withCredentials: true})
        .then(() => {
            navigate('/myBooks')
        }).catch(err => {
            console.log('while purchasing error happens, ',err)
        })

    }

    // console.log('purchasing user: ',user)

    useEffect(() => {
        const userId = loggedInUserId()
        const url = `${import.meta.env.VITE_DOMAIN_NAME}/users/${userId}`

      axios.get(url, {withCredentials: true})
      .then(response => setUser(response.data))
      .catch(err => console.log('user fetching error'))
    }, [])
    
  return (
    <section className='bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600 min-h-dvh p-2 lg:p-7'>
        <header className='p-3 w-10/12 mx-auto rounded bg-sky-200'> 
            <p><span className='capitalize font-semibold'>{purchaseWay}</span> Book <span className='capitalize font-semibold'>{book?.name}</span> written by <span className='capitalize font-semibold'>{book?.author}</span> at <span className='capitalize font-semibold'>{book?.publishedAt}</span></p>
            <p>You have to Pay <span className='capitalize font-semibold text-green-600'>{book?.price}</span></p>
            <p>
                Quantity {qty} 
                <Button 
                    width='w-6' 
                    height='h-6' 
                    bg='bg-green-600' 
                    color='text-slate-50' 
                    margin='ml-1' 
                    text='font-bold text-xs' 
                    clickMethod={() => handleChangeQuantity('inc')}
                >
                    +
                </Button>
                <Button 
                    width='w-6' 
                    height='h-6' 
                    bg='bg-red-600' 
                    color='text-slate-50' 
                    margin='ml-1' 
                    text='font-bold text-xs' 
                    clickMethod={() => handleChangeQuantity('dec')}
                >
                    -
                </Button>
            </p>
        </header>

        <div className='mx-auto w-9/12 mt-4 p-3 bg-yellow-500 rounded-lg'>
            <p>Thinking of change Purchasing Way ? </p>
            <Button 
                text='capitalise' 
                color='text-yellow-200' 
                bg='bg-black'
                margin='mt-2' 
                clickMethod={handleChangePurchaseWay}
            >
                {purchaseWay === 'rent' ? 'buy' : 'rent'} book
            </Button>
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
            <div className='flex gap-2'>
                <Button 
                    bg='bg-sky-800' 
                    color='text-white' hover='hover:bg-blue-950 hover:text-white'
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
            {showWarning ? <p className='bg-red-600 text-red-300 font-semibold font-mono capitalize text-xs p-2 rounded border-b-2 border-b-red-800'>{showWarning}</p> : ''}
        </form>
    </section>
  )
}

export default PurchasePage