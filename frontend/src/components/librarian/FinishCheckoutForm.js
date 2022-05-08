import { useRef } from 'react';
import classes from './FinishCheckoutForm.module.css';

function FinishCheckoutForm(props) {
    const finishReturnDateRef = useRef();

    const submitFormHandler = (e) => {
        e.preventDefault();

        props.onFinishDateSelected(finishReturnDateRef.current.value);
    }

    return (
        <form name="finish-checkout-form" className={classes['finish-checkout-form']} onSubmit={submitFormHandler}>
            <h2>Повернути книгу</h2>
            <input className={classes.input} type='date' placeholder="Дата поверення" required ref={finishReturnDateRef}></input>
            <input className={`${classes.input} ${classes.submit}`} type="submit" value="Повернути" />
        </form>
    );
}

export default FinishCheckoutForm;