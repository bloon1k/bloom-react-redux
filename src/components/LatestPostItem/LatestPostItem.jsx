import React, {useEffect, useState} from 'react'
// Styles
import './LatestPostItem.scss'
import getUserDataByID from '../../utils/getUserDataByID'
// Redux
import {useSelector} from 'react-redux'
// Assets
import guest from '../../Assets/guest.png'
import {Link} from 'react-router-dom'

const LatestPostItem = ({post}) => {

    const database = useSelector(state => state.firebase.database)
    const [displayedUserData, setDisplayedUser] = useState({})

    useEffect(() => {
        getUserDataByID(database, post.postedBy)
            .then(userData => setDisplayedUser(userData))
        // eslint-disable-next-line
    }, [])

    return (
        <div className={'latest-post-item'}>

            <Link to={`/user/${post.postedBy}`} className="latest-post-item__owner">
                <img
                    src={displayedUserData.photoURL ? displayedUserData.photoURL : guest}
                    alt="user avatar"
                    className={'latest-post-item__avatar'}
                />
                <p>{displayedUserData.userName}</p>
            </Link>

            <img
                src={post.postImageURL}
                alt="post pic"
                className={'latest-post-item__image'}
            />

            <div className="latest-post-item__data">
                <p>{post.postDescription}</p>
                <p className={'latest-post-item__date'}>Posted on {post.createdAt}</p>
            </div>

        </div>
    )
}

export default LatestPostItem