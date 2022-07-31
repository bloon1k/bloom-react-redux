import {configureStore} from '@reduxjs/toolkit'
import themeReducer from '../features/themeSlice'
import authReducer from '../features/authSlice'
import fireAuthReducer from '../features/fireAuthSlice'
import userDataReducer from '../features/userDataSlice'
import signInErrorReducer from '../features/signInErrorSlice'

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        auth: authReducer,
        fireAuth: fireAuthReducer,
        userData: userDataReducer,
        signInError: signInErrorReducer,
    },
})
