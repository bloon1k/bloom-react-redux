import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    userID: '',
    userName: '',
    email: '',
    password: '',
    photoURL: '',
}

const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setUserID: (state, action) => {
            state.userID = action.payload
        },
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
            state.userID = ''
            state.userName = ''
            state.email = ''
            state.password = ''
            state.photoURL = ''
            state.followers = []
            state.following = []
        }
    }
})

export const {
    setUserID,
    setUserName,
    setEmail,
    setPassword,
    setPhoto,
    clearUserData
} = userDataSlice.actions
export default userDataSlice.reducer