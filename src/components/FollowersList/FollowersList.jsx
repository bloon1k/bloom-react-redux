import React from 'react'
// Styles
import './FollowersList.scss'
// Libraries
import {useNavigate} from 'react-router-dom'
// Redux
import {useSelector} from 'react-redux'

const FollowersList = () => {

    const navigate = useNavigate()
    const followersList = useSelector(state => state.followersData.followers)

    return (
        <section className={'followers-list'}>
            <button onClick={() => navigate(-1)} className={'followers-list__back'}>Go back</button>
            {followersList.map(follower => {
                return <div className="follower">
                    <div className="follower__data">
                        <img src={follower.photoURL} alt="follower avatar" className={'follower__image'}/>
                        <p className={'follower__username'}>{follower.userName}</p>
                    </div>
                    <div className="follower__buttons">
                        <button className="follower__message">Message</button>
                        <button className="follower__follow">Follow</button>
                    </div>
                </div>
            })}
        </section>
    )
}

export default FollowersList