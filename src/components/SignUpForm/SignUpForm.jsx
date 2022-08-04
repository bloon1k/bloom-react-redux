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
import {setID, setEmail, setName, setSurname, setPassword} from '../../redux/features/userDataSlice'
import {occurredSignUpError} from '../../redux/features/errorsSlice'
// Firebase
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
// Firestore
import {doc, setDoc} from 'firebase/firestore'

const schema = yup.object().shape({
    name: yup.string().min(4, 'At least 4 characters').max(35, 'No longer than 35 characters').required('Name is' +
        ' required'),
    surname: yup.string().min(4, 'At least 4 characters').max(35, 'No longer than 35 characters').required('Surname' +
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
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(async (userCredential) => {
                // Sign up success
                let userID = uuid()
                // Remember to redux store
                dispatch(setID(userID))
                dispatch(setEmail(data.email))
                dispatch(setPassword(data.password))
                dispatch(setName(data.name))
                dispatch(setSurname(data.surname))
                // Send data to DB (update usersData collection)
                await setDoc(doc(database, 'usersData', userID), {
                    userID: userID,
                    email: data.email,
                    password: data.password,
                    name: data.name,
                    surname: data.surname,
                    photoURL: ''
                })
                // Auto-login after
                dispatch(login())
            })
            .catch((error) => {
                const errorCode = error.code
                // Dispatched error will be displayed under the form
                dispatch(occurredSignUpError(errorCode))
            })
        reset()
    }

    const isLoggedIn = useSelector(state => state.auth.isAuth)
    if (isLoggedIn) return <Navigate to={'/'}/>

    return (
        <form className={'sign-up-form'} onSubmit={handleSubmit(submitSignUpForm)}>
            <span className="sign-up-form__text">Sign Up</span>

            <div className="sign-up-form__input-wrapper">

                <input
                    type="text"
                    name="sign-up-form__name"
                    id="sign-up-form__name"
                    className={'sign-up-form__input'}
                    onFocus={() => document.getElementsByClassName('sign-up-form__placeholder')[0].classList.add('sign-up-form__placeholder-move')}
                    {...register('name')}
                />
                {errors.name && <p className={'sign-up-form__error'}>{errors.name.message}</p>}
                <span
                    className="sign-up-form__placeholder"
                    onClick={() => document.getElementById('sign-up-form__name').focus()}
                >
                    Name
                </span>

            </div>

            <div className="sign-up-form__input-wrapper">

                <input
                    type="text"
                    name="sign-up-form__surname"
                    id="sign-up-form__surname"
                    className={'sign-up-form__input'}
                    onFocus={() => document.getElementsByClassName('sign-up-form__placeholder')[1].classList.add('sign-up-form__placeholder-move')}
                    {...register('surname')}
                />
                {errors.name && <p className={'sign-up-form__error'}>{errors.name.message}</p>}
                <span
                    className="sign-up-form__placeholder"
                    onClick={() => document.getElementById('sign-up-form__surname').focus()}
                >
                    Surname
                </span>

            </div>

            <div className="sign-up-form__input-wrapper">

                <input
                    type="text"
                    name="sign-up-form__email"
                    id="sign-up-form__email"
                    className={'sign-up-form__input'}
                    onFocus={() => document.getElementsByClassName('sign-up-form__placeholder')[2].classList.add('sign-up-form__placeholder-move')}
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
                    onFocus={() => document.getElementsByClassName('sign-up-form__placeholder')[3].classList.add('sign-up-form__placeholder-move')}
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
                    onFocus={() => document.getElementsByClassName('sign-up-form__placeholder')[4].classList.add('sign-up-form__placeholder-move')}
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