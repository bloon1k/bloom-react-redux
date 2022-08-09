import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    signInError: '',
    signUpError: '',
    changeUserNameError: '',
    missingImageError: '',
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
        },
        occurredMissingImageError: (state, action) => {
            state.missingImageError = action.payload
        }
    }
})

export const {
    occurredSignInError,
    occurredSignUpError,
    occurredChangeUserNameError,
    occurredMissingImageError
} = errorsSlice.actions
export default errorsSlice.reducer