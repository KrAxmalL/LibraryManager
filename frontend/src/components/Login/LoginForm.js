import React from "react";

import { useRef } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { authActions } from "../../store/auth-slice";

import jwtDecode from "jwt-decode";

import { login } from "../../api/authentication";

import classes from './LoginForm.module.css';
import { Link, Navigate, useNavigate } from "react-router-dom";

function LoginForm() {
  const dispatch = useDispatch();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const navigate = useNavigate();

  const submitFormHandler = async (e) => {
    e.preventDefault();

    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    try {
        const { accessToken } = await login(email, password);
        dispatch(authActions.setAccessToken({ accessToken }));
        console.log('logged in');
        console.log('token: ' + accessToken);

        const decodedToken = jwtDecode(accessToken);
        const roles = decodedToken.roles;
        dispatch(authActions.setRoles({ roles }));
        console.log('decoded token: ' + decodedToken.toLocaleString());
        console.log('roles: ' + roles);
        navigate({
          pathname: '/reader/books'
        });
    } catch(error) {
      //todo: add proper error handling
        console.log(error);
    }
  }

    return (
        <form onSubmit={submitFormHandler}>
          <div>
            <input className={classes.input} type='email' placeholder="Email" id='email' required  ref={emailInputRef}></input>
          </div>
          <div>
            <input className={classes.input} type='password' placeholder="Password" id='password' required ref={passwordInputRef}></input>
          </div>
          <div>
            <input className={`${classes.input} ${classes.submit}`} type='submit' value='Login'></input>
            <Link className={classes.link} to='../registerReader'>Register</Link>
          </div>
        </form>
    );
}

export default LoginForm;