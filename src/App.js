import React from 'react'
// Styles
import './styles/App.scss'
// Children
import Header from './components/Header/Header'
import ApplicationWrapper from './components/ApplicationWrapper/ApplicationWrapper'
import Footer from './components/Footer/Footer'

// searchedUser buttons should work
// searchedUser when no avatar - should show placeholder

// followers redux state should not exist, all followers data needs to be requested from db

// adaptive for all new sections
// when visiting user without posts - need to remove 'create post' paragraph

// update followers/following list UI
// display post owner on seePost

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
