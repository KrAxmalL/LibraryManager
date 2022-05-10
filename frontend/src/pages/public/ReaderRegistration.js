import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerReader } from "../../api/authentication";
import Layout from "../../components/layout/Layout";
import ReaderRegistrationForm from "../../components/Registration/ReaderRegistrationForm";

import classes from './ReaderRegistration.module.css';

function ReaderRegistration() {
    const navigate = useNavigate();
    const [registrationError, setRegistrationError] = useState(false);

    const readerRegistrationHandler = async (readerToRegister) => {
        console.log('reader: ' + JSON.stringify(readerToRegister));
        try {
            await registerReader(readerToRegister);
            setRegistrationError(false);
            navigate({
                pathname: '../login'
              });
        } catch(e) {
            setRegistrationError(true);
        }
    }

    return (
        <Layout>
            <h1 className={classes['form-title']}>Зареєструватися</h1>
            <div className="container">
                <div className={`container text-center ${classes['middle-container']}`}>
                <div className="container">
                    <section>
                        <ReaderRegistrationForm onRegisterReader={readerRegistrationHandler} 
                                                registrationError={registrationError}/>
                    </section>
                </div>
                </div>
            </div>
        </Layout>
    );
}

export default ReaderRegistration;