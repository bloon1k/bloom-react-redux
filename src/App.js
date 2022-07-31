import React from 'react'
// Styles
import './styles/App.scss'
// Children
import Header from './components/Header/Header'
import ApplicationWrapper from './components/ApplicationWrapper/ApplicationWrapper'
import Footer from './components/Footer/Footer'
// Firebase
// import {getAuth} from 'firebase/auth'

function App() {

    // function handleClick() {
    //     createUserWithEmailAndPassword(auth, 'bloody1337s@gmail.com', 'qq1we23')
    //         .then((userCredential) => {
    //             // Signed in
    //             const user = userCredential.user
    //             console.log(user)
    //         })
    //         .catch((error) => {
    //             const errorCode = error.code
    //             const errorMessage = error.message
    //             console.log(errorMessage)
    //         })
    // }


    return (
        <div className="App">
            <Header/>
            <ApplicationWrapper/>
            <Footer/>
        </div>
    )
}

export default App
