import React from 'react'
// Styles
import './NavBar.scss'
// Assets
import myProfile from '../../Assets/myProfile.svg'
import myProfileDark from '../../Assets/myProfile-dark.svg'
import news from '../../Assets/news.svg'
import newsDark from '../../Assets/news-dark.svg'
import messages from '../../Assets/messages.svg'
import messagesDark from '../../Assets/messages-dark.svg'
import friends from '../../Assets/friends.svg'
import friendsDark from '../../Assets/friends-dark.svg'
// Libraries
import {NavLink} from 'react-router-dom'
import {useSelector} from 'react-redux'

const NavBar = () => {

    const currentTheme = useSelector(state => {
        return state.theme.theme
    })
    const auth = useSelector(state => {
        return state.auth
    })
    if (!auth.isAuth) return null

    return (
        <nav className="navbar">
            <NavLink to={'/'} className={'navbar__link'}>
                {currentTheme === 'dark'
                    ? <img src={myProfile} className={'navbar__svg'} alt="profile"/>
                    : <img src={myProfileDark} className={'navbar__svg'} alt="profile"/>
                }
                My Profile
            </NavLink>
            <NavLink to={'/messages'} className={'navbar__link'}>
                {currentTheme === 'dark'
                    ? <img src={messages} className={'navbar__svg'} alt="profile"/>
                    : <img src={messagesDark} className={'navbar__svg'} alt="profile"/>
                }
                Messages
            </NavLink>
            <NavLink to={'/news'} className={'navbar__link'}>
                {currentTheme === 'dark'
                    ? <img src={news} className={'navbar__svg'} alt="profile"/>
                    : <img src={newsDark} className={'navbar__svg'} alt="profile"/>
                }
                News
            </NavLink>
            <NavLink to={'/friends'} className={'navbar__link'}>
                {currentTheme === 'dark'
                    ? <img src={friends} className={'navbar__svg'} alt="profile"/>
                    : <img src={friendsDark} className={'navbar__svg'} alt="profile"/>
                }
                Friends
            </NavLink>
        </nav>
    )
}

export default NavBar