import React from 'react'
// styles
import './ApplicationWrapper.scss'
// Children
import Routes from '../../utils/Routes/Routes'
import {useSelector} from 'react-redux'

const ApplicationWrapper = () => {

    const isLoggedIn = useSelector(state => {
        return state.auth.isAuth
    })

    return (
        <main className="application-wrapper">
            {isLoggedIn && <div className={'placeholder'} style={{width: '20%'}}></div>}
            <Routes/>
        </main>
    )
}

export default ApplicationWrapper