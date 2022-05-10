import React from "react";
import Layout from "../../components/layout/Layout";
import LoginForm from "../../components/login/LoginForm";

import classes from './Login.module.css'

function Login() {
    return (
        <Layout>
            <h1 className={classes['form-title']}>Увійти</h1>
            <div className="container">
                <div className={`container text-center ${classes['middle-container']}`}>
                    <div className="container">
                        <section id="content">
                            <LoginForm />
                        </section>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Login;