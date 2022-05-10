import React, { useState } from "react";

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
  const [loginError, setLoginError] = useState(false);

  const navigate = useNavigate();

  const navigateAfterLogin = (roles) => {
    if(!roles) {
      return '/login';
    }
    else if(roles.includes('READER')) {
      return '/reader/books';
    }
    else if(roles.includes('LIBRARIAN')) {
      return '/librarian/books';
    }
    else if(roles.includes('ADMINISTRATOR')) {
      return '/administrator/books';
    }
    else {
      return '/unauthorized';
    }
  }

  const submitFormHandler = async (e) => {
    e.preventDefault();

    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    try {
        const { accessToken } = await login(email, password);
        const decodedToken = jwtDecode(accessToken);
        const roles = decodedToken.roles;
        dispatch(authActions.setAccessToken({ accessToken }));
        dispatch(authActions.setRoles({ roles }));

        setLoginError(false);
        navigate({
          pathname: navigateAfterLogin(roles)
        });
    } catch(error) {
        setLoginError(true);
    }
  }

    return (
        <form onSubmit={submitFormHandler} className={classes['login-form']}>
          <input className={classes.input} type='email' placeholder="Електронна пошта" id='email' required  ref={emailInputRef}></input>
          <input className={classes.input} type='password' placeholder="Пароль" id='password' required ref={passwordInputRef}></input>
          {loginError && 
            <p className={classes.error}>Не вдалось увійти в систему! Перевірте електронну пошта та пароль і спробуйте ще раз</p>
          }
          <input className={`${classes.input} ${classes.submit}`} type='submit' value='Увійти'></input>
          <Link className={classes.link} to='../register'>Зареєструватися</Link>
        </form>
    );
}

export default LoginForm;