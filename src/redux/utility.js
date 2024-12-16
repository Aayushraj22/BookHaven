import { useDispatch, useSelector } from "react-redux";

function useSlice(name) {
    const slice = useSelector(state => state[name])
    const dispatch = useDispatch()


    return [ slice, dispatch ]
}



export {
    useSlice, 
}