import axios from 'axios'
import { toast } from 'react-toastify'
import { resetWishlist } from './redux/slices/WishlistSlice'
import { userLoggedInStatus } from './redux/slices/authSlice'
import { resetPurchasedBookList } from './redux/slices/purchasedSlice'

function isUserAuthentic () {
    return localStorage.getItem('uid') 
}

const logout = (navigate, dispatch, cb) => {
    // logout user in backend server (dead cookie)
    const endpoint = `users/logout`
    fetchData(endpoint)
    .then((data) => {
        if(data) {
            removeKeyFromLocalStorage('uid')

            // remove wish state 
            dispatch(resetWishlist())
            dispatch(userLoggedInStatus({
                isLoggedIn: false
            }))
            dispatch(resetPurchasedBookList())
            
            toastMsg('User Logout', 'success')
            cb()
            navigate('/')
        } else {
            toastMsg('User Logout Failed ❌', 'error')
        }
    })
}

async function fetchData(endpoint, navigate) {

    const url = `${import.meta.env.VITE_DOMAIN_NAME}/${endpoint}`

    try {
        const response = await axios.get(url, {withCredentials: true})
        return response.data
    } catch (error) {
        const { data } = await error.response
        
        if(data.message === 'Network Error' && navigate) {
            toastMsg(data.message, 'error')
            navigate(`/errorPage`, {
                state: {
                    error: err
                }
            })
            return undefined;
        }
        
        if(data.status === 401 && navigate) {
            navigate('/login')
        }

        return data
    }
}

async function postData(endpoint, data, options) {

    const url = `${import.meta.env.VITE_DOMAIN_NAME}/${endpoint}`

    try {
        const response = options ? await axios.post(url, data, options) : await axios.post(url, data)
        return response.data
    } catch (error) {
        if(error.message === 'Network Error') {
            toastMsg(error.message, 'error')
            return undefined;
        }

        const {data} = await error.response
        // console.log('error: ',error)
        // console.log(`${response.data}`,error.status)
        toastMsg(`${data.message}`, 'error')
        return undefined
    }
}

async function modifyData(endpoint, data) {
    const url = `${import.meta.env.VITE_DOMAIN_NAME}/${endpoint}`

    try {
        const response = await axios.put(url, data, {withCredentials: true})
        return response.data
    } catch (error) {
        if(error.message === 'Network Error') {
            toastMsg(error.message, 'error')
            return undefined;
        }

        const {data} = await error.response
        // console.log('error: ',error)
        // console.log(`${response.data}`,error.status)
        toastMsg(`${data.message}`, 'error')
        return undefined
    }
}

// delete a document whose id matches, id passed as queryParams
async function deleteData (endpoint, key, value) {
    const url = `${import.meta.env.VITE_DOMAIN_NAME}/${endpoint}?${key}=${value}`

    try {
        const response = await axios.delete(url, { withCredentials: true })
        return response.data
    } catch (error) {
        console.log('error deletion: ',error.message)
        return undefined
    }
}

function setLocalStorage (key, value){
    localStorage.setItem(key, value)
}

function readLocalStorage (key) {
    return localStorage.getItem(key)
}

function removeKeyFromLocalStorage (key) {
    localStorage.removeItem(key)
}

function toastMsg(msg, type){
    if (type == 'success') {
        toast.success(msg)
    } else if (type == 'error') {
        toast.error(msg)
    } else if (type == 'info') {
        toast.info(msg)
    } else if (type == 'warning') {
        toast.warning(msg)
    } else {
        toast(msg)
    }
}

const handleInternetOnline = () => {
    toastMsg('Reconnected. Enjoy browsing!','success')
    console.log('Reconnected. Enjoy browsing!')
}

const handleInternetOffline = () => {
    toastMsg('Internet connection lost. Please reconnect.', 'error')
}

function listenerToCheckInternetConnection(type) {
    if(type == 'add') {
        window.addEventListener('online',handleInternetOnline)
        window.addEventListener('offline',handleInternetOffline)
    } else {
        window.removeEventListener('online', handleInternetOnline)
        window.removeEventListener('offline', handleInternetOffline)
    }
}

/**
 * this method calculate the age from given two date string, date string should be in format dd/mm/yyyy
 * @param {String} d1 
 * @param {String} d2 
 * @returns {Number} age
 */
function getAge (d1, d2) {
    if( !d2 ){
        const date = new Date()
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        
        d2 = `${day}/${month}/${year}`
    }
    
    d1 = d1.split('/')
    d2 = d2.split('/')
    
    const yearGap = (+d2[2]) - (+d1[2]) - 1
    
    const daysInD1 = 365 - calculateLivedDays(+d1[0], +d1[1], +d1[2]) + Number(isLeapYear(+d1[2]))
    
    const daysInD2 = calculateLivedDays(+d2[0], +d2[1], +d2[2]) + Number(isLeapYear(+d2[2]))
    
    return yearGap + daysToYear(daysInD1 + daysInD2)
}

function daysToYear(days) {
    return Math.floor(days / 365)
}

function calculateLivedDays(day, month, year) {
    // console.log(`days: ${day}, month: ${month}, year: ${year}`)
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    
    let days = day;
    
    for(let i=0; i<month-1; i++) {
        days += daysInMonth[i];
    }
    
    if( isLeapYear( year ) ) {
        days += 1
    }
    
    return days
}

function isLeapYear ( year ) {
    if( year % 100 === 0 ) {    // century year
        return !!(year % 400 === 0)     // leap year satisfy
    } 
    
    return !!(year % 4 === 0)   // leap year satisfy
}




export { 
    isUserAuthentic, 
    logout, 
    fetchData,
    postData,
    deleteData, 
    setLocalStorage,
    readLocalStorage,
    removeKeyFromLocalStorage,
    toastMsg,
    listenerToCheckInternetConnection,
    modifyData,
    getAge
}