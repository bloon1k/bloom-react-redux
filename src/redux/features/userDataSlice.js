import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    id: '',
    email: '',
    password: '',
    name: '',
    surname: '',
    photoURL: '',
}

const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setID: (state, action) => {
            state.id = action.payload
        },
        setEmail: (state, action) => {
            state.email = action.payload
        },
        setPassword: (state, action) => {
            state.password = action.payload
        },
        setName: (state, action) => {
            state.name = action.payload
        },
        setSurname: (state, action) => {
            state.surname = action.payload
        },
        setPhoto: (state, action) => {
            state.photoURL = action.payload
        },
        clearUserData: (state) => {
            state.id = ''
            state.email = ''
            state.password = ''
            state.name = ''
            state.photoURL = ''
        }
    }
})

export const {setID, setEmail, setPassword, setPhoto, setName, setSurname, clearUserData} = userDataSlice.actions
export default userDataSlice.reducer