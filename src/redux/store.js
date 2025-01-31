import { configureStore } from '@reduxjs/toolkit'
import WishReducer from './slices/WishlistSlice.js'
import AuthReducer from './slices/authSlice.js'
import PurchasedReducer from './slices/purchasedSlice.js'

export const store = configureStore({
    reducer: {
        wish: WishReducer,
        auth: AuthReducer,
        purchase: PurchasedReducer,
    }
})