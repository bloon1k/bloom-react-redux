import React from 'react'
// Styles
import './FollowingList.scss'
// Libraries
import {useNavigate} from 'react-router-dom'

const FollowingList = () => {

    const navigate = useNavigate()

    return (
        <section className={'following-list'}>
            <button onClick={() => navigate(-1)} className={'following-list__back'}>Back</button>
            following list
        </section>
    )
}

export default FollowingList