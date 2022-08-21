import React, {useState, useEffect} from 'react'
// Styles
import './LatestPosts.scss'
// Redux
import {useSelector} from 'react-redux'
// Libraries
import getFollowersDataByID from '../../utils/getFollowersDataByID'
import getPostsDataByID from '../../utils/getPostsDataByID'
import {Link} from 'react-router-dom'
import LatestPostItem from '../LatestPostItem/LatestPostItem'
import {v4 as uuid} from 'uuid'

const LatestPosts = () => {

    const database = useSelector(state => state.firebase.database)
    const myUserId = useSelector(state => state.userData.userID)
    const [myFollowingList, setMyFollowingList] = useState([])
    const [followingLatestPosts, setFollowingLatestPosts] = useState([])

    useEffect(() => {
        // Get followers data for logged in user from DB
        getFollowersDataByID(database, myUserId)
            .then(data => {
                setMyFollowingList(data.following)
            })
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const newLatestPosts = []
        myFollowingList.forEach(async id => {
            await getPostsDataByID(database, id)
                .then(postsData => {
                    let newData = {...postsData[postsData.length - 1], postedBy: id}
                    newLatestPosts.push(newData)
                })
            setFollowingLatestPosts(newLatestPosts)
        })
        // eslint-disable-next-line
    }, [myFollowingList])

    return (
        <section className={'latest-posts'}>
            {followingLatestPosts.length !== 0 && followingLatestPosts.map(post => {
                return post.postID !== undefined
                    ? <LatestPostItem key={uuid()} post={post}/>
                    : null
            })}

            {(() => {
                    const isUndefined = []
                    followingLatestPosts.forEach(post => {
                        post === undefined ? isUndefined.push(true) : isUndefined.push(false)
                    })
                    return !isUndefined.includes(false)
                })() &&
                <p style={{marginTop: '2em', padding: '1em', textAlign: 'center'}}>Unfortunately, people that you are
                    following have no
                    latest posts.
                    <br/><br/> Please follow more people that have posts using <Link to={'/search'} style={{
                        textDecoration: 'underline',
                        color: '#b64141'
                    }}>People Search</Link></p>}
            <p style={{alignSelf: 'center', fontSize: '1.3em', textAlign: 'center', marginBottom: '2em'}}>Follow more
                people to see more
                posts!</p>
        </section>
    )
}

export default LatestPosts