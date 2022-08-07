import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    followers: [],
    following: [],
}

const followersDataSlice = createSlice({
    name: 'followersData',
    initialState,
    reducers: {
        setFollowers: (state, action) => {
            state.followers = action.payload
        },
        setFollowing: (state, action) => {
            state.following = action.payload
        },
    }
})

export const {setFollowers, setFollowing} = followersDataSlice.actions
export default followersDataSlice.reducer