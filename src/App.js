import React from 'react'
// Styles
import './styles/App.scss'
// Children
import Header from './components/Header/Header'
import ApplicationWrapper from './components/ApplicationWrapper/ApplicationWrapper'
import Footer from './components/Footer/Footer'

// need setInterval to get updates when new message comes to you
// interval in message list is reauired too
// send message by enter click

// adaptive and UI for all new sections
// add back button in User component

// if no current dialogue and dialogue list is empty - need placeholder

// message button in User should be protected with auth
// searchedUser message should work

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
