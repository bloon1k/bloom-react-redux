import React from 'react'
// Styles
import './styles/App.scss'
// Children
import Header from './components/Header/Header'
import ApplicationWrapper from './components/ApplicationWrapper/ApplicationWrapper'
import Footer from './components/Footer/Footer'
import Loader from './components/Loader/Loader'

// mobile adaptive

function App() {
    return (
        <div className="App">
            <Header/>
            <ApplicationWrapper/>
            <Loader/>
            <Footer/>
        </div>
    )
}

export default App
