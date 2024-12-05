import Cookies from 'js-cookie'

function loggedInUserId () {
    return localStorage.getItem('uid') 
}

function isUserAuthentic () {
    return localStorage.getItem('uid') 
}

const logoutUser = () => {
    // these delete it from the browser
    Cookies.remove('token')
    Cookies.remove('uid')

    localStorage.removeItem('uid')

    // these delete it from the backend server
    const url = `${import.meta.url.VITE_DOMAIN_NAME}/users/logout`
    fetch(url).then((data) => console.log(data)).catch((err) => console.log('will logout from backend authomatically.'))

    window.location = '/'
}


export { isUserAuthentic, loggedInUserId, logoutUser }