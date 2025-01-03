import Cookies from 'js-cookie'
import axios from 'axios'
import { toast } from 'react-toastify'
import { resetWishlist } from './redux/slices/WishlistSlice'

function isUserAuthentic () {
    return localStorage.getItem('uid') 
}

const logout = (navigate, dispatch) => {
    // logout user in backend server (dead cookie)
    const endpoint = `users/logout`
    fetchData(endpoint)
    .then((data) => {
        if(data) {
            // these delete it from the browser
            Cookies.remove('token')
            Cookies.remove('uid')
            removeKeyFromLocalStorage('uid')

            // remove wish state 
            dispatch(resetWishlist())
            
            toastMsg('Sign Out ✅', 'success')
            navigate('/')
        } else {
            toastMsg('Sign Out ❌', 'error')
        }
    })
}

async function fetchData(endpoint, navigate) {

    const url = `${import.meta.env.VITE_DOMAIN_NAME}/${endpoint}`

    try {
        const response = await axios.get(url, {withCredentials: true})
        return response.data
    } catch (error) {
        const err = {
            code: error?.code,
            message: error.message,
        }

        // console.log('error occues: ',error.message)
        if(navigate) {
            navigate(`/errorPage`, {
                state: {
                    error: err
                }
            })
        }

        return undefined
    }
}

async function postData(endpoint, data, options) {

    const url = `${import.meta.env.VITE_DOMAIN_NAME}/${endpoint}`

    try {
        const response = options ? await axios.post(url, data, options) : await axios.post(url, data)
        return response.data
    } catch (error) {
        if(error.message === 'Network Error') {
            toastMsg(errMsg, 'error')
            return undefined;
        }

        const response = await error.response
        // console.log('error: ',error)
        // console.log(`${response.data}`,error.status)
        toastMsg(`${response.data}`, 'error')
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
}