import React, { useRef } from "react";
import { Link } from "react-router-dom";

import classes from './LoginForm.module.css';

function LoginForm(props) {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const loginError = props.loginError;

  const submitFormHandler = async (e) => {
    e.preventDefault();

    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    props.onLogin(email, password);
  }

    return (
        <form onSubmit={submitFormHandler} className={classes['login-form']}>
          <input className={classes.input} type='email' placeholder="Електронна пошта" id='email' required  ref={emailInputRef}></input>
          <input className={classes.input} type='password' placeholder="Пароль" id='password' required ref={passwordInputRef}></input>
          {loginError &&
            <p className={classes.error}>Не вдалось увійти в систему!<br />
                                         Перевірте електронну пошта та пароль і спробуйте ще раз
            </p>
          }
          <input className={`${classes.input} ${classes.submit}`} type='submit' value='Увійти'></input>
          <Link className={classes.link} to='../register'>Зареєструватися</Link>
        </form>
    );
}

export default LoginForm;