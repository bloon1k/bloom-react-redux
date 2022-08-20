import React from 'react'
// Styles
import './SignIn.scss'
// Libraries
import {Navigate, useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import getUserDataByEmail from '../../utils/getUserDataByEmail'
import {v4 as uuid} from 'uuid'
// Firebase
import {
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult
} from 'firebase/auth'
import getPostsDataByID from '../../utils/getPostsDataByID'
// Redux
import {useDispatch, useSelector} from 'react-redux'
import {login} from '../../redux/features/authSlice'
import {
    setUserID,
    setUserName,
    setEmail,
    setPassword,
    setPhoto,
} from '../../redux/features/userDataSlice'
import {setPosts} from '../../redux/features/postsSlice'
import {setCurrentUserNameValue, startUserNameChange} from '../../redux/features/changeHandlerSlice'
import {occurredSignInError} from '../../redux/features/errorsSlice'
// Assets
import google from '../../Assets/google.svg'
// Children
import SignUp from '../SignUp/SignUp'

const schema = yup.object().shape({
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    password: yup.string().min(6, 'At least 6 characters').max(35, 'Maximum 35 characters').required('Password is' +
        ' required')
})

const SignIn = () => {
    const provider = new GoogleAuthProvider()

    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(schema)
    })

    const app = useSelector(state => state.firebase.app)
    const auth = getAuth(app)
    const dispatch = useDispatch()
    const database = useSelector(state => state.firebase.database)
    const signInError = useSelector(state => state.errors.signInError)

    const navigate = useNavigate()

    function submitLoginForm(data) {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then(() => {
                // Signed in
                // userID, userName, photoURL are fetched from server using getUserDataByEmail
                getUserDataByEmail(database, data.email)
                    .then(userData => {
                        getPostsDataByID(database, userData.userID)
                            .then(postsData => {
                                dispatch(setPosts(postsData))
                                dispatch(setUserID(userData.userID))
                                localStorage.setItem('userID', userData.userID)
                                dispatch(setUserName(userData.userName))
                                localStorage.setItem('userName', userData.userName)
                                // currentUserName is required to change userName in Profile page
                                dispatch(setCurrentUserNameValue(userData.userName))
                                dispatch(setEmail(data.email))
                                localStorage.setItem('email', data.email)
                                dispatch(setPassword(data.password))
                                dispatch(setPhoto(userData.photoURL))
                                localStorage.setItem('photoURL', userData.photoURL)
                                dispatch(login())
                                localStorage.setItem('isAuth', 'true')
                                reset()
                            })
                    })
            })
            .catch((error) => {
                dispatch(occurredSignInError(error.code === 'auth/user-not-found' ? 'user not found' : 'incorrect password'))
            })
    }

    function googleSignIn(e) {
        e.preventDefault()
        if (window.innerWidth <= 768) {
            signInWithRedirect(auth, provider).then(() => 1)
        } else {
            signInWithPopup(auth, provider)
                .then((result) => {
                    // The signed-in user info.
                    const user = result.user
                    // userID, photoURL, userName are fetched from server using getUserDataByEmail
                    getUserDataByEmail(database, user.email)
                        .then(async userData => {
                            const newUserID = uuid()
                            dispatch(setEmail(user.email))
                            localStorage.setItem('email', user.email)
                            if (userData) {
                                // If user exists already
                                getPostsDataByID(database, userData.userID)
                                    .then(postsData => {
                                        dispatch(setPosts(postsData))
                                        dispatch(setUserID(userData.userID))
                                        localStorage.setItem('userID', userData.userID)
                                        dispatch(setUserName(userData.userName))
                                        localStorage.setItem('userName', userData.userName)
                                        // currentUserName is required to change userName in Profile page
                                        dispatch(setCurrentUserNameValue(userData.userName))
                                        if (userData.photoURL) {
                                            // If user has the uploaded avatar - we get it and remember +
                                            // display locally
                                            dispatch(setPhoto(userData.photoURL))
                                            localStorage.setItem('photoURL', userData.photoURL)
                                        } else {
                                            // If user has no saved avatars - use placeholder image
                                            dispatch(setPhoto('https://firebasestorage.googleapis.com/v0/b/bloom-5c636.appspot.com/o/avatars%2Fc60362d7-bbd4-41c9-877c-c7d9bdfdf089?alt=media&token=2c50e433-8b15-47c0-8f8b-e339ca13aa47'))
                                            localStorage.setItem('photoURL', 'https://firebasestorage.googleapis.com/v0/b/bloom-5c636.appspot.com/o/avatars%2Fc60362d7-bbd4-41c9-877c-c7d9bdfdf089?alt=media&token=2c50e433-8b15-47c0-8f8b-e339ca13aa47')
                                        }
                                        dispatch(login())
                                        localStorage.setItem('isAuth', 'true')
                                    })
                            } else {
                                // If user never existed
                                dispatch(setUserID(newUserID))
                                localStorage.setItem('userID', newUserID)
                                dispatch(startUserNameChange())
                                // All data will be sent to firestore once user creates userName
                                navigate('/create-username')
                            }
                        })
                })
                .catch(error => {
                    const errorCode = error.code
                    dispatch(occurredSignInError(errorCode))
                })
        }
    }

    // Sign in result handler for tablets and mobiles
    getRedirectResult(auth)
        .then((result) => {
            // The signed-in user info.
            const user = result.user
            // userID, photoURL, userName are fetched from server using getUserDataByEmail
            getUserDataByEmail(database, user.email)
                .then(async userData => {
                    const newUserID = uuid()
                    dispatch(setEmail(user.email))
                    localStorage.setItem('email', user.email)
                    if (userData) {
                        // If user exists already
                        getPostsDataByID(database, userData.userID)
                            .then(postsData => {
                                dispatch(setPosts(postsData))
                                dispatch(setUserID(userData.userID))
                                localStorage.setItem('userID', userData.userID)
                                dispatch(setUserName(userData.userName))
                                localStorage.setItem('userName', userData.userName)
                                // currentUserName is required to change userName in Profile page
                                dispatch(setCurrentUserNameValue(userData.userName))
                                if (userData.photoURL) {
                                    // If user has the uploaded avatar - we get it and remember + display
                                    // locally
                                    dispatch(setPhoto(userData.photoURL))
                                    localStorage.setItem('photoURL', userData.photoURL)
                                } else {
                                    // If user has no saved avatars - use placeholder image
                                    dispatch(setPhoto('https://firebasestorage.googleapis.com/v0/b/bloom-5c636.appspot.com/o/avatars%2Fc60362d7-bbd4-41c9-877c-c7d9bdfdf089?alt=media&token=2c50e433-8b15-47c0-8f8b-e339ca13aa47'))
                                    localStorage.setItem('photoURL', 'https://firebasestorage.googleapis.com/v0/b/bloom-5c636.appspot.com/o/avatars%2Fc60362d7-bbd4-41c9-877c-c7d9bdfdf089?alt=media&token=2c50e433-8b15-47c0-8f8b-e339ca13aa47')
                                }
                                dispatch(login())
                                localStorage.setItem('isAuth', 'true')
                            })
                    } else {
                        // If user never existed
                        dispatch(setUserID(newUserID))
                        localStorage.setItem('userID', newUserID)
                        dispatch(startUserNameChange())
                        // All data will be sent to firestore once user creates userName
                        navigate('/create-username')
                    }
                })
        })
        .catch((error) => {
            const errorCode = error.code
            dispatch(occurredSignInError(errorCode))
        })

    const isLoggedIn = useSelector(state => state.auth.isAuth)
    const googleUserHalfLogged = useSelector(state => state.userData.userID)
    if (isLoggedIn) return <Navigate to={'/'}/>
    if (googleUserHalfLogged) return <Navigate to={'/create-username'}/>

    return (
        <div className={'sign-in__wrapper'}>
            <form className={'sign-in'} onSubmit={handleSubmit(submitLoginForm)}>
                <span className="sign-in__text">Sign In</span>
                <div className="sign-in__input-wrapper">
                    <input
                        type="text"
                        name="email"
                        id="sign-in__email"
                        className={'sign-in__input'}
                        autoComplete={'email'}
                        onFocus={() => document.getElementsByClassName('sign-in__placeholder')[0].classList.add('sign-in__placeholder-move')}
                        {...register('email')}
                    />
                    {errors.email && <p className={'sign-in__error'}>{errors.email.message}</p>}
                    <span
                        className="sign-in__placeholder"
                        onClick={() => document.getElementById('sign-in__email').focus()}
                    >
                        Email
                    </span>
                </div>
                <div className="sign-in__input-wrapper">
                    <input
                        type="password"
                        name="password"
                        id="sign-in__password"
                        className={'sign-in__input'}
                        autoComplete={'current-password'}
                        onFocus={() => document.getElementsByClassName('sign-in__placeholder')[1].classList.add('sign-in__placeholder-move')}
                        {...register('password')}
                    />
                    {errors.password && <p className={'sign-in__error'}>{errors.password.message}</p>}
                    <span
                        className="sign-in__placeholder"
                        onClick={() => document.getElementById('sign-in__password').focus()}
                    >
                        Password
                    </span>
                </div>
                <button className={'sign-in__button'} type={'submit'}>Sign In</button>
                {signInError && <span className="sign-in__fail">Sign in failed, {signInError}</span>}
                <span className={'sign-in__or'}>or</span>
                <button onClick={googleSignIn} className={'sign-in__button--google'}>
                    <img src={google} alt="google logo" className={'sign-in__image'}/> Sign in with Google
                </button>
            </form>
            <SignUp/>
        </div>
    )
}

export default SignIn