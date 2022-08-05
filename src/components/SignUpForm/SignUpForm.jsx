import React from 'react'
// Styles
import './SignUpForm.scss'
// Libraries
import {Link, Navigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
// Assets
import horizontal from '../../Assets/horizontal.svg'
// Redux
import {useDispatch, useSelector} from 'react-redux'
import {login} from '../../redux/features/authSlice'
import {setEmail, setUserName, setPassword} from '../../redux/features/userDataSlice'
import {occurredSignUpError} from '../../redux/features/errorsSlice'
// Firebase
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
// Firestore
import {doc, setDoc, collection, getDocs} from 'firebase/firestore'

const schema = yup.object().shape({
    userName: yup.string().min(4, 'At least 4 characters').max(35, 'No longer than 35 characters').required('Username' +
        ' is required'),
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    password: yup.string().min(6, 'At least 6 characters').max(35, 'Maximum 35 characters').required('Password is' +
        ' required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
})

const SignUpForm = () => {

    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(schema)
    })

    const dispatch = useDispatch()

    const database = useSelector(state => state.firebase.database)
    const app = useSelector(state => state.firebase.app)
    const auth = getAuth(app)

    const signUpError = useSelector(state => state.errors.signUpError)

    function submitSignUpForm(data) {
        // Clear sign up errors before proceed
        dispatch(occurredSignUpError(''))
        // Getting all docs from collection to check whether user with entered userName already exists
        getDocs(collection(database, 'usersData'))
            .then(async (result) => {
                await result.forEach(doc => {
                    if (doc.id === data.userName) {
                        // Entered userName already exists and cannot be used for registration
                        dispatch(occurredSignUpError('This Username is already taken, please try another'))
                        console.log('error dispatched')
                    }
                })
                if (!signUpError) {
                    // Entered userName is unique, proceed with registration
                    createUserWithEmailAndPassword(auth, data.email, data.password)
                        .then(async (userCredential) => {
                            // Sign up success
                            // Remember to redux store
                            dispatch(setUserName(data.userName))
                            dispatch(setEmail(data.email))
                            dispatch(setPassword(data.password))
                            // Send data to DB (update usersData collection)
                            await setDoc(doc(database, 'usersData', data.userName), {
                                userName: data.userName,
                                email: data.email,
                                password: data.password,
                                photoURL: ''
                            })
                            // Auto-login after
                            dispatch(login())
                            reset()
                        })
                        .catch((error) => {
                            // Dispatched error will be displayed under the form
                            dispatch(occurredSignUpError(error.code))
                            reset()
                        })
                }
            })
            .catch(error => dispatch(occurredSignUpError(`Failed to check database, ${error.code}`)))
    }

    const isLoggedIn = useSelector(state => state.auth.isAuth)
    if (isLoggedIn) return <Navigate to={'/'}/>

    return (
        <form className={'sign-up-form'} onSubmit={handleSubmit(submitSignUpForm)}>
            <span className="sign-up-form__text">Sign Up</span>

            <div className="sign-up-form__input-wrapper">

                <input
                    type="text"
                    name="sign-up-form__username"
                    id="sign-up-form__username"
                    className={'sign-up-form__input'}
                    onFocus={() => document.getElementsByClassName('sign-up-form__placeholder')[0].classList.add('sign-up-form__placeholder-move')}
                    {...register('userName')}
                />
                {errors.userName && <p className={'sign-up-form__error'}>{errors.userName.message}</p>}
                <span
                    className="sign-up-form__placeholder"
                    onClick={() => document.getElementById('sign-up-form__username').focus()}
                >
                    Username
                </span>

            </div>

            <div className="sign-up-form__input-wrapper">

                <input
                    type="text"
                    name="sign-up-form__email"
                    id="sign-up-form__email"
                    className={'sign-up-form__input'}
                    onFocus={() => document.getElementsByClassName('sign-up-form__placeholder')[1].classList.add('sign-up-form__placeholder-move')}
                    {...register('email')}
                />
                {errors.email && <p className={'sign-up-form__error'}>{errors.email.message}</p>}
                <span
                    className="sign-up-form__placeholder"
                    onClick={() => document.getElementById('sign-up-form__email').focus()}
                >
                    Email
                </span>

            </div>

            <div className="sign-up-form__input-wrapper">

                <input
                    type="password"
                    name="sign-up-form__password"
                    id="sign-up-form__password"
                    className={'sign-up-form__input'}
                    onFocus={() => document.getElementsByClassName('sign-up-form__placeholder')[2].classList.add('sign-up-form__placeholder-move')}
                    {...register('password')}
                />
                {errors.password && <p className={'sign-up-form__error'}>{errors.password.message}</p>}
                <span
                    className="sign-up-form__placeholder"
                    onClick={() => document.getElementById('sign-up-form__password').focus()}
                >
                    Password
                </span>

            </div>

            <div className="sign-up-form__input-wrapper">

                <input
                    type="password"
                    name="sign-up-form__confirm-password"
                    id="sign-up-form__confirm-password"
                    className={'sign-up-form__input'}
                    onFocus={() => document.getElementsByClassName('sign-up-form__placeholder')[3].classList.add('sign-up-form__placeholder-move')}
                    {...register('confirmPassword')}
                />
                {errors.confirmPassword && <p className={'sign-up-form__error'}>{errors.confirmPassword.message}</p>}
                <span
                    className="sign-up-form__placeholder"
                    onClick={() => document.getElementById('sign-up-form__confirm-password').focus()}
                >
                    Confirm password
                </span>

            </div>

            <button className={'sign-up-form__button'} type={'submit'}>Sign Up</button>

            {signUpError && <span className="sign-up-form__fail">Sign up failed, {signUpError}</span>}

            <div className="sign-up-form__sign-in">
                <Link to={'/sign-in'} className={'sign-up-form__link'}>
                    Already have an account? <br/>
                    Proceed to <span className={'sign-up-form__link--anchor'}>Sign in</span>
                </Link>
                <img src={horizontal} alt="woman with a sign" className={'sign-up-form__image'}/>
            </div>
        </form>
    )
}

export default SignUpForm