import React from 'react'
// Styles
import './SignIn.scss'
// Libraries
import {Navigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import getUserDataByEmail from '../../utils/getUserDataByEmail'
// Firebase
import {
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult
} from 'firebase/auth'
// Redux
import {useDispatch, useSelector} from 'react-redux'
import {login} from '../../redux/features/authSlice'
import {setEmail, setUserName, setPassword, setPhoto} from '../../redux/features/userDataSlice'
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

    function submitLoginForm(data) {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then(() => {
                // Signed in
                dispatch(setEmail(data.email))
                dispatch(setPassword(data.password))
                // userName, photoURL are fetched from server using getUserDataByEmail
                getUserDataByEmail(database, data.email)
                    .then(userData => {
                        dispatch(setUserName(userData.userName))
                        dispatch(setPhoto(userData.photoURL))
                        dispatch(login())
                    })
                reset()
            })
            .catch((error) => {
                dispatch(occurredSignInError(error.code === 'auth/user-not-found' ? 'user not found' : 'incorrect password'))
                reset()
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
                    dispatch(setEmail(user.email))
                    // photoURL, userName are fetched from server using getUserDataByEmail
                    getUserDataByEmail(database, user.email)
                        .then(userData => {
                            dispatch(setUserName(userData.userName))
                            if (userData.photoURL) {
                                // If user has the uploaded avatar - we get it and remember + display locally
                                dispatch(setPhoto(userData.photoURL))
                            } else {
                                // If user has no saved avatars - we use his Google avatar
                                dispatch(setPhoto(user.photoURL))
                            }
                        })
                    dispatch(login())
                }).catch(error => {
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
            dispatch(setEmail(user.email))
            // photoURL, userName are fetched from server using getUserDataByEmail
            getUserDataByEmail(database, user.email)
                .then(userData => {
                    dispatch(setUserName(userData.userName))
                    if (userData.photoURL) {
                        // If user has the uploaded avatar - we get it and remember + display locally
                        dispatch(setPhoto(userData.photoURL))
                    } else {
                        // If user has no saved avatars - we use his Google avatar
                        dispatch(setPhoto(user.photoURL))
                    }
                })
            dispatch(login())
        }).catch((error) => {
        const errorCode = error.code
        if (errorCode) {
            dispatch(occurredSignInError(errorCode))
        }
    })

    const isLoggedIn = useSelector(state => state.auth.isAuth)
    if (isLoggedIn) return <Navigate to={'/'}/>

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