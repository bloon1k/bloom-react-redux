import React from 'react'
// Styles
import './MyProfile.scss'
import {useSelector} from 'react-redux'

const MyProfile = () => {

    const user = useSelector(state => state.userData)

    return (
        <section className="home">
            My profile
            <img src={user.photoURL} alt={'profile pic'}/>
            <p>{user.name}</p>
            <p>{user.surname}</p>
        </section>
    )
}

export default MyProfile