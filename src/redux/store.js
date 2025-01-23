import { configureStore } from '@reduxjs/toolkit'
import ThemeReducer from './slices/ThemeSlice.js'
import WishReducer from './slices/WishlistSlice.js'
import AuthReducer from './slices/authSlice.js'
import PurchasedReducer from './slices/purchasedSlice.js'

export const store = configureStore({
    reducer: {
        theme: ThemeReducer,
        wish: WishReducer,
        auth: AuthReducer,
        purchase: PurchasedReducer,
    }
})