import React from 'react'
// Styles
import './styles/App.scss'
// Children
import Header from './components/Header/Header'
import ApplicationWrapper from './components/ApplicationWrapper/ApplicationWrapper'
import Footer from './components/Footer/Footer'

// LOGOUT SHOULD CLEAR ALL REDUX STATES

// delete post mechanic

// missing image error is shown always, need to take care of it

// followers/following pages need to create content there
// good ui for followers/ing
// follow/unfollow mechanic
// create some account and follow each other

// we need success popups for all async actions
// add loaders on all async requests
// add error handling popups or error messages

// login() should dispatch empty sign in/up errors, so they are not shown after logout
// remember login to local storage
// remember theme to local storage

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
