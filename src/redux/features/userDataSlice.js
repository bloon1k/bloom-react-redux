import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    email: '',
    password: '',
    name: '',
    photoURL: '',
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
        },
        changedPhoto: (state, action) => {
            state.photoURL = action.payload
        },
        changedName: (state, action) => {
            state.name = action.payload
        }
    }
})

export const {changedEmail, changedPassword, changedPhoto, changedName} = userDataSlice.actions
export default userDataSlice.reducer