import React from 'react'
// Styles
import './CreateUserName.scss'
// Libraries
import {Navigate} from 'react-router-dom'
// Redux
import {useSelector, useDispatch} from 'react-redux'
import {setUserName} from '../../redux/features/userDataSlice'
import {setCurrentUserNameValue, stopUserNameChange} from '../../redux/features/changeHandlerSlice'
import {login} from '../../redux/features/authSlice'
import {occurredSignUpError} from '../../redux/features/errorsSlice'
import {setFollowers, setFollowing} from '../../redux/features/followersDataSlice'
// Firebase
import {collection, doc, getDocs, setDoc} from 'firebase/firestore'

const CreateUserName = () => {

    const isAuth = useSelector(state => state.auth.isAuth)
    const dispatch = useDispatch()
    const database = useSelector(state => state.firebase.database)
    const currentUser = useSelector(state => state.userData)
    const currentUserNameValue = useSelector(state => state.changeHandler.currentUserNameValue)
    const signUpError = useSelector(state => state.errors.signUpError)
    const isUserNameChanged = useSelector(state => state.changeHandler.isUserNameChanged)

    if (isAuth) return <Navigate to={'/'}/>
    if (!isUserNameChanged) return <Navigate to={'/'}/>

    async function handleContinue() {
        // Clear sign up errors before proceed
        let error = false
        dispatch(occurredSignUpError(''))
        // Getting all docs from collection to check whether user with entered userName already exists
        getDocs(collection(database, 'usersData'))
            .then(async (result) => {
                await result.forEach(doc => {
                    if (doc.data().userName === currentUserNameValue) {
                        // Entered userName already exists and cannot be used for registration
                        error = true
                        console.log('error dispatched')
                    }
                })
                if (!error && [...currentUserNameValue].length > 1) {
                    // Send new user data to firestore
                    setDoc(doc(database, 'usersData', currentUser.userID), {
                        userID: currentUser.userID,
                        userName: currentUserNameValue,
                        email: currentUser.email,
                        password: '',
                        photoURL: ''
                    })
                        .then(() => {
                            setDoc(doc(database, 'followers', currentUser.userID), {
                                followers: [],
                                following: []
                            })
                                .then(() => {
                                    dispatch(setFollowers([]))
                                    dispatch(setFollowing([]))
                                    dispatch(setUserName(currentUserNameValue))
                                    dispatch(setCurrentUserNameValue())
                                    dispatch(stopUserNameChange())
                                    dispatch(login())
                                })
                        })
                } else {
                    dispatch(occurredSignUpError('Username is too short or is already taken, please try another'))
                }
            })
            .catch(error => dispatch(occurredSignUpError(`Failed to check database, ${error.code}`)))
    }

    return (
        <section className={'create-username'}>
            <span>Please create username</span>
            <span>(It can be changed anytime)</span>
            <div className="create-username__input-wrapper">
                <input
                    type="text"
                    id={'create-username__input'}
                    className={'create-username__input'}
                    value={currentUserNameValue}
                    onChange={e => dispatch(setCurrentUserNameValue(e.target.value))}
                    onFocus={() => document.getElementsByClassName('create-username__placeholder')[0].classList.add('create-username__placeholder-move')}
                />
                <span
                    className="create-username__placeholder"
                    onClick={() => document.getElementById('create-username__input').focus()}
                >
                    Username
                </span>
                {signUpError && <span className={'create-username__error'}>{signUpError}</span>}
            </div>
            <button className={'create-username__button'} onClick={handleContinue}>Continue</button>
        </section>
    )
}

export default CreateUserName