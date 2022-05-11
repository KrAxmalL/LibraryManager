import { useRef, useState } from 'react';
import classes from './SelectPeriodForm.module.css';

function SelectPeriodForm(props) {
    const startDateRef = useRef();
    const endDateRef = useRef();

    const [startDateError, setStartDateError] = useState(false);
    const [endDateError, setEndDateError] = useState(false);

    const submitFormHandler = (e) => {
        e.preventDefault();

        const startDate = startDateRef.current.value;
        const validStartDate = startDate !== null;
        setStartDateError(!validStartDate);

        const endDate = endDateRef.current.value;
        const validEndDate = endDate !== null && ((new Date(startDate).getTime()) < (new Date(endDate).getTime()));
        setEndDateError(!validEndDate);

        console.log(startDate);
        console.log(endDate);

        if(validStartDate && validEndDate) {
            props.onSelectPeriod(startDate, endDate);
        }
    }

    return (
        <form name="select-period-form" className={classes['select-period-form']} onSubmit={submitFormHandler}>
            <h2>Оберіть період часу для статистики</h2>
            <label>Оберіть дату початку:</label>
            <input className={classes.input} type='date' placeholder="Дата початку" required 
                   ref={startDateRef}></input>
            {startDateError && <p className={classes.error}>Дата початку має бути обрана</p>}

            <label>Оберіть дату кінця:</label>
            <input className={classes.input} type='date' placeholder="Дата кінця" required
                   ref={endDateRef}></input>
            {endDateError && <p className={classes.error}>Дата кінця має бути більшою за дату початку</p>}

            <input className={`${classes.input} ${classes.submit}`} type="submit" value="Показати статистику" />
        </form>
    );
}

export default SelectPeriodForm;