import React from 'react'
// Styles
import './CreateUserName.scss'
// Libraries
import {Navigate} from 'react-router-dom'
// Redux
import {useSelector, useDispatch} from 'react-redux'
import {setUserName} from '../../redux/features/userDataSlice'
import {setCurrentUserNameValue, setIsLoading, stopUserNameChange} from '../../redux/features/changeHandlerSlice'
import {login} from '../../redux/features/authSlice'
import {occurredSignUpError} from '../../redux/features/errorsSlice'
// Firebase
import {collection, doc, getDocs, setDoc} from 'firebase/firestore'
import {setPosts} from '../../redux/features/postsSlice'

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
                    dispatch(setIsLoading(true))
                    // Send new user data to firestore
                    setDoc(doc(database, 'usersData', currentUser.userID), {
                        userID: currentUser.userID,
                        userName: currentUserNameValue,
                        email: currentUser.email,
                        password: '',
                        photoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShA_I9i6FEd3JTXAl7tS4op0qHA_Z1I2XW3oouHSrQS5IRHYQN00HQy9n_pB7-BFpkExc&usqp=CAU'
                    })
                        .then(() => {
                            setDoc(doc(database, 'followers', currentUser.userID), {
                                followers: [],
                                following: []
                            })
                                .then(() => {
                                    setDoc(doc(database, 'posts', currentUser.userID), {
                                        postList: [],
                                    })
                                        .then(() => {
                                            dispatch(setPosts([]))
                                            dispatch(setUserName(currentUserNameValue))
                                            localStorage.setItem('userName', currentUserNameValue)
                                            dispatch(setCurrentUserNameValue(currentUserNameValue))
                                            localStorage.setItem('currentUserNameValue', currentUserNameValue)
                                            dispatch(stopUserNameChange())
                                            dispatch(login())
                                            localStorage.setItem('isAuth', 'true')
                                            localStorage.setItem('photoURL', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShA_I9i6FEd3JTXAl7tS4op0qHA_Z1I2XW3oouHSrQS5IRHYQN00HQy9n_pB7-BFpkExc&usqp=CAU')
                                            dispatch(setIsLoading(false))
                                        })
                                })
                        })
                } else {
                    dispatch(occurredSignUpError('Username is too short or is already taken, please try another'))
                    dispatch(setIsLoading(false))
                }
            })
            .catch(error => {
                dispatch(occurredSignUpError(`Failed to check database, ${error.code}`))
                dispatch(setIsLoading(false))
            })
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