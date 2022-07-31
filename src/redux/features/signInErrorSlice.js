import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    message: ''
}

const signInErrorSlice = createSlice({
    name: 'signInError',
    initialState,
    reducers: {
        occurredError: (state, action) => {
            state.message = action.payload
        }
    }
})

export const {occurredError} = signInErrorSlice.actions
export default signInErrorSlice.reducer