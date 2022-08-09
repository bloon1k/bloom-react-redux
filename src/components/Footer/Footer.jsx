import React from 'react'
// Styles
import './Footer.scss'
import {NavLink} from 'react-router-dom'
import {useSelector} from 'react-redux'
import myProfile from '../../Assets/myProfile.svg'
import myProfileDark from '../../Assets/myProfile-dark.svg'
import messages from '../../Assets/messages.svg'
import messagesDark from '../../Assets/messages-dark.svg'
import createPost from '../../Assets/create-post.png'
import createPostDark from '../../Assets/create-post-dark.png'
import posts from '../../Assets/posts.svg'
import postsDark from '../../Assets/posts-dark.svg'
import search from '../../Assets/search.svg'
import searchDark from '../../Assets/search-dark.svg'

const Footer = () => {

    const currentTheme = useSelector(state => {
        return state.theme.theme
    })
    const auth = useSelector(state => {
        return state.auth
    })
    // Style active link
    const bgStyle = ({isActive}) => {
        return {
            border: isActive ? currentTheme === 'dark' ? '2px solid #404040' : '2px solid #b1b3b9' : null
        }
    }
    if (!auth.isAuth) return null

    return (
        <footer className={'footer'}>
            <NavLink to={'/'} className={'footer__link'} style={bgStyle}>
                {currentTheme === 'dark'
                    ? <img src={myProfile} className={'footer__svg'} alt="profile"/>
                    : <img src={myProfileDark} className={'footer__svg'} alt="profile"/>
                }
            </NavLink>
            <NavLink to={'/messages'} className={'footer__link'} style={bgStyle}>
                {currentTheme === 'dark'
                    ? <img src={messages} className={'footer__svg'} alt="messages"/>
                    : <img src={messagesDark} className={'footer__svg'} alt="messages"/>
                }
            </NavLink>
            <NavLink to={'/create-post'} className={'footer__link'} style={bgStyle}>
                {currentTheme === 'dark'
                    ?
                    <img src={createPost} className={'footer__svg'} alt="posts"
                         style={{width: '28px', height: '28px'}}/>
                    : <img src={createPostDark} className={'footer__svg'} alt="posts"
                           style={{width: '28px', height: '28px'}}/>
                }
            </NavLink>
            <NavLink to={'/latest-posts'} className={'footer__link'} style={bgStyle}>
                {currentTheme === 'dark'
                    ? <img src={posts} className={'footer__svg'} alt="posts"/>
                    : <img src={postsDark} className={'footer__svg'} alt="posts"/>
                }
            </NavLink>
            <NavLink to={'/search'} className={'footer__link'} style={bgStyle}>
                {currentTheme === 'dark'
                    ? <img
                        src={search}
                        className={'footer__svg'}
                        alt="search"
                        style={{transform: 'rotateY(180deg)', width: '23px', height: '23px'}}
                    />
                    : <img
                        src={searchDark}
                        className={'footer__svg'}
                        alt="search"
                        style={{transform: 'rotateY(180deg)', width: '23px', height: '23px'}}
                    />
                }
            </NavLink>
        </footer>
    )
}

export default Footer