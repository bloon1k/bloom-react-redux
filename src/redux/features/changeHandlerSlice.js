import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isUserNameChanged: false,
    currentUserNameValue: ''
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
        clearChangeHandler: state => {
            state.isUserNameChanged = false
            state.currentUserNameValue = ''
        }
    }
})

export const {
    startUserNameChange,
    stopUserNameChange,
    setCurrentUserNameValue,
    clearChangeHandler
} = changeHandlerSlice.actions
export default changeHandlerSlice.reducer
