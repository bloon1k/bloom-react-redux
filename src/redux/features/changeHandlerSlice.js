import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isUserNameChanged: false,
    currentUserNameValue: '',
    isLoading: false,
}

const changeHandlerSlice = createSlice({
    name: 'changeHandler',
    initialState,
    reducers: {
        startUserNameChange: (state, action) => {
            state.isUserNameChanged = true
        },
        stopUserNameChange: (state, action) => {
            state.isUserNameChanged = false
        },
        setCurrentUserNameValue: (state, action) => {
            state.currentUserNameValue = action.payload
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        clearChangeHandler: state => {
            state.isUserNameChanged = false
            state.currentUserNameValue = ''
            state.isLoading = false
        }
    }
})

export const {
    startUserNameChange,
    stopUserNameChange,
    setCurrentUserNameValue,
    setIsLoading,
    clearChangeHandler
} = changeHandlerSlice.actions
export default changeHandlerSlice.reducer
