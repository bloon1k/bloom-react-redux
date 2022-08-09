import React, {useState} from 'react'
// Styles
import './CreatePost.scss'
// Libraries
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import getUserPostsByID from '../../utils/getUserPostsByID'
import {v4 as uuid} from 'uuid'
// Redux
import {useDispatch, useSelector} from 'react-redux'
import {occurredMissingImageError} from '../../redux/features/errorsSlice'
// Firestore
import {doc, setDoc} from 'firebase/firestore'
// Firebase storage
import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage'
import {addPost} from '../../redux/features/postsSlice'

const schema = yup.object().shape({
    description: yup.string().min(4, 'At least 4 characters').max(200, 'No longer than 200 characters').required()
})

const CreatePost = () => {

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })
    const dispatch = useDispatch()
    const missingImageError = useSelector(state => state.errors.missingImageError)
    const database = useSelector(state => state.firebase.database)
    const currentUserID = useSelector(state => state.userData.userID)
    const storage = getStorage()

    const [descValue, setDescValue] = useState('')
    const [isFile, setIsFile] = useState(false)

    function submitCreatePost() {
        occurredMissingImageError('')
        if (isFile) {
            getUserPostsByID(database, currentUserID)
                .then(previousPosts => {
                    const [image] = document.getElementById('create-post__image-input').files
                    if (image) {
                        const postImageID = uuid()
                        const storageRef = ref(storage, `postImages/${postImageID}`)
                        const imageLocation = `gs://bloom-5c636.appspot.com/postImages/${postImageID}`
                        // Upload image to Firebase Storage
                        uploadBytes(storageRef, image)
                            .then(() => {
                                // Once image uploaded - get its URL
                                getDownloadURL(ref(storage, imageLocation))
                                    .then(url => {
                                        // push new post with all required data to firestore
                                        const dateArr = new Date().toString().split(' ')
                                        const createDate = `${dateArr[2]} ${dateArr[1]} ${dateArr[3]}`
                                        const newPost = {
                                            postID: uuid(),
                                            postImageURL: url,
                                            postDescription: descValue,
                                            createdAt: createDate,
                                        }
                                        setDoc(doc(database, 'posts', currentUserID), {
                                            postList: [
                                                ...previousPosts,
                                                newPost
                                            ]
                                        })
                                            .then(() => {
                                                dispatch(addPost(newPost))
                                            })
                                    })
                                    .catch(error => console.log('Error while getting image url from Storage: ', error))
                            })
                    }
                })
        } else {
            dispatch(occurredMissingImageError('Image is required'))
        }
    }

    return (
        <section className={'create-post'} onSubmit={handleSubmit(submitCreatePost)}>
            <span>Create post form</span>
            <form className={'create-post__form'}>

                <div className="create-post__upper">

                    <div className="create-post__label-wrapper">
                        <label htmlFor={'create-post__image-input'} className={'create-post__label'}>
                            <span>Choose post image</span>
                            <input
                                type="file"
                                name="create-post__image-input"
                                id="create-post__image-input"
                                accept={'image/*'}
                                onChange={() => {
                                    const [file] = document.getElementById('create-post__image-input').files
                                    if (file) {
                                        document.getElementById('create-post__image').style.opacity = 1
                                        document.getElementById('create-post__image').src = URL.createObjectURL(file)
                                        setIsFile(true)
                                    }
                                }}
                            />
                            {missingImageError && <p className={'create-post__image-error'}>{missingImageError}</p>}
                        </label>
                        <img
                            src=""
                            alt="selected post img"
                            id={'create-post__image'}
                            className={'create-post__image'}
                            style={{opacity: '0'}}
                        />
                    </div>


                    <div className="create-post__upper-right">
                        <div className="create-post__input-wrapper">

                            <input
                                type="text"
                                name="create-post__description"
                                id="create-post__description"
                                className={'create-post__input'}
                                onFocus={() => document.getElementsByClassName('create-post__placeholder')[0].classList.add('create-post__placeholder-move')}
                                {...register('description')}
                                value={descValue}
                                onChange={e => [...e.target.value].length > 200 ? 1 : setDescValue(e.target.value)}
                            />
                            {errors.description && <p className={'create-post__error'}>{errors.description.message}</p>}
                            <span
                                className="create-post__placeholder"
                                onClick={() => document.getElementById('create-post__description').focus()}
                            >
                            Description (4-200 characters)
                        </span>

                        </div>
                        <div className="create-post__text">
                            {descValue}
                        </div>
                    </div>

                </div>

                <button className={'create-post__button'} type={'submit'}>Create post</button>
            </form>
        </section>
    )
}

export default CreatePost