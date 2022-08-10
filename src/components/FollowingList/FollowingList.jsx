import React from 'react'
// Styles
import './FollowingList.scss'
// Libraries
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

const FollowingList = () => {

    const navigate = useNavigate()
    const followingList = useSelector(state => state.followersData.following)

    return <section className={'following-list'}>
        <button onClick={() => navigate(-1)} className={'following-list__back'}>Go back</button>
        {followingList.map(follower => {
            return <div className="following">
                <div className="following__data">
                    <img src={follower.photoURL} alt="following avatar" className={'following__image'}/>
                    <p className={'following__username'}>{follower.userName}</p>
                </div>
                <div className="following__buttons">
                    <button className="following__message">Message</button>
                    <button className="following__follow">Follow</button>
                </div>
            </div>
        })}
    </section>
}

export default FollowingList