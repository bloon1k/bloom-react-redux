import React from 'react'
// Styles
import './SignUpForm.scss'
// Libraries
import {Link, Navigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {v4 as uuid} from 'uuid'
// Assets
import horizontal from '../../Assets/horizontal.svg'
// Redux
import {useDispatch, useSelector} from 'react-redux'
import {login} from '../../redux/features/authSlice'
import {setUserID, setEmail, setUserName, setPassword} from '../../redux/features/userDataSlice'
import {setCurrentUserNameValue} from '../../redux/features/changeHandlerSlice'
import {occurredSignUpError} from '../../redux/features/errorsSlice'
import {setPosts} from '../../redux/features/postsSlice'
// Firebase
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
// Firestore
import {doc, setDoc, collection, getDocs} from 'firebase/firestore'

const schema = yup.object().shape({
    userName: yup.string().min(4, 'At least 4 characters').max(15, 'No longer than 15 characters').required('Username' +
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
        let error = false
        dispatch(occurredSignUpError(''))
        // Getting all docs from collection to check whether user with entered userName already exists
        getDocs(collection(database, 'usersData'))
            .then(async (result) => {
                await result.forEach(doc => {
                    if (doc.data().userName === data.userName) {
                        // Entered userName already exists and cannot be used for registration
                        dispatch(occurredSignUpError('This Username is already taken, please try another'))
                        error = true
                        console.log('error dispatched')
                    }
                })
                if (!error) {
                    // Entered userName is unique, proceed with registration
                    createUserWithEmailAndPassword(auth, data.email, data.password)
                        .then((userCredential) => {
                            // Sign up success
                            const newUserID = uuid()
                            // Send data to DB (update usersData collection)
                            setDoc(doc(database, 'usersData', newUserID), {
                                userID: newUserID,
                                userName: data.userName,
                                email: data.email,
                                password: data.password,
                                photoURL: 'https://firebasestorage.googleapis.com/v0/b/bloom-5c636.appspot.com/o/avatars%2Fc60362d7-bbd4-41c9-877c-c7d9bdfdf089?alt=media&token=2c50e433-8b15-47c0-8f8b-e339ca13aa47'
                            })
                                .then(() => {
                                    // Send data to DB (update followers collection)
                                    setDoc(doc(database, 'followers', newUserID), {
                                        followers: [],
                                        following: []
                                    })
                                        .then(() => {
                                            setDoc(doc(database, 'posts', newUserID), {
                                                postList: [],
                                            })
                                                .then(() => {
                                                    dispatch(setPosts([]))
                                                    dispatch(setUserID(newUserID))
                                                    localStorage.setItem('userID', newUserID)
                                                    dispatch(setUserName(data.userName))
                                                    localStorage.setItem('userName', data.userName)
                                                    // CurrentUserName is required to change userName in Profile page
                                                    dispatch(setCurrentUserNameValue(data.userName))
                                                    dispatch(setEmail(data.email))
                                                    localStorage.setItem('email', data.email)
                                                    dispatch(setPassword(data.password))
                                                    localStorage.setItem('photoURL', 'https://firebasestorage.googleapis.com/v0/b/bloom-5c636.appspot.com/o/avatars%2Fc60362d7-bbd4-41c9-877c-c7d9bdfdf089?alt=media&token=2c50e433-8b15-47c0-8f8b-e339ca13aa47')
                                                    // Auto-login after
                                                    dispatch(login())
                                                    localStorage.setItem('isAuth', 'true')
                                                    reset()
                                                })
                                        })
                                })
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
    const googleUserHalfLogged = useSelector(state => state.userData.userID)
    if (isLoggedIn) return <Navigate to={'/'}/>
    if (googleUserHalfLogged) return <Navigate to={'/create-username'}/>

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