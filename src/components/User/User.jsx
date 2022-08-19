import React, {useEffect, useState} from 'react'
// Styles
import './User.scss'
// Libraries
import {Link, useNavigate, useParams} from 'react-router-dom'
import getUserDataByID from '../../utils/getUserDataByID'
import getPostsDataByID from '../../utils/getPostsDataByID'
import getFollowersDataByID from '../../utils/getFollowersDataByID'
import unfollow from '../../utils/unfollow'
import follow from '../../utils/follow'
// Redux
import {useSelector} from 'react-redux'
// Assets
import guestPicture from '../../Assets/guest.png'
// Children
import Posts from '../Posts/Posts'

const User = () => {

    const {userId} = useParams()
    const navigate = useNavigate()
    const database = useSelector(state => state.firebase.database)
    const [myFollowersData, setMyFollowersData] = useState({
        followers: [],
        following: []
    })
    const [isFollowing, setIsFollowing] = useState(checkIsFollowing().includes(true))

    function checkIsFollowing() {
        return myFollowersData.following.map(user => {
            return user === userId
        })
    }

    const myUserId = useSelector(state => state.userData.userID)

    useEffect(() => {
        getUserDataByID(database, userId)
            .then(userData => setDisplayedUser({...userData}))
        getPostsDataByID(database, userId)
            .then(posts => setDisplayedPosts(posts))
        // Get followers data for watched user from DB
        getFollowersDataByID(database, userId)
            .then(followersData => setDisplayedFollowers(followersData))
        // Get followers data for logged in user from DB
        getFollowersDataByID(database, myUserId)
            .then(data => {
                setMyFollowersData({
                    followers: data.followers,
                    following: data.following
                })
            })
        // eslint-disable-next-line
    }, [userId, isFollowing])

    useEffect(() => {
        setIsFollowing(checkIsFollowing().includes(true))
        // eslint-disable-next-line
    }, [myFollowersData])

    const isAuth = useSelector(state => state.auth.isAuth)
    const [displayedUser, setDisplayedUser] = useState({})
    const [displayedPosts, setDisplayedPosts] = useState([])
    const [displayedFollowers, setDisplayedFollowers] = useState([])
    const {userName, photoURL} = displayedUser

    return (
        <section className="user" style={{paddingLeft: isAuth ? '1em' : ''}}>

            <section className="user__controls">

                <div className="user__image-wrapper">
                    <img
                        src={photoURL ? photoURL : guestPicture}
                        alt={'profile pic'}
                        className={'user__image'}
                    />
                </div>


                <div className="user__data-wrapper">

                    <div className={'user__username'}>
                        {userName}
                    </div>

                    <div className="user__counters">
                        <div className="user__posts">
                            Posts <br/>
                            {displayedPosts.length && displayedPosts.length}
                        </div>
                        <Link to={`/followers-list/${userId}`} className="user__followers">
                            Followers <br/>
                            {displayedFollowers.followers && displayedFollowers.followers.length}
                        </Link>
                        <Link to={`/following-list/${userId}`} className="user__following">
                            Following <br/>
                            {displayedFollowers.following && displayedFollowers.following.length}
                        </Link>
                    </div>

                    {userId !== myUserId && <div className="user__buttons">
                        <button className={'user__message'}
                                onClick={async () => {
                                    if (isAuth) {
                                        navigate(`/dialogue/${userId}`)
                                    } else {
                                        navigate('/')
                                    }
                                }}>
                            Message
                        </button>
                        {isFollowing
                            ? <button className={'user__follow'}
                                      onClick={async () => {
                                          if (isAuth) {
                                              await unfollow(database, myFollowersData.following, myUserId, userId, displayedFollowers.followers)
                                              setIsFollowing(false)
                                          } else {
                                              navigate('/')
                                          }
                                      }}>
                                Unfollow
                            </button>
                            : <button className={'user__follow'}
                                      onClick={async () => {
                                          if (isAuth) {
                                              await follow(database, myFollowersData.following, myUserId, userId, displayedFollowers.followers)
                                              setIsFollowing(true)
                                          } else {
                                              navigate('/')
                                          }
                                      }}>
                                Follow
                            </button>}
                    </div>}


                </div>

            </section>

            <Posts postList={displayedPosts}/>

        </section>
    )
}

export default User