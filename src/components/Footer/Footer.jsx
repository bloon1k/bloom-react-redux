import React from 'react'
// Styles
import './Footer.scss'
import {NavLink} from 'react-router-dom'
import myProfile from '../../Assets/myProfile.svg'
import myProfileDark from '../../Assets/myProfile-dark.svg'
import messages from '../../Assets/messages.svg'
import messagesDark from '../../Assets/messages-dark.svg'
import news from '../../Assets/posts.svg'
import newsDark from '../../Assets/posts-dark.svg'
import friends from '../../Assets/friends.svg'
import friendsDark from '../../Assets/friends-dark.svg'
import {useSelector} from 'react-redux'

const Footer = () => {

    const currentTheme = useSelector(state => {
        return state.theme.theme
    })
    const auth = useSelector(state => {
        return state.auth
    })
    if (!auth.isAuth) return null

    return (
        <footer className={'footer'}>
            <NavLink to={'/'} className={'footer__link'}>
                {currentTheme === 'dark'
                    ? <img src={myProfile} className={'footer__svg'} alt="profile"/>
                    : <img src={myProfileDark} className={'footer__svg'} alt="profile"/>
                }
                <span className="footer__text">My Profile</span>
            </NavLink>
            <NavLink to={'/messages'} className={'footer__link'}>
                {currentTheme === 'dark'
                    ? <img src={messages} className={'footer__svg'} alt="profile"/>
                    : <img src={messagesDark} className={'footer__svg'} alt="profile"/>
                }
                <span className="footer__text">Messages</span>
            </NavLink>
            <NavLink to={'/news'} className={'footer__link'}>
                {currentTheme === 'dark'
                    ? <img src={news} className={'footer__svg'} alt="profile"/>
                    : <img src={newsDark} className={'footer__svg'} alt="profile"/>
                }
                <span className="footer__text">News</span>
            </NavLink>
            <NavLink to={'/friends'} className={'footer__link'}>
                {currentTheme === 'dark'
                    ? <img src={friends} className={'footer__svg'} alt="profile"/>
                    : <img src={friendsDark} className={'footer__svg'} alt="profile"/>
                }
                <span className="footer__text">Friends</span>
            </NavLink>
        </footer>
    )
}

export default Footer