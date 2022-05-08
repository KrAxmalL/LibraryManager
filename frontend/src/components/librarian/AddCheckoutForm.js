import { useRef, useState } from 'react';
import classes from './AddCheckoutForm.module.css';

function AddCheckoutForm(props) {
    const readers = props.readers;
    const exemplars = props.exemplars;
    const checkouts = props.checkouts;

    const selectedExemplarRef = useRef();
    const selectedReaderRef = useRef();
    const startDateRef = useRef();
    const returnDateRef = useRef();

    const [selectExemplarError, setSelectExemplarError] = useState(false);
    const [selectReaderError, setSelectReaderError] = useState(false);
    const [startDateError, setStartDateError] = useState(false);
    const [returnDateError, setReturnDateError] = useState(false);

    const selectedExemplarChangeHandler = () => {
        const selectedExemplar = selectedExemplarRef.current.value;
        setSelectExemplarError(checkouts.filter(checkout => checkout.exemplarInventoryNumber === Number.parseInt(selectedExemplar)).length > 0);
    }

    const selectedReaderChangeHandler = () => {
        const selectedReader = selectedReaderRef.current.value;
        setSelectReaderError(checkouts.filter(checkout => checkout.readerTicketNumber === Number.parseInt(selectedReader)).length > 0);
    }

    const startDateChangeHandler = () => {
        const startDate = startDateRef.current.value;
        const returnDate = returnDateRef.current.value;
        setStartDateError(!startDate);
        setReturnDateError((new Date(startDate).getTime()) >= (new Date(returnDate).getTime()));
    }

    const returnDateChangeHandler = () => {
        const startDate = startDateRef.current.value;
        const returnDate = returnDateRef.current.value;
        setReturnDateError(!returnDate || ((new Date(startDate).getTime()) >= (new Date(returnDate).getTime())));
    }

    const submitFormHandler = (e) => {
        e.preventDefault();

        //todo: fix first time opening list onChange is not triggered
        const selectedExemplar = selectedExemplarRef.current.value;
        const selectedReader = selectedReaderRef.current.value;
        const startDate = startDateRef.current.value;
        const returnDate = returnDateRef.current.value;
        console.log(selectedExemplar);
        console.log(selectedReader);
        console.log(startDate);
        console.log(returnDate);

        if(!selectExemplarError && !selectReaderError && !startDateError && !returnDateError) {
            props.onCheckoutAdd(Number.parseInt(selectedExemplar), Number.parseInt(selectedReader),
                                startDate, returnDate);
        }
    }

    return (
        <form name="add-checkout-form" className={classes['add-checkout-form']} onSubmit={submitFormHandler}>
            <h2>Видати книгу</h2>
            <label>Оберіть примірник:</label>
            <select ref={selectedExemplarRef} onChange={selectedExemplarChangeHandler}>
                {exemplars.map(exemplar => <option key={exemplar} value={exemplar}>{exemplar}</option>)}
            </select>
            {selectExemplarError && <p className={classes.error}>Цей примірник уже взятий іншим читачем</p>}

            <label>Оберіть читача:</label>
            <select ref={selectedReaderRef} onChange={selectedReaderChangeHandler}>
                {readers.map(reader => <option key={reader.ticketNumber} value={reader.ticketNumber}>{`${reader.ticketNumber}, ${reader.initials}`}</option>)}
            </select>
            {selectReaderError && <p className={classes.error}>Читач уже має примірник цієї книги</p>}

            <label>Введіть дату початку:</label>
            <input className={classes.input} type='date' placeholder="Дата початку" required 
                   ref={startDateRef} onChange={startDateChangeHandler}></input>
            {startDateError && <p className={classes.error}>Дата початку має бути обрана</p>}

            <label>Введіть очікувану дату повернення:</label>
            <input className={classes.input} type='date' placeholder="Очікувана дата повернення" required 
                   ref={returnDateRef} onChange={returnDateChangeHandler}></input>
            {returnDateError && <p className={classes.error}>Дата повернення має бути більшою за дату початку</p>}

            <input className={`${classes.input} ${classes.submit}`} type="submit" value="Видати книгу"
                   disabled={selectExemplarError || selectReaderError || startDateError || returnDateError} />
        </form>
    );
}

export default AddCheckoutForm;