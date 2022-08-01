import React from 'react'
import {createRoot} from 'react-dom/client'
// Redux
import {Provider} from 'react-redux'
import {store} from './redux/app/store'
// Router
import {HashRouter} from 'react-router-dom'
// Children
import App from './App'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
    <React.StrictMode>
        <HashRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </HashRouter>
    </React.StrictMode>
)