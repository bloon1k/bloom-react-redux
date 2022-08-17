import React from 'react'
// Styles
import './Posts.scss'
// Redux
import {useDispatch} from 'react-redux'
// Libraries
import {v4 as uuid} from 'uuid'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {setCurrentPostWatched} from '../../redux/features/postsSlice'

const Posts = ({postList}) => {

    const dispatch = useDispatch()
    let {userId} = useParams()
    userId = userId ? userId : 'me'
    const navigate = useNavigate()

    return (
        <section className={'posts'}>
            {
                postList.slice().reverse().map(post => {
                    return <section key={uuid()} className={'post-item'} onClick={() => {
                        navigate(`/see-post/${userId}`)
                        dispatch(setCurrentPostWatched(post))
                    }}>
                        <img src={post.postImageURL} alt="post pic"/>
                        <div className="post-item__background" id={post.postID}>Click to see <br/> post details</div>
                    </section>
                })
            }
            {!postList.length && userId === 'me' &&
                <p>You have no posts at the moment, create some using <Link to={'/create-post'} style={{
                    textDecoration: 'underline',
                    color: '#b64141'
                }}>Create post form</Link>
                </p>
            }
            {userId !== 'me' && !postList.length && <p>User has no posts</p>}
        </section>
    )
}

export default Posts