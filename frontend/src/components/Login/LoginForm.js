import React from "react";

import { useRef } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { authActions } from "../../store/auth-slice";

import jwtDecode from "jwt-decode";

import { login } from "../../api/authentication";

import classes from './LoginForm.module.css';
import { useNavigate } from "react-router-dom";

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
          pathname: '/readerBooks'
        });
    } catch(error) {
      //todo: add proper error handling
        console.log(error);
    }
  }

    return (
        <form className={classes['login-form']} onSubmit={submitFormHandler}>
            <h3>Login</h3>
            <label htmlFor="email">Your email</label>
            <input type='email' id='email' placeholder="Please, enter your email" ref={emailInputRef}></input>
            <label htmlFor="password">Your password</label>
            <input type='password' id='password' placeholder="Please, enter your password" ref={passwordInputRef}></input>
            <input type='submit' value='Login'></input>
        </form>
    );
}

export default LoginForm;