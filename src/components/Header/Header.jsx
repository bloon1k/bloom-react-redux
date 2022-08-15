import React from 'react'
// styles
import './Header.scss'
// Utils
import changeTheme from '../../utils/changeTheme'
// Redux
import {changed} from '../../redux/features/themeSlice'
import {logout} from '../../redux/features/authSlice'
import {clearUserData} from '../../redux/features/userDataSlice'
import {clearErrors} from '../../redux/features/errorsSlice'
import {clearChangeHandler} from '../../redux/features/changeHandlerSlice'
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


    function handleThemeClick(e) {
        e.stopPropagation()
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