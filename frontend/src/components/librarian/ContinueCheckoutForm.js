import { useRef, useState } from 'react';
import classes from './ContinueCheckoutForm.module.css';

function ContinueCheckoutForm(props) {
    const checkouts = props.checkouts;
    const selectedCheckoutRef = useRef();
    const newReturnDateRef = useRef();

    const [selectCheckoutError, setSelectCheckoutError] = useState(false);
    const [selectDateError, setSelectDateError] = useState(false);

    const submitFormHandler = (e) => {
        e.preventDefault();

        const selectedCheckout = selectedCheckoutRef.current.value;
        const newReturnDate = newReturnDateRef.current.value;

        const validSelectedCheckout = selectedCheckout != null;

        const oldReturnDate = checkouts.find(checkout => checkout.checkoutNumber === Number.parseInt(selectedCheckout))
                                       .checkoutExpectedFinishDate;
        const validNewDate = newReturnDate && ((new Date(newReturnDate)).getTime() > (new Date(oldReturnDate)).getTime());

        setSelectCheckoutError(!validSelectedCheckout);
        setSelectDateError(!validNewDate);
        if(validSelectedCheckout && validNewDate) {
            props.onContinueDateSelected(selectedCheckout, newReturnDate);
        }
    }

    return (
        <form name="continue-checkout-form" className={classes['continue-checkout-form']} onSubmit={submitFormHandler}>
            <h2>Продовжити видачу</h2>
            <label>Оберіть видачу:</label>
            <select ref={selectedCheckoutRef}>
                {checkouts.map(checkout => <option key={checkout.checkoutNumber}>{checkout.checkoutNumber}</option>)}
            </select>
            {selectCheckoutError && <p className={classes.error}>Видача має бути обрана</p>}

            <label>Введіть нову дату повернення:</label>
            <input className={classes.input} type='date' placeholder="Нова дата повернення" required ref={newReturnDateRef}></input>
            {selectDateError && <p className={classes.error}>Нова дата повернення має бути більшою за поточну</p>}

            <input className={`${classes.input} ${classes.submit}`} type="submit" value="Продовжити" />
        </form>
    );
}

export default ContinueCheckoutForm;