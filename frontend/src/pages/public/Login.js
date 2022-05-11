import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/authentication";
import Layout from "../../components/layout/Layout";
import LoginForm from "../../components/login/LoginForm";
import { authActions } from "../../store/auth-slice";
import { getHomePageForUser } from "../../utils/navigation";

import classes from './Login.module.css'

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loginError, setLoginError] = useState(false);

    const loginHandler = async (email, password) => {
        try {
            const { accessToken } = await login(email, password);
            const decodedToken = jwtDecode(accessToken);
            const roles = decodedToken.roles;
            dispatch(authActions.setAccessToken({ accessToken }));
            dispatch(authActions.setRoles({ roles }));

            setLoginError(false);
            navigate({
              pathname: getHomePageForUser(roles)
            });
        } catch(error) {
            setLoginError(true);
        }
    }

    return (
        <Layout>
            <h1 className={classes['form-title']}>Увійти</h1>
            <div className="container">
                <div className={`container text-center ${classes['middle-container']}`}>
                    <div className="container">
                        <section>
                            <LoginForm onLogin={loginHandler} loginError={loginError} />
                        </section>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Login;