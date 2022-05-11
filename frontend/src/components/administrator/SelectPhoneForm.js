import { useRef, useState } from 'react';
import { notEmptyString } from '../../utils/validation';
import classes from './SelectPhoneForm.module.css';

function SelectPhoneForm(props) {
    const phoneInputRef = useRef();
    const [phoneError, setPhoneError] = useState(false);

    const submitFormHandler = (e) => {
        e.preventDefault();

        const phoneNumber = phoneInputRef.current.value;
        const validPhoneNumber = notEmptyString(phoneNumber);
        setPhoneError(!validPhoneNumber);

        if(validPhoneNumber) {
            props.onSelectPhone(phoneNumber);
        }
    }

    return (
        <form name="select-phone-form" className={classes['select-phone-form']} onSubmit={submitFormHandler}>
            <h2>Оберіть номер телефону</h2>
            <input className={classes.input} type="text" placeholder="Номер телефону" required ref={phoneInputRef}/>
            {phoneError && <p className={classes.error}>Номер телефону не може бути порожнім</p>}
            <input className={`${classes.input} ${classes.submit}`} type="submit" value="Показати статистику" />
        </form>
    );
}

export default SelectPhoneForm;