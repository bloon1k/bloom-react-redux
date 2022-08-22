import React, {useEffect} from 'react'
// styles
import './Header.scss'
// Utils
import changeTheme from '../../utils/changeTheme'
// Redux
import {changed} from '../../redux/features/themeSlice'
import {login, logout} from '../../redux/features/authSlice'
import {clearUserData, setEmail, setPhoto, setUserID, setUserName} from '../../redux/features/userDataSlice'
import {clearErrors} from '../../redux/features/errorsSlice'
import {clearChangeHandler, setCurrentUserNameValue} from '../../redux/features/changeHandlerSlice'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
// Assets
import logoDark from '../../Assets/logo-dark.png'
import logoLight from '../../Assets/logo-light.png'
import moon from '../../Assets/moon.png'
import sun from '../../Assets/sun.png'
import logoutImg from '../../Assets/logout.svg'
import logoutDarkImg from '../../Assets/logout-dark.svg'
// Children
import NavBar from '../NavBar/NavBar'
import {clearPosts} from '../../redux/features/postsSlice'

const Header = () => {

    const isAuth = useSelector(state => {
        return state.auth.isAuth
    })
    const currentTheme = useSelector(state => {
        return state.theme.theme
    })
    const dispatch = useDispatch()

    useEffect(() => {
        // If no theme in storage - set dark by default
        localStorage.getItem('theme') === null && localStorage.setItem('theme', 'dark')
        // If user saved light theme - set it once page is loaded
        if (localStorage.getItem('theme') !== 'dark') {
            let circle = document.getElementsByClassName('header__circle')[0]
            circle.style.left = '58%'
            changeTheme()
            dispatch(changed())
        }
        if (localStorage.getItem('isAuth') === 'true') {
            dispatch(setUserID(localStorage.getItem('userID')))
            dispatch(setUserName(localStorage.getItem('userName')))
            dispatch(setCurrentUserNameValue(localStorage.getItem('currentUserNameValue')))
            dispatch(setEmail(localStorage.getItem('email')))
            dispatch(setPhoto(localStorage.getItem('photoURL')))
            dispatch(login())
        }
        // eslint-disable-next-line
    }, [])


    function handleThemeClick(e) {
        e.stopPropagation()
        currentTheme === 'dark' ? localStorage.setItem('theme', 'light') : localStorage.setItem('theme', 'dark')
        let circle = document.getElementsByClassName('header__circle')[0]
        circle.style.left === '58%' ? circle.style.left = '5%' : circle.style.left = '58%'
        changeTheme()
        dispatch(changed())
    }

    function logoutHandler() {
        dispatch(clearUserData())
        dispatch(clearErrors())
        dispatch(clearChangeHandler())
        dispatch(clearPosts())
        dispatch(logout())
        // remember theme
        let theme = localStorage.getItem('theme')
        localStorage.clear()
        // still remember theme after storage is cleared
        localStorage.setItem('theme', theme)
        localStorage.setItem('isAuth', 'false')
    }

    return (
        <header className={'header'}>
            {currentTheme === 'dark'
                ? <Link to={'/'}><img className={'header__logo'} src={logoLight} alt="bloom logo"/></Link>
                : <Link to={'/'}><img className={'header__logo'} src={logoDark} alt="bloom logo"/></Link>
            }
            <div className="header__controls">
                <NavBar/>
                <div className="header__switch" onClick={handleThemeClick}>
                    <div className="header__circle" onClick={handleThemeClick}></div>
                    <img src={moon} alt="moon" className={'header__moon header__image'}/>
                    <img src={sun} alt="sun" className={'header__sun header__image'}/>
                </div>
                {
                    isAuth &&
                    <button className={'header__button'} onClick={logoutHandler}>
                        {currentTheme === 'dark'
                            ? <img src={logoutImg} alt="log out"/>
                            : <img src={logoutDarkImg} alt="log out"/>
                        }
                    </button>
                }
            </div>
        </header>
    )
}

export default Header