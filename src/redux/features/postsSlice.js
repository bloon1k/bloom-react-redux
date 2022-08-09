import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    postList: [],
    currentPostWatched: {},
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.postList = action.payload
        },
        addPost: (state, action) => {
            state.postList = [...state.postList, action.payload]
        },
        setCurrentPostWatched: (state, action) => {
            state.currentPostWatched = action.payload
        },
    }
})

export const {setPosts, addPost, setCurrentPostWatched} = postsSlice.actions
export default postsSlice.reducer