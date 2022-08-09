import React from 'react'
// Styles
import './SeePost.scss'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

const SeePost = () => {

    const navigate = useNavigate()
    const currentPostWatched = useSelector(state => state.posts.currentPostWatched)

    return (
        <section className={'see-post'}>
            <button onClick={() => navigate(-1)} className={'see-post__back'}>Go back</button>
            <div className="see-post__card">
                <img src={currentPostWatched.postImageURL} alt="post img" className={'see-post__image'}/>
                <div className="see-post__details">
                    <p className={'see-post__description'}>{currentPostWatched.postDescription}</p>
                    <p className={'see-post__date'}>Posted on {currentPostWatched.createdAt}</p>
                </div>
            </div>
        </section>
    )
}

export default SeePost