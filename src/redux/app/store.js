import {configureStore} from '@reduxjs/toolkit'
import themeReducer from '../features/themeSlice'
import authReducer from '../features/authSlice'
import fireAuthReducer from '../features/fireAuthSlice'
import userDataReducer from '../features/userDataSlice'
import errorsReducer from '../features/errorsSlice'

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        auth: authReducer,
        fireAuth: fireAuthReducer,
        userData: userDataReducer,
        errors: errorsReducer,
    },
})
