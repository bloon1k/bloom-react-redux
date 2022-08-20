import React, {useEffect, useState} from 'react'
// Styles
import './FollowersList.scss'
// Libraries
import {useNavigate, useParams} from 'react-router-dom'
import {v4 as uuid} from 'uuid'
import getFollowersDataByID from '../../utils/getFollowersDataByID'
import getUserDataByID from '../../utils/getUserDataByID'
// Redux
import {useSelector} from 'react-redux'
// Children
import SearchedUser from '../SearchedUser/SearchedUser'

const FollowersList = () => {

    const navigate = useNavigate()
    const [followersList, setFollowersList] = useState([])
    const {userId} = useParams()
    const database = useSelector(state => state.firebase.database)

    useEffect(() => {
        getFollowersDataByID(database, userId)
            .then(followersData => {
                followersData.followers.forEach(followerId => {
                    getUserDataByID(database, followerId)
                        .then(followerData => {
                            setFollowersList(prevState => [...prevState, followerData])
                        })
                })
            })
        // eslint-disable-next-line
    }, [userId])

    return <section className={'followers-list'}>
        <button onClick={() => navigate(-1)} className={'followers-list__back'}>Go back</button>
        {followersList.length !== 0
            ? followersList.map(follower => {
                return <SearchedUser user={follower} key={uuid()}/>
            })
            : <p style={{width: '100%', textAlign: 'center', marginTop: '1em', fontSize: '1.3em'}}>
                This user has no followers yet...
            </p>}
    </section>
}

export default FollowersList