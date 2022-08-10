import React from 'react'
// Styles
import './styles/App.scss'
// Children
import Header from './components/Header/Header'
import ApplicationWrapper from './components/ApplicationWrapper/ApplicationWrapper'
import Footer from './components/Footer/Footer'

// search via username
// see any other profile
// follow/unfollow mechanic
// create some account and follow each other

// update followers/following list UI

// remember login, currentTheme to local storage

// if no followers - no latest posts available, need fallback UI
// we need success popups for all async actions
// add loaders on all async requests
// add error handling popups or error messages


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
