import { useRef } from 'react';
import classes from './ContinueCheckoutForm.module.css';

function ContinueCheckoutForm(props) {
    const checkouts = props.checkouts;
    const selectedCheckoutRef = useRef();
    const newReturnDateRef = useRef();

    const submitFormHandler = (e) => {
        e.preventDefault();

        console.log(selectedCheckoutRef.current.value);
        console.log(newReturnDateRef.current.value);
        props.onContinueDateSelected(newReturnDateRef.current.value);
    }

    return (
        <form name="continue-checkout-form" className={classes['continue-checkout-form']} onSubmit={submitFormHandler}>
            <h2>Продовжити видачу</h2>
            <label>Оберіть видачу:</label>
            <select ref={selectedCheckoutRef}>
                {checkouts.map(checkout => <option key={checkout.checkoutNumber}>{checkout.checkoutNumber}</option>)}
            </select>
            <label>Введіть нову дату повернення:</label>
            <input className={classes.input} type='date' placeholder="Нова дата повернення" required ref={newReturnDateRef}></input>
            <input className={`${classes.input} ${classes.submit}`} type="submit" value="Продовжити" />
        </form>
    );
}

export default ContinueCheckoutForm;