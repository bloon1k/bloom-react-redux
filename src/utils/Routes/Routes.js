import React from 'react'
// Utils
import {Routes as MyRoutes, Route, Navigate} from 'react-router-dom'
// Children
import Header from '../../components/Header/Header'
import Profile from '../../components/MyProfile/Profile'
import NoPage from '../../components/NoPage/NoPage'
import SignIn from '../../components/SignIn/SignIn'
import SignUpForm from '../../components/SignUpForm/SignUpForm'
import Messages from '../../components/Messages/Messages'
import News from '../../components/News/News'
import Friends from '../../components/Friends/Friends'
import RequireAuth from '../RequireAuth'

const Routes = () => {
    return (
        <MyRoutes>
            <Route path={'sign-in'} element={<SignIn/>}/>
            <Route path={'sign-up'} element={<SignUpForm/>}/>
            <Route path={'bloom-react-redux'} element={<Navigate to={'/'}/>}/>

            <Route path={'/'} element={
                <RequireAuth>
                    <Profile/>
                </RequireAuth>
            }/>
            <Route path={'head'} element={
                <RequireAuth>
                    <Header/>
                </RequireAuth>
            }/>
            <Route path={'messages'} element={
                <RequireAuth>
                    <Messages/>
                </RequireAuth>
            }/>
            <Route path={'news'} element={
                <RequireAuth>
                    <News/>
                </RequireAuth>
            }/>
            <Route path={'friends'} element={
                <RequireAuth>
                    <Friends/>
                </RequireAuth>
            }/>

            <Route path={'*'} element={<NoPage/>}/>
        </MyRoutes>
    )
}

export default Routes