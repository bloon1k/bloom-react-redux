import React from 'react'
// Styles
import './SearchedUser.scss'
// Libraries
import {v4 as uuid} from 'uuid'
import {Link} from 'react-router-dom'
// Assets
import guest from '../../Assets/guest.png'

const SearchedUser = ({user}) => {
    return (
        <Link to={`/user/${user.userID}`} className="searched-user" key={uuid()}>
            <div className="searched-user__data">
                <img src={user.photoURL ? user.photoURL : guest} alt="searched-user avatar"
                     className={'searched-user__image'}/>
                <p className={'searched-user__username'}>{user.userName}</p>
            </div>
            <div className="searched-user__buttons">
                <button className="searched-user__message" onClick={e => e.preventDefault()}>Message</button>
                <button className="searched-user__follow" onClick={e => e.preventDefault()}>Follow</button>
            </div>
        </Link>
    )
}

export default SearchedUser