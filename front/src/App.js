import React,{useEffect} from 'react'
import {Route} from 'react-router-dom'
import {Auth,Home} from "./Components"
import './Styles/index.scss';
import socket from './Socket/Socket';
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";


let  App = (props) => {
    const {isAuth} = props;

    console.log(isAuth)
  return (
      <div className='wrapper'>
          <Route exact  path={['/login','/register','/register/verify']} component={Auth}/>
          <Route

              path={['/dialog/:id','/']}
              render = {() => {
                  return isAuth ? <Home/> : <Redirect to ='/login'/>
              }}
          />
      </div>
  );
}

export default connect(({user}) => ({isAuth: user.isAuth}))(App);
