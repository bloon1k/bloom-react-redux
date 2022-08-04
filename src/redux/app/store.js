import {configureStore} from '@reduxjs/toolkit'
import themeReducer from '../features/themeSlice'
import authReducer from '../features/authSlice'
import firebaseReducer from '../features/firebaseSlice'
import userDataReducer from '../features/userDataSlice'
import errorsReducer from '../features/errorsSlice'

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        auth: authReducer,
        firebase: firebaseReducer,
        userData: userDataReducer,
        errors: errorsReducer,
    },
})
