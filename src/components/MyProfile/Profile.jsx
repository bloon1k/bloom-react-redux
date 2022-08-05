import React from 'react'
// Styles
import './Profile.scss'
// Assets
import guestPicture from '../../Assets/guest.png'
// Libraries
import {useSelector, useDispatch} from 'react-redux'
import {setPhoto} from '../../redux/features/userDataSlice'
import {v4 as uuid} from 'uuid'
// Firestore
import {doc, updateDoc} from 'firebase/firestore'
// Firebase Storage
import {ref, getStorage, uploadBytes, getDownloadURL, deleteObject} from 'firebase/storage'

const Profile = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.userData)
    const storage = getStorage()
    const database = useSelector(state => state.firebase.database)

    return (
        <section className="profile">
            My profile
            <img src={user.photoURL ? user.photoURL : guestPicture} alt={'profile pic'} className={'profile__image'}/>
            <p>{user.name}</p>
            <p>{user.surname}</p>
            <br/>
            change picture:
            <br/>
            <input
                type="file"
                id={'fileInp'}
                accept={'image/*'}
                onChange={() => {
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
                                        const docRef = doc(database, 'usersData', user.id)
                                        updateDoc(docRef, {photoURL: `${url}`})
                                            .then(() => {
                                                console.log('Image updated successfully')
                                                const deletingImageRef = ref(storage, user.photoURL)
                                                // Delete old image from Storage
                                                deleteObject(deletingImageRef)
                                                    .then(() => {
                                                        console.log('Old image deleted successfully')
                                                    })
                                                    .catch((error) => console.log('Cannot delete old image: ', error))
                                            })
                                            .catch(error => console.log('Error while updating image url: ', error))
                                        // Remember our image URL locally
                                        dispatch(setPhoto(url))
                                    })
                                    .catch(error => console.log('Error while getting image url from Storage: ', error))
                            })
                    }
                }}
            />
        </section>
    )
}

export default Profile