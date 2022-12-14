import React from 'react'
// Styles
import './SignUp.scss'
// Libraries
import {Link} from 'react-router-dom'
// Assets
import welcome from '../../Assets/welcome.svg'

const SignUp = () => {
    return (
        <section className="sign-up">
            <div className="sign-up__text">
                Don't have an account?<br/>
                <Link to={'/sign-up'} className={'sign-up__link'}><span>Register</span> now!</Link>
            </div>
            <img src={welcome} alt="monitor" className={'sign-up__image'}/>
        </section>
    )
}

export default SignUp