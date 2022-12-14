import React from 'react'
// Styles
import './NavBar.scss'
// Assets
import myProfile from '../../Assets/myProfile.svg'
import myProfileDark from '../../Assets/myProfile-dark.svg'
import createPost from '../../Assets/create-post.png'
import createPostDark from '../../Assets/create-post-dark.png'
import posts from '../../Assets/posts.svg'
import postsDark from '../../Assets/posts-dark.svg'
import messages from '../../Assets/messages.svg'
import messagesDark from '../../Assets/messages-dark.svg'
import search from '../../Assets/search.svg'
import searchDark from '../../Assets/search-dark.svg'
// Libraries
import {NavLink} from 'react-router-dom'
import {useSelector} from 'react-redux'

const NavBar = () => {

    const currentTheme = useSelector(state => state.theme.theme)
    const auth = useSelector(state => state.auth)
    // Style active link
    const bgStyle = ({isActive}) => {
        return {
            border: isActive ? currentTheme === 'dark' ? '2px solid #404040' : '2px solid #b1b3b9' : null
        }
    }
    if (!auth.isAuth) return null

    return (
        <nav className="navbar">
            <NavLink to={'/'} className={'navbar__link'} style={bgStyle}>
                {currentTheme === 'dark'
                    ? <img src={myProfile} className={'navbar__svg'} alt="profile"/>
                    : <img src={myProfileDark} className={'navbar__svg'} alt="profile"/>
                }
                My Profile
            </NavLink>
            <NavLink to={'/messages'} className={'navbar__link'} style={bgStyle}>
                {currentTheme === 'dark'
                    ? <img src={messages} className={'navbar__svg'} alt="messages"/>
                    : <img src={messagesDark} className={'navbar__svg'} alt="messages"/>
                }
                Messages
            </NavLink>
            <NavLink to={'/create-post'} className={'navbar__link'} style={bgStyle}>
                {currentTheme === 'dark'
                    ?
                    <img src={createPost} className={'navbar__svg'} alt="posts"
                         style={{width: '28px', height: '28px'}}/>
                    : <img src={createPostDark} className={'navbar__svg'} alt="posts"
                           style={{width: '28px', height: '28px'}}/>
                }
                Create Post
            </NavLink>
            <NavLink to={'/latest-posts'} className={'navbar__link'} style={bgStyle}>
                {currentTheme === 'dark'
                    ? <img src={posts} className={'navbar__svg'} alt="posts"/>
                    : <img src={postsDark} className={'navbar__svg'} alt="posts"/>
                }
                Latest Posts
            </NavLink>
            <NavLink to={'/search'} className={'navbar__link'} style={bgStyle}>
                {currentTheme === 'dark'
                    ? <img
                        src={search}
                        className={'navbar__svg'}
                        alt="search"
                        style={{transform: 'rotateY(180deg)', width: '23px', height: '23px'}}
                    />
                    : <img
                        src={searchDark}
                        className={'navbar__svg'}
                        alt="search"
                        style={{transform: 'rotateY(180deg)', width: '23px', height: '23px'}}
                    />
                }
                Search
            </NavLink>
        </nav>
    )
}

export default NavBar