import Cookies from 'js-cookie'
import axios from 'axios'
import { toast } from 'react-toastify'

function isUserAuthentic () {
    return localStorage.getItem('uid') 
}

const logout = (navigate) => {
    // logout user in backend server (dead cookie)
    const endpoint = `users/logout`
    fetchData(endpoint)
    .then((data) => {
        if(data) {
            // these delete it from the browser
            Cookies.remove('token')
            Cookies.remove('uid')
            removeKeyFromLocalStorage('uid')
            
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

        navigate(`/errorPage`, {
            state: {
                error: err
            }
        })

        return undefined
    }
}

async function postData(endpoint, data, options) {

    const url = `${import.meta.env.VITE_DOMAIN_NAME}/${endpoint}`

    try {
        const response = options ? await axios.post(url, data, options) : await axios.post(endpoint, data)
        return response.data
    } catch (error) {
        // console.log(`posting Data error: ${error.message}`)
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


export { 
    isUserAuthentic, 
    logout, 
    fetchData,
    postData, 
    setLocalStorage,
    readLocalStorage,
    removeKeyFromLocalStorage,
    toastMsg,

}