import React from 'react'
// Utils
import {Routes as MyRoutes, Route, Navigate} from 'react-router-dom'
// Children
import Header from '../../components/Header/Header'
import Profile from '../../components/Profile/Profile'
import NoPage from '../../components/NoPage/NoPage'
import SignIn from '../../components/SignIn/SignIn'
import SignUpForm from '../../components/SignUpForm/SignUpForm'
import Messages from '../../components/Messages/Messages'
import LatestPosts from '../../components/LatestPosts/LatestPosts'
import Search from '../../components/Search/Search'
import RequireAuth from '../RequireAuth'
import CreateUserName from '../../components/CreateUserName/CreateUserName'
import FollowersList from '../../components/FollowersList/FollowersList'
import FollowingList from '../../components/FollowingList/FollowingList'
import CreatePost from '../../components/CreatePost/CreatePost'
import SeePost from '../../components/SeePost/SeePost'

const Routes = () => {
    return (
        <MyRoutes>
            <Route path={'sign-in'} element={<SignIn/>}/>
            <Route path={'sign-up'} element={<SignUpForm/>}/>
            <Route path={'bloom-react-redux'} element={<Navigate to={'/'}/>}/>

            {/* Will be routed to create-username if user has no userName (Google account first login) */}
            <Route path={'create-username'} element={<CreateUserName/>}/>

            <Route path={'head'} element={
                <RequireAuth>
                    <Header/>
                </RequireAuth>
            }/>

            <Route path={'/'} element={
                <RequireAuth>
                    <Profile/>
                </RequireAuth>
            }/>
            <Route path={'followers-list'} element={
                <RequireAuth>
                    <FollowersList/>
                </RequireAuth>
            }/>
            <Route path={'following-list'} element={
                <RequireAuth>
                    <FollowingList/>
                </RequireAuth>
            }/>
            <Route path={'see-post'} element={
                <RequireAuth>
                    <SeePost/>
                </RequireAuth>
            }/>
            <Route path={'messages'} element={
                <RequireAuth>
                    <Messages/>
                </RequireAuth>
            }/>
            <Route path={'create-post'} element={
                <RequireAuth>
                    <CreatePost/>
                </RequireAuth>
            }/>
            <Route path={'latest-posts'} element={
                <RequireAuth>
                    <LatestPosts/>
                </RequireAuth>
            }/>
            <Route path={'search'} element={
                <RequireAuth>
                    <Search/>
                </RequireAuth>
            }/>

            <Route path={'*'} element={<NoPage/>}/>
        </MyRoutes>
    )
}

export default Routes