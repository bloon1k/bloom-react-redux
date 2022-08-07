import React from 'react'
import {useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'

const RequireAuth = ({children}) => {

    const auth = useSelector(state => state.auth)
    if (!auth.isAuth) return <Navigate to={'/sign-in'}/>

    return children
}

export default RequireAuth