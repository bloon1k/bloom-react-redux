import React from 'react'
// Styles
import './FollowersList.scss'
import {useNavigate} from 'react-router-dom'

const FollowersList = () => {

    const navigate = useNavigate()

    return (
        <section className={'followers-list'}>
            <button onClick={() => navigate(-1)} className={'followers-list__back'}>Back</button>
            followers list
        </section>
    )
}

export default FollowersList