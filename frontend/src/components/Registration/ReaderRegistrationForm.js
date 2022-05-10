import { useRef } from 'react';
import { Link } from 'react-router-dom';
import classes from './ReaderRegistrationForm.module.css';

function ReaderRegistrationForm() {

    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const firstNameInputRef = useRef();
    const lastNameInputRef = useRef();
    const patronymicInputRef = useRef();
    const phoneNumber1InputRef = useRef();
    const phoneNumber2InputRef = useRef();
    const phoneNumber3InputRef = useRef();
    const birthDateInputRef = useRef();
    const homeCityInputRef = useRef();
    const homeStreetInputRef = useRef();
    const homeBuildingNumberInputRef = useRef();
    const homeFlatNumberInputRef = useRef();
    const workPlaceInputRef = useRef();

    const submitFormHandler = (e) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={submitFormHandler} className={classes['registration-form']}>
            <input className={classes.input} type='email' placeholder="Електронна пошта" required ref={emailInputRef} />
            <input className={classes.input} type='password' placeholder="Пароль" required ref={passwordInputRef} />
            <input className={classes.input} type="text" placeholder="Ім'я" required ref={firstNameInputRef} />
            <input className={classes.input} type="text" placeholder="Прізвище" required ref={lastNameInputRef} />
            <input className={classes.input} type="text" placeholder="По-батькові" required ref={patronymicInputRef} />
            <input className={classes.input} type="text" placeholder="Номер телефону" required ref={phoneNumber1InputRef} />
            <input className={classes.input} type="text" placeholder="Номер телефону" required ref={phoneNumber2InputRef} />
            <input className={classes.input} type="text" placeholder="Номер телефону" required ref={phoneNumber3InputRef} />
            <label>Оберіть вашу дату народження:</label>
            <input className={classes.input} type="date" placeholder="Дата народження" required ref={birthDateInputRef} />
            <label>Ваша домашня адреса:</label>
            <input className={classes.input} type="text" placeholder="Місто" required ref={homeCityInputRef} />
            <input className={classes.input} type="text" placeholder="Вулиця" required ref={homeStreetInputRef} />
            <input className={classes.input} type="text" placeholder="Будинок" required ref={homeBuildingNumberInputRef} />
            <input className={classes.input} type="number" placeholder="Квартира" ref={homeFlatNumberInputRef} />
            <input className={classes.input} type="text" placeholder="Місце роботи" required ref={workPlaceInputRef} />
            <input className={`${classes.input} ${classes.submit}`} type="submit" value="Зареєструватися" />
            <Link className={classes.link} to='../login'>Увійти</Link>
        </form>
    );
}

export default ReaderRegistrationForm;