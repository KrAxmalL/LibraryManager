import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { notEmptyString, numberRegexp, phoneNumberRegexp } from '../../utils/validation';
import classes from './ReaderRegistrationForm.module.css';

function ReaderRegistrationForm(props) {
    const registrationError = props.registrationError;

    const emailInputRef = useRef();
    const [emailError, setEmailError] = useState(false);
    const passwordInputRef = useRef();
    const [passwordError, setPasswordError] = useState(false);
    const firstNameInputRef = useRef();
    const [firstNameError, setFirstNameError] = useState(false);
    const lastNameInputRef = useRef();
    const [lastNameError, setLastNameError] = useState(false);
    const patronymicInputRef = useRef();
    const [patronymicError, setPatronymicError] = useState(false);
    const phoneNumber1InputRef = useRef();
    const phoneNumber2InputRef = useRef();
    const phoneNumber3InputRef = useRef();
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const birthDateInputRef = useRef();
    const [birthDateError, setBirthDateError] = useState(false);
    const homeCityInputRef = useRef();
    const [homeCityError, setHomeCityError] = useState(false);
    const homeStreetInputRef = useRef();
    const [homeStreetError, setHomeStreetError] = useState(false);
    const homeBuildingNumberInputRef = useRef();
    const [homeBuildingNumberError, setHomeBuildingNumberError] = useState(false);
    const homeFlatNumberInputRef = useRef();
    const [homeFlatNumberError, setHomeFlatNumberError] = useState(false);
    const workPlaceInputRef = useRef();
    const [workPlaceError, setWorkPlaceError] = useState(false);

    const submitFormHandler = (e) => {
        e.preventDefault();

        const email = emailInputRef.current.value;
        const validEmail = notEmptyString(email);
        setEmailError(!validEmail);

        const password = passwordInputRef.current.value;
        const validPassword = notEmptyString(password);
        setPasswordError(!validPassword);

        const firstName = firstNameInputRef.current.value;
        const validFirstName = notEmptyString(firstName);
        setFirstNameError(!validFirstName);

        const lastName = lastNameInputRef.current.value;
        const validLastName = notEmptyString(lastName);
        setLastNameError(!validLastName);

        const patronymic = patronymicInputRef.current.value;
        const validPatronymic = notEmptyString(patronymic);
        setPatronymicError(!validPatronymic);

        const phoneNumbers = [phoneNumber1InputRef.current.value, phoneNumber2InputRef.current.value, 
                              phoneNumber3InputRef.current.value];
        const validPhones = phoneNumbers.every(number => number.length === 0 || phoneNumberRegexp.test(number))
                            && phoneNumbers.some(number => number.length > 0);
        setPhoneNumberError(!validPhones);

        const birthDate = birthDateInputRef.current.value;
        const ageDifMs = Date.now() - (new Date(birthDate)).getTime();
        const ageDate = new Date(ageDifMs);
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);
        const validBirthDate = age >= 17;
        setBirthDateError(!validBirthDate);

        const homeCity = homeCityInputRef.current.value;
        const validHomeCity = notEmptyString(homeCity);
        setHomeCityError(!validHomeCity);

        const homeStreet = homeStreetInputRef.current.value;
        const validHomeStreet = notEmptyString(homeStreet);
        setHomeStreetError(!validHomeStreet);

        const homeBuildingNumber = homeBuildingNumberInputRef.current.value;
        const validHomeBuildingNumber = notEmptyString(homeBuildingNumber);
        setHomeBuildingNumberError(!validHomeBuildingNumber);

        const homeFlatNumberStr = homeFlatNumberInputRef.current.value;
        let homeFlatNumber = null;
        const validHomeFlatNumber = homeFlatNumberStr.length === 0
                                    ||
                                    (numberRegexp.test(homeFlatNumberStr) && Number.parseInt(homeFlatNumberStr) > 0);
        console.log('validHomeFlatNumber: ' + validHomeFlatNumber);
        console.log('is integer: ' + Number.isInteger(homeFlatNumberStr));
        console.log('parsed: ' + Number.parseInt(homeFlatNumberStr));
        if(validHomeFlatNumber && homeFlatNumberStr.length > 0) {
            homeFlatNumber = Number.parseInt(homeFlatNumberStr)
        }
        setHomeFlatNumberError(!validHomeFlatNumber);

        const workPlace = workPlaceInputRef.current.value;
        const validWorkPlace = notEmptyString(workPlace);
        setWorkPlaceError(!validWorkPlace);

        if(validEmail && validPassword && validFirstName && validLastName && validPatronymic
            && validPhones && validBirthDate && validHomeCity && validHomeStreet && validHomeBuildingNumber
            && validHomeFlatNumber && validWorkPlace) {
                const readerToRegister = {
                    email, password, firstName, lastName, patronymic,
                    phoneNumbers: phoneNumbers.filter(number => number.length > 0),
                    birthDate, homeCity, homeStreet,
                    homeBuildingNumber, homeFlatNumber, workPlace
                }
                props.onRegisterReader(readerToRegister);
        }
    }

    return (
        <form onSubmit={submitFormHandler} className={classes['registration-form']}>
            <input className={classes.input} type='email' placeholder="Електронна пошта" required ref={emailInputRef} />
            {emailError && <p className={classes.error}>Електронна пошта не може бути порожньою</p>}
            {registrationError && <p className={classes.error}>Введена електронна пошта уже зайнята</p>}
            <input className={classes.input} type='password' placeholder="Пароль" required ref={passwordInputRef} />
            {passwordError && <p className={classes.error}>Пароль не може бути порожнім</p>}
            <input className={classes.input} type="text" placeholder="Ім'я" required ref={firstNameInputRef} />
            {firstNameError && <p className={classes.error}>Ім'я не може бути порожнім</p>}
            <input className={classes.input} type="text" placeholder="Прізвище" required ref={lastNameInputRef} />
            {lastNameError && <p className={classes.error}>Прізвище не може бути порожнім</p>}
            <input className={classes.input} type="text" placeholder="По-батькові" required ref={patronymicInputRef} />
            {patronymicError && <p className={classes.error}>По-батькові не може бути порожнім</p>}
            <label>Введіть ваші номери телефону (хоча б один, формат: +38xxxxxxxxxx):</label>
            <input className={classes.input} type="text" placeholder="Номер телефону" ref={phoneNumber1InputRef} />
            <input className={classes.input} type="text" placeholder="Номер телефону" ref={phoneNumber2InputRef} />
            <input className={classes.input} type="text" placeholder="Номер телефону" ref={phoneNumber3InputRef} />
            {phoneNumberError && <p className={classes.error}>Хоча б один телефон має бути введеним і відповідати формату</p>}
            <label>Оберіть вашу дату народження:</label>
            <input className={classes.input} type="date" placeholder="Дата народження" required ref={birthDateInputRef} />
            {birthDateError && <p className={classes.error}>Читачу має бути не менше 17 років</p>}
            <label>Ваша домашня адреса:</label>
            <input className={classes.input} type="text" placeholder="Місто" required ref={homeCityInputRef} />
            {homeCityError && <p className={classes.error}>Місто не може бути порожнім</p>}
            <input className={classes.input} type="text" placeholder="Вулиця" required ref={homeStreetInputRef} />
            {homeStreetError && <p className={classes.error}>Вулиця не може бути порожньою</p>}
            <input className={classes.input} type="text" placeholder="Будинок" required ref={homeBuildingNumberInputRef} />
            {homeBuildingNumberError && <p className={classes.error}>Номер будинку не може бути порожнім</p>}
            <input className={classes.input} type="number" placeholder="Квартира" ref={homeFlatNumberInputRef} />
            {homeFlatNumberError && <p className={classes.error}>Номер квартири має бути додатнім числом</p>}
            <input className={classes.input} type="text" placeholder="Місце роботи" required ref={workPlaceInputRef} />
            {workPlaceError && <p className={classes.error}>Місце роботи не може бути порожнім</p>}
            <input className={`${classes.input} ${classes.submit}`} type="submit" value="Зареєструватися" />
            <Link className={classes.link} to='../login'>Увійти</Link>
        </form>
    );
}

export default ReaderRegistrationForm;