import { useRef, useState } from 'react';
import classes from './DeleteReaderForm.module.css';

function DeleteReaderForm(props) {
    const readers = props.readers;
    const selectedReaderRef = useRef();

    const [selectReaderError, setSelectReaderError] = useState(false);
    const [activeCheckoutsCount, setActiveCheckoutsCount] = useState(0);

    const submitFormHandler = (e) => {
        e.preventDefault();

        const selectedReader = selectedReaderRef.current.value;
        const validReader = selectedReader !== null;

        setSelectReaderError(!validReader);
        if(validReader && (activeCheckoutsCount === 0)) {
            props.onReaderSelected(selectedReader);
        }
    }

    const selectionChangeHandler = () => {
        const selectedReader = selectedReaderRef.current.value;
        const activeCheckoutsNumber = readers.find(reader => reader.ticketNumber === Number.parseInt(selectedReader))
                                             .activeCheckouts;
        setActiveCheckoutsCount(activeCheckoutsNumber);
    }

    return (
        <form name="delete-reader-form" className={classes['delete-reader-form']} onSubmit={submitFormHandler}>
            <h2>Видалити читача</h2>
            <label>Оберіть читача:</label>
            <select ref={selectedReaderRef} onChange={selectionChangeHandler}>
                {readers.map(reader => <option key={reader.ticketNumber} value={reader.ticketNumber}>{`${reader.ticketNumber}, ${reader.initials}`}</option>)}
            </select>
            {selectReaderError && <p className={classes.error}>Читач має бути обраний</p>}
            {!selectReaderError && activeCheckoutsCount === 0 &&
                <p className={classes['can-delete']}>Читач не має заборгованостей, можна видалити</p>
            }
            {!selectReaderError && activeCheckoutsCount > 0 &&
                <p className={classes.error}>{`Читач має книг на руках: ${activeCheckoutsCount}, не можна видалити`}</p>
            }

            <input className={`${classes.input} ${classes.submit}`}
                   type="submit" value="Видалити" disabled={activeCheckoutsCount > 0} />
        </form>
    );
}

export default DeleteReaderForm;