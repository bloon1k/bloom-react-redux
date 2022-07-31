import React from 'react'
import './NoPage.scss'
import noPage from '../../Assets/noPage.svg'

const NoPage = () => {
    return (
        <section className={'no-page'}>
            <img src={noPage} alt="missing page" className={'no-page__image'}/>
            <span className="no-page__text">404 This page does not exist</span>
        </section>
    )
}

export default NoPage