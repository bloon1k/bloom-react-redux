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
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import SignUp from '../SignUp/SignUp'
// Redux
import {changedEmail, changedPassword} from '../../redux/features/userDataSlice'
import {occurredError} from '../../redux/features/signInErrorSlice'

const schema = yup.object().shape({
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    password: yup.string().min(6, 'At least 6 characters').max(35, 'Maximum 35 characters').required('Password is' +
        ' required')
})

const SignIn = () => {

    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(schema)
    })

    const error = useSelector(state => {
        return state.signInError.message
    })

    function submitLoginForm(data) {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then(userCredential => {
                // Signed in
                dispatch(changedEmail(data.email))
                dispatch(changedPassword(data.password))
                dispatch(login())
                // TODO send this to redux store when you gonna need to display user data in profile page
                // const user = userCredential.user
                // console.log(user)
            })
            .catch((error) => {
                dispatch(occurredError(error.code === 'auth/user-not-found' ? 'user not found' : 'incorrect password'))
            })
        reset()
    }

    const dispatch = useDispatch()
    const app = useSelector(state => {
        return state.fireAuth.app
    })
    const auth = getAuth(app)

    const isLoggedIn = useSelector(state => {
        return state.auth.isAuth
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
                {error && <span className="sign-in__fail">Sign in failed, {error}</span>}
            </form>
            <SignUp/>
        </div>
    )
}

export default SignIn