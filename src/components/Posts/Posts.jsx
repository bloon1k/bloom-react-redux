import React from 'react'
// Styles
import './Posts.scss'
// Redux
import {useDispatch, useSelector} from 'react-redux'
// Libraries
import {v4 as uuid} from 'uuid'
import {Link, useNavigate} from 'react-router-dom'
import {setCurrentPostWatched} from '../../redux/features/postsSlice'

const Posts = () => {

    const postList = useSelector(state => state.posts.postList)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <section className={'posts'}>
            {
                postList.slice().reverse().map(post => {
                    return <section key={uuid()} className={'post-item'} onClick={() => {
                        navigate('/see-post')
                        dispatch(setCurrentPostWatched(post))
                    }}>
                        <img src={post.postImageURL} alt="lsdkjf"/>
                        <div className="post-item__background" id={post.postID}>Click to see <br/> post details</div>
                    </section>
                })
            }
            {!postList.length &&
                <p>You have no posts at the moment, create some using <Link to={'create-post'} style={{
                    textDecoration: 'underline',
                    color: '#b64141'
                }}>Create post form</Link>
                </p>}
        </section>
    )
}

export default Posts