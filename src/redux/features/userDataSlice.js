import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    userName: '',
    email: '',
    password: '',
    photoURL: '',
}

const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setUserName: (state, action) => {
            state.userName = action.payload
        },
        setEmail: (state, action) => {
            state.email = action.payload
        },
        setPassword: (state, action) => {
            state.password = action.payload
        },
        setPhoto: (state, action) => {
            state.photoURL = action.payload
        },
        clearUserData: (state) => {
            state.userName = ''
            state.email = ''
            state.password = ''
            state.photoURL = ''
        }
    }
})

export const {setEmail, setPassword, setPhoto, setUserName, clearUserData} = userDataSlice.actions
export default userDataSlice.reducer