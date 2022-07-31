import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    theme: 'dark'
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changed: (state) => {
            state.theme === 'dark' ? state.theme = 'light' : state.theme = 'dark'
        }
    }
})

export const {changed} = themeSlice.actions
export default themeSlice.reducer
