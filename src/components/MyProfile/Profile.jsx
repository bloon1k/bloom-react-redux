import React from 'react'
// Styles
import './Profile.scss'
// Assets
import guestPicture from '../../Assets/guest.png'
// Libraries
import {useSelector} from 'react-redux'

const Profile = () => {

    const user = useSelector(state => state.userData)

    return (
        <section className="profile">
            My profile
            <img src={user.photoURL ? user.photoURL : guestPicture} alt={'profile pic'} className={'profile__image'}/>
            <p>{user.name}</p>
            <p>{user.surname}</p>
        </section>
    )
}

export default Profile