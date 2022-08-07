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
        }
    }
})

export const {startUserNameChange, stopUserNameChange, setCurrentUserNameValue} = changeHandlerSlice.actions
export default changeHandlerSlice.reducer
