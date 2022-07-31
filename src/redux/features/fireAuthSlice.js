import {createSlice} from '@reduxjs/toolkit'

// TODO perhaps move init firebase app somewhere to separate file
import {initializeApp} from 'firebase/app'

const firebaseConfig = {
    apiKey: 'AIzaSyCCBLfzpS8WZ0ZoNIrm_w-_CsRfA_cK8_Y',
    authDomain: 'bloom-5c636.firebaseapp.com',
    // The value of `databaseURL` depends on the location of the database
    databaseURL: 'https://bloom-5c636.firebaseio.com',
    projectId: 'bloom-5c636',
    appId: '232930907105',
}

const app = initializeApp(firebaseConfig)

const initialState = {
    app: app
}

const fireAuthSlice = createSlice({
    name: 'fireAuth',
    initialState,
    reducers: {
        //
    }
})

export default fireAuthSlice.reducer