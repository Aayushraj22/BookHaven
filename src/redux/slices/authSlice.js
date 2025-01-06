import { createSlice } from "@reduxjs/toolkit"

const InitialState = {
    status: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: InitialState,
    reducers: {
        // this method will be used to set the logged-In status of user
        userLoggedInStatus: (state, action) => {
            state.status = action.payload.isLoggedIn
        }
    }
})

export const {userLoggedInStatus} = authSlice.actions
export default authSlice.reducer