import React, {useEffect, useState} from 'react'
// Styles
import './Profile.scss'
// Assets
import guestPicture from '../../Assets/guest.png'
// Libraries
import {v4 as uuid} from 'uuid'
import {Link} from 'react-router-dom'
// Redux
import {useSelector, useDispatch} from 'react-redux'
import {setPhoto, setUserName} from '../../redux/features/userDataSlice'
import {startUserNameChange, stopUserNameChange, setCurrentUserNameValue} from '../../redux/features/changeHandlerSlice'
import {occurredChangeUserNameError} from '../../redux/features/errorsSlice'
// Firestore
import {collection, doc, getDocs, updateDoc} from 'firebase/firestore'
import getFollowersDataByID from '../../utils/getFollowersDataByID'
// Firebase Storage
import {ref, getStorage, uploadBytes, getDownloadURL, deleteObject} from 'firebase/storage'
// Children
import Posts from '../Posts/Posts'


const Profile = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.userData)
    const [followersData, setFollowersData] = useState({
        followers: [],
        following: []
    })

    useEffect(() => {
        // Get followers data from DB
        getFollowersDataByID(database, user.userID)
            .then(data => {
                setFollowersData({
                    followers: data.followers,
                    following: data.following
                })
            })
        // eslint-disable-next-line
    }, [])

    const isAuth = useSelector(state => state.auth.isAuth)
    const postList = useSelector(state => state.posts.postList)
    const storage = getStorage()
    const database = useSelector(state => state.firebase.database)
    const isUserNameChanged = useSelector(state => state.changeHandler.isUserNameChanged)
    const currentUserNameValue = useSelector(state => state.changeHandler.currentUserNameValue)
    const changeUserNameError = useSelector(state => state.errors.changeUserNameError)

    function handleImageChange() {
        const [image] = document.getElementById('fileInp').files
        if (image) {
            const imageID = uuid()
            const storageRef = ref(storage, `avatars/${imageID}`)
            const imageLocation = `gs://bloom-5c636.appspot.com/avatars/${imageID}`
            // Upload image to Firebase Storage
            uploadBytes(storageRef, image)
                .then(() => {
                    // Once image uploaded - get its URL
                    getDownloadURL(ref(storage, imageLocation))
                        .then(url => {
                            // Update current user data and set a new photoURL for him on Firestore
                            const docRef = doc(database, 'usersData', user.userID)
                            updateDoc(docRef, {photoURL: `${url}`})
                                .then(() => {
                                    console.log('Image updated successfully')
                                    const deletingImageRef = ref(storage, user.photoURL)
                                    // Delete old image from Storage
                                    user.photoURL && deleteObject(deletingImageRef)
                                        .then(() => {
                                            console.log('Old image deleted successfully')
                                        })
                                        .catch((error) => console.log('Cannot delete old image: ', error))
                                    // Remember our image URL locally
                                    dispatch(setPhoto(url))
                                })
                                .catch(error => console.log('Error while updating image url: ', error))
                        })
                        .catch(error => console.log('Error while getting image url from Storage: ', error))
                })
        }
    }

    function handleUserNameChange() {
        // Clear changeUserName errors before proceed
        let error = false
        dispatch(occurredChangeUserNameError(''))
        // Getting all docs from collection to check whether user with entered userName already exists
        getDocs(collection(database, 'usersData'))
            .then(async (result) => {
                if (currentUserNameValue === user.userName) {
                    // Nothing to do if userName is same as before
                    dispatch(stopUserNameChange())
                } else {
                    await result.forEach(doc => {
                        if (doc.data().userName === currentUserNameValue) {
                            // Entered userName already exists and cannot be used again
                            dispatch(occurredChangeUserNameError('This Username is already taken, please try another'))
                            error = true
                            console.log('error dispatched')
                        }
                    })
                    if (!error) {
                        // Entered userName is unique, proceed with username change
                        const userDocRef = doc(database, 'usersData', user.userID)
                        updateDoc(userDocRef, {userName: currentUserNameValue})
                            .then(() => {
                                console.log('Username changed successfully successfully')
                                // Remember new userName locally
                                dispatch(setUserName(currentUserNameValue))
                                dispatch(stopUserNameChange())
                            })
                            .catch(error => dispatch(occurredChangeUserNameError(`Error while updating userName: ${error.code}`)))
                    }
                }
            })
            .catch(error => dispatch(occurredChangeUserNameError(`Failed to check database, ${error.code}`)))
    }

    return (
        <section className="profile" style={{paddingLeft: isAuth ? (window.innerWidth <= 768 ? '' : '1em') : ''}}>

            <section className="profile__controls">

                <div className="profile__image-wrapper">
                    <img
                        src={user.photoURL ? user.photoURL : guestPicture}
                        alt={'profile pic'}
                        className={'profile__image'}
                    />
                </div>


                <div className="profile__data-wrapper">
                    {isUserNameChanged
                        ? <input
                            type="text"
                            name="profile__change-input"
                            id="profile__change-input"
                            className={'profile__change-input'}
                            value={currentUserNameValue}
                            onChange={e => dispatch(setCurrentUserNameValue(e.target.value))}
                        />
                        : <div className={'profile__username'}>{user.userName}</div>}
                    {changeUserNameError && <span className={'profile__error'}>{changeUserNameError}</span>}

                    <div className="profile__counters">
                        <div className="profile__posts">
                            Posts <br/>
                            {postList.length}
                        </div>
                        <Link to={`/followers-list/${user.userID}`} className="profile__followers">
                            Followers <br/>
                            {followersData.followers.length}
                        </Link>
                        <Link to={`/following-list/${user.userID}`} className="profile__following">
                            Following <br/>
                            {followersData.following.length}
                        </Link>
                    </div>

                    <div className="profile__buttons">
                        {isUserNameChanged
                            ? <button className={'profile__change-username'} onClick={handleUserNameChange}>
                                Save changes
                            </button>
                            :
                            <button className={'profile__change-username'}
                                    onClick={() => dispatch(startUserNameChange())}>
                                Change username
                            </button>}
                        <label htmlFor={'fileInp'} className={'profile__change-image'}>
                            <span>Change profile image</span>
                            <input
                                type="file"
                                id={'fileInp'}
                                accept={'image/*'}
                                onChange={handleImageChange}
                            />
                        </label>
                    </div>
                </div>

            </section>

            <Posts postList={postList}/>

        </section>
    )
}

export default Profile