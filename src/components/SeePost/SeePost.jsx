import React from 'react'
// Styles
import './SeePost.scss'
import {useNavigate} from 'react-router-dom'
// Redux
import {useDispatch, useSelector} from 'react-redux'
import {setPosts} from '../../redux/features/postsSlice'
// Firebase storage
import {deleteObject, getStorage, ref} from 'firebase/storage'
// Firestore
import {doc, updateDoc} from 'firebase/firestore'
// Assets
import trash from '../../Assets/trash.png'
import trashDark from '../../Assets/trash-dark.png'


const SeePost = () => {

    const navigate = useNavigate()
    const currentPostWatched = useSelector(state => state.posts.currentPostWatched)
    const currentUserData = useSelector(state => state.userData)
    const currentPostList = useSelector(state => state.posts.postList)
    const currentTheme = useSelector(state => state.theme.theme)
    const database = useSelector(state => state.firebase.database)
    const storage = getStorage()
    const dispatch = useDispatch()

    function handlePostDelete() {
        document.getElementById('see-post__delete-popup').style.display = 'none'
        const postListDocRef = doc(database, 'posts', currentUserData.userID)
        const deletingIndex = currentPostList.indexOf(currentPostWatched)
        const newPostList = [...currentPostList.slice(0, deletingIndex), ...currentPostList.slice(deletingIndex + 1)]
        updateDoc(postListDocRef, {
            postList: newPostList
        })
            .then(() => {
                dispatch(setPosts(newPostList))
                const deletingImageRef = ref(storage, currentPostWatched.postImageURL)
                // Delete old post image from Storage
                currentPostWatched.postImageURL && deleteObject(deletingImageRef)
                    .then(() => {
                        console.log('Old post image deleted successfully')
                        navigate('/')
                    })
                    .catch((error) => console.log('Cannot delete old post image: ', error))
            })
            .catch(error => console.log(`Error while updating post list: ${error.code}`))
    }

    return (
        <section className={'see-post'}>
            <div className="see-post__delete-popup" id={'see-post__delete-popup'}>
                <div>
                    <span className={'see-post__delete-text'}>Are you sure you want to
                        <span className={'see-post__red'}> delete</span> this post?</span>
                    <div>
                        <button
                            className={'see-post__button'}
                            onClick={handlePostDelete}
                        >
                            Yes
                        </button>
                        <button
                            className={'see-post__button'}
                            onClick={() => document.getElementById('see-post__delete-popup').style.display = 'none'}
                        >
                            No
                        </button>
                    </div>
                </div>
            </div>
            <div className="see-post__buttons">
                <button onClick={() => navigate(-1)} className={'see-post__back'}>Go back</button>
                <button
                    onClick={() => document.getElementById('see-post__delete-popup').style.display = 'flex'}
                    className={'see-post__delete'}
                >
                    {currentTheme === 'dark'
                        ? <img src={trash} alt="trash bin"/>
                        : <img src={trashDark} alt={'trash bin'}/>}
                </button>
            </div>
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