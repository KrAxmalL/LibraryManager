import { useRef, useState } from 'react';
import classes from './FinishCheckoutForm.module.css';

const startsWithDigitRegexp = /^\d/;

function FinishCheckoutForm(props) {
    const checkouts = props.checkouts;
    const selectedCheckoutRef = useRef();
    const finishReturnDateRef = useRef();
    const shelfRef = useRef();

    const [selectCheckoutError, setSelectCheckoutError] = useState(false);
    const [selectDateError, setSelectDateError] = useState(false);
    const [shelfError, setShelfError] = useState(false);

    const submitFormHandler = (e) => {
        e.preventDefault();

        const selectedCheckout = selectedCheckoutRef.current.value;
        const finishReturnDate = finishReturnDateRef.current.value;
        const shelf = shelfRef.current.value.trim();

        const validSelectedCheckout = selectedCheckout !== null;

        const startDate = checkouts.find(checkout => checkout.checkoutNumber === Number.parseInt(selectedCheckout))
                                       .checkoutStartDate;
        const validFinishDate = finishReturnDate && ((new Date(finishReturnDate)).getTime() >= (new Date(startDate)).getTime());

        const validShelf = shelf && shelf.length > 0 && startsWithDigitRegexp.test(shelf);

        setSelectCheckoutError(!validSelectedCheckout);
        setSelectDateError(!validFinishDate);
        setShelfError(!validShelf);
        if(validSelectedCheckout && validFinishDate && validShelf) {
            props.onFinishDateSelected(selectedCheckout, finishReturnDate, shelf);
        }
    }

    return (
        <form name="finish-checkout-form" className={classes['finish-checkout-form']} onSubmit={submitFormHandler}>
            <h2>Повернути книгу</h2>
            <label>Оберіть видачу:</label>
            <select ref={selectedCheckoutRef}>
                {checkouts.map(checkout => <option key={checkout.checkoutNumber}>{checkout.checkoutNumber}</option>)}
            </select>
            {selectCheckoutError && <p className={classes.error}>Видача має бути обрана</p>}

            <label>Введіть дату повернення:</label>
            <input className={classes.input} type='date' placeholder="Дата повернення" required ref={finishReturnDateRef}></input>
            {selectDateError && <p className={classes.error}>Дата повернення має бути більшою за дату видачі або дорівнювати їй</p>}

            <input type='text' placeholder="Полиця примірника" required ref={shelfRef}></input>
            {shelfError && <p className={classes.error}>Номер полиці має починатися з цифри</p>}

            <input className={`${classes.input} ${classes.submit}`} type="submit" value="Повернути" />
        </form>
    );
}

export default FinishCheckoutForm;