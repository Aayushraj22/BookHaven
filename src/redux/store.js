import { configureStore } from '@reduxjs/toolkit'
import ThemeReducer from './slices/ThemeSlice.js'
import WishReducer from './slices/WishlistSlice.js'
import AuthReducer from './slices/authSlice.js'

export const store = configureStore({
    reducer: {
        theme: ThemeReducer,
        wish: WishReducer,
        auth: AuthReducer,
    }
})