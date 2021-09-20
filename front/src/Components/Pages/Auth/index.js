import React,{useState} from 'react'
import {LoginForm,RegistrationForm} from '../../../Modules';
import CheckEmailInfo from "./components/CheckEmailInfo";
import './auth.scss'
import {Route} from 'react-router-dom'

let Auth =()=> {
    return (
        <section className='auth'>
            <div className='auth__content'>

                <Route exact  path={['/','/login']} component={LoginForm }/>
                <Route exact path='/register'  component={RegistrationForm}/>
                <Route exact path='/register/verify'  component={CheckEmailInfo}/>

            </div>
       </section>
    );
};

export default Auth;
