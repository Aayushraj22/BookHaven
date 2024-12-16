import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteData, fetchData, postData } from "../../utility";

const initialState = {
    wishlist: [],       // list of book id's
    total: 0,
}

export const fetchAndSetWish = createAsyncThunk('wishSlice/fetchAndSetWish', async () => {
    const endpoint = `wish`
    try {
        const response = await fetchData(endpoint)
        return response
    } catch (error) {
        return null
    }

})

export const addWish = createAsyncThunk('wishSlice/addWish', async (book) => {

    const endpoint = 'wish'
    const response = await postData(endpoint, {bookId: book._id}, {withCredentials: true})
    return {msg: response, book}
})

export const deleteWish = createAsyncThunk('wishSlice/deleteWish', async (id) => {
    const endpoint = 'wish'
    const response = await deleteData(endpoint, 'bookId', id)
    return {msg: response, id}
})

const wishSlice = createSlice({
    name: 'wish',
    initialState,
    reducers: {
        resetWishlist: (state) => {
            state.wishlist = []
            state.total = 0
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchAndSetWish.fulfilled, (state,action) => {
            state.wishlist = action.payload.wishlist
            state.total = action.payload.wishlist.length
        })
        .addCase(fetchAndSetWish.rejected, (state) => {
            state.wishlist = []
            state.total = 0
        })

        builder
        .addCase(addWish.fulfilled, (state,action) => {
            console.log('action: ',action.payload)
            if(action.payload.msg === 'book added into your wish') {
                state.wishlist.push(action.payload.book)
                state.total ++
            }
        })

        builder 
        .addCase(deleteWish.fulfilled, (state,action )=> {
            if(action.payload.msg = 'deleted book from wish') {
                state.wishlist = state.wishlist.filter(item => item._id !== action.payload.id)
                state.total --
            }
        })

    }
})


export const { resetWishlist } = wishSlice.actions 
export default wishSlice.reducer