import React, {useEffect, useState} from 'react'
// Styles
import './SearchedUser.scss'
// Redux
import {useSelector} from 'react-redux'
// Libraries
import {v4 as uuid} from 'uuid'
import {Link, useNavigate} from 'react-router-dom'
import follow from '../../utils/follow'
import unfollow from '../../utils/unfollow'
import getFollowersDataByID from '../../utils/getFollowersDataByID'
// Assets
import guest from '../../Assets/guest.png'

const SearchedUser = ({user}) => {

    const myUserId = useSelector(state => state.userData.userID)
    const database = useSelector(state => state.firebase.database)

    const [myFollowersData, setMyFollowersData] = useState({
        followers: [],
        following: []
    })
    const [displayedUserFollowersData, setDisplayedUserFollowersData] = useState({
        followers: [],
        following: []
    })

    const navigate = useNavigate()
    const isAuth = useSelector(state => state.auth.isAuth)

    const [isFollowing, setIsFollowing] = useState(checkIsFollowing().includes(true))

    function checkIsFollowing() {
        return myFollowersData.following.map(id => {
            return id === user.userID
        })
    }

    useEffect(() => {
        // Get followers data for watched user from DB
        getFollowersDataByID(database, user.userID)
            .then(followersData => setDisplayedUserFollowersData(followersData))
        // Get followers data for logged in user from DB
        getFollowersDataByID(database, myUserId)
            .then(data => {
                setMyFollowersData({
                    followers: data.followers,
                    following: data.following
                })
            })
        // eslint-disable-next-line
    }, [user.userID, isFollowing])

    useEffect(() => {
        setIsFollowing(checkIsFollowing().includes(true))
        // eslint-disable-next-line
    }, [myFollowersData])


    return (
        <Link to={`/user/${user.userID}`} className="searched-user" key={uuid()}>
            <div className="searched-user__data">
                <img src={user.photoURL ? user.photoURL : guest} alt="searched-user avatar"
                     className={'searched-user__image'}/>
                <p className={'searched-user__username'}>{user.userName}</p>
            </div>
            {user.userID !== myUserId && <div className="searched-user__buttons">
                <button className="searched-user__message"
                        onClick={async e => {
                            e.preventDefault()
                            if (isAuth) {
                                navigate(`/dialogue/${user.userID}`)
                            } else {
                                navigate('/')
                            }
                        }}>
                    Message
                </button>

                {isFollowing
                    ? <button className={'searched-user__follow'}
                              onClick={async (e) => {
                                  e.preventDefault()
                                  await unfollow(database, myFollowersData.following, myUserId, user.userID, displayedUserFollowersData.followers)
                                  setIsFollowing(false)
                              }}>
                        Unfollow
                    </button>
                    : <button className={'searched-user__follow'}
                              onClick={async (e) => {
                                  e.preventDefault()
                                  await follow(database, myFollowersData.following, myUserId, user.userID, displayedUserFollowersData.followers)
                                  setIsFollowing(true)
                              }}>
                        Follow
                    </button>}
            </div>}
        </Link>
    )
}

export default SearchedUser