import React from 'react'
// Styles
import './Posts.scss'
// Redux
import {useDispatch, useSelector} from 'react-redux'
// Libraries
import {v4 as uuid} from 'uuid'
import {useNavigate} from 'react-router-dom'
import {setCurrentPostWatched} from '../../redux/features/postsSlice'

const Posts = () => {

    const postList = useSelector(state => state.posts.postList)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <section className={'posts'}>
            {postList.map(post => {
                return <section key={uuid()} className={'post-item'} onClick={() => {
                    navigate('/see-post')
                    dispatch(setCurrentPostWatched(post))
                }}>
                    <img src={post.postImageURL} alt="lsdkjf"/>
                    <div className="post-item__background" id={post.postID}>Click to see <br/> post details</div>
                </section>
            })}
        </section>
    )
}

export default Posts