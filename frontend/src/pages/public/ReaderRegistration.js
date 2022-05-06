import React from "react";
import Layout from "../../components/layout/Layout";
import ReaderRegistrationForm from "../../components/Registration/ReaderRegistrationForm";

import classes from './ReaderRegistration.module.css';

function ReaderRegistration() {
    return (
        <Layout>
            <h1 className={classes['form-title']}>Registration</h1>
            <div className="container">
                <div className={`container text-center ${classes['middle-container']}`}>
                <div className="container">
                    <section>
                        <ReaderRegistrationForm />
                    </section>
                </div>
                </div>
            </div>
        </Layout>
    );
}

export default ReaderRegistration;