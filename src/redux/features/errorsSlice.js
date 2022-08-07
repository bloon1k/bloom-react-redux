import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    signInError: '',
    signUpError: '',
    changeUserNameError: '',
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
        },
        occurredChangeUserNameError: (state, action) => {
            state.changeUserNameError = action.payload
        }
    }
})

export const {occurredSignInError, occurredSignUpError, occurredChangeUserNameError} = errorsSlice.actions
export default errorsSlice.reducer