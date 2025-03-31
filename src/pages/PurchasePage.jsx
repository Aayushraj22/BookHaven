import React, { useEffect, useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { useLocation, useNavigate } from 'react-router-dom'
import { fetchData, postData, readLocalStorage } from '../utility'
import { useDispatch } from 'react-redux'
import { deleteWish } from '../redux/slices/WishlistSlice'
import { addPurchasedBook } from '../redux/slices/purchasedSlice'

function PurchasePage() {
    const navigate = useNavigate()
    const {state} = useLocation()
    const [book, setBook] = useState(state?.book)
    const [purchaseWay, setPurchaseWay] = useState(state?.pType)
    const [user, setUser] = useState({})
    const [qty, setQty] = useState(state?.book?.qty || 1)
    const dispatch = useDispatch()

    // const isLoggedIn = isUserAuthentic()

    const handleChangePurchaseWay = (e) => {
        const value = e.target.value
        setPurchaseWay(value)
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
        purchase.price = book?.price * qty;
        purchase.pType = purchaseWay;
        purchase.qty = qty

        // autherised user ID
        purchase.userId = readLocalStorage('uid')

        const endpoint = `books/${book?.id}/purchase`
        postData(endpoint, purchase, {withCredentials: true})
        .then(() => {
            dispatch(addPurchasedBook({purchase}))
            dispatch(deleteWish(book._id))
            navigate('/myBooks')
        }).catch(err => {
            console.log('while purchasing error happens, ',err)
        })

    }


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
    <section className='bg-gradient-to-b from-cyan-700 via-sky-700/80 to-blue-600/90 min-h-dvh p-4 lg:p-7'>
        <header className='p-3 w-3/4 lg:w-3/5 mx-auto rounded bg-white/40 text-center text-slate-700 shadow-md shadow-white capitalize font-semibold text-lg md:text-2xl font-serif '> 
            {book?.name}
        </header>

        <form 
            className='w-3/4 lg:w-3/5 mx-auto flex flex-col gap-4 mt-7 p-5 pt-7 rounded-md bg-white/40 shadow-md shadow-white'
            onSubmit={handleSubmitForm}
        >
            <Input name='name' border='border' pValue={user?.name} required />
            <Input name='email' type='email' pValue={user?.email} required />
            <Input name='address' />
            <Input name='phone no' type='tel' pValue={user?.phoneNo} required />
            <Input name='paid' type='Number' required pValue={book?.price*qty} />
            <div className='flex items-center'>
            <div className='text-gray-800 text-sm flex-1 select-none'>
                <span className='font-semibold block mb-1'>Purchase Type</span>
                <label className='flex items-center gap-1 w-fit'>
                    <input type='checkbox' name='pType' value='buy' checked={purchaseWay === 'buy'} onClick={handleChangePurchaseWay}  /> 
                    <span className='text-xs'>Buying</span>  
                </label>
                
                <label className='flex items-center gap-1 w-fit '>
                    <input type='checkbox' name='pType' value='rent' checked={purchaseWay === 'rent'} onClick={handleChangePurchaseWay} /> 
                    <span className='text-xs'>Renting</span>  
                </label>
            </div>

            <div className='text-sm flex-1 flex flex-col select-none'>
                <span className='font-semibold block mb-1'>Quantity</span>
                <div className='flex gap-2 items-center'>
                    <Button 
                        width='w-6' 
                        height='h-6' 
                        bg='bg-slate-200 hover:bg-slate-700' 
                        color='hover:text-slate-200' 
                        text='font-bold text-sm' 
                        type={'button'}
                        clickMethod={() => handleChangeQuantity()}
                        >
                        +
                    </Button>
                    <span className='text-xs font-semibold w-5 text-center'>{qty}</span>
                    {qty > 1 && (<Button 
                        width='w-6' 
                        height='h-6' 
                        bg='bg-slate-200 hover:bg-red-700' 
                        color='hover:text-slate-200'
                        text='font-bold text-sm' 
                        type={'button'}
                        clickMethod={() => handleChangeQuantity(true)}
                        >
                        -
                    </Button>)}
                </div>
            </div>
            </div>

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