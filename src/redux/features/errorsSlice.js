import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    signInError: '',
    signUpError: ''
}

const errorsSlice = createSlice({
    name: 'errors',
    initialState,
    reducers: {
        occurredSignInError: (state, action) => {
            state.signInError = action.payload
        },
        occurredSignUpError: (state, action) => {
            state.signUpError = action.payload
        }
    }
})

export const {occurredSignInError, occurredSignUpError} = errorsSlice.actions
export default errorsSlice.reducer