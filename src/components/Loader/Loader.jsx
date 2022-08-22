import React from 'react'
// Styles
import './Loader.scss'
// Assets
import loader from '../../Assets/loader.gif'
import loaderDark from '../../Assets/loader-dark.gif'
import {useSelector} from 'react-redux'

const Loader = () => {

    const currentTheme = useSelector(state => state.theme.theme)
    const isLoading = useSelector(state => state.changeHandler.isLoading)

    return (
        isLoading
            ? <div
                className={'loader'}
                style={{background: (currentTheme === 'dark' ? 'rgba(64, 64, 64, .8)' : 'rgba(221, 223, 226, .8)')}}
            >
                <img src={currentTheme === 'dark' ? loader : loaderDark} alt="loader" className={'loader__gif'}/>
            </div>
            : null
    )
}

export default Loader