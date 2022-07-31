import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    email: '',
    password: ''
}

const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        changedEmail: (state, action) => {
            state.email = action.payload
        },
        changedPassword: (state, action) => {
            state.password = action.payload
        }
    }
})

export const {changedEmail, changedPassword} = userDataSlice.actions
export default userDataSlice.reducer