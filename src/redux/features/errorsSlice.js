import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    signInError: '',
    signUpError: '',
    changeUserNameError: '',
    missingImageError: '',
    searchError: '',
    sendMessageError: '',
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
        },
        occurredSearchError: (state, action) => {
            state.searchError = action.payload
        },
        occurredSendMessageError: (state, action) => {
            state.sendMessageError = action.payload
        },
        clearErrors: state => {
            state.signInError = ''
            state.signUpError = ''
            state.changeUserNameError = ''
            state.missingImageError = ''
            state.searchError = ''
            state.sendMessageError = ''
        }
    }
})

export const {
    occurredSignInError,
    occurredSignUpError,
    occurredChangeUserNameError,
    occurredMissingImageError,
    occurredSearchError,
    occurredSendMessageError,
    clearErrors
} = errorsSlice.actions
export default errorsSlice.reducer