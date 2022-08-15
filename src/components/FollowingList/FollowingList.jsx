import React, {useState, useEffect} from 'react'
// Styles
import './FollowingList.scss'
// Libraries
import {useNavigate, useParams} from 'react-router-dom'
import {v4 as uuid} from 'uuid'
import getFollowersDataByID from '../../utils/getFollowersDataByID'
import getUserDataByID from '../../utils/getUserDataByID'
// Redux
import {useSelector} from 'react-redux'
// Children
import SearchedUser from '../SearchedUser/SearchedUser'

const FollowingList = () => {

    const navigate = useNavigate()
    const [followingList, setFollowingList] = useState([])
    const {userId} = useParams()
    const database = useSelector(state => state.firebase.database)

    useEffect(() => {
        getFollowersDataByID(database, userId)
            .then(followersData => {
                followersData.following.forEach(followerId => {
                    getUserDataByID(database, followerId)
                        .then(followerData => {
                            setFollowingList(prevState => [...prevState, followerData])
                        })
                })
            })
        // eslint-disable-next-line
    }, [userId])

    return <section className={'following-list'}>
        <button onClick={() => navigate(-1)} className={'following-list__back'}>Go back</button>
        {followingList.length !== 0 && followingList.map(follower => {
            return <SearchedUser user={follower} key={uuid()}/>
        })}
    </section>
}

export default FollowingList