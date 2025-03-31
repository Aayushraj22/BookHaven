import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../../utility";

const InitialState = {
    purchaseList: undefined,
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

const purchasedSlice = createSlice({
    name: 'purchase',
    initialState: InitialState,
    reducers: {
        addPurchasedBook: (state,action) => {
            state.purchaseList.push(action.payload)
        }
    },
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

    
    }
})

export const { addPurchasedBook }  = purchasedSlice.actions
export default purchasedSlice.reducer