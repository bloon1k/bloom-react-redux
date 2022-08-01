import React from 'react'
// Styles
import './SignIn.scss'
// Libraries
import {Navigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {useDispatch, useSelector} from 'react-redux'
import {login} from '../../redux/features/authSlice'
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
import {changedEmail, changedName, changedPassword, changedPhoto} from '../../redux/features/userDataSlice'
import {occurredError} from '../../redux/features/signInErrorSlice'
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

    const dispatch = useDispatch()

    const signInError = useSelector(state => state.signInError.message)

    const app = useSelector(state => state.fireAuth.app)
    const auth = getAuth(app)

    const isLoggedIn = useSelector(state => state.auth.isAuth)

    function submitLoginForm(data) {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then(userCredential => {
                // Signed in
                dispatch(changedEmail(data.email))
                dispatch(changedPassword(data.password))
                dispatch(login())
                // TODO send this to redux store when you gonna need to display user data in profile page
                const user = userCredential.user
                console.log(user)
            })
            .catch((error) => {
                dispatch(occurredError(error.code === 'auth/user-not-found' ? 'user not found' : 'incorrect password'))
            })
        reset()
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
                    dispatch(changedEmail(user.email))
                    dispatch(changedPhoto(user.photoURL))
                    dispatch(changedName(user.displayName))
                    dispatch(login())
                    console.log('User info: ', user)
                }).catch(error => {
                // Handle Errors here.
                const errorCode = error.code
                console.log(errorCode)
            })
        }
    }

    // Sign in result handler for tablets and mobiles
    getRedirectResult(auth)
        .then((result) => {
            // The signed-in user info.
            const user = result.user
            dispatch(changedEmail(user.email))
            dispatch(changedPhoto(user.photoURL))
            dispatch(changedName(user.displayName))
            dispatch(login())
            console.log('User info: ', user)
        }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        console.log(errorCode)
    })

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