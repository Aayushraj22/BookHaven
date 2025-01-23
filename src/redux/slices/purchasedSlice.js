import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../../utility";

const InitialState = {
    purchaseList: [],
    total: 0,
}

export const setUserPurchasedBook = createAsyncThunk('purchasedSlice/setUserPurchasedBook', async (userId) => {
    const endpoint = `users/myBooks?userId=${userId}`

    try {
        const response = await fetchData(endpoint)
        return response 
    } catch (error) {
        throw new Error()
        
    }
})

export const addPurchasedBook = createAsyncThunk('purchasedSlice/addPurchasedBook', async () => {
    const endpoint = ``

    try {
        const response = await fetchData(endpoint)
        return response
    } catch (error) {
        throw new Error()
    }
})

const purchasedSlice = createSlice({
    name: 'purchase',
    initialState: InitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(setUserPurchasedBook.fulfilled, (state,action) => {
            state.purchaseList = [ ...action.payload ]
            state.total = action.payload.length
        })
        .addCase(setUserPurchasedBook.rejected, (state) => {
            state.purchaseList = [],
            state.total = 0
        })

        builder
        .addCase(addPurchasedBook.fulfilled, (state,action) => {
            if(action.payload === 'congratulation Reader 👍') {
                return; // do nothing
            } else {
                state.push(action.payload)
            }
        })
        .addCase(addPurchasedBook.rejected, (state,action) => {
            state = state
        })
    }
})


export default purchasedSlice.reducer