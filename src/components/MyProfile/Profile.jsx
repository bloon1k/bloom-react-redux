import React from 'react'
// Styles
import './Profile.scss'
// Assets
import guestPicture from '../../Assets/guest.png'
// Libraries
import {useSelector, useDispatch} from 'react-redux'
import {setPhoto} from '../../redux/features/userDataSlice'
import {v4 as uuid} from 'uuid'
// Redux
import {startUserNameChange, stopUserNameChange, setCurrentUserNameValue} from '../../redux/features/changeHandlerSlice'
// Firestore
import {doc, updateDoc} from 'firebase/firestore'
// Firebase Storage
import {ref, getStorage, uploadBytes, getDownloadURL, deleteObject} from 'firebase/storage'

const Profile = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.userData)
    const storage = getStorage()
    const database = useSelector(state => state.firebase.database)

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

    const isUserNameChanged = useSelector(state => state.changeHandler.isUserNameChanged)
    const currentUserNameValue = useSelector(state => state.changeHandler.currentUserNameValue)

    return (
        <section className="profile">

            <section className="profile__controls">

                <div className="profile__image-wrapper">
                    <img
                        src={user.photoURL ? user.photoURL : guestPicture}
                        alt={'profile pic'}
                        className={'profile__image'}
                    />
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

                <div className="profile__data-wrapper">
                    <span>
                        {isUserNameChanged
                            ? <input
                                type="text"
                                name="profile__change-input"
                                id="profile__change-input"
                                className={'profile__change-input'}
                                value={currentUserNameValue}
                                onChange={e => dispatch(setCurrentUserNameValue(e.target.value))}
                            />
                            : user.userName}
                    </span>
                    {isUserNameChanged
                        ? <button className={'profile__change-username'} onClick={() => dispatch(stopUserNameChange())}>
                            Save changes
                        </button>
                        :
                        <button className={'profile__change-username'} onClick={() => dispatch(startUserNameChange())}>
                            Change username
                        </button>}
                    <p>{user.email}</p>
                </div>

            </section>

            <section className="profile__posts">
                123
            </section>

        </section>
    )
}

export default Profile