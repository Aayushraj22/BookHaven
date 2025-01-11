import { useDispatch, useSelector } from "react-redux";

function useSlice(name) {
    const slice = useSelector(state => state[name])
    const dispatch = useDispatch()


    return [ slice, dispatch ]
}


function isPresentInWishlist (bookId) {
    const [ slice ] = useSlice('wish')
    return !!slice.wishlist.find(item => item._id === bookId)
}

export {
    useSlice, 
    isPresentInWishlist,
}