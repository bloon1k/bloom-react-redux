import React from 'react'
// Styles
import './styles/App.scss'
// Children
import Header from './components/Header/Header'
import ApplicationWrapper from './components/ApplicationWrapper/ApplicationWrapper'
import Footer from './components/Footer/Footer'

// if no profile pic after sign in - replace it with placeholder image
// make sign up form inputs less width, they need to look cool
// login() should dispatch sign in/up errors, so they are not shown after logout
// remember login to local storage
// add loaders on all requests
// add change image error handling via popups maybe

function App() {
    return (
        <div className="App">
            <Header/>
            <ApplicationWrapper/>
            <Footer/>
        </div>
    )
}

export default App
